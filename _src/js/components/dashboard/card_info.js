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
   // Vue Card_info Component 
   //

   (function(window) {

       if (!$('.page-dashboard').length) {
           return false;
       }



       this.cardInfo = new Vue({
           el: 'card-info',
           name: 'Chart Info',

           template: '#card-info-template',
           data: function() {
               return {
                   title: 'System Information',
                   widgetName: 'card-info',
                   headerButtonText: 'View More',
                   currentVersion: '0.7.9',
                   updateAvailable: true,
                   upgradeLink: 'http://google.com',
                   changelogLink: 'http://google.com',
                   datarows: [{
                       left: 'Licence',
                       right: 'Cancelled',
                   },{
                       left: 'Installed Modules',
                       right: '15',
                   },{
                       left: 'Outdated Modules',
                       right: '2',
                   },{
                       left: 'Free Modules Available',
                       right: '51',
                   },{
                       left: 'Licence',
                       right: 'Pending',
                   },{
                       left: 'Licence',
                       right: 'Confirmed',
                   },{
                       left: 'Installed Modules',
                       right: '15',
                   },{
                       left: 'Outdated Modules',
                       right: '2',
                   },{
                       left: 'Free Modules Available',
                       right: '51',
                   },{
                       left: 'Licence',
                       right: 'Pending',
                   },{
                       left: 'Licence',
                       right: 'Confirmed',
                   }]
               }
           },
           mounted: function() {

               // var self = this;

               // dataCalc(this);

               // var domElem = $(self.$el);

               // domElem.find('[data-icheck]').on('ifChanged', function(event) {
               //     self.compareMode = !self.compareMode;
               // });


           },

           methods: {


           }
       });

       

   })(this);
