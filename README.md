# visenze-tracking-javascript

[![npm version](https://img.shields.io/npm/v/visenze-tracking-javascript.svg?style=flat)](https://www.npmjs.com/package/visenze-tracking-javascript)

JavaScript SDK for ViSenze Analytics

---

## Table of Contents

- [visenze-tracking-javascript](#visenze-tracking-javascript)
  - [Table of Contents](#table-of-contents)
  - [1. Overview](#1-overview)
  - [2. Setup and initialization](#2-setup-and-initialization)
    - [2.1 Node](#21-node)
    - [2.2 Browser](#22-browser)
    - [2.3 Run the Demo](#23-run-the-demo)

---

## 1. Overview

ViSenze Analytics is a key part of your analytics solutions, allowing you to track key events and view the resulting analytics and performance data. For more details, see [ViSenze Analytics API Documentation](https://ref-docs.visenze.com/docs/tracking).

The ViSenze Tracking JavaScript SDK is an open source software for easy integration of ViSenze Analytics API with your JavaScript application, including web pages. For source code and references, visit the [GitHub repository](https://github.com/visenze/visenze-tracking-javascript).

- Latest stable version: ![npm version](https://img.shields.io/npm/v/visenze-tracking-javascript.svg?style=flat)

## 2. Setup and initialization

### 2.1 Node

For usage with Node.js projects:

```sh
npm install visenze-tracking-javascript
```

```js
// Import module
import ViSenzeAnalytics from 'visenze-tracking-javascript';

// Initialize
const vaClient = ViSenzeAnalytics({ code: 'YOUR_TRACKER_CODE' });
```

Replace `YOUR_TRACKER_CODE` with your ViSenze Analytics tracking code.
It is recommended to initialize the client when the SDK is loaded into the page.

Your credentials can be found in [ViSenze console](https://console.visenze.com).

### 2.2 Browser

Include this in your page header.

```html
<script type="text/javascript" src="https://cdn.visenze.com/visearch/dist/js/tracking.2.0.2.js"></script>
```

Initialize as follows:

```js
// Initialize
var vaClient = ViSenzeAnalytics({ code: 'YOUR_TRACKER_CODE' });
```

Replace `YOUR_TRACKER_CODE` with your ViSenze Analytics tracking code.
It is recommended to initialize the client when the SDK is loaded into the page.

Your credentials can be found in [ViSenze console](https://console.visenze.com).

### 2.3 Run the Demo

This repository comes with an example of the SDK usage. In order to run the examples, a Node.js environment is required.

You will need to fill up your tracking code in the relevant demo files.

To run the demo:

```sh
npm run write-version
npm run start
```

After the above command, the demo pages will be accessible at `http://localhost:8080/index.html`.
