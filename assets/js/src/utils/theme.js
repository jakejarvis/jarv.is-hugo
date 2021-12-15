// store preference in local storage
const storageKey = "dark_mode";
export const getDarkPref = () => localStorage.getItem(storageKey);
export const setDarkPref = (pref) => localStorage.setItem(storageKey, pref);

// use the `<html class="...">` as a hint to what the theme was set to outside of the button component
// there's probably (definitely) a cleaner way to do this..?
export const isDark = () => document.documentElement.classList.contains("dark");
