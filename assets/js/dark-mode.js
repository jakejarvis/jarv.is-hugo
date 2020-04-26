/* jshint esversion: 6, indent: 2, browser: true, quotmark: single */

// inspired by https://codepen.io/kevinpowell/pen/EMdjOV

// lightbulb toggle re-appears now that we know user has JS enabled
const toggle = document.querySelector('button#dark-mode-toggle');
toggle.style.visibility = 'visible';

// check for preset `dark_mode_pref` in localStorage
let pref = localStorage.getItem('dark_mode_pref');

// keep track of current state, light by default
let activated = false;

const activateDarkMode = function() {
  document.body.classList.remove('light');
  document.body.classList.add('dark');
  activated = true;
};

const activateLightMode = function() {
  document.body.classList.remove('dark');
  document.body.classList.add('light');
  activated = false;
};

// if user already explicitly enabled dark mode in the past, turn it back on.
// light is default, so no need to do anything otherwise.
if (pref === 'true') activateDarkMode();

// user has never clicked the button, so go by their OS preference until/if they do so
if (!pref) {
  // check for OS dark mode setting and switch accordingly
  // https://gist.github.com/Gioni06/eb5b28343bcf5793a70f6703004cf333#file-darkmode-js-L47
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) activateDarkMode();

  // real-time switching if supported by OS/browser
  // TODO: stop listening when the parent condition becomes false,
  //       right now these keep listening even if pref is set.
  window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && activateDarkMode());
  window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && activateLightMode());
}

// handle lightbulb click
toggle.addEventListener('click', function() {
  // switch to the opposite theme & save preference in local storage
  if (!activated) {
    activateDarkMode();
    localStorage.setItem('dark_mode_pref', 'true');
  } else {
    activateLightMode();
    localStorage.setItem('dark_mode_pref', 'false');
  }
});