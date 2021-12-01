// use a specified element(s) to trigger swap when clicked
const toggle = document.querySelector(".dark-mode-toggle");

// check for existing preference in local storage
const storageKey = "theme";
const pref = localStorage.getItem(storageKey);

// prepare a temporary stylesheet for fancy transitions
const fadeStyle = document.createElement("style");

// change CSS via these <body> classes:
const dark = "dark";
const light = "light";

// which class is <body> set to initially?
const defaultTheme = light;

// keep track of current state no matter how we got there
let active = defaultTheme === dark;

// receives a class name and switches <body> to it
const activateTheme = (theme, opts) => {
  if (opts?.fade) {
    document.head.append(fadeStyle);

    // apply a short transition to all properties of all elements
    // TODO: this causes some extreme performance hiccups (especially in chromium)
    fadeStyle.sheet.insertRule(`
      *, ::before, ::after {
        transition: all 0.15s linear !important;
      }
    `);

    // remove the stylesheet when body is done transitioning
    document.body.addEventListener("transitionend", () => {
      fadeStyle.remove();
    });
  }

  document.body.classList.remove(dark, light);
  document.body.classList.add(theme);
  active = theme === dark;

  if (opts?.save) {
    localStorage.setItem(storageKey, theme);
  }
};

// user has never clicked the button, so go by their OS preference until/if they do so
if (!pref) {
  // returns media query selector syntax
  // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
  const prefers = (colorScheme) => `(prefers-color-scheme: ${colorScheme})`;

  // check for OS dark/light mode preference and switch accordingly
  // default to `defaultTheme` set above if unsupported
  if (window.matchMedia(prefers("dark")).matches) {
    activateTheme(dark);
  } else if (window.matchMedia(prefers("light")).matches) {
    activateTheme(light);
  } else {
    activateTheme(defaultTheme);
  }

  // real-time switching (if supported by OS/browser)
  window.matchMedia(prefers("dark")).addEventListener("change", (e) => e.matches && activateTheme(dark));
  window.matchMedia(prefers("light")).addEventListener("change", (e) => e.matches && activateTheme(light));
} else if (pref === dark || pref === light) {
  // if user already explicitly toggled in the past, restore their preference
  activateTheme(pref);
} else {
  // fallback to default theme (this shouldn't happen)
  activateTheme(defaultTheme);
}

// don't freak out if page happens not to have a toggle
if (toggle) {
  // make toggle visible now that we know JS is enabled
  toggle.style.display = "block";

  // handle toggle click
  toggle.addEventListener("click", () => {
    // switch to the opposite theme & save preference in local storage
    // TODO: enable fade.
    if (active) {
      activateTheme(light, { save: true });
    } else {
      activateTheme(dark, { save: true });
    }
  });
}
