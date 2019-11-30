/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import title from "vuejs-title";

window.Vue = Vue;
Vue.use(title);

var vm = new Vue({
    el: '#app',
    data() {
        return {
            title3: 'Title 3',
            title4: 'Title 4',
        };
    },
});