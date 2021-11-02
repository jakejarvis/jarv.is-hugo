import fetch from "cross-fetch";
import canonicalUrl from "get-canonical-url";
import urlParse from "url-parse";

// API endpoint
const HITS_ENDPOINT = "/api/hits/";

// don't continue if there isn't a span#meta-hits element on this page
const wrapper = document.querySelector("div#meta-hits");

// page must have both span#meta-hits and canonical URL to enter
if (wrapper) {
  // use <link rel="canonical"> to deduce a consistent identifier for this page
  const canonical = canonicalUrl({
    normalize: true,
    normalizeOptions: {
      removeTrailingSlash: true,
      removeQueryParameters: true,
      stripHash: true,
    },
  });

  // javascript is enabled so show the loading indicator
  wrapper.style.display = "inline-flex";

  // get path and strip beginning and ending forward slash
  const slug = urlParse(canonical).pathname.replace(/^\/|\/$/g, "");

  fetch(`${HITS_ENDPOINT}?slug=${encodeURIComponent(slug)}`)
    .then((response) => response.json())
    .then((data) => {
      // pretty number and units
      const hitsComma = data.hits.toLocaleString("en-US");
      const hitsPlural = data.hits === 1 ? "view" : "views";
      wrapper.title = `${hitsComma} ${hitsPlural}`;

      // finally inject the hits...
      const counter = document.querySelector("span#meta-hits-counter");
      if (counter) {
        counter.append(hitsComma);
      }

      // ...and hide the loading spinner
      const spinner = document.querySelector("div#meta-hits-loading");
      if (spinner) {
        spinner.remove();
      }
    })
    .catch(() => {
      // something went horribly wrong, initiate coverup
      wrapper.remove();
    });
}
