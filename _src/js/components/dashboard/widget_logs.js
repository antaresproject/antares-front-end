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

/*====================================================
=            Tabbable Gridstack Component            =
====================================================*/

/**

    TODO:
    - ADJUST CARD DISPLAY IN ALL CONDITIONS

 */

// Template for components
(function() {

    // Vue.directive('select2', {
    //   twoWay: true,
    //   priority: 1000,
    //   params: ['filterValue'],
        
    //   bind: function () {
    //     var self = this
    //     $(this.el)
    //       .select2({                
    //             width: 'resolve',
    //             // placeholder: 'Select an option',
    //             theme: "selectAR",
    //             allowClear: true,
    //             minimumResultsForSearch: Infinity,  
    //             theme: "mdl--big"
    //         })
    //       .on('change', function () {
    //         self.set(this.value)
    //         $(this.el).attr('v-bind:value', this.value)
    //       })
    //   },
    //   update: function (value) {
    //     $(this.el).val(value).trigger('change')
    //   },
    //   unbind: function () {
    //     $(this.el).off().select2('destroy')
    //   }
    // });

    /*----------  Vue  ----------*/
    Vue.component('widget-logs', {
        name: 'widget-logs',
        template: '#widget-logs-template',
        data: function() {
            return {
                widgetClassList: 'card card--logs',
                widgetName: 'widget-logs',
                widgetTitle: 'Logs',
                searchPlaceholder: 'Search, if You must!',
                pagination: true,
                searchInput: null,
                select: {
                    prefix: 'Pick:',

                },
                selectOptions: [{
                    name: 'one',
                }, {
                    name: 'two',
                }, {
                    name: 'three',
                }, {
                    name: 'four',
                }],
                timelineEntries: [{
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#0080FF',
                    text: 'Lorem Ipsum, lorem emanu darum, danum menum solum epsis kolum!',
                    group: 'group3',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#0022FF',
                    text: 'Lorem Emanum! Lorem Emanum! Lorem Emanum! ',
                    group: 'group1',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#0ff2FF',
                    text: 'Lorem Emanum423 423 423 423 423 423 423 423 4!',
                    group: 'group2',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#3180F1',
                    text: 'Lorem Emanumsad as das da 32e423423 4 23 423 423 423 423 !',
                    group: 'group1',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#4480CC',
                    text: 'Lorem Emanumsa dasd as dasd as das das das das d!',
                    group: 'group3',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#1A80FF',
                    text: 'Lorem Emanum!',
                    group: 'group1',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#00AAAA',
                    text: 'XXXXXXXXXXXXXXXXXXXXLorem Emanumsad as das da 32e423423 4 23 423 423 423 423 !',
                    group: 'group2',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#0CCAA1',
                    text: 'Lorem Emanumsad as das da 32e423423 4 23 423 423 423 423 !',
                    group: 'group1',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#221124',
                    text: 'Lorem Emanum!',
                    group: 'group3',
                }, {
                    tooltipText: 'One FUCKING Tooltip.',
                    color: '#412114',
                    text: 'Lorem Emanumsad as das da 32e423423 4 23 423 423 423 423, umsad as das da 32e423423 4 23 423 423 423, umsad as das da 32e423423 4 23 423 423 423...',
                    group: 'group3',
                }],
                paginationPages: [{
                    ammount: '5',
                    isActive: true,
                }, {
                    ammount: '10',
                    isActive: false,
                }, {
                    ammount: '20',
                    isActive: false,
                }, {
                    ammount: '30',
                    isActive: false,
                }],
                paginationFilters: [{
                    ammount: '10',
                    isActive: false,
                }, {
                    ammount: '25',
                    isActive: true,
                }, {
                    ammount: '50',
                    isActive: false,
                }, {
                    ammount: '100',
                    isActive: false,
                }],
            };

        },
        mounted: function() {

            self = this;

        },

        methods: {

            nextPage: function() {

                console.log('nextPage');
            },

            prevPage: function() {

                console.log('prevPage');

            },

            paginatePages: function() {

                console.log('ammount');

            },

            paginateFilters: function() {

                console.log('ammount');
            },

        },
    });




    // });
}.call(this));
/*=====  End of Tabbable Gridstack Component  ======*/


// create a root instance
new Vue({
    el: '#vue2Test'
});
