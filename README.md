# 🏡&nbsp;&nbsp;[jarv.is](https://jarv.is/)

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/jakejarvis/jarv.is/CI/main?label=build&logo=github&logoColor=white)](https://github.com/jakejarvis/jarv.is/actions?query=workflow%3ACI+branch%3Amain)
[![Vercel deployment](https://img.shields.io/github/deployments/jakejarvis/jarv.is/production?label=vercel&logo=vercel&logoColor=white)](https://vercel.com/deployments/jarv.is)
[![Hugo version](https://img.shields.io/github/package-json/dependency-version/jakejarvis/jarv.is/dev/hugo-extended/main?color=ff4088&label=hugo&logo=hugo&logoColor=white)](https://github.com/gohugoio/hugo)
[![Licensed under CC-BY-4.0](https://img.shields.io/badge/license-CC--BY--4.0-fb7828?logo=creative-commons&logoColor=white)](https://creativecommons.org/licenses/by/4.0/)
[![GitHub repo size](https://img.shields.io/github/repo-size/jakejarvis/jarv.is?color=009cdf&label=repo%20size&logo=git&logoColor=white)](https://github.com/jakejarvis/jarv.is)
[![Tor mirror uptime](https://img.shields.io/uptimerobot/ratio/m788172098-a4fcb769c8779f9a37a60775?color=7e4798&label=tor%20mirror&logo=tor-project&logoColor=white)](http://jarvis2i2vp4j4tbxjogsnqdemnte5xhzyi7hziiyzxwge3hzmh57zad.onion/)

Personal website of [@jakejarvis](https://github.com/jakejarvis), created and deployed using [Hugo](https://gohugo.io/), [Vercel](https://vercel.com/), [and more](https://jarv.is/humans.txt).

I keep an ongoing list of [post ideas](https://github.com/jakejarvis/jarv.is/issues/1) and [coding to-dos](https://github.com/jakejarvis/jarv.is/issues/11) as issues in this repo. Outside contributions, improvements, and/or corrections are welcome too!

## 💾&nbsp;&nbsp;Starting a local development server

### 🧶&nbsp;&nbsp;Using Yarn:

Run `yarn install` and `yarn start`, then open [http://localhost:1337/](http://localhost:1337/). ([Yarn must be installed](https://yarnpkg.com/en/docs/install) first; NPM _should_ also work at your own risk.) Hugo, [Webpack](https://webpack.js.org/), and [Gulp](https://gulpjs.com/) will automatically work together to build the site, and pages will live-refresh via [Browsersync](https://browsersync.io/) when source files are changed.

### ▲&nbsp;&nbsp;Using [`vercel dev`](https://vercel.com/docs/cli#commands/dev):

The [Vercel CLI](https://vercel.com/docs/cli) is not included as a project dependency here, but [installing it globally](https://vercel.com/cli) (`npm i -g vercel`) and running `vercel dev` in this repository will build and serve the static site automatically via Yarn **as well as the [serverless functions](/api)** used in production. Pretty nifty! (Note: the CLI will usually start the server at [http://localhost:3000/](http://localhost:3000/) instead of port 1337.)

### 🤯&nbsp;&nbsp;Why does this look _way_ more complex than it needs to be?!

[Because it is.](https://www.jvt.me/talks/overengineering-your-personal-website/)

## 📜&nbsp;&nbsp;Licenses

![Creative Commons Attribution 4.0 International License](https://raw.githubusercontent.com/creativecommons/cc-cert-core/master/images/cc-by-88x31.png "CC BY")

Site content (everything in [`content/notes`](content/notes/)) is published under the [**Creative Commons Attribution 4.0 International License**](LICENSE) (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All original code in this repository is published under the [**MIT License**](https://opensource.org/licenses/MIT). [See licenses for third-party libraries here.](https://jarv.is/assets/third_party.txt)
