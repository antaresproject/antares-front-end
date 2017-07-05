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

/*global enquire oTable*/


const AntaresTableView = {

    init() {

        var self = this;

        self.dataTablesPaginationButtons();
        this.dataTables();
        this.dataTables0Data();

        enquire.register('screen and (min-width:767px)', {
            match: function () {

                self.dataTablesFilterSearch();
                self.dataTablesSelectRows();
                self.dataTablesSelectFilter();
                self.dataTablesColumnToggle();
                self.dataTablesScrollTop();
                self.dataTablesDisableButton();
                self.dataTablesHelpers();

            }

        });

    },

    dataTables() {


        let dataTablesOptions = {
            'iDisplayLength': 10,
            'bFilter': true,
            'bLengthChange': true,
            'bInfo': false,
            // buttons: [ 'colvis' ],
            // buttons: [ 'colvis' ],
            // "ajax": '../ajax/data/arrays.txt',

            'fnRowCallback': function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                //disable autonumering if table has class
                if ($(this).hasClass('no-index')) {
                    return false;
                }

                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html(index);
                return nRow;
            },
            'order': [
                // [1, "desc"]
            ],
            autoWidth: true,
            'dom': '<"dt-area-top"i>rt<"dt-area-bottom pagination pagination--type2" fpL><"clear">',
            // lengthMenu: [
            //     [10, 25, 50, -1],
            //     [10, 25, 50, "All"]
            // ],
            responsive: true,
            //default sorting
            'asSorting': ['asc'],
            'aTargets': [2],
            //select search
            initComplete: function () {

                // indexes

                // let idStart = 0;

                $('.tbl-c tr').each(function (index) {

                    $(this).find('td:first-child').text(index);

                });

                let column = $('[data-table-init="true"]').DataTable().column(3),
                    select = $('.tbl-c [data-selectar--mdl-big="true"]');

                select.on('change', function () {

                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).children('option:selected').val()
                    );

                    column.search(val ? '^' + val + '$' : '', true, false).draw();

                });

                column.data().unique().sort().each(function (d) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });

                // window.AntaresForms.elements.select();

            },
            'oLanguage': {
                // sProcessing: "<img src='http://i.imgur.com/zGCAUHJ.gif'>",
                // type 2 
                'oPaginate': {
                    'sPrevious': '<i class=\'zmdi zmdi-long-arrow-left dt-pag-left\'></i>',
                    'sNext': '<i class=\'zmdi zmdi-long-arrow-right dt-pag-right\'></i>',
                },

                // type 1
                // "oPaginate": {
                //     "sPrevious": "<i class='zmdi zmdi-chevron-left dt-pag-left'></i>",
                //     "sNext": "<i class='zmdi zmdi-chevron-right dt-pag-right'></i>",
                // },
                'lengthMenu': '_MENU_ records per page',
                'sLengthMenu': '_MENU_',
            },
            drawCallback: function () {

                let wrapper = this.parent(),
                    rows = this.fnSettings().fnRecordsTotal(),
                    length = $(wrapper).find('.dataTables_length'),
                    paginate = $(wrapper).find('.dataTables_paginate');


                if (rows <= 10) {

                    length.hide();
                    paginate.hide();

                } else {

                    length.show();
                    paginate.show();

                }

            },
            columnDefs: [{ orderable: false, targets: [0, 8] }, { orderable: true, targets: [3, 4] }],
            // "columns": [
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false },
            //   { orderable: false }
            // ]
        };

        // init datatables
        var oTable = $('[data-table-init="true"]').DataTable(dataTablesOptions);
        window.oTable = oTable;

    },
    // methods
    delay() {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    },

    dataTablesHelpers() {


        $('.tbl-c').each(function () {

            if ($(this).closest('.mdl-tabs').length) {
                return false;
            } else {
                $(this).closest('.grid-stack-item-content').addClass('box-shadow');
            }

        });


    },

    dataTablesDisableButton() {

        // $('.btn--dropdown:disabled').on('click', function(e) {

        //     e.preventDefault();

        // });

    },

    dataTablesSelectRows() {

        if (!$('#table-ma').length) {

            $('.tbl-c').on('click', 'tr', function () {

                $(this).closest('table').find('tr').removeClass('is-selected');
                $(this).addClass('is-selected');

            });

            $('.tbl-c').bind('clickoutside', function () {
                $(this).find('tr').removeClass('is-selected');
            });

        } else {

            // mouse
            $('.tbl-c').selectable({
                delay: 70,
                distance: 70,
                stop: function () {
                    $(this).find('.ui-selected').removeClass('ui-selected').addClass('is-selected');
                }
            });

            // keyboard
            $('.tbl-c tbody tr').multiSelect({
                unselectOn: false,
                keepSelection: true,
                selected: 'is-selected'
            });

            //mass actions
            $('.tbl-c').on('click', function () {

                var self = $(this);

                setTimeout(function () {

                    if (self.find('tr.is-selected').length >= 2) {
                        self.closest('.tbl-c').find('#table-ma').attr('disabled', false);
                    } else {
                        self.closest('.tbl-c').find('#table-ma').prop('disabled', true);
                    }

                }, 50);

            });

            $('.tbl-c').bind('clickoutside', function () {
                $(this).find('tr').removeClass('is-selected');
                $('.tbl-c #table-ma').attr('disabled', true);
            });

        }



    },

    dataTablesPaginationButtons() {
        $.fn.dataTable.ext.classes.sPageButton = 'mdl-js-button mdl-js-ripple-effect';
    },

    dataTablesFilterSearch() {

        var self = this;

        $('.tbl-c').find('.card-ctrls .mdl-textfield__input').keyup(function (e) {
            var val = $(this).val();
            if (e.which === 13) {
                oTable.search(val).draw();
            } else {
                self.delay(function () {
                    oTable.search(val).draw();
                }, 500);
            }
        });

    },

    dataTablesScrollTop() {

        function tableReWind() {

            var parentContainer = $('.app-content'),
                tableContainer = $('.tbl-c');

            if (tableContainer.length > 0) {

                tableContainer.perfectScrollbar('destroy');
                tableContainer.scrollTop(0);
                tableContainer.perfectScrollbar({
                    wheelPropagation: true
                });
            }

            parentContainer.scrollTop(0);
            parentContainer.perfectScrollbar('update');
        }

        $('.dataTable').on('page.dt', function () {
            tableReWind();
        });

        $('.dataTable').on('length.dt', function () {
            tableReWind();
        });

    },

    dataTablesColumnToggle() {

        var columnLi = '<li class="col-is-visible"><a class="mdl-js-button mdl-js-ripple-effect" href="#"><span></span></a></li>';

        function detect() {

            $('.ddown--columns .ddown__menu').find('li').remove();

            $('.billevo-table').find('thead th').each(function () {

                if ($(this).text() !== '') {
                    $('.ddown--columns .ddown__menu').append(columnLi);
                    $('.ddown--columns .ddown__menu li:last-child a span').text($(this).text());
                }

            });

            $('.ddown--columns .ddown__menu li').on('click', function () {

                //toggle class
                $(this).toggleClass('col-is-visible');
                $(this).toggleClass('col-is-hidden');

                // order / index
                var order = $(this).index();
                if (oTable.column(order).visible() === true) {
                    oTable.column(order).visible(false);
                } else {
                    oTable.column(order).visible(true);
                }

            });

        }

        detect();
    },

    dataTablesSelectFilter() {

        // $('.dataTables_wrapper').closest('.tbl-c').find('.card-filter__sgl').on('click', 'i', function () {
        //     $(this).closest('.card-filter__sgl').hide();
        // });

    },

    dataTables0Data() {

        var bTable = $('.billevo-table');
        var cell = $('.billevo-table td');
        var zeroElement = $('.billevo-table .dataTables_empty');

        if (cell.length === 1 && zeroElement.length) {
            bTable.closest('.tbl-c').addClass('tbl-c--zd');
        }
    },


};

