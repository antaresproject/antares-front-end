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

/* global enquire APP */

const AntaresGridstack = {
  init() {
    this.gridStack();
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
        $(this)
          .find('.grid-stack-item-content')
          .addClass('card-datatables');
      }
    });
  },
  stopTouchScroll() {
    if ($('html').hasClass('is-mobile')) {
      $('.move-button').on('mousedown', function() {
        $('.app-content').perfectScrollbar('destroy');
      });
      $('.move-button').on('mouseup', function() {
        $('.app-content').perfectScrollbar();
      });
      $('.ui-resizable-handle').on('mousedown', function() {
        $('.app-content').perfectScrollbar('destroy');
      });
      $('.ui-resizable-handle').on('mouseup', function() {
        $('.app-content').perfectScrollbar();
      });
    }
  },
  helpers() {
    //gridstack height automation jintegrer babel external automation tool scafolding
    $.fn.extend({
      calcHeight: function() {
        var gS = $('.grid-stack').data('gridstack');
        var gSCH = gS.cellHeight();
        // console.log('cell height: ' + gSCH);

        $('.grid-stack-item').each(function(index, el) {
          var itemHeight = $(el).data('gs-height');
          var updatedHeight = itemHeight * gSCH + 'px';
          // console.log(updatedHeight);
        });
      }
    });

    $('.grid-stack-item').each(function(index, el) {
      if ($(this).find('.pagination').length) {
        $(this).addClass('gs-pagination');
      }
    });

    //card RWD go to widget_rwd_toogle
    $('.card__mobile-toggle').on('click', function() {
      if ($(this).hasClass('card__mobile-toggle--open')) {
        $(this).removeClass('card__mobile-toggle--open');
        $(this)
          .closest('.card-container')
          .removeClass('card--mobile-toggled');
      } else {
        $(this).addClass('card__mobile-toggle--open');
        $(this)
          .closest('.card-container')
          .addClass('card--mobile-toggled');
      }
    });
  },

  simulateNewGsi() {
    // var grid = $('.grid-stack').data('gridstack');
    // var el = $('.card--test');
    // grid.addWidget(el, 0, 0, 3, 12, true);
    // console.log(grid)
  },

  gridStack() {
    require('jquery-ui-touch-punch');
    let gridstack_options = {
      animate: false,
      minWidth: 1023,
      alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      resizable: {
        handles: 'e, se, s, sw, w, n'
      },
      cellHeight: '15px',
      verticalMargin: 20,
      handle: '.move-button',
      width: 24
    };
    $('.grid-stack').gridstack(gridstack_options);

    const gsLoadedEvent = new CustomEvent('antares-gridstack-loaded', { detail: 'gridstack is ready' });
    document.dispatchEvent(gsLoadedEvent);
  }
};

$(() => {
  window.AntaresGridstack = AntaresGridstack;
  AntaresGridstack.init();
});

$(window).on('load', () => {
  // AntaresGridstack.showInDom();
});
