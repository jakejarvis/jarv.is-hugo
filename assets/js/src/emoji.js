import * as imagemoji from "imagemoji";

const parseEmoji = (what) =>
  // we're hosting twemojis locally instead of from Twitter's CDN
  imagemoji.parse(what, (icon) => `/assets/emoji/${icon}.svg`);

// apply to the entire body automatically on load...
parseEmoji(document.body);

// ...but this can still be reused elsewhere so the URL above doesn't need to be changed in multiple places
export default parseEmoji;
