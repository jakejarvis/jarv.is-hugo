import { h } from "preact";
import { intlFormat, formatDistanceToNowStrict } from "date-fns";
import parseEmoji from "../utils/parseEmoji.js";

// react components:
import { StarIcon, RepoForkedIcon } from "@primer/octicons-react";

const RepositoryCard = (props) => (
  <div class="github-card">
    <a class="repo-name" href={props.url} target="_blank" rel="noopener noreferrer">
      {props.name}
    </a>

    {props.description && (
      <p
        class="repo-description"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parseEmoji(props.description) }}
      />
    )}

    <div class="repo-meta">
      {props.language && (
        <div class="repo-meta-item">
          <span class="repo-language-color" style={{ "background-color": props.language.color }} />
          <span>{props.language.name}</span>
        </div>
      )}

      {props.stars > 0 && (
        <div class="repo-meta-item">
          <a
            href={`${props.url}/stargazers`}
            title={`${props.stars.toLocaleString("en-US")} ${props.stars === 1 ? "star" : "stars"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <StarIcon size={16} />
            <span>{props.stars.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      {props.forks > 0 && (
        <div class="repo-meta-item">
          <a
            href={`${props.url}/network/members`}
            title={`${props.forks.toLocaleString("en-US")} ${props.forks === 1 ? "fork" : "forks"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RepoForkedIcon size={16} />
            <span>{props.forks.toLocaleString("en-US")}</span>
          </a>
        </div>
      )}

      <div
        class="repo-meta-item"
        title={intlFormat(
          new Date(props.updatedAt),
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZoneName: "short",
          },
          {
            locale: "en-US",
          }
        )}
      >
        <span>Updated {formatDistanceToNowStrict(new Date(props.updatedAt), { addSuffix: true })}</span>
      </div>
    </div>
  </div>
);

export default RepositoryCard;
