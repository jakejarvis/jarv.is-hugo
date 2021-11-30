import { h, render, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import fetch from "unfetch";
import { parse as parseEmoji } from "imagemoji";
import dayjs from "dayjs";
import dayjsRelativeTime from "dayjs/plugin/relativeTime.js";

// shared react components:
import { StarIcon, RepoForkedIcon } from "@primer/octicons-react";
import Loading from "./components/loading.js";

// API endpoint (sort by stars, limit to 12)
const PROJECTS_ENDPOINT = "/api/projects/?top&limit=12";

const RepositoryGrid = () => {
  const [repos, setRepos] = useState([]);

  // start fetching repos from API immediately
  useEffect(() => {
    fetch(PROJECTS_ENDPOINT)
      .then((response) => response.json())
      .then((data) => setRepos(data || []));
  }, []);

  // show spinning loading indicator if data isn't fetched yet
  if (repos.length === 0) {
    return <Loading boxes={3} width={40} style={{ margin: "0.7em auto" }} />;
  }

  // we have data!
  return (
    <>
      {repos.map((repo) => (
        // eslint-disable-next-line react/jsx-key
        <RepositoryCard {...repo} />
      ))}
    </>
  );
};

const RepositoryCard = (repo) => (
  <div class="github-card">
    <a class="repo-name" href={repo.url} target="_blank" rel="noopener noreferrer">
      {repo.name}
    </a>

    {repo.description && (
      <p
        class="repo-description"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parseEmoji(repo.description, (icon) => `/assets/emoji/${icon}.svg`) }}
      />
    )}

    <div class="repo-meta">
      {repo.language && (
        <div class="repo-meta-item">
          <span class="repo-language-color" style={{ "background-color": repo.language.color }} />
          <span>{repo.language.name}</span>
        </div>
      )}

      {repo.stars > 0 && (
        <div class="repo-meta-item">
          <a
            href={`${repo.url}/stargazers`}
            title={`${repo.stars.toLocaleString("en-US")} ${repo.stars === 1 ? "star" : "stars"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StarIcon size={16} fill="currentColor" />
            <span>{repo.stars.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      {repo.forks > 0 && (
        <div class="repo-meta-item">
          <a
            href={`${repo.url}/network/members`}
            title={`${repo.forks.toLocaleString("en-US")} ${repo.forks === 1 ? "fork" : "forks"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RepoForkedIcon size={16} fill="currentColor" />
            <span>{repo.forks.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      <div
        class="repo-meta-item"
        title={new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        }).format(new Date(repo.updatedAt))}
      >
        <span>Updated {dayjs(repo.updatedAt).fromNow()}</span>
      </div>
    </div>
  </div>
);

// detect if these cards are wanted on this page (only /projects)
if (typeof window !== "undefined" && document.querySelector("div#github-cards")) {
  // dayjs plugins: https://day.js.org/docs/en/plugin/loading-into-nodejs
  dayjs.extend(dayjsRelativeTime);

  render(<RepositoryGrid />, document.querySelector("div#github-cards"));
}
