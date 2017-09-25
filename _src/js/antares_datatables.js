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
 * @package    Files
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */

const AntaresTableView = {
    init() {
        const self = this;

        this.dataTables();
        this.dataTables0Data();
        this.dataTablesOpenRow();
        this.dataTablesGridStackClass();
        enquire.register('screen and (min-width:767px)', {
            match() {
                self.dataTablesFilterSearch();
                self.dataTablesSelectRows();
                self.dataTablesSelectFilter();
                self.dataTablesColumnToggle();
                // self.dataTablesReWind();
                self.dataTablesMultiSelect();
                self.dataTablesDisableButton();
                self.dataTablesHelpers();
                self.dataTablesScrollTopAfterLength();
                self.dataTablesUpdateTable();
            }
        });
        self.dataTablesPaginationButtons();
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
        $('.tbl-c').each(function (index, el) {
            if ($(this).closest('.mdl-tabs').length) {
                return false;
            } else {
                $(this)
                    .closest('.grid-stack-item-content')
                    .addClass('box-shadow');
            }
        });
    },
    dataTablesDisableButton() {
        // $('.btn--dropdown:disabled').on('click', function(e) {
        //     e.preventDefault();
        // });
    },
    dataTablesScrollTopAfterLength() {
        $('.dataTables_length, .pagination-current ul').click(() => {
            $('.dataTables_wrapper.ps, .dataTablesLogs.ps')
                .scrollTop(0)
                .perfectScrollbar('update');
        });
    },
    dataTablesMultiSelect() {
    },
    dataTablesSelectRows() {
        /*
         * jQuery outside events - v1.1 - 3/16/2010
         * http://benalman.com/projects/jquery-outside-events-plugin/
         *
         * Copyright (c) 2010 "Cowboy" Ben Alman
         * Dual licensed under the MIT and GPL licenses.
         * http://benalman.com/about/license/
         */
        (function ($, c, b) {
            $.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '), function (d) {
                a(d);
            });
            a('focusin', 'focus' + b);
            a('focusout', 'blur' + b);
            $.addOutsideEvent = a;

            function a(g, e) {
                e = e || g + b;
                var d = $(),
                    h = g + '.' + e + '-special-event';
                $.event.special[e] = {
                    setup: function () {
                        d = d.add(this);
                        if (d.length === 1) {
                            $(c).bind(h, f);
                        }
                    },
                    teardown: function () {
                        d = d.not(this);
                        if (d.length === 0) {
                            $(c).unbind(h);
                        }
                    },
                    add: function (i) {
                        var j = i.handler;
                        i.handler = function (l, k) {
                            l.target = k;
                            j.apply(this, arguments);
                        };
                    }
                };

                function f(i) {
                    $(d).each(function () {
                        var j = $(this);
                        if (this !== i.target && !j.has(i.target).length) {
                            j.triggerHandler(e, [i.target]);
                        }
                    });
                }
            }
        })(jQuery, document, 'outside');

        function multiselectWithMouse() {
            //   $('.tbl-c').on('click', 'tr', function() {
            //     $(this).closest('table').find('tr').removeClass('is-selected');
            //     $(this).addClass('is-selected');
            //   });

            $('.tbl-c').bind('clickoutside', function (event) {
                $(this)
                    .find('tr')
                    .removeClass('is-selected');
            });

            enquire.register('screen and (min-width:1024px)', {
                //  for tablet selectable because we need contextMenu priorytet
                match() {
                    if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
                        // console.log('touch devices')
                    } else {
                        $('.tbl-c table').selectable({
                            delay: 100,
                            distance: 100,
                            start() {
                                $(this)
                                    .find('.is-selected')
                                    .removeClass('is-selected');
                            },
                            stop(event, ui) {
                                $(this)
                                    .find('.ui-selected')
                                    .removeClass('ui-selected')
                                    .addClass('is-selected');
                            }
                        });
                    }
                },
                unmatch: function () {
                    $('.tbl-c table').selectable('destroy');
                }
            });
            enquire.register('screen and (max-width:1023px)', {
                //  for tablet selectable because we need contextMenu priorytet
                // tmp off
                match: function () {
                    // $('.tbl-c').selectable('destroy');
                }
            });

            $(document).mouseup(e => {
                window.requestAnimationFrame(() => {
                    var container = $('.tbl-c');
                    var self = container;
                    if (container.has(e.target).length === 0) {
                        self.closest('.tbl-c').find('#table-ma').attr('disabled', 'disabled');
                        self.closest('.tbl-c').find('#table-ma span').html('With Selected');
                        self.closest('.tbl-c').removeClass('selected-mode--active');
                        self.closest('.tbl-c').find('table tbody tr td').removeClass('no-arrow');
                        self.closest('.tbl-c').find('.btn-with-selected').removeClass('display-flex');
                    } else {
                        if (self.find('tr.is-selected').length >= 1) {
                            self.closest('.tbl-c').find('#table-ma').attr('disabled', false);
                            self.closest('.tbl-c').find('#table-ma span').html(self.find('tr.is-selected').length + ' items Selected');
                            self.closest('.tbl-c').addClass('selected-mode--active');
                            self.closest('.tbl-c').find('table tbody tr td').addClass('no-arrow');
                            self.closest('.tbl-c').find('.btn-with-selected').addClass('display-flex');
                        } else {
                            self.closest('.tbl-c').removeClass('selected-mode--active');
                            self.closest('.tbl-c').find('#table-ma').attr('disabled', 'disabled');
                            self.closest('.tbl-c').find('table tbody tr td').removeClass('no-arrow');
                            self.closest('.tbl-c').find('.btn-with-selected').removeClass('display-flex');
                        }
                    }
                });

            });
            $('.tbl-c').bind('clickoutside', function (event) {
                $(this).find('tr').removeClass('is-selected');
                $('.tbl-c #table-ma').attr('disabled', true);
            });

            $('#table-ma .is-disabled').on('click', function (e) {
                e.preventDefault();
            });
        }

        multiselectWithMouse();
    },
    dataTablesPaginationButtons() {
        $.fn.dataTable.ext.classes.sPageButton = 'mdl-js-button mdl-js-ripple-effect';

        $('.dataTable').on('length.dt', function (e, settings, len) {
            window.requestAnimationFrame(() => {
                $('.tbl-c .card-ctrls').adjustCardHeight();
            });
        });

        $('.dataTable').on('page.dt', function (e, settings, len) {
            window.requestAnimationFrame(() => {
                $('.tbl-c .card-ctrls').adjustCardHeight();
            });
        });
    },
    dataTablesFilterSearch() {
        var self = this;

        $('.dataTables_wrapper')
            .closest('.tbl-c')
            .find('.card-ctrls .mdl-textfield__input')
            .keyup(function (e) {
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
    // dataTablesReWind() {
    //   function tableReWind() {
    //     var parentContainer = $('.app-content'),
    //       tableContainer = $('.tbl-c');
    //
    //     if (tableContainer.length > 0) {
    //       tableContainer.perfectScrollbar('destroy');
    //       tableContainer.scrollTop(0);
    //       tableContainer.perfectScrollbar({
    //         wheelPropagation: true
    //       });
    //     }
    //
    //     parentContainer.scrollTop(0);
    //     parentContainer.perfectScrollbar('update');
    //   }
    //
    //   $('.dataTable').on('page.dt', function() {
    //     tableReWind();
    //   });
    //
    //   $('.dataTable').on('length.dt', function() {
    //     tableReWind();
    //   });
    // },
    dataTablesColumnToggle() {
        var columnLi = '<li class="col-is-visible"><a class="mdl-js-button mdl-js-ripple-effect" href="#"><span></span></a></li>';

        function detect() {
            $('.ddown--columns .ddown__menu')
                .find('li')
                .remove();

            $('.billevo-table')
                .find('thead th')
                .each(function (index, el) {
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
        $('.dataTables_wrapper')
            .closest('.tbl-c')
            .find('.card-filter__sgl')
            .on('click', 'i', function (e) {
                $(this)
                    .closest('.card-filter__sgl')
                    .hide();
            });
    },
    dataTables0Data() {
        var bTable = $('.billevo-table');
        var cell = $('.billevo-table td');
        var zeroElement = $('.billevo-table .dataTables_empty');

        if (cell.length === 1 && zeroElement.length) {
            bTable.closest('.tbl-c').addClass('tbl-c--zd');
        }

        var zdContent =
            '<div class="zd zd--lg"><div class="zd__header"><i class="zmdi zmdi-email"></i></div><div class="zd__content"><div class="zd__title">You dont have any tickets</div><div class="zd__description">Lorem ipsum dolor sit amet. <br> Dolor sit amet.</div></div><div class="zd__footer"><a class="btn btn--primary btn--zd mdl-js-button mdl-js-ripple-effect">OPEN NEWTICKET</a></div></div>';

        zeroElement.html(zdContent);
    },
    dataTables() {
        let self = this;

        let dataTablesOptionsNoSelect = {
            iDisplayLength: 10,
            bFilter: true,
            bLengthChange: true,
            bInfo: false,
            // buttons: [ 'colvis' ],
            // buttons: [ 'colvis' ],
            // "ajax": '../ajax/data/arrays.txt',

            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //disable autonumering if table has class
                if ($(this).hasClass('no-index')) {
                    return false;
                }

                var index = iDisplayIndexFull + 1;
                $('td:eq(0)', nRow).html(index);
                return nRow;
            },
            order: [
                // [1, "desc"]
            ],
            //   select: {
            //     style: 'os',
            //     className: 'is-selected',
            //     info: true
            //   },
            autoWidth: true,
            dom: '<"dt-area-top"i>rt<"dt-area-bottom pagination pagination--type2" fpL><"clear">',
            // lengthMenu: [
            //     [10, 25, 50, -1],
            //     [10, 25, 50, "All"]
            // ],
            responsive: {
                breakpoints: [
                    {name: 'desktop', width: Infinity},
                    {name: 'laptop', width: 1499}, // powyżej tego rozmiaru pokazuje się columna
                    {name: 'tabletH', width: 1200},
                    {name: 'tabletV', width: 1024},
                    {name: 'mobile', width: 768}
                ]
            },
            //default sorting
            asSorting: ['asc'],
            aTargets: [2],
            //select search
            initComplete: function () {
                let column = $('[data-table-init="true"]')
                        .DataTable()
                        .column(3),
                    select = $('.tbl-c .card-ctrls select.select--category');

                select.on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this)
                            .children('option:selected')
                            .val()
                    );

                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });

                column
                    .data()
                    .unique()
                    .sort()
                    .each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>');
                    });

                $('.tbl-c').append($('.tbl-c .pagination'));
                // window.AntaresForms.elements.select();

                setTimeout(() => {
                    const dtLoadedEvent = new CustomEvent('antares-datatables-loaded', {detail: 'datatables are ready'});
                    document.dispatchEvent(dtLoadedEvent);
                }, 400);

                $('.tbl-c tbody').adjustCardHeight();
            },
            oLanguage: {
                // sProcessing: "<img src='http://i.imgur.com/zGCAUHJ.gif'>",
                // type 2
                oPaginate: {
                    sPrevious: "<i class='zmdi zmdi-long-arrow-left dt-pag-left'></i>",
                    sNext: "<i class='zmdi zmdi-long-arrow-right dt-pag-right'></i>"
                },

                // type 1
                // "oPaginate": {
                //     "sPrevious": "<i class='zmdi zmdi-chevron-left dt-pag-left'></i>",
                //     "sNext": "<i class='zmdi zmdi-chevron-right dt-pag-right'></i>",
                // },
                lengthMenu: '_MENU_ records per page',
                sLengthMenu: '_MENU_'
            },
            drawCallback() {
                let oSettings = this.fnSettings ? this.fnSettings() : this;

                if (oSettings.aoData == null) {
                    return false;
                }

                let rows = oSettings.aoData.length - 1;
                let displayedRows = $('.tbl-c').find('tbody tr').length;

                let wrapper = $('.tbl-c');
                let paginate = wrapper.find('.pagination');
                let length = wrapper.find('.dataTables_length');

                if (rows <= 10) {
                    length.hide();
                    paginate.hide();
                    $('.card-datatables .card').removeClass('card--pagination');
                } else {
                    length.show();
                    paginate.show();
                    $('.card-datatables .card').addClass('card--pagination');
                }

                if (displayedRows === 1) {
                    window.requestAnimationFrame(() => {
                        $('.tbl-c tbody').adjustCardHeight();
                    });
                }
                $('.app-content').scrollTop('0');
            }

        };

        if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
        }
        else {
            let dataTablesOptionsWithSelect = Object.assign(dataTablesOptionsNoSelect, {
                select: {
                    style: 'os',
                    className: 'is-selected',
                    info: true,
                    selector: 'td:not(:first-child)'
                }
            });
        }


        // init datatables
        // if (!$('html').hasClass('is-mobile') && !$('html').hasClass('is-tablet')) {
        //   var oTable = $('[data-table-init="true"]').DataTable(dataTablesOptionsWithSelect);
        //   window.oTable = oTable;
        //   dataTablesOptionsWithSelect.drawCallback();
        // } else {
        //   var oTable = $('[data-table-init="true"]').DataTable(dataTablesOptionsNoSelect);
        //   window.oTable = oTable;
        //   dataTablesOptionsNoSelect.drawCallback();
        // }

        var oTable = $('[data-table-init="true"]').DataTable(dataTablesOptionsNoSelect);
        window.oTable = oTable;
        dataTablesOptionsNoSelect.drawCallback();
    },
    dataTablesUpdateTable() {
        enquire.register('screen and (max-width: 767px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 768px) and (max-width: 1023px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 1024px) and (max-width: 1199px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 1200px) and (max-width: 1349px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 1350px) and (max-width: 1499px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 1500px) and (max-width: 1649px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
        enquire.register('screen and (min-width: 1650px)', {
            match: function () {
                oTable.responsive.recalc();
            },
            unmatch: function () {
                oTable.responsive.recalc();
            }
        });
    },
    dataTablesOpenRow() {
        oTable.on('responsive-display', function (e, datatable, row, showHide, update) {
            window.requestAnimationFrame(() => {
                if ($('.dataTables_wrapper tbody tr.is-selected').length >= 1) {
                    $(row.selector.rows[0]).removeClass('parent');
                    $(row.selector.rows[0])
                        .next()
                        .remove('.child');
                } else {
                    $(row.selector.rows[0]).removeClass('is-selected');
                    $('.dataTables_wrapper').adjustCardHeight();
                    console.log('work')
                }
            });
        });
    },

    dataTablesGridStackClass() {
        enquire.register('screen and (min-width:1350px)', {
            match: function () {
                let container = $('.card-datatables');
                let parent = container.closest('.grid-stack-item');

                function checkSizeGridTable() {
                    if (parent.attr('data-gs-width') === '24') {
                        container.addClass('size-gridstack--max');
                    } else {
                        container.removeClass('size-gridstack--max');
                    }
                }

                checkSizeGridTable();
                $('#widgets-edit').click(function () {
                    checkSizeGridTable();
                });
                $('.card-bar__close').click(function () {
                    checkSizeGridTable();
                });
            },
            unmatch: function () {
                $('.card-datatables').removeClass('size-gridstack--max');
            }
        });
    }
};

require('./components/datatables/dt_pagination_length.js');

$(function () {
    window.AntaresTableView = AntaresTableView;
    AntaresTableView.init();
});
