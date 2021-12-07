import { h, render } from "preact";
import { useState } from "preact/hooks";
import copy from "clipboard-copy";
import trimNewlines from "trim-newlines";

// shared react components:
import { CopyIcon, CheckIcon } from "@primer/octicons-react";

const CopyButton = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    // stop browser from navigating away from page (this shouldn't happen anyways)
    e.preventDefault();
    // prevent unintentional double-clicks by unfocusing button
    e.target.blur();

    // trim any surrounding whitespace from target block's content and send it to the clipboard
    copy(trimNewlines(props.content));

    // indicate success...
    setCopied(true);
    // ...but reset everything after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      class="copy-button"
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
      onClick={handleCopy}
      disabled={copied}
    >
      {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
    </button>
  );
};

// loop through each code fence on page (if any)
document.querySelectorAll("div.highlight").forEach((highlightDiv) => {
  // actual code element will have class "language-*" (even if plaintext)
  const codeElement = highlightDiv.querySelector('code[class^="language-"]');

  if (codeElement) {
    // add the button as a sibling to the original Hugo block whose contents we're copying
    render(<CopyButton content={codeElement.textContent} />, highlightDiv);
  }
});
