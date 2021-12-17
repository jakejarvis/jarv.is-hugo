// A super tiny script to restore dark mode off the bat (to hopefully avoid blinding flashes of white).
// NOTE: This is inlined by Hugo/esbuild (see layouts/partials/head/restore-theme.html) instead of Webpack.
// ANOTHER NOTE: Whenever this code is changed, its (minified) CSP hash *MUST* be updated manually in vercel.json.

import { getDarkPref, updateDOM } from "./src/utils/theme.js";

try {
  // Set root class and color-scheme property to dark if either...
  // - the user has explicitly toggled it previously.
  // - the user's OS is in dark mode.
  const pref = getDarkPref();
  updateDOM(pref === "true" || (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches));
} catch (e) {}
