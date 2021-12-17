// class names (`<html class="...">`) for each theme
const lightClass = "light";
const darkClass = "dark";

// store preference in local storage
const storageKey = "dark_mode";
export const getDarkPref = () => localStorage.getItem(storageKey);
export const setDarkPref = (pref) => localStorage.setItem(storageKey, pref);

// use the `<html class="...">` as a hint to what the theme was set to outside of the button component
// there's probably (definitely) a cleaner way to do this..?
export const isDark = () => document.documentElement.classList.contains(darkClass);

// sets appropriate `<html class="...">` and `color-scheme` CSS property
export const updateDOM = (dark) => {
  const root = document.documentElement;

  // set `<html class="...">`
  root.classList.remove(darkClass, lightClass);
  root.classList.add(dark ? darkClass : lightClass);

  // ...and the CSS `color-scheme` property:
  // https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
  root.style.colorScheme = dark ? "dark" : "light";
};
