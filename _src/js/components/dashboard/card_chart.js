/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Antares Front-end
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

   //
   // Vue Charts Component 
   //




   (function(window) {

       if (!$('.page-dashboard').length) {
           return false;
       }


       function dataCalc(data) {

           //calcuations to data 

           function add(a, b) {
               return a + b;
           }

           var value1Array = data.datarows.map(function(a) {
               return a.value1
           });
           var value1Sum = value1Array.reduce(add, 0);
           var value2Array = data.datarows.map(function(a) {
               return a.value2
           });
           var value2Sum = value2Array.reduce(add, 0);

           data.value1 = value1Sum;
           data.value2 = value2Sum;

       }


       this.cardChartBilling = new Vue({
           el: 'card-chart-billing',
           name: 'Chart Billing',
           template: '#card-chart-template',
           data: function() {
               return {
                   title: 'Billing',
                   legendTitle: 'New Billings',
                   value1: 0,
                   value2: 0,
                   type: 'grow',
                   compareMode: false,
                   compareText: 'Compare',
                   chartID: 'chart--one',
                   datarows: [{
                       text: 'Cancelled',
                       value1: 21,
                       value2: 512,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 512,
                       value2: 921,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 11,
                       value2: 82,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 512,
                       value2: 921,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 11,
                       value2: 82,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 512,
                       value2: 921,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 11,
                       value2: 82,
                       type: 'grow',
                   }]

               }
           },
           mounted: function() {

               var self = this;

               dataCalc(this);

               var domElem = $(self.$el);

               domElem.find('[data-icheck]').on('ifChanged', function(event) {
                   self.compareMode = !self.compareMode;
               });


           },

           methods: {


           }
       });

       this.cardChartSubscriptions = new Vue({
           el: 'card-chart-subscriptions',
           name: 'Chart Subscriptions',
           template: '#card-chart-template',
           data: function() {
               return {
                   title: 'Subscriptions',
                   legendTitle: 'New Subsribtions',
                   value1: 0,
                   value2: 0,
                   type: 'decline',
                   compareMode: false,
                   compareText: 'Compare',
                   chartID: 'chart--two',
                   datarows: [{
                       text: 'Cancelled',
                       value1: 412,
                       value2: 552,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 921,
                       value2: 2921,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 111,
                       value2: 822,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 512,
                       value2: 921,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 555,
                       value2: 81,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 512,
                       value2: 921,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 333,
                       value2: 1412,
                       type: 'decline',
                   }]

               }
           },
           mounted: function() {

               var self = this;

               dataCalc(this);
               var domElem = $(self.$el);

               domElem.find('[data-icheck]').on('ifChanged', function(event) {
                   self.compareMode = !self.compareMode;
               });
           },

           methods: {

           }
       });


       this.cardChartOrders = new Vue({
           el: 'card-chart-orders',
           name: 'Chart Orders',
           template: '#card-chart-template',
           data: function() {
               return {
                   title: 'Orders',
                   legendTitle: 'New Orders',
                   value1: 0,
                   value2: 0,
                   type: 'grow',
                   compareMode: false,
                   compareText: 'Compare',
                   chartID: 'chart--three',
                   datarows: [{
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 522,
                       value2: 599,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 212,
                       value2: 521,
                       type: 'decline',
                   }, {
                       text: 'Dismissed',
                       value1: 0,
                       value2: 1,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 522,
                       value2: 599,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 212,
                       value2: 521,
                       type: 'decline',
                   }, {
                       text: 'Dismissed',
                       value1: 0,
                       value2: 1,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 522,
                       value2: 599,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 212,
                       value2: 521,
                       type: 'decline',
                   }, {
                       text: 'Dismissed',
                       value1: 0,
                       value2: 1,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 522,
                       value2: 599,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 212,
                       value2: 521,
                       type: 'decline',
                   }, {
                       text: 'Dismissed',
                       value1: 0,
                       value2: 1,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 522,
                       value2: 599,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 212,
                       value2: 521,
                       type: 'decline',
                   }, {
                       text: 'Dismissed',
                       value1: 0,
                       value2: 1,
                       type: 'decline',
                   }, ]

               }
           },
           mounted: function() {

               var self = this;

               dataCalc(this);

               var domElem = $(self.$el);

               domElem.find('[data-icheck]').on('ifChanged', function(event) {
                   self.compareMode = !self.compareMode;
               });
           },

           methods: {

               toggleMode: function() {

                   console.log('asdasd');

               },
           }
       });


       this.cardChartTickets = new Vue({
           el: 'card-chart-tickets',
           name: 'Chart Tickets',
           template: '#card-chart-template',
           data: function() {
               return {
                   title: 'Tickets',
                   legendTitle: 'New Tickets',
                   value1: 0,
                   value2: 0,
                   type: 'decline',
                   compareMode: false,
                   compareText: 'Compare',
                   chartID: 'chart--four',
                   datarows: [{
                       text: 'Pending',
                       value1: 22,
                       value2: 912,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 152,
                       value2: 512,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 215,
                       value2: 6322,
                       type: 'decline',
                   }, {
                       text: 'Removed',
                       value1: 241,
                       value2: 5132,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 22,
                       value2: 912,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 215,
                       value2: 6322,
                       type: 'decline',
                   }, {
                       text: 'Removed',
                       value1: 241,
                       value2: 5132,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 22,
                       value2: 912,
                       type: 'grow',
                   }, {
                       text: 'Pending',
                       value1: 152,
                       value2: 512,
                       type: 'decline',
                   }, {
                       text: 'Accepted',
                       value1: 215,
                       value2: 6322,
                       type: 'decline',
                   }, {
                       text: 'Removed',
                       value1: 241,
                       value2: 5132,
                       type: 'grow',
                   }, {
                       text: 'Accepted',
                       value1: 12,
                       value2: 5,
                       type: 'grow',
                   }]

               }
           },
           mounted: function() {

               var self = this;

               dataCalc(this);

               var domElem = $(self.$el);

               domElem.find('[data-icheck]').on('ifChanged', function(event) {
                   self.compareMode = !self.compareMode;
               });


           },

           methods: {



           }
       });

   })(this);
