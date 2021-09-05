import * as Sentry from "@sentry/node";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Client, query as q } from "faunadb";
import fetch from "node-fetch";
import parser from "fast-xml-parser";
import { decode } from "html-entities";

import type { PageStats, OverallStats } from "./types/hits";

const baseUrl = "https://jarv.is/";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // some rudimentary error handling
    if (!process.env.FAUNADB_SERVER_SECRET) {
      throw new Error("Database credentials aren't set.");
    }
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }

    const client = new Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });
    const { slug } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    if (!slug || slug === "/") {
      // return overall site stats if slug not specified
      result = await getSiteStats(client);

      // let Vercel edge and browser cache results for 15 mins
      res.setHeader("Cache-Control", "public, max-age=900, s-maxage=900, stale-while-revalidate");
    } else {
      // increment this page's hits
      result = await incrementPageHits(slug, client);

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Expires", 0);
      res.setHeader("Pragma", "no-cache");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    const message = error instanceof Error ? error.message : "Unknown error.";

    res.status(400).json({ success: false, message: message });
  }
};

const incrementPageHits = async (slug: string | string[], client: Client): Promise<PageStats> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const result = await client.query<any>(
    q.Let(
      { match: q.Match(q.Index("hits_by_slug"), slug) },
      q.If(
        q.Exists(q.Var("match")),
        q.Let(
          {
            ref: q.Select("ref", q.Get(q.Var("match"))),
            hits: q.ToInteger(q.Select("hits", q.Select("data", q.Get(q.Var("match"))))),
          },
          q.Update(q.Var("ref"), { data: { hits: q.Add(q.Var("hits"), 1) } })
        ),
        q.Create(q.Collection("hits"), { data: { slug: slug, hits: 1 } })
      )
    )
  );

  // send client the *new* hit count
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return result.data;
};

const getSiteStats = async (client: Client): Promise<OverallStats> => {
  // get database and RSS results asynchronously
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const [feed, result] = await Promise.all<{ [key: string]: any }, any>([
    parser.parse(await (await fetch(baseUrl + "feed.xml")).text()), // this is messy but it works :)
    client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("hits")), { size: 99 }),
        q.Lambda((x) => q.Select("data", q.Get(x)))
      )
    ),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const pages: PageStats[] = result.data;
  const stats: OverallStats = {
    total: { hits: 0 },
    pages,
  };

  pages.map((p: PageStats) => {
    // match URLs from RSS feed with db to populate some metadata
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const match = feed.rss.channel.item.find(
      (x: { link: string }) => x.link === baseUrl + p.slug + "/"
    );
    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      p.title = decode(match.title);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      p.url = match.link;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      p.date = new Date(match.pubDate);
    }

    // add these hits to running tally
    stats.total.hits += p.hits;

    return p;
  });

  // sort by hits (descending)
  stats.pages.sort((a: { hits: number }, b: { hits: number }) => {
    return a.hits > b.hits ? -1 : 1;
  });

  return stats;
};
