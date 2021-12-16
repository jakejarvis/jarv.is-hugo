import { h } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { isDark, getDarkPref, setDarkPref } from "../utils/theme.js";

// react components:
import BulbOn from "../assets/bulb-on.svg";
import BulbOff from "../assets/bulb-off.svg";

const ThemeToggle = () => {
  // sync button up with theme and preference states after initialization
  const [dark, setDark] = useState(isDark());
  const [saved, setSaved] = useState(!!getDarkPref());

  // real-time switching between modes based on user's system if preference isn't set (and it's supported by OS/browser)
  const matchCallback = useCallback((e) => setDark(e.matches), []);
  useEffect(() => {
    try {
      // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
      const matcher = window.matchMedia("(prefers-color-scheme: dark)");

      // only listen to OS if the user hasn't specified a preference
      if (!saved) {
        matcher.addEventListener("change", matchCallback, true);
      }

      // cleanup and stop listening if/when preference is explicitly set
      return () => matcher.removeEventListener("change", matchCallback, true);
    } catch (e) {}
  }, [saved, matchCallback]);

  useEffect(() => {
    // sets appropriate `<html class="...">`
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(dark ? "dark" : "light");
  }, [dark]);

  const handleToggle = () => {
    // only update the local storage preference if the user explicitly presses the lightbulb
    setDarkPref(!dark);
    setSaved(true);

    // set theme to the opposite of current theme
    setDark(!dark);
  };

  return (
    <button
      onClick={handleToggle}
      title={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
      aria-label={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
    >
      {dark ? <BulbOff /> : <BulbOn />}
    </button>
  );
};

export default ThemeToggle;
