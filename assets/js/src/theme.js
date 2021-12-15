import { h, render } from "preact";

// react components:
import ThemeToggle from "./components/ThemeToggle.js";

// finally render the nifty lightbulb in the header
if (typeof window !== "undefined" && document.querySelector(".theme-toggle")) {
  render(<ThemeToggle />, document.querySelector(".theme-toggle"));
}
