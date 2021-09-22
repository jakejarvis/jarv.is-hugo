import { init as darkModeInit } from "dark-mode-switcheroo";

// HACK: disable theme transition until user's preference is auto-restored (1/2)
const disableTransitionCSSHack = document.createElement("style");
disableTransitionCSSHack.innerHTML = `
*,
::before,
::after {
  transition-property: none !important;
}`;
document.head.appendChild(disableTransitionCSSHack);

darkModeInit({
  toggle: document.querySelector(".dark-mode-toggle"),
  onInit: function (t) {
    // make toggle visible now that we know JS is enabled
    t.style.display = "block";

    // HACK: re-enable theme transitions after a very short delay, otherwise there's a weird race condition (2/2)
    setTimeout(() => {
      document.head.removeChild(disableTransitionCSSHack);
    }, 250);
  },
});
