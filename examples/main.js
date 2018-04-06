/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue'
import title from "vue-title";

window.Vue = Vue;
Vue.use(title);

var vm = new Vue({
    el: '#app',
    components: {
        vueTitleExample: require('vueTitleExample.vue').default
    }
});