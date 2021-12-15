import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import copy from "copy-to-clipboard";
import trimNewlines from "trim-newlines";

// react components:
import { CopyIcon, CheckIcon } from "@primer/octicons-react";

const CopyButton = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    // stop browser from navigating away from page (this shouldn't happen anyways)
    e.preventDefault();
    // prevent unintentional double-clicks by unfocusing button
    e.target.blur();

    // trim any surrounding whitespace from target block's content and send it to the clipboard
    const didCopy = copy(trimNewlines(props.content));

    // indicate success
    setCopied(didCopy);
  };

  useEffect(() => {
    // reset everything after given ms (defaults to 2 seconds)
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, props.timeout || 2000);

      return () => clearTimeout(id);
    }

    return () => {};
  }, [props.timeout, copied]);

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

export default CopyButton;
