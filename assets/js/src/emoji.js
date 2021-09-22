import twemoji from "twemoji";

twemoji.parse(document.body, {
  // simpler relative URIs
  callback: (icon) => `/assets/emoji/${icon}.svg`,
});
