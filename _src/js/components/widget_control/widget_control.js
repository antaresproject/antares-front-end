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
// import axios from 'axios';

/* global enquire */
import _ from 'underscore';
// Antares Gridsack Widgets Control
export default {
  init() {
    this.widgetAdd();
    this.filterWidgets();
    this.gsMaximize();
    this.gsHeightAdjust();
    this.gsResize();
    this.gsClientsListRWD();
    this.gsClientsDetailsRWD();
    this.gsDashboardRWD();
    this.gsEditMode();
    this.gsRWDGeneral();

    // this.rwdHelperDev();
    // this.widgetInternalRWD();
    // this.clickClassHelper(false);

    // require('./../preloader/clean_scroll.js');
  }, // methods
  savedPositions: [],
  widgetAdd() {
    var self = this;
    //draggable
    var $el = $('.card-bar .card-bar__sgl');
    var $container = $('.main-content .grid-stack');

    $container.droppable({
      accept: $el,
      drop(event, ui) {
        console.log('Widget added!');
      }
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
  gsRWDGeneral() {
    enquire.register('screen and (min-width:768px) and (max-width:1220px)', {
      match: function() {
        $('.card--chart').closest('.grid-stack-item').addClass('grid-size--xs');
        $('.card--logs').closest('.grid-stack-item').addClass('grid-size--xs');
      },
      unmatch: function() {
        $('.card--chart').closest('.grid-stack-item').removeClass('grid-size--xs');
        $('.card--logs').closest('.grid-stack-item').addClass('grid-size--xs');
      }
    });
  },

  clickClassHelper(arm) {
    if (arm !== false) {
      // selec rects for debugging
      let componentData = [];

      // $(document).bind('keydown', 'alt', e => {

      $('body').on('click.tmp', e => {
        // if (e.target === 'undefined') {
        //   return false;
        // }
        const $target = $(e.target);
        let current = $target.attr('class');

        if (current == undefined) {
          return false;
        }

        componentData.push(current);

        // removeClass();

        // console.log(componentData);
      });
      // });
      $(document).bind('keyup', e => {
        $(document).off('click.temp');
      });
    }
  },

  widgetInternalRWD() {
    //target = $(.grid-stack-item');
    function clearGridStackRWDClasess($target) {
      // clearGridStackRWDClasess('.')
      clearGridStackRWDClasess();
      $target.removeClass('grid-size--xs grid-size--sm grid-size--md grid-size--lg grid-size--xl');
    }

    function addGridStackRWDClasses($target) {
      // init point
      clearGridStackRWDClasess($target);
      window.requestAnimationFrame(() => {
        // const windowW = parseInt($(window).width(), 10);
        var GSWidth = $target.attr('data-gs-width');
        // console.log(windowW);
        if (GSWidth <= 6) {
          $target.addClass('grid-size--xs'); // tablet ver - odyn pod drugik pod tretim
        } else if (GSWidth <= 8) {
          $target.addClass('grid-size--sm'); // tablet hor - odyn pod drugim
        } else if (GSWidth <= 10) {
          $target.addClass('grid-size--md'); // laptop - odyn pod drugim
        } else if (GSWidth <= 12) {
          $target.addClass('grid-size--lg'); // desktop -  dwe kolonki
        } else if (GSWidth <= 24) {
          $target.addClass('grid-size--xl');
        }
        // console.log('dodawania klas dziala');
      }, 100);
    }

    let grid = $('.grid-stack').data('gridstack');
    let $grid = $('.grid-stack');

    $grid.on('change', (event, items) => {
      if (items == null) {
        return false;
      }
      for (let i = 0; i < items.length; i++) {
        let $GSItem = $(items[i].el);
        addGridStackRWDClasses($GSItem);
      }
    });
  },

  gsHeightAdjust($elem) {
    const self = this;

    $.fn.adjustCardHeight = function(disablePS) {
      let windowW = $(window).width();
      const $self = this;
      const elem = $(this).closest('.grid-stack-item');
      let grid = $('.grid-stack').data('gridstack');
      const gsi = $(this).closest('.grid-stack-item');
      const gsiHeight = gsi.outerHeight(true);
      const card = gsi.find('.card');
      let cardHeight = card.outerHeight(true);

      if (windowW > 1365 && !card.hasClass('card--pagination')) {
        // console.log('screen too wide for widget adaptations');
        return false;
      }

      // const spiceUp = 5;

      // if config says so, disable perfect scrollbar
      if (disablePS === true) {
        this.closest('.grid-stack-item-content').find('.ps').each((index, el) => {
          $(el).perfectScrollbar('destroy');
        });
      }

      function heightCalc() {
        // get values if present
        // make sure each time of widgget is supported!

        let wholeElementHeight = 0;
        let newGsiHeightVal = 0;
        let currentElementHeight = 0;

        // init
        getRealHeight(card.find('.card__content'));

        function getRealHeight() {
          // if it exists

          elem.addClass('is-being-calculated');
          // calc
          wholeElementHeight = card.outerHeight(true);
          // cleanup
          window.requestAnimationFrame(() => {
            elem.removeClass('is-being-calculated');
          });

          return wholeElementHeight;
        }

        newGsiHeightVal = Math.round((parseInt(wholeElementHeight, 10) + grid.opts.verticalMargin) / (grid.cellHeight() + grid.opts.verticalMargin));

        // let paginationHeightAdjusted = card.data('paginationHeightAdjust');

        // if (card.hasClass('card--pagination')) {
        //   // newGsiHeightVal = newGsiHeightVal + 2;
        //   // tmp off
        //   if (!paginationHeightAdjusted) {
        //     // console.log('only once');
        //     newGsiHeightVal = newGsiHeightVal + 2;
        //     card.data('paginationHeightAdjusted', true);
        //   }
        // }

        if (card.hasClass('card--news')) {
          newGsiHeightVal++;
        }

        // do the resize man, stop jerking around

        window.requestAnimationFrame(() => {
          // gsi.attr('data-gs-min-height', newGsiHeightVal);
          gsi.attr('data-gs-height', newGsiHeightVal);
          grid.resize(gsi, gsi.attr('data-gs-width'), newGsiHeightVal);
        });
      }

      self.saveGridParams();
      heightCalc();
      return 'Element updated!';
    };

    // $('.card *').css('opacity', '1');

    // card interactions

    if (typeof oTable !== 'undefined') {
      oTable.on('responsive-display', function() {
        $('.tbl-c').adjustCardHeight();
      });
    }

    enquire.register('screen and (min-width:768px) and (max-width:1199px) ', {
      match: function() {
        // card chart
        $('.card--chart [data-icheck="true"]').on('ifChanged', function() {
          $(this).closest('.card').find('.card__right .mobile-toogle--target').css('opacity', '0');
          window.requestAnimationFrame(() => {
            $(this).closest('.card').find('.card__content').adjustCardHeight();
          });
          window.requestAnimationFrame(() => {
            $(this).closest('.card').find('.card__right .mobile-toogle--target').css('opacity', '1');
          });
        });

        // card system info

        $('.card--info').on('click', '.mobile-toogle--box', () => {
          window.requestAnimationFrame(() => {
            $('.card--info .card__content').adjustCardHeight();
          });
        });

        // card client contacts
        $('.card--contacts').on('click', '.mobile-toogle--box', () => {
          window.requestAnimationFrame(() => {
            $('.card--contacts .card__content').adjustCardHeight();
          });
        });
      }
    });
    // card logs

    $('.card--logs').on('click', '.pagination', (index, el) => {
      window.requestAnimationFrame(() => {
        if (parseInt($(window).width(), 10) > 767) {
          $('.card--logs .card__content').adjustCardHeight();
          console.log('should work');
        }
        // console.log('reason');
      });
    });
    // main adjust on resize
    // enquire.register('screen and (min-width:768px) and (max-width:1366px)', {
    //   match: function() {
    //     setTimeout(function() {
    //       $('.card--logs').each(function() {
    //         $(this).closest('.grid-stack-item').attr('data-gs-min-height', '8');
    //       });
    //       $('.card--info').each(function() {
    //         $(this).closest('.grid-stack-item').attr('data-gs-min-height', '8');
    //       });
    //     }, 100);
    //   }
    // });

    let thisWW = $(window).width();

    // on load
    if (thisWW > 767 && thisWW < 1366) {
      window.requestAnimationFrame(() => {
        $('.grid-stack-item').each(function() {
          $(this).find('.card__content').adjustCardHeight();
          $(this).find('.tbl-c').adjustCardHeight();
        });
      });
    }

    $(window).resize(
      _.debounce(function() {
        $('.grid-stack-item').each(function() {
          $(this).find('.card__content').adjustCardHeight();
          $(this).find('.tbl-c').adjustCardHeight();
        });
      }, 120)
    );
  },
  saveGridParams() {
    const self = this;
    $('.grid-stack-item').each(function() {
      const $this = $(this);
      self.savedPositions.push({
        x: $this.attr('data-gs-x'),
        y: $this.attr('data-gs-y'),
        w: $this.attr('data-gs-width'),
        h: $this.attr('data-gs-height')
      });
    });
  },

  gsMaximize() {
    //save vars without overwrite with click functions

    const self = this;
    const $maximizeButton = $('#app-wrapper .card .card-maximize');

    $maximizeButton.on('click', function() {
      self.saveGridParams(); //enlarge mechanics
      const $self = $(this);
      const widget = $(this).closest('.grid-stack-item');
      const grid = $(this).closest('.grid-stack').data('gridstack'); //set best height to simulate modal
      const currentCellH = grid.cellHeight();
      const headH = $('.main-head').outerHeight(true);
      const windowH = $(window).height();
      const appropriateHeight = (windowH - headH - 485) / currentCellH;
      const openCloseSwitch = $(this).data('openCloseSwitch'); //identify card number
      const index = widget.index();
      if (!openCloseSwitch) {
        // console.log(widget);
        grid.update(widget, 0, 0, 24, appropriateHeight);
        $('.app-content').scrollTop(0);
        widget.addClass('is-maximized');
      } else {
        $('.grid-stack-item').each((index, el) => {
          grid.update(el, parseInt(self.savedPositions[index].x, 10), parseInt(self.savedPositions[index].y, 10), parseInt(self.savedPositions[index].w, 10), parseInt(self.savedPositions[index].h, 10));
          $(el).removeClass('is-maximized');
        });
      }
      $(this).data('openCloseSwitch', !openCloseSwitch);
    });
  },
  gsDashboardRWD() {
    //enumerate
    $('.grid-stack-item .card--chart').each((index, elem) => {
      $(elem).attr('data-chart-number', index + 1);
    });

    var grid = $('.grid-stack').data('gridstack');
    const dashboard = $('.page-dashboard');
    const w = $(window).width();
    const c1 = $('.card--chart').eq(0);
    const c2 = $('.card--chart').eq(1);
    const c3 = $('.card--chart').eq(2);
    const c4 = $('.card--chart').eq(3);
    const systemInfo = $('.card--info');
    const news = $('.card--news');
    const systemLogs = $('.card--logs');

    if (dashboard.length) {
      enquire.register('screen and (min-width:1367px) ', {
        match() {
          window.requestAnimationFrame(() => {
            c1.cardResize(0, 0, 12, 10);
            c2.cardResize(12, 0, 12, 10);
            c3.cardResize(0, 10, 12, 10);
            c4.cardResize(12, 10, 12, 10);
            systemInfo.cardResize(0, 20, 6, 10);
            news.cardResize(6, 20, 6, 10);
            systemLogs.cardResize(12, 20, 12, 12);

            $('.card--chart').each(function() {
              $(this).cardResize($(this).attr('data-gs-x'), $(this).attr('data-gs-y'), $(this).attr('data-gs-width'), 10);
              $(this).closest('.grid-stack-item').attr('data-gs-min-height', '10');
            });

            $('.card--logs').each(function() {
              $(this).closest('.grid-stack-item').attr('data-gs-min-height', '8');
            });
            $('.card--info').each(function() {
              $(this).closest('.grid-stack-item').attr('data-gs-min-height', '8');
            });

            $('[data-scrollable]').perfectScrollbar();
          });
        }
      });

      enquire.register('screen and (max-width:1366px) and (min-width:1024px) ', {
        match() {
          c1.cardResize(0, 0, 12, 12);
          c2.cardResize(12, 0, 12, 12);
          c3.cardResize(0, 12, 12, 12);
          c4.cardResize(12, 12, 12, 12);
          systemInfo.cardResize(0, 24, 8, 13);
          news.cardResize(8, 24, 8, 13);
          systemLogs.cardResize(16, 24, 8, 17);
        }
      });

      enquire.register('screen and (max-width:1023px) and (min-width:768px) ', {
        match() {
          c1.cardResize(0, 0, 12, 14, true);
          c2.cardResize(12, 0, 12, 14, true);
          c3.cardResize(0, 14, 12, 14, true);
          c4.cardResize(12, 14, 12, 14, true);
          systemInfo.cardResize(0, 28, 12, 11);
          news.cardResize(12, 24, 12, 11);
          systemLogs.cardResize(0, 38, 24, 12);
        }
      });
    }
  },
  gsEditMode() {
    const grid = $('.grid-stack').data('gridstack');
    const $grid = $('.grid-stack');

    function enableGrid() {
      window.requestAnimationFrame(() => {
        $('.app-content').addClass('app-content--widgets-movable');
        $('#widgets-edit').children('i').removeClass('icon--widgets-edit').addClass('icon--widgets-edit-alt');
        grid.enable();
        $grid.find('.grid-stack-item').each((index, el) => {
          grid.movable($(el), true);
        });
      });
      // $('.app-content--widgets-movable .grid-stack').draggable(); //active this
    }

    function disableGrid() {
      window.requestAnimationFrame(() => {
        grid.disable();
        $('#widgets-edit').children('i').removeClass('icon--widgets-edit-alt').addClass('icon--widgets-edit');
        $('.app-content').removeClass('app-content--widgets-movable');
      });
    }

    // Disable on mobile & tabletss
    enquire.register('screen and (max-width:1200px)', {
      match() {
        disableGrid();
      }
    });

    $('#widgets-edit').on('click', e => {
      e.preventDefault();

      if ($('.app-content').hasClass('app-content--widgets-movable')) {
        disableGrid();
      } else {
        enableGrid();
      }
    });

    // manual close button
    $('.card-bar__close').on('click', e => {
      disableGrid();
    });

    // remove Widgets
    $(document).on('click', '.remove-button', function() {
      const $el = $(this).closest('.grid-stack-item');

      APP.swal.init('skin1', 'typeInfo', {
        title: 'Are you sure?',
        text: 'Widget will be removed.'
      });

      $('.sweet-container').addClass('widget-remove');
      $('.sweet-container.widget-remove .sweet-confirm').on('click', () => {
        window.requestAnimationFrame(() => {
          grid.removeWidget($el[0]);
        });
      });
      $('.sweet-container').removeClass('widget-remove');
    });
  },
  gsResize() {
    $.fn.cardResize = function(newX, newY, newWidth, newGsiHeightVal) {
      const grid = $('.grid-stack').data('gridstack');
      const gsi = this.closest('.grid-stack-item');
      const originalX = this.attr('data-gs-x');
      const originalY = this.attr('data-gs-y');
      const originalW = this.attr('data-gs-width');
      const originalH = this.attr('data-gs-height');
      function doTheResize() {
        grid.update(gsi, newX, newY, newWidth, newGsiHeightVal);
      }
      doTheResize();
    };
  },
  gsClientsListRWD() {
    const grid = $('.grid-stack').data('gridstack');
    const cardTable = $('.grid-stack').find('.tbl-c').closest('.card');
    enquire.register('screen and (min-width:1366px)', {
      match() {
        cardTable.cardResize(0, 0, 24, 19);
      }
    });
  },
  gsClientsDetailsRWD() {
    const grid = $('.grid-stack').data('gridstack');
    const cardInfo = $('.card--detail-info');
    const cardContacts = $('.card--contacts');
    const cardTabs = $('.card--tabs');
    const cardLogs = $('.card--logs');
    const cardSmallChart = $('.card--chart-small');
    if (!$('.page-clients-details').length) {
      return false;
    }
    // how to? paramaters: newX, newY, newWidth, newGsiHeightVal
    enquire.register('screen and (min-width:1366px)', {
      // enquire.register('screen and (min-width:1025px)', {
      match() {
        cardInfo.cardResize(0, 0, 5, 20);
        cardTabs.cardResize(5, 0, 14, 19);
        cardSmallChart.cardResize(19, 0, 5, 11);
        cardContacts.cardResize(0, 20, 5, 10);
        cardLogs.cardResize(5, 19, 14, 16);
      }
    });
    enquire.register('screen and (min-width:1024px) and (max-width:1365px)', {
      // enquire.register('screen and (min-width:1025px)', {
      match() {
        cardInfo.cardResize(0, 0, 8, 20);
        cardTabs.cardResize(8, 0, 16, 18);
        cardSmallChart.cardResize(0, 31, 8, 12);
        cardContacts.cardResize(0, 20, 8, 11);
        cardLogs.cardResize(8, 18, 16, 10);
      }
    });
    enquire.register('screen and (min-width:768px) and (max-width:1023px)', {
      // enquire.register('screen and (min-width:1025px)', {
      match() {
        cardInfo.cardResize(0, 0, 9, 20);
        cardTabs.cardResize(9, 0, 15, 18);
        cardSmallChart.cardResize(0, 31, 9, 12);
        cardContacts.cardResize(0, 20, 9, 11);
        cardLogs.cardResize(9, 18, 15, 10);
      }
    });
  },
  rwdHelperDev() {
    //tmp menu helper
    // $(document).bind('keydown', 'alt', e => {
    //   $('.main-menu--primary .has-submenu').eq(0).addClass('submenu-open');
    // });

    require('./../../external/jquery.hotkeys.js');
    let grid = $('.grid-stack').data('gridstack');
    // $(document).bind('keydown', 'alt+q', function() {
    //   let serializedData = _.map(
    //     $('.grid-stack > .grid-stack-item:visible'),
    //     function(el) {
    //       el = $(el);
    //       var node = el.data('_gridstack_node');
    //       return {
    //         x: node.x,
    //         y: node.y,
    //         width: node.width,
    //         height: node.height
    //       };
    //     },
    //     this
    //   ); // give it to me
    //   console.log(serializedData);
    // });
  }
};
