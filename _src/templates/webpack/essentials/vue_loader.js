// EXTERNAL DEPS:
// var Vue = require('./../../../js/external/vue_common_v1.0.28');
// var $ = require('./../../../js/external/jquery');
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import Meta from 'vue-meta'
Vue.use(Meta)

Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.config.debug = true;

import cardChartBilling from './../../../js/components/dashboard/card_billing.vue';
import cardChartSubscriptions from './../../../js/components/dashboard/card_subscriptions.vue';
import cardChartTickets from './../../../js/components/dashboard/card_tickets.vue';
import cardChartOrders from './../../../js/components/dashboard/card_orders.vue';
import cardInfo from './../../../js/components/dashboard/card_info.vue';
import cardNews from './../../../js/components/dashboard/card_news.vue';
import cardLogs from './../../../js/components/dashboard/card_logs.vue';
import {
  cardTruncate
} from './../../../js/components/dashboard/card_truncate';
// import cardEditControls from './../../../js/components/dashboard/card_edit_controls.vue';
// import widgetTabs from './../../../js/components/widget_tabs/widget_tabs.vue'
// import widgetComments from './../../../js/components/widget_comments/widget_comments.vue'
// import {cardTruncate} from './../../../js/components/dashboard/card_truncate';
// Vue.use(cardTruncate);

if ($('.page-dashboard.dashboard--vue').length) {
  const pageDashboard = new Vue({
    name: 'Page Dashboard',
    el: 'vue-page-dashboard',
    template: '#vue-page-dashboard',
    metaInfo: {
      title: 'Vue Dashboard',
      titleTemplate: '%s | Antares Project',
      meta: [{
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }]
    },
    components: {
      'card-chart-billing': cardChartBilling,
      'card-chart-tickets': cardChartTickets,
      'card-chart-orders': cardChartOrders,
      'card-chart-subscriptions': cardChartSubscriptions,
      'card-info': cardInfo,
      'card-news': cardNews,
      'card-logs': cardLogs
    }
  });
}

