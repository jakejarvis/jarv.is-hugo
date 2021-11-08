---
title: "🕵️ Privacy Policy"
url: /privacy
layout: etc
sitemap:
  changefreq: never
  priority: 0.0
---

Okay, this is an easy one. 😉

## Analytics {#analytics}

A simple hit counter on each page tallies an aggregate number of pageviews (i.e. `hits = hits + 1`). Individual views and identifying (or non-identifying) details are **never stored or logged**.

The [serverless function](https://github.com/jakejarvis/jarv.is/blob/main/api/hits.js) and [client script](https://github.com/jakejarvis/jarv.is/blob/main/assets/js/src/hits.js) are open source, and [snapshots of the database](https://github.com/jakejarvis/website-stats) are public.

{{< image src="images/fauna_hits.png" alt="The entire database schema." link="/privacy/images/fauna_hits.png" />}}

## Hosting {#hosting}

Pages and first-party assets on this website are served by [**▲ Vercel**](https://vercel.com/). Refer to their [privacy policy](https://vercel.com/legal/privacy-policy) for more information.

For a likely excessive level of privacy and security, this website is also mirrored on the [🧅 Tor network](https://www.torproject.org/) at:

> [**jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion**](http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion)

## Third-Party Content {#third-party}

Occasionally, embedded content from third-party services is included in posts, and some may contain tracking code that is outside of my control. Please refer to their privacy policies for more information:

- [CodePen](https://blog.codepen.io/documentation/privacy/)
- [Facebook](https://www.facebook.com/policy.php)
- [GitHub](https://docs.github.com/en/github/site-policy/github-privacy-statement)
- [SoundCloud](https://soundcloud.com/pages/privacy)
- [Twitter](https://twitter.com/en/privacy)
- [Vimeo](https://vimeo.com/privacy)
- [YouTube](https://policies.google.com/privacy)

The code that requests this content [is open source](https://github.com/jakejarvis/jarv.is/tree/main/layouts/shortcodes).

## Fighting Spam {#hcaptcha}

Using [**hCaptcha**](https://www.hcaptcha.com/) to fight bot spam on the [contact form](/contact/) was an easy choice over seemingly unavoidable alternatives like [reCAPTCHA](https://developers.google.com/recaptcha/).

You can refer to hCaptcha's [privacy policy](https://www.hcaptcha.com/privacy) and [terms of service](https://www.hcaptcha.com/terms) for more details. While some information is sent to the hCaptcha API about your behavior **(on the contact page only)**, at least you won't be helping a certain internet conglomerate [train their self-driving cars](https://blog.cloudflare.com/moving-from-recaptcha-to-hcaptcha/). 🚗

I also enabled the setting to donate 100% of my [HMT token](https://humanprotocol.org/?lng=en-US) earnings to the [Wikimedia Foundation](https://wikimediafoundation.org/), for what it's worth. (A few cents, probably... 💰)
