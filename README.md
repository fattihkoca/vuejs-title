# Vue.title

Title plugin for Vue.

## Setup

```
npm install vue-title --save
```

You have two ways to setup `vue-title`:

#### CommonJS (Webpack/Browserify)

- ES6

```js
import ajax from 'vue-title'
Vue.use(ajax)
```

- ES5

```js
var ajax = require('vue-title')
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