/* eslint-disable no-var */

// A super tiny script to restore dark mode off the bat (to hopefully avoid blinding flashes of white).
// NOTE: This is inlined by Hugo/esbuild (see layouts/partials/head/restore-theme.html) instead of Webpack.

import { getDarkPref } from "./src/utils/theme.js";

try {
  var cl = document.documentElement.classList;
  var pref = getDarkPref();

  // set `<html class="dark">` if either the user has explicitly toggled in the past or if their OS is in dark mode
  if (pref === "true" || (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    cl.remove("light");
    cl.add("dark");
  }
} catch (error) {}
