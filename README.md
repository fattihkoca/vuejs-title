# Vue.title

Title plugin for `Vue`.

## Setup

```
npm install vue-title-plugin --save
```

You have two ways to setup `vue-title-plugin`:

#### CommonJS (Webpack/Browserify)

- ES6

```js
import ajax from 'vue-title-plugin'
Vue.use(ajax)
```

- ES5

```js
var ajax = require('vue-title-plugin')
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