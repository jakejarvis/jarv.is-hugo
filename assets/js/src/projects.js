import fetch from "cross-fetch";
import { render } from "lit-html";
import { html } from "lit-html/static.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import dayjs from "dayjs";
import dayjsLocalizedFormat from "dayjs/plugin/localizedFormat.js";
import dayjsRelativeTime from "dayjs/plugin/relativeTime.js";
import twemoji from "twemoji";

// API endpoint (sort by stars, limit to 12)
const PROJECTS_ENDPOINT = "/api/projects/?top&limit=12";

// don't continue if there isn't a span#meta-hits element on this page
// TODO: be better.
const wrapper = document.querySelector("div#github-cards");

if (wrapper) {
  dayjs.extend(dayjsLocalizedFormat);
  dayjs.extend(dayjsRelativeTime);

  // this is a total sh*tshow, but safer than setting one big string via innerHTML :)
  // TODO: consider making this a real LitElement?
  const template = (repo) => html`
    <a class="repo-name" href="${repo.url}" target="_blank" rel="noopener">${repo.name}</a>

    ${repo.description ? html`<p class="repo-description">${repo.description}</p>` : null}

    <div class="repo-meta">
      ${repo.language
        ? html`<div class="repo-meta-item">
            <span class="repo-language-color" style="background-color: ${ifDefined(repo.language.color)}"></span>
            <span>${repo.language.name}</span>
          </div>`
        : null}
      ${repo.stars > 0
        ? html`<div
            class="repo-meta-item"
            title="${repo.stars.toLocaleString("en-US")} ${repo.stars === 1 ? "star" : "stars"}"
          >
            <svg viewBox="0 0 16 16" height="16" width="16">
              <path
                fill-rule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              ></path>
            </svg>
            <span>${repo.stars.toLocaleString("en-US")}</span>
          </div>`
        : null}
      ${repo.forks > 0
        ? html`<div
            class="repo-meta-item"
            title="${repo.forks.toLocaleString("en-US")} ${repo.forks === 1 ? "fork" : "forks"}"
          >
            <svg viewBox="0 0 16 16" height="16" width="16">
              <path
                fill-rule="evenodd"
                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
              ></path>
            </svg>
            <span>${repo.forks.toLocaleString("en-US")}</span>
          </div>`
        : null}

      <div class="repo-meta-item" title="${dayjs(repo.updatedAt).format("lll Z")}">
        <span>Updated ${dayjs(repo.updatedAt).fromNow()}</span>
      </div>
    </div>
  `;

  fetch(PROJECTS_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((repo) => {
        const div = document.createElement("div");
        div.classList.add("github-card");
        render(template(repo), div);
        wrapper.append(div);
      });

      // we're done, hide the loading spinner
      const spinner = document.querySelector("div.loading");
      if (spinner) {
        spinner.remove();
      }

      // the repo descriptions were added after the first twemoji parsing
      twemoji.parse(wrapper, {
        callback: (icon) => `/assets/emoji/${icon}.svg`,
      });
    })
    .catch(() => {
      // something went horribly wrong, initiate coverup
      wrapper.remove();
    });
}
