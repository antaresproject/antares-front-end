
// EXTERNAL DEPS:

// var Vue = require('./../../../js/external/vue_common_v1.0.28');

import Vue from "vue"
window.Vue = Vue;

Vue.config.performance = true;
Vue.config.productionTip = false;
Vue.config.devtools = false;

// var VueRouter = require('vue-router');
// window.VueRouter = VueRouter;

var Vuex = require('vuex');
window.Vuex = Vuex;

// window.vueFilter = require('vue-filter');
// window.Vue.use(window.vueFilter);
// window.VueDragula = require('vue-dragula');
// window.Vue.use(window.VueDragula);
// Vuex
require('./../../../js/components/antares_store.js');
// Vue Components ALWAYS used (none)
// require('./../../../js/components/main_menu/main_menu.js');


