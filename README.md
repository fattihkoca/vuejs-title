# Vue.title

Title plugin for `Vue`.

## Setup

```
npm install vuejs-title --save
```

You have two ways to setup `vuejs-plugin`:

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