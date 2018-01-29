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

require('./external/outside_click.js');

const AntaresTableView = {
    init() {
        const self = this;

        this.dataTables();
        this.dataTables0Data();
        this.dataTablesOpenRow();
        this.dataTablesGridStackClass();
        this.dataTablesSelectRows();
        this.dataTablesDblClick();

        enquire.register(bpMin768, {
            match() {
                self.dataTablesFilterSearch();
                self.dataTablesSelectFilter();
                self.dataTablesColumnToggle();
                // self.dataTablesReWind();
                self.dataTablesMultiSelect();
                self.dataTablesDisableButton();
                self.dataTablesHelpers();
                self.dataTablesScrollTopAfterLength();
                self.dataTablesUpdateTable();
                self.updateHeightTableForScroll()
            }
        });
        self.dataTablesPaginationButtons();
        self.dataTablesHeightForScroll();
        antaresEvents.emit('performance.datatables_loaded');



    },

    // methods
    delay() {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    },
    dataTablesDblClick() {
        $('table td').on('dblclick', e => {
            let firstCMLinkHref = $(e.target)
                .closest('tr')
                .find('.cm-actions')
                .find('a:first')
                .attr('href');

            window.location = firstCMLinkHref;
        });
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
            // .scrollTop(0)
                .perfectScrollbar('update');
        });
    },
    dataTablesMultiSelect() {
    },
    dataTablesSelectRows() {
        function multiselectWithMouse() {
            if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
                // console.log('touch devices')
            } else {
                $('.tbl-c table').selectable({
                    delay: 10,
                    distance: 10,
                    start(event, ui) {
                        if (event.ctrlKey || event.shiftKey) {
                        } else {
                            $(this)
                                .find('.is-selected')
                                .removeClass('is-selected');
                        }
                    },
                    stop(event, ui) {
                        $(this)
                            .find('.ui-selected.odd,.ui-selected.even')
                            .removeClass('ui-selected')
                            .addClass('is-selected--ST');
                        oTable.rows('.is-selected--ST').select();
                        if (event.ctrlKey || event.shiftKey) {
                        } else {
                            $(this)
                                .find('.ui-selected')
                                .removeClass('ui-selected');
                        }
                        $(this)
                            .find('tr')
                            .removeClass('is-selected--ST');
                    }
                });
            }
            let containerTbody = $('.dataTables_wrapper tbody');
            let parentTblc = containerTbody.closest('.tbl-c');

            containerTbody.mouseup(e => {
                window.requestAnimationFrame(() => {
                    if (parentTblc.find('tr.is-selected').length >= 1) {
                        parentTblc.find('#table-ma').attr('disabled', false);
                        parentTblc.addClass('selected-mode--active');

                        parentTblc.find('table tbody tr td').addClass('no-arrow');
                        parentTblc.find('.btn-with-selected').addClass('display-flex');

                        parentTblc.find('#table-ma span').html(parentTblc.find('tr.is-selected').length + ' items Selected');
                    } else {
                        parentTblc.removeClass('selected-mode--active');
                        parentTblc.removeClass('selected-mode--touch-active');
                        parentTblc.find('#table-ma').attr('disabled', 'disabled');
                        parentTblc.find('table tbody tr td').removeClass('no-arrow');
                        parentTblc.find('.btn-with-selected').removeClass('display-flex');
                        parentTblc.find('#table-ma span').html('0 items Selected');
                        oTable.rows('.is-selected').deselect();
                    }
                });
            });
            containerTbody.bind('clickoutside', function (event) {
                parentTblc.find('tr').removeClass('is-selected');
                parentTblc.find('#table-ma').attr('disabled', true);
                parentTblc.find('#table-ma span').html('0 Items Selected');
                parentTblc.removeClass('selected-mode--active');
                parentTblc.removeClass('selected-mode--touch-active');
                parentTblc.find('table tbody tr td').removeClass('no-arrow');
                parentTblc.find('.btn-with-selected').removeClass('display-flex');
                oTable.rows('.is-selected').deselect();
            });
            parentTblc.find('#tableSearch').keydown(function () {
                if (parentTblc.hasClass('selected-mode--active')) {
                    parentTblc.find('tr').removeClass('is-selected');
                    parentTblc.find('#table-ma').attr('disabled', true);
                    parentTblc.find('#table-ma span').html('0 Items Selected');
                    parentTblc.removeClass('selected-mode--active');
                    parentTblc.removeClass('selected-mode--touch-active');
                    parentTblc.find('table tbody tr td').removeClass('no-arrow');
                    parentTblc.find('.btn-with-selected').removeClass('display-flex');
                    oTable.rows('.is-selected').deselect();
                }
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

                oTable.search(val).draw();
                $('.dataTables_wrapper')
                    .closest('.tbl-c')
                    .find('.card-ctrls')
                    .adjustCardHeight();
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

            $('.antares-table')
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
        ready('.dataTables_empty', function () {
            if ($('td').hasClass('dataTables_empty')) {
                var bTable = $('.antares-table');
                var cell = $('.antares-table td');
                var zeroElement = $('.antares-table .dataTables_empty');

                if (cell.length === 1 && zeroElement.length) {
                    bTable.closest('.tbl-c').addClass('tbl-c--zd tbl-c--zd-empty');
                }

                var zdContent = '<div class="zd zd--lg"><div class="zd__header"><i class="zmdi zmdi-email"></i></div><div class="zd__content"><div class="zd__title">You dont have any tickets</div><div class="zd__description">DataTables is empty.<br> Dolor sit amet.</div></div><div class="zd__footer"><a class="btn btn--primary btn--zd mdl-js-button mdl-js-ripple-effect">OPEN NEWTICKET</a></div></div>';

                zeroElement.html(zdContent);
                bTable.adjustCardHeight();

                // var zdContent =
                //     '<thead></thead> <tbody><tr><td><div class="zd zd--lg"><div class="zd__header"><i class="zmdi zmdi-email"></i></div><div class="zd__content"><div class="zd__title">You dont have any tickets</div><div class="zd__description">DataTables is empty.<br> Dolor sit amet.</div></div><div class="zd__footer"><a class="btn btn--primary btn--zd mdl-js-button mdl-js-ripple-effect">OPEN NEWTICKET</a></div></div></td></tr></tbody><tfoot></tfoot>';
                //
                // bTable.html(zdContent);
            }
        });
    },
    dataTables() {
        let self = this;

        let dataTablesOptionsNoSelect = {
            iDisplayLength: 10,
            bFilter: true,
            bLengthChange: true,
            bInfo: false,
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
            autoWidth: true,
            dom: '<"dt-area-top"i>rt<"dt-area-bottom pagination pagination--type2" fpL><"clear">',
            responsive: {
                breakpoints: [
                    {name: 'desktop', width: Infinity},
                    {name: 'laptop', width: 1499}, // powyżej tego rozmiaru pokazuje się columna
                    {name: 'tabletH', width: 1200},
                    {name: 'tabletV', width: 1024},
                    {name: 'mobile', width: 768}
                ]
            },
            asSorting: ['asc'],
            aTargets: [2],
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
                let thisTblc = $(this).closest('.tbl-c')
                thisTblc.append(thisTblc.find('.pagination'));
                // window.AntaresForms.elements.select();

                // setTimeout(() => {
                //     const dtLoadedEvent = new CustomEvent('antares-datatables-loaded', {detail: 'datatables are ready'});
                //     document.dispatchEvent(dtLoadedEvent);
                // }, 400);

                $('.tbl-c tbody').adjustCardHeight();

                let thisTable = $(this);

                thisTable.find('[data-length]').each(function () {
                    let thisTDChildLength = $(this);
                    let lengthOfTD = thisTDChildLength.attr('data-length');
                    let widthGridContainer = thisTDChildLength.closest('[data-gs-width]').attr('data-gs-width');
                    let coef = 0;
                    if (widthGridContainer <= 8) {
                        coef = 10;
                    } else if (widthGridContainer <= 12) {
                        coef = 20;
                    } else if (widthGridContainer <= 24) {
                        coef = 30;
                    }
                    if (lengthOfTD > coef && coef !== 0) {
                        thisTDChildLength.closest('td').addClass('truncate-active');
                        thisTDChildLength.closest('td').attr('data-tooltip-inline', thisTDChildLength.text());
                    }
                });

                // AntaresForms.elements.tooltip()
                thisTable.resize();

                antaresEvents.emit('datatables-loaded');
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
                $('.tbl-c').removeClass('tbl-c--zd tbl-c--zd-empty');
                let oSettings = this.fnSettings ? this.fnSettings() : this;
                $('#table-ma span').html(
                    $(this)
                        .closest('.tbl-c')
                        .find('tr.is-selected').length + ' items Selected'
                );

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
                // $('.app-content').scrollTop('0');
            }
        };

        if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
        } else {
            let dataTablesOptionsWithSelect = Object.assign(dataTablesOptionsNoSelect, {
                select: {
                    style: 'os',
                    className: 'is-selected',
                    info: true,
                    selector: 'td:not(:first-child)'
                }
            });
        }

        var oTable;
        if ($('[data-table-init="true"]').closest('.tbl-c').hasClass('card--unadjustable') || $('[data-table-init="true"]').closest('.card').hasClass('card--unadjustable')) {
            let dataTablesOptionsUnAdjusTable = Object.assign({
                scrollY: '200px',
                scrollCollapse: true
            }, dataTablesOptionsNoSelect);
            oTable = $('[data-table-init="true"]').DataTable(dataTablesOptionsUnAdjusTable);
        } else {
            oTable = $('[data-table-init="true"]').DataTable(dataTablesOptionsNoSelect);
        }
        window.oTable = oTable;
        dataTablesOptionsNoSelect.drawCallback();
    },
    updateHeightTableForScroll() {
        function changeTableHeightForScroll() {
            $('.dataTables_scrollBody').each(function () {
                window.requestAnimationFrame(() => {
                    let fullTable = $(this).closest('.tbl-c')
                    $(this).addClass('display-none')
                    let headerTable = fullTable.find('.dataTables_scrollHead')
                    let ctrlsTable = fullTable.find('.card-ctrls')
                    let paginationTable = fullTable.find('.pagination')
                    let desiredHeight = fullTable.height() - headerTable.height() - ctrlsTable.height() - paginationTable.height() - 20
                    window.requestAnimationFrame(() => {
                        $(this).css('max-height', desiredHeight)
                        $(this).css('height', desiredHeight)
                        $(this).removeClass('display-none')
                    })
                })
            })
        }

        enquire.register('screen and (min-width:1351px)', { 
            match: function () {
                changeTableHeightForScroll()
                var container;
                $('.ui-resizable-handle').mousedown(function () {
                    container = $(this).closest('.grid-stack-item');
                });
                $('.grid-stack').on('change.gridHeightTableScroll', function (event, ui) {
                    changeTableHeightForScroll();
                });
            },
            unmatch: function () {
                $('.grid-stack').off('change.gridHeightTableScroll');
            }
        });
    },
    dataTablesUpdateTable() {
        const self = this;
        enquire.register(bpMobMax767, {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register(bpTabVMin768Max1023, {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register(bpTabHMin1024Max1199, {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register(bpLapMin1200Max1366, {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register('screen and (min-width: 1367px) and (max-width: 1499px)', {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register('screen and (min-width: 1500px) and (max-width: 1649px)', {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            }
        });
        enquire.register('screen and (min-width: 1650px)', {
            match: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
            },
            unmatch: function () {
                oTable.responsive.recalc();
                self.dataTables0Data();
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
                }
            });
        });
    },

    dataTablesGridStackClass() {
        enquire.register(bpDesMin1367, {
            match: function () {
                let container = $('.card-datatables');
                let parent = container.closest('.grid-stack-item');

                function checkSizeGridTable() {
                    // if (parent.attr('data-gs-width') === '24') {
                    //     container.addClass('size-gridstack--max');
                    // } else {
                    //     container.removeClass('size-gridstack--max');
                    // }
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
    },
    dataTablesHeightForScroll() {
        enquire.register(bpMobLapMin768Max1366, {
            match: function () {
                giveHeightForTableScroll();
            },
            unmatch: function () {
                giveHeightForTableScroll();
            }
        });
        enquire.register(bpTabLapMin1024Max1366, {
            match: function () {
                giveHeightForTableScroll();
            },
            unmatch: function () {
                giveHeightForTableScroll();
            }
        });
        enquire.register(bpDesMin1367, {
            match: function () {
                giveHeightForTableScroll();
            },
            unmatch: function () {
                giveHeightForTableScroll();
            }
        });

        function giveHeightForTableScroll() {
            window.requestAnimationFrame(() => {
                $('.dataTables_scrollBody').each(function () {
                    let thisTbody = $(this);
                    let gridHeight = thisTbody.closest('.dataTables_wrapper').height() - 50;
                    thisTbody.css('max-height', gridHeight);
                    $('.grid-stack').on('change.gridScrollTable', function (event, ui) {
                        let gridHeight = thisTbody.closest('.dataTables_wrapper').height() - 50;
                        thisTbody.css('max-height', gridHeight);
                        thisTbody.scrollTop(0);
                    });
                    thisTbody
                        .closest('.tbl-c')
                        .find('.dataTables_length')
                        .click(function () {
                            thisTbody.scrollTop(0);
                        });
                });
            });
        }
    }
};

require('./components/datatables/dt_pagination_length.js');

$(function () {
    window.AntaresTableView = AntaresTableView;
    AntaresTableView.init();
});
