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
    this.dataTablesMobileEmailPosition();
    enquire.register('screen and (min-width:767px)', {
      match: function() {
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
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  },

  dataTablesHelpers() {
    $('.tbl-c').each(function(index, el) {
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
  dataTablesScrollTopAfterLength() {
    $('.dataTables_length, .pagination-current ul').click(function() {
      $('.dataTables_wrapper.ps, .dataTablesLogs.ps').scrollTop(0).perfectScrollbar('update');
    });
  },
  dataTablesMultiSelect() {},

  dataTablesSelectRows() {
    /*
       * jQuery outside events - v1.1 - 3/16/2010
       * http://benalman.com/projects/jquery-outside-events-plugin/
       *
       * Copyright (c) 2010 "Cowboy" Ben Alman
       * Dual licensed under the MIT and GPL licenses.
       * http://benalman.com/about/license/
       */
    (function($, c, b) {
      $.map('click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '), function(d) {
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
          setup: function() {
            d = d.add(this);
            if (d.length === 1) {
              $(c).bind(h, f);
            }
          },
          teardown: function() {
            d = d.not(this);
            if (d.length === 0) {
              $(c).unbind(h);
            }
          },
          add: function(i) {
            var j = i.handler;
            i.handler = function(l, k) {
              l.target = k;
              j.apply(this, arguments);
            };
          }
        };

        function f(i) {
          $(d).each(function() {
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

      $('.tbl-c').bind('clickoutside', function(event) {
        $(this).find('tr').removeClass('is-selected');
      });

      enquire.register('screen and (min-width:1023px)', {
        //  for tablet selectable because we need contextMenu priorytet
        match: function() {
          if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
            // console.log('touch devices')
          } else {
            $('.tbl-c table').selectable({
              delay: 100,
              distance: 100,
              stop: function(event, ui) {
                $(this).find('.ui-selected').removeClass('ui-selected').addClass('is-selected');
              }
            });
          }
        },
        unmatch: function() {
          $('.tbl-c table').selectable('destroy');
        }
      });
      enquire.register('screen and (max-width:1024px)', {
        //  for tablet selectable because we need contextMenu priorytet
        // tmp off
        match: function() {
          // $('.tbl-c').selectable('destroy');
        }
      });

      //mass actions
      $('.tbl-c').on('click', function() {
        var self = $(this);
        console.log('tbl-c click');
        window.requestAnimationFrame(() => {
          if (self.find('tr.is-selected').length >= 2) {
            console.log('if');
            self.closest('.tbl-c').find('#table-ma').attr('disabled', false);
          } else {
            console.log('else');
            self.closest('.tbl-c').find('#table-ma').attr('disabled', 'disabled');
          }

          //   $('.tbl-c tbody').multiSelect({
          //     unselectOn: false,
          //     keepSelection: true,
          //     selected: 'is-selected'
          //   });
        });
      });

      $('.tbl-c').bind('clickoutside', function(event) {
        $(this).find('tr').removeClass('is-selected');
        $('.tbl-c #table-ma').attr('disabled', true);
      });

      $('#table-ma .is-disabled').on('click', function(e) {
        e.preventDefault();
      });
    }

    multiselectWithMouse();
  },

  dataTablesPaginationButtons() {
    $.fn.dataTable.ext.classes.sPageButton = 'mdl-js-button mdl-js-ripple-effect';

    $('.dataTable').on('length.dt', function(e, settings, len) {
      window.requestAnimationFrame(() => {
        $('.tbl-c .card-ctrls').adjustCardHeight();
      });
    });

    $('.dataTable').on('page.dt', function(e, settings, len) {
      window.requestAnimationFrame(() => {
        $('.tbl-c .card-ctrls').adjustCardHeight();
      });
    });
  },

  dataTablesFilterSearch() {
    var self = this;

    $('.dataTables_wrapper').closest('.tbl-c').find('.card-ctrls .mdl-textfield__input').keyup(function(e) {
      var val = $(this).val();
      if (e.which === 13) {
        oTable.search(val).draw();
      } else {
        self.delay(function() {
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
      $('.ddown--columns .ddown__menu').find('li').remove();

      $('.billevo-table').find('thead th').each(function(index, el) {
        if ($(this).text() !== '') {
          $('.ddown--columns .ddown__menu').append(columnLi);
          $('.ddown--columns .ddown__menu li:last-child a span').text($(this).text());
        }
      });

      $('.ddown--columns .ddown__menu li').on('click', function() {
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
    $('.dataTables_wrapper').closest('.tbl-c').find('.card-filter__sgl').on('click', 'i', function(e) {
      $(this).closest('.card-filter__sgl').hide();
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

    let dataTablesOptions = {
      iDisplayLength: 10,
      bFilter: true,
      bLengthChange: true,
      bInfo: false,
      // buttons: [ 'colvis' ],
      // buttons: [ 'colvis' ],
      // "ajax": '../ajax/data/arrays.txt',

      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
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
      select: {
        style: 'os',
        className: 'is-selected'
      },
      autoWidth: true,
      dom: '<"dt-area-top"i>rt<"dt-area-bottom pagination pagination--type2" fpL><"clear">',
      // lengthMenu: [
      //     [10, 25, 50, -1],
      //     [10, 25, 50, "All"]
      // ],
      responsive: {
        breakpoints: [
          { name: 'desktop', width: Infinity },
          { name: 'laptop', width: 1499 }, // powyżej tego rozmiaru pokazuje się columna
          { name: 'tabletH', width: 1200 },
          { name: 'tabletV', width: 1024 },
          { name: 'mobile', width: 768 }
        ]
      },
      //default sorting
      asSorting: ['asc'],
      aTargets: [2],
      //select search
      initComplete: function() {
        let column = $('[data-table-init="true"]').DataTable().column(3),
          select = $('.tbl-c .card-ctrls select.select--category');

        select.on('change', function() {
          var val = $.fn.dataTable.util.escapeRegex($(this).children('option:selected').val());

          column.search(val ? '^' + val + '$' : '', true, false).draw();
        });

        column.data().unique().sort().each(function(d, j) {
          select.append('<option value="' + d + '">' + d + '</option>');
        });

        $('.tbl-c').append($('.tbl-c .pagination'));
        // window.AntaresForms.elements.select();

        setTimeout(() => {
          const dtLoadedEvent = new CustomEvent('antares-datatables-loaded', { detail: 'datatables are ready' });
          document.dispatchEvent(dtLoadedEvent);
        }, 400);
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
      drawCallback: function() {
        let oSettings = this.fnSettings ? this.fnSettings() : this;
        if (oSettings.aoData == null) {
          return false;
        }
        let rows = oSettings.aoData.length - 1;

        let wrapper = $('.tbl-c'),
          paginate = wrapper.find('.pagination'),
          length = wrapper.find('.dataTables_length');

        if (rows <= 10) {
          length.hide();
          paginate.hide();
          $('.card-datatables .card').removeClass('card--pagination');
        } else {
          length.show();
          paginate.show();
          $('.card-datatables .card').addClass('card--pagination');
        }
      }
      // "columns": [
      //   { "width": "100px" },
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null,
      //   null
      // ]
    };

    // init datatables
    let oTable = $('[data-table-init="true"]').DataTable(dataTablesOptions);
    window.oTable = oTable;
    dataTablesOptions.drawCallback();
  },

  dataTablesMobileEmailPosition() {
    $(window).off('resize');
    function emailPosition() {
      var lefttab = $('.dataTables_wrapper table .name').offset().left - 8;
      $('.dataTables_wrapper td>a[title="email address"]').css('left', lefttab);
    }

    emailPosition();
    $(window).on('resize', function() {
      emailPosition();
    });
    $('.dataTables_wrapper+.pagination .dataTables_paginate').click(function() {
      emailPosition();
    });
  },
  dataTablesUpdateTable() {
    enquire.register('screen and (max-width: 767px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 768px) and (max-width: 1023px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 1024px) and (max-width: 1199px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 1200px) and (max-width: 1349px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 1350px) and (max-width: 1499px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 1500px) and (max-width: 1649px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
    enquire.register('screen and (min-width: 1650px)', {
      match: function() {
        oTable.responsive.recalc();
      },
      unmatch: function() {
        oTable.responsive.recalc();
      }
    });
  }
};

// THESE 2 HAVE TO BE OUTSIDE:
// function multiSelect(o) {
//   console.log(o);
//   var target = o.e.target;
//   var element = o.element;
//   var list = o.list;

//   if ($(element).hasClass('ui-sortable-helper')) {
//     // return false;
//   }

//   if (o.start != false) {
//     var start = o.start(o.e, $(element));
//     if (start == false) {
//       return false;
//     }
//   }

//   if (o.e.shiftKey && o.multiselect) {
//     // get one already selected row
//     $(element).addClass(o.selected);
//     first = $(o.list).find('.' + o.selected).first().index();
//     last = $(o.list).find('.' + o.selected).last().index();

//     // if we hold shift and try to select last element that is upper in the list
//     if (last < first) {
//       firstHolder = first;
//       first = last;
//       last = firstHolder;
//     }

//     if (first == -1 || last == -1) {
//       return false;
//     }

//     $(o.list).find('.' + o.selected).removeClass(o.selected);

//     var num = last - first;
//     var x = first;

//     for (i = 0; i <= num; i++) {
//       $(list).find(o.filter).eq(x).addClass(o.selected);
//       x++;
//     }
//   } else if ((o.e.ctrlKey || o.e.metaKey) && o.multiselect) {
//     // reset selection
//     if ($(element).hasClass(o.selected)) {
//       $(element).removeClass('ui-selected');
//       setTimeout(function() {
//         $(element).removeClass(o.selected);
//       }, 100);
//     } else {
//       $(element).addClass(o.selected);
//     }
//   } else {
//     // reset selection
//     if (o.keepSelection && !$(element).hasClass(o.selected)) {
//       $(list).find('.' + o.selected).removeClass(o.selected);
//       $(element).addClass(o.selected);
//     } else {
//       $(list).find('.' + o.selected).removeClass(o.selected);
//       $(element).addClass(o.selected);
//     }
//   }

//   if (o.stop != false) {
//     o.stop($(list).find('.' + o.selected), $(element));
//   }
// }

// external keyboard select plugin
// $.fn.multiSelect = function(o) {
//   var defaults = {
//     multiselect: true,
//     selected: 'is-selected',
//     filter: ' > *',
//     unselectOn: false,
//     keepSelection: true,
//     list: $(this).selector,
//     e: null,
//     element: null,
//     start: false,
//     stop: false,
//     unselecting: false
//   };
//   return this.each(function(k, v) {
//     var options = $.extend({}, defaults, o || {});
//     // selector - parent, assign listener to children only
//     $(document).on('mousedown', options.list + options.filter, function(e) {
//       if (e.which == 1) {
//         if (options.handle != undefined && !$(e.target).is(options.handle)) {
//           // TODO:
//           // keep propagation?
//           // return true;
//         }
//         options.e = e;
//         options.element = $(this);
//         multiSelect(options);
//       }
//       return true;
//     });

//     if (options.unselectOn) {
//       // event to unselect

//       $(document).on('mousedown', options.unselectOn, function(e) {
//         if (!$(e.target).parents().is(options.list) && e.which != 3) {
//           $(options.list + ' .' + options.selected).removeClass(options.selected);
//           if (options.unselecting != false) {
//             options.unselecting();
//           }
//         }
//       });
//     }
//   });
// };

require('./components/datatables/dt_pagination_length.js');

$(function() {
  window.AntaresTableView = AntaresTableView;
  AntaresTableView.init();
});
