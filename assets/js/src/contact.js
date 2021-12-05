import "vanilla-hcaptcha";
import { h, render } from "preact";
import { useState } from "preact/hooks";
import fetch from "unfetch";

const CONTACT_ENDPOINT = "/api/contact/";

const ContactForm = () => {
  // status/feedback:
  const [status, setStatus] = useState({ success: false, action: "Submit", message: "" });
  // keep track of fetch:
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    // immediately prevent browser from actually navigating to a new page
    e.preventDefault();

    // begin the process
    setSending(true);

    // extract data from form fields
    const { name, email, message } = e.target.elements;
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
      "h-captcha-response": e.target.elements["h-captcha-response"].value,
    };

    // some client-side validation. these are all also checked on the server to be safe but we can save some
    // unnecessary requests here.
    if (!(formData.name && formData.email && formData.message && formData["h-captcha-response"])) {
      setSending(false);
      setStatus({ success: false, action: "Try Again", message: "Please make sure that all fields are filled in." });

      // remove focus from the submit button
      document.activeElement.blur();

      return;
    }

    // if we've gotten here then all data is (or should be) valid and ready to post to API
    fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSending(false);

        if (data.success === true) {
          // handle successful submission
          // disable submissions, hide the send button, and let user know we were successful
          setStatus({ success: true, action: "", message: "Success! You should hear from me soon. :)" });
        } else {
          // pass on any error sent by the server
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : "UNKNOWN_EXCEPTION";

        setSending(false);

        // give user feedback based on the error message returned
        if (message === "USER_INVALID_CAPTCHA") {
          setStatus({
            success: false,
            action: "Try Again",
            message: "Did you complete the CAPTCHA? (If you're human, that is...)",
          });
        } else if (message === "USER_MISSING_DATA") {
          setStatus({
            success: false,
            action: "Try Again",
            message: "Please make sure that all fields are filled in.",
          });
        } else {
          // something else went wrong, and it's probably my fault...
          setStatus({ success: false, action: "Try Again", message: "Internal server error. Try again later?" });
        }

        // remove focus from the submit button
        document.activeElement.blur();
      });
  };

  return (
    <form onSubmit={onSubmit} id="contact-form" action={CONTACT_ENDPOINT} method="POST">
      <input type="text" name="name" placeholder="Name" disabled={status.success} />
      <input type="email" name="email" placeholder="Email" disabled={status.success} />
      <textarea name="message" placeholder="Write something..." disabled={status.success} />

      <span id="contact-form-md-info">
        Basic{" "}
        <a
          href="https://commonmark.org/help/"
          title="Markdown reference sheet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Markdown syntax
        </a>{" "}
        is allowed here, e.g.: <strong>**bold**</strong>, <em>_italics_</em>, [
        <a href="https://jarv.is" target="_blank" rel="noopener noreferrer">
          links
        </a>
        ](https://jarv.is), and <code>`code`</code>.
      </span>

      <h-captcha id="contact-form-captcha" site-key={process.env.HCAPTCHA_SITE_KEY} size="normal" tabindex="0" />

      <div id="contact-form-action-row">
        <button
          id="contact-form-btn-submit"
          title={status.action}
          aria-label={status.action}
          disabled={sending}
          style={{ display: status.success ? "none" : null }}
        >
          {sending ? "Sending..." : status.action}
        </button>

        <span
          class="contact-form-result"
          id={status.success ? "contact-form-result-success" : "contact-form-result-error"}
        >
          {status.message}
        </span>
      </div>
    </form>
  );
};

// don't continue if there isn't a contact form on this page
if (typeof window !== "undefined" && document.querySelector("div#contact-form-wrapper")) {
  render(<ContactForm />, document.querySelector("div#contact-form-wrapper"));
}
