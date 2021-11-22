import copy from "clipboard-copy";
import trimNewlines from "trim-newlines";

// the default text of the copy button:
const defaultText = "Copy";
const successText = "Copied!";

// loop through each code fence on page (if any)
document.querySelectorAll("div.highlight").forEach((highlightDiv) => {
  // bind a new button to the copy action
  const button = document.createElement("button");
  button.className = "copy-button";
  button.textContent = defaultText;
  button.addEventListener("click", async () => {
    // prevent unintentional double-clicks by unfocusing button
    button.blur();

    // actual code element will have class "language-*", even if plaintext
    await copy(trimNewlines(highlightDiv.querySelector('code[class^="language-"]').textContent));

    // show a subtle indication of success
    button.textContent = successText;

    // reset button to original text after 2 seconds
    setTimeout(() => {
      button.textContent = defaultText;
    }, 2000);
  });

  // add Hugo's code block to a new wrapper element, and insert the copy button as a sibling to it
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "highlight-clipboard-enabled";
  highlightDiv.before(wrapperDiv);
  wrapperDiv.append(highlightDiv, button);
});
