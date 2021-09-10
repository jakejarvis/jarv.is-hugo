---
title: "🕵️ Privacy Policy"
url: /privacy
layout: etc
sitemap:
  changefreq: never
  priority: 0.0
---

Okay, this is an easy one. 😉

## Analytics

A simple hit counter on each page tallies an aggregate number of pageviews (i.e. `hits = hits + 1`). Individual views and identifying (or non-identifying) details are **never stored or logged**.

The [serverless function](https://github.com/jakejarvis/jarv.is/blob/main/api/hits.js) and [client script](https://github.com/jakejarvis/jarv.is/blob/main/assets/js/src/counter.js) are open source, and [snapshots of the database](https://github.com/jakejarvis/website-stats) are public.

{{< image src="images/fauna_hits.png" alt="The entire database schema." link="/privacy/images/fauna_hits.png" />}}

## Hosting

Pages and first-party assets on this website are served by [**▲ Vercel**](https://vercel.com/). Refer to their [privacy policy](https://vercel.com/legal/privacy-policy) for more information.

For a likely excessive level of privacy and security, this website is also mirrored on the [🧅 Tor network](https://www.torproject.org/) at:

> [**jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion**](http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion)

## Third-Party Content

Occasionally, embedded content from third-party services is included in posts, and some may contain tracking code that is outside of my control. Please refer to their privacy policies for more information:

- [CodePen](https://blog.codepen.io/documentation/privacy/)
- [Facebook](https://www.facebook.com/policy.php)
- [GitHub](https://docs.github.com/en/github/site-policy/github-privacy-statement)
- [SoundCloud](https://soundcloud.com/pages/privacy)
- [Twitter](https://twitter.com/en/privacy)
- [Vimeo](https://vimeo.com/privacy)
- [YouTube](https://policies.google.com/privacy)

The code that requests this content [is open source](https://github.com/jakejarvis/jarv.is/tree/main/layouts/shortcodes).
