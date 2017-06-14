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
import widgetTabs from './../../../js/components/widget_tabs/widget_tabs.vue';
import mainMenuVue from './../../../js/components/main_menu/main_menu.vue';
import VueResource from 'vue-resource';

// Enable
Vue.use(Vuex);
Vue.use(Meta);
Vue.use(VueResource);

const AntaresVue = {
  init() {

    var self = this;

    this.mainMenu();

    if ($('.page-dashboard.dashboard--vue').length) {
      self.dashboard();
    } else if ($('.page-dashboard.page-widget-tabs').length) {
      self.widgetTabs();
    } else if ($('.page-vue-datatables').length) {
      self.datatables();
    }

  },
  
  // methods

  mainMenu() {

    const antaresMenuVue = new Vue({

      name: 'main_Menu_Vue',
      el: '.main-sidebar',
      // template: '#vue-page-dashboard',
      components: {
        'main-menu': mainMenuVue,
      },
      mounted() {

      }

    });

  },


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

  widgetTabs() {

    const widgetTabsParent = new Vue({
      name: 'vue-widget-tabs-page',
      el: '#tabs-container',
      metaInfo: {
        title: 'Wigget Tabs',
        titleTemplate: '%s | Antares Project',
        meta: [{
          charset: 'utf-8'
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }]

      },
      components: {

        'widget-tabs': widgetTabs,

      },
      created: function () {
        // Vue.vueDragula.options('first-bag', {
        //   // copySortSource: false,
        //   // removeOnSpill: false,
        //   // revertOnSpill: true,
        //   moves: function(el, target, source, sibling) {
        //     console.log(el);
        //   },
        //   //   accepts: function(el, target, source, sibling) {
        //   //     console.log(el);
        //   //   }
        // })
        // Vue.vueDragula.eventBus.$on('drop', function(args) {
        //   console.log('drop: ' + $(args[1]))
        //   console.log('drop: ' + $(args[2]))
        // })
      },
      mounted: function () {
        // this.$http.get('https://s3-us-west-2.amazonaws.com/s.cdpn.io/158719/barData.tsv').then(response => {
        //   console.log(response);
        // }, response => {
        //   // error callback
        // });
      },
    })
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