# vuejs-title

[![Travis Build](https://img.shields.io/travis/fattihkoca/vuejs-title.svg)](https://travis-ci.org/fattihkoca/vuejs-title)
[![Version](https://img.shields.io/npm/v/vuejs-title.svg)](https://www.npmjs.com/package/vuejs-title)
[![Downloads](https://img.shields.io/npm/dm/vuejs-title.svg)](https://www.npmjs.com/package/vuejs-title)

Title buble directive for `VueJS`.

## Setup

```
npm install vuejs-title --save
```

You have two ways to setup `vuejs-title`:

#### CommonJS (Webpack/Browserify)

- ES6

```js
import ajax from 'vuejs-title'
Vue.use(ajax)
```

- ES5

```js
var ajax = require('vuejs-title')
Vue.use(ajax)
```

## Usage
```html
<div title="Somethings..." v-title></div>
```
Another usage:
```html
<div v-title="'Somethings...'"></div>
```

# License
[MIT](LICENSE)

Copyright (c) 2018 [Fatih Koca](http://fattih.com)