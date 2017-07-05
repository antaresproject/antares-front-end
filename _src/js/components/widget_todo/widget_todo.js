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
 * @package    Global
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/


require('script!select2'); // no css

(function() {

    Vue.directive('select2', {
      twoWay: true,
      priority: 1000,
      params: ['filterValue'],
      bind: function () {
        var self = this
        $(this.el)
          .select2({                
                width: 'resolve',
                // placeholder: 'Select an option',
                theme: "selectAR",
                allowClear: true,
                //disable search below
                minimumResultsForSearch: Infinity,  
                theme: "mdl"
            })
          .on('change', function () {
            self.set(this.value)
            $(this.el).attr('v-bind:value', this.value)
          })
      },
      update: function (value) {
        $(this.el).val(value).trigger('change')
      },
      unbind: function () {
        $(this.el).off().select2('destroy')
      }
    });


    function fetchArray(key) {
        if (sessionStorage.getItem(key)) {
            return JSON.parse(sessionStorage.getItem(key));
        }
        return [];
    }

    function saveArray(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    //custom element
    var arTodoArch = Vue.extend({
        name: 'todo',
        template: '#antares-todo-template',
        data: function() {

            //     return {
            //         todoList: [{
            //             text: 'sample1',
            //             isDone: false,

            //         }, {
            //             text: 'sample2',
            //             isDone: false
            //         }],
            //        }
          
            return {
                
                todoList: fetchArray('todoList'),
                filterValue: null,
                todoText: '',
                isDone: null,
                selected:'',
           }

        },
        ready: function() {
            this.$watch("todoList", function(value) {
                saveArray("todoList", value);
            }, { deep: true });

        },
        methods: {
            add: function() {
                var todoText;
                    todoText = this.todoText;
                    
                    if (todoText) {
                        this.todoList.push({ text: this.todoText, isDone: false });
                        this.todoText = '';
                    }

                // setTimeout(function() {
                //     AntaresForms.elements.checkAndRadio();
                // }, 200);
                // console.log('add');
            },
            deleteTodo: function(index) {

                // var array = $(e.target).siblings('span').text().split(' - ');
                // var $index = array[0];
                // var $data = array[1];
                this.todoList.splice(index, 1);
                componentHandler.upgradeAllRegistered();
                
            },
            deleteAll: function() {

                this.todoList = [];
                // console.log('deleteAll');
            },
            toggleDone: function(todo) {

                // console.log(e);
                // this.todoList.push({text})
                // $(e.target).siblings('span').toggleClass('is-done');
                todo.isDone = !todo.isDone;
                
            }
        }
    })

    Vue.component('antares-todo', arTodoArch)

}.call(this));




// $(window).on('load', function() {
//     // $('#todo-content').show();
//     $('#antares-todo-content').velocity({
//         height: "100%",
//         opacity: 1,
//         width: '100%'
//     }, {
//         duration: 500,
//         easing: "ease-in-out"
//     });

// });
