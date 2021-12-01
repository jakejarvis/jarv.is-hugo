// Heavily inspired by AnchorJS: https://github.com/bryanbraun/anchorjs

// loop through each h2, h3, h4 in this page's content area
document.querySelectorAll(["div#content h2", "div#content h3", "div#content h4"]).forEach((h) => {
  // don't add to elements without a pre-existing ID (e.g. `<h2 id="...">`)
  if (!h.hasAttribute("id")) {
    return;
  }

  // build the anchor link (the "#" icon is added via CSS)
  const anchor = document.createElement("a");
  anchor.className = "anchorjs-link";
  anchor.href = `#${h.getAttribute("id")}`;

  // if this is a touchscreen, always show the "#" icon instead waiting for hover
  // NOTE: this is notoriously unreliable; see https://github.com/Modernizr/Modernizr/pull/2432
  if ("ontouchstart" in window) {
    anchor.style.opacity = "1";
  }

  // add anchor link to the right of the heading
  h.appendChild(anchor);
});
