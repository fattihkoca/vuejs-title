# vuejs-title

[![Travis Build](https://img.shields.io/travis/fattihkoca/vuejs-title.svg)](https://travis-ci.org/fattihkoca/vuejs-title)
[![Version](https://img.shields.io/npm/v/vuejs-title.svg)](https://www.npmjs.com/package/vuejs-title)
[![Downloads](https://img.shields.io/npm/dm/vuejs-title.svg)](https://www.npmjs.com/package/vuejs-title)

![Vuejs Title](https://user-images.githubusercontent.com/1655312/69893534-b930fd00-1323-11ea-94b0-b0b9feeebb5b.png)

# What?
It is a title bubble directive for `Vue.js` that you can easily use in your projects.  
The most important features are stylish, simple, lightweight, convertible.

# Install

```
npm install vuejs-title --save
```

# Usage
```js
// ES6
import ajax from 'vuejs-title'
Vue.use(ajax)

// ES5
var ajax = require('vuejs-title')
Vue.use(ajax)
```

### Example

```html
[1] <div title="Somethings..." v-title></div>

[2] <div v-title="'Somethings...'"></div>

[3] <div v-title="data"></div>

[4] <div :title="data" v-title></div>
```

# Configurations
You can convert as you like with the settings. To do this, we will make a change in the "Usage" section for the "vuejs-title" you added to your project.

### Example Usage
```js
// ES6
import ajax from 'vuejs-title'
Vue.use(ajax, {cssClass: "my-title-bubble"})

// ES5
var ajax = require('vuejs-title')
Vue.use(ajax, {cssClass: "my-title-bubble"})
```

You can change the configurations in the following table according to the figure above:

| Configuration                     | Type             | Default                  | Description                                       |
| ----------------------------------| ---------------- | ------------------------ | ------------------------------------------------- |
| cssClass                          | String           | v-title                  | The css class name of the title bubble.           |
| minPositionGap                    | Integer          | 20                       | Distance of the title balloon from window edges   |
| padding                           | String           | 5px 10px                 | Inner space of the title balloon                  |
| maxWidth                          | String           | 250px                    | Max width of the title balloon                    |
| maxHeight                         | String           | 50px                     | Max height of the title balloon                   |
| round                             | String           | 4px                      | Rolling radius of the corners of the title bubble |
| bgColor                           | String           | rgba(0,0,0,0.7)          | Color background of the title bubble              |
| textColor                         | String           | #FFF                     | Font color of the title bubble                    |
| fontSize                          | String           | 14px                     | Font size of the title bubble                     |
| transitionDuration                | Integer          | 300                      | Transition duration of the title bubble           |
| transitionDelay                   | Integer          | 200                      | Transition delay of the title bubble              |

# License
[MIT](LICENSE)

Copyright (c) 2018 [Fatih Koca](http://fattih.com)