// CFG
Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.config.debug = true;

// ToolBelt
import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'

// Components
import cardChartBilling from './../../../js/components/dashboard/card_billing.vue';
import cardChartSubscriptions from './../../../js/components/dashboard/card_subscriptions.vue';
import cardChartTickets from './../../../js/components/dashboard/card_tickets.vue';
import cardChartOrders from './../../../js/components/dashboard/card_orders.vue';
import cardInfo from './../../../js/components/dashboard/card_info.vue';
import cardNews from './../../../js/components/dashboard/card_news.vue';
import cardLogs from './../../../js/components/dashboard/card_logs.vue';
import { cardTruncate } from './../../../js/components/dashboard/card_truncate';
import VueResource from 'vue-resource';

// Enable
Vue.use(Vuex);
Vue.use(Meta);
Vue.use(VueResource);

const AntaresVue = {
  init() {

    var self = this;

    // this.mainMenu();
    // this.menuAside();

    if ($('.page-dashboard.dashboard--vue').length) {
      self.dashboard();
    } else if ($('.page-vue-datatables').length) {
      self.datatables();
    }

  },

  // methods
  dashboard() {

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

  },

  datatables() {
    const pageClientsList = new Vue({
      name: 'Clients List',
      el: 'vue-page-clients-list',
      metaInfo: {
        title: 'Clients List',
        titleTemplate: '%s | Antares Project',
        meta: [{
          charset: 'utf-8'
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }]
      },
      template: '#vue-page-clients-list',
      // components: {
      //     'card-chart-billing': cardChartBilling,
      //     'card-chart-tickets': cardChartTickets,
      //     'card-chart-orders': cardChartOrders,
      //     'card-chart-subscriptions': cardChartSubscriptions,
      //     'card-info': cardInfo,
      // }
    });
  }
};

// Init Antares Vue Component
AntaresVue.init();
