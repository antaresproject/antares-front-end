
// EXTERNAL DEPS:

// var Vue = require('./../../../js/external/vue_common_v1.0.28');
var Vue = require('vue');
window.Vue = Vue;
var VueRouter = require('vue-router');
window.VueRouter = VueRouter;
var Vuex = require('vuex');
window.Vuex = Vuex;
window.vueFilter = require('vue-filter');
window.Vue.use(window.vueFilter);
window.VueDragula = require('vue-dragula');
window.Vue.use(window.VueDragula);
// Vuex
require('./../../../js/components/antares_store.js');
// Vue Components ALWAYS used:
require('./../../../js/components/main_menu/main_menu.js');