// THESE 2 HAVE TO BE OUTSIDE:
//function

// external keyboard select plugin
$.fn.multiSelect = function (o) {


    var defaults = {
        multiselect: true,
        selected: 'is-selected',
        filter: ' > *',
        unselectOn: false,
        keepSelection: true,
        list: $(this).selector,
        e: null,
        element: null,
        start: false,
        stop: false,
        unselecting: false
    };

    return this.each(function () {
        var options = $.extend({}, defaults, o || {});
        // selector - parent, assign listener to children only
        $(document).on('mousedown', options.list + options.filter, function (e) {
            if (e.which == 1) {
                if (options.handle != undefined && !$(e.target).is(options.handle)) {
                    // TODO:
                    // keep propagation?
                    // return true;
                }
                options.e = e;
                options.element = $(this);
                multiSelect(options);
            }
            return true;
        });

        if (options.unselectOn) {
            // event to unselect

            $(document).on('mousedown', options.unselectOn, function (e) {
                if (!$(e.target).parents().is(options.list) && e.which != 3) {
                    $(options.list + ' .' + options.selected).removeClass(options.selected);
                    if (options.unselecting != false) {
                        options.unselecting();
                    }
                }
            });

        }

    });

};

require('./external/outside_events.js');

require('./components/datatables/dt_pagination_length.js');

function multiSelect(o) {

    var element = o.element;
    var list = o.list;

    if ($(element).hasClass('ui-sortable-helper')) {
        return false;
    }

    if (o.start != false) {
        var start = o.start(o.e, $(element));
        if (start == false) {
            return false;
        }
    }

    if (o.e.shiftKey && o.multiselect) {

        var first = 0, last = 0, firstHolder;

        // get one already selected row
        $(element).addClass(o.selected);

        first = $(o.list).find('.' + o.selected).first().index();
        last = $(o.list).find('.' + o.selected).last().index();

        // if we hold shift and try to select last element that is upper in the list
        if (last < first) {
            firstHolder = first;
            first = last;
            last = firstHolder;
        }

        if (first == -1 || last == -1) {
            return false;
        }

        $(o.list).find('.' + o.selected).removeClass(o.selected);

        var num = last - first;
        var x = first;

        for (var i = 0; i <= num; i++) {
            $(list).find(o.filter).eq(x).addClass(o.selected);
            x++;
        }
    } else if ((o.e.ctrlKey || o.e.metaKey) && o.multiselect) {
        // reset selection
        if ($(element).hasClass(o.selected)) {


            $(element).removeClass('ui-selected');
            setTimeout(function () {
                $(element).removeClass(o.selected);
            }, 100);
        } else {
            $(element).addClass(o.selected);
        }
    } else {
        // reset selection
        if (o.keepSelection && !$(element).hasClass(o.selected)) {
            $(list).find('.' + o.selected).removeClass(o.selected);
            $(element).addClass(o.selected);
        } else {
            $(list).find('.' + o.selected).removeClass(o.selected);
            $(element).addClass(o.selected);
        }

    }

    if (o.stop != false) {
        o.stop($(list).find('.' + o.selected), $(element));
    }

}

// window.multiSelect = multiSelect();

$(function () {
    window.AntaresTableView = AntaresTableView;
    AntaresTableView.init();
});
