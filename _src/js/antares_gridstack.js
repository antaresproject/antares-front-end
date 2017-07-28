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

const AntaresGridstack = {
  init() {
    this.gridStack();
    this.editWidgets();
    // this.cardResizePlugin();
    // this.cardResizeDashboard();
    this.filterWidgets();
    this.addingWidgets();
    this.widgetGridEnlarge();
    this.helpers();
    this.stopTouchScroll();
    this.identify();
  },

  // methods
  showInDom() {
    // $('.grid-stack').css('opacity', '1');
  },
  identify() {
    $('.grid-stack-item').each(function() {
      if ($(this).find('.tbl-c').length) {
        $(this).find('.grid-stack-item-content').addClass('card-datatables');
      }
    });
  },
  stopTouchScroll() {
    $('.move-button').mousedown(function() {
      $('.app-content').perfectScrollbar('destroy');
    });
    $('.move-button').mouseup(function() {
      $('.app-content').perfectScrollbar();
    });
  },
  helpers() {
    //gridstack height automation jintegrer babel external automation tool scafolding
    $.fn.extend({
      calcHeight: function() {
        var gS = $('.grid-stack').data('gridstack');
        var gSCH = gS.cellHeight();
        console.log('cell height: ' + gSCH);

        $('.grid-stack-item').each(function(index, el) {
          var itemHeight = $(el).data('gs-height');
          var updatedHeight = itemHeight * gSCH + 'px';
          console.log(updatedHeight);
        });
      }
    });

    $('.grid-stack-item').each(function(index, el) {
      if ($(this).find('.pagination').length) {
        $(this).addClass('gs-pagination');
      }
    });

    //card RWD go to widget_rwd_toogle
    $(document).on('click', '.card__mobile-toggle', function() {
      $(this).toggleClass('card__mobile-toggle--open');
      $(this).closest('.card').find('.mobile-toogle--target').toggle();
      $(this).closest('.card').toggleClass('card--mobile-toggled');
    });
  },

  widgetGridEnlarge() {
    //save vars without overwrite with click functions
    var savedPositions = [];
    $('.grid-stack-item').each(function() {
      var $this = $(this);
      savedPositions.push({
        x: $this.attr('data-gs-x'),
        y: $this.attr('data-gs-y'),
        w: $this.attr('data-gs-width'),
        h: $this.attr('data-gs-height')
      });
    });

    //enlarge mechanics
    $('#app-wrapper .card .card-maximize').on('click', function() {
      var self = $(this);
      var widget = $(this).closest('.grid-stack-item');
      var grid = $(this).closest('.grid-stack').data('gridstack');

      //set best height to simulate modal
      var currentCellH = grid.cellHeight();
      var headH = $('.main-head').outerHeight(true);
      var windowH = $(window).height();
      var appropriateHeight = (windowH - headH - 485) / currentCellH;

      var openCloseSwitch = $(this).data('openCloseSwitch');

      //identify card number
      var index = widget.index();

      if (!openCloseSwitch) {
        grid.update(widget, 0, 0, 12, appropriateHeight);
        $('.app-content').scrollTop(0);
        widget.addClass('is-maximized');
      } else {
        $('.grid-stack-item').each(function(index, el) {
          grid.update(
            el,
            parseInt(savedPositions[index].x, 10),
            parseInt(savedPositions[index].y, 10),
            parseInt(savedPositions[index].w, 10),
            parseInt(savedPositions[index].h, 10)
          );
          $(el).removeClass('is-maximized');
        });
      }

      $(this).data('openCloseSwitch', !openCloseSwitch);
    });
  },

  addingWidgets() {
    var self = this;
    //draggable
    var $el = $('.card-bar .card-bar__sgl');
    var $container = $('.main-content .grid-stack');

    $container.droppable({
      accept: $el
    });

    $el.draggable({
      stop: function(event, ui) {
        // console.log(ui);
        // console.log(event);
      },
      start() {
        // self.simulateNewGsi();
      },
      revert: function(valid, ui) {
        var $self = $(this);

        if (!valid) {
          return !valid;
        } else {
          this.velocity(
            {
              opacity: '0'
            },
            500,
            function() {
              $self.remove();
              self.filterWidgets();
            }
          );
          return valid;
        }
      }
    });
  },

  simulateNewGsi() {
    var grid = $('.grid-stack').data('gridstack');
    var el = $('.card--test');
    grid.addWidget(el, 0, 0, 3, 12, true);
    // console.log(grid)
  },

  filterWidgets() {
    require('list.js');

    let options = {
      valueNames: [
        {
          data: ['widget']
        }
      ],
      searchClass: 'mdl-textfield__input',
      listClass: 'card-bar__items'
    };

    let widgetSort = new List('widgets-list', options);
  },

  gridStack() {
    require('jquery-ui-touch-punch');
    let grid = $('.grid-stack').data('gridstack');

    let gridstack_options = {
      // verticalMargin: 1,
      animate: false,
      minWidth: 1200,
      // float: false,
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      resizable: {
        // handles: 'e, se, s, sw, w'
        handles: 'e, se, s, sw, w, n'
      },
      cellHeight: 15,
      verticalMargin: 20,
      handle: '.move-button',
      width: 24
    };

    $('.grid-stack').gridstack(gridstack_options);
  },

  cardResizePlugin() {
    $.fn.cardResize = function(newWidth, newHeight, newX, newY) {
      var grid = $('.grid-stack').data('gridstack'),
        cardContainer = this.closest('.grid-stack-item'),
        originalX = this.attr('data-gs-x'),
        originalY = this.attr('data-gs-y'),
        originalW = this.attr('data-gs-width'),
        originalH = this.attr('data-gs-height');

      if (newHeight === null && newX === null && newY === null) {
        grid.update(cardContainer, originalX, originalY, newWidth, originalH);
      } else if (newX === null && newY === null) {
        grid.update(cardContainer, originalX, originalY, newWidth, newHeight);
      } else if (newY === null) {
        grid.update(cardContainer, newX, originalY, newWidth, newHeight);
      } else {
        grid.update(cardContainer, newX, newY, newWidth, newHeight);
      }
    };
  },

  cardResizeDashboard: function() {
    var chart1 = $('.card--chart.card--green'),
      chart2 = $('.card--chart.card--orange'),
      chart3 = $('.card--chart.card--violet'),
      chart4 = $('.card--chart.card--blue'),
      systemInfo = $('.card--info'),
      news = $('.card--news'),
      systemLogs = $('.card--logs'),
      w = $(window).width(),
      grid = $('.grid-stack').data('gridstack');

    if (!grid) {
      return false;
    }

    enquire.register('screen and (min-width:1200px) and (max-width:1500px) ', {
      match: function() {
        chart1.cardResize(12, 10, 0, 0);
        chart2.cardResize(12, 10, 0, 10);
        chart3.cardResize(12, 10, 0, 20);
        chart4.cardResize(12, 10, 0, 30);

        systemInfo.cardResize(6, 11, 0, 45);
        news.cardResize(6, 11, 6, 45);
        systemLogs.cardResize(12, 11, 0, 56);
      }
    });

    enquire.register('screen and (min-width:1501px)', {
      match: function() {
        chart1.cardResize(6, 10, 0, 0);
        chart2.cardResize(6, 10, 6, 0);
        chart3.cardResize(6, 10, 0, 10);
        chart4.cardResize(6, 10, 6, 10);

        systemInfo.cardResize(3, 11, 0, 20);
        news.cardResize(3, 11, 3, 20);
        systemLogs.cardResize(6, 11, 6, 20);
      }
    });
  },

  editWidgets() {
    var grid = $('.grid-stack').data('gridstack');
    var $grid = $('.grid-stack');

    function enableGrid() {
      $('.app-content').addClass('app-content--widgets-movable');
      $(this)
        .children('i')
        .removeClass('icon--widgets-edit')
        .addClass('icon--widgets-edit-alt');
      grid.enable();
      $grid.find('.grid-stack-item').each(function(index, el) {
        grid.movable($(el), true);
      });

      // $('.app-content--widgets-movable .grid-stack').draggable(); //active this
    }

    function disableGrid() {
      grid.disable();
      $(this)
        .children('i')
        .removeClass('icon--widgets-edit-alt')
        .addClass('icon--widgets-edit');
      $('.app-content').removeClass('app-content--widgets-movable');
    }

    // cDisable on mobile & tabletss
    enquire.register('screen and (max-width:1200px)', {
      match: function() {
        disableGrid();
      }
    });

    $('#widgets-edit').on('click', function(e) {
      e.preventDefault();

      if ($('.app-content').hasClass('app-content--widgets-movable')) {
        disableGrid();
      } else {
        enableGrid();
      }
    });

    // manual close button
    $('.card-bar__close').on('click', function(e) {
      disableGrid();
    });

    //widgets editable view
    $(document).on('click', '.remove-button', function() {
      var grid = $('.grid-stack').data('gridstack'),
        $el = $(this).closest('.grid-stack-item');

      var $self = $(this);

      APP.swal.init('skin1', 'typeInfo', {
        title: 'Are you sure?',
        text: 'Widget will be removed.'
      });

      $('.sweet-container').addClass('widget-remove');
      $(
        '.sweet-container.widget-remove .sweet-confirm'
      ).on('click', function() {
        grid.removeWidget($el[0], true);
      });

      $('.sweet-container').removeClass('widget-remove');
    });
  }
};

$(function() {
  window.AntaresGridstack = AntaresGridstack;
  AntaresGridstack.init();
});

$(window).on('load', function() {
  // AntaresGridstack.showInDom();
});
