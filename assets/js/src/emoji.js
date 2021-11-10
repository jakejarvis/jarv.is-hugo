import { parse as parseEmoji } from "imagemoji";

// we're hosting twemojis locally instead of from Twitter's CDN
parseEmoji(document.body, (icon) => `/assets/emoji/${icon}.svg`);
