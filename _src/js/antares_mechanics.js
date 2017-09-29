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

/* global antaresEvents */

export const Antares = function() {};
Antares.prototype.init = function() {
  var self = this;
  // APP.components.pagePreloader('on');
  (function core() {
    self.helpers();
    self.RWD.init();
  })();
  (function components() {
    //need to move bowser to separate file
    self.components.frameworkPage();
    self.components.divPreloader();
    self.components.preloader();
    self.components.scroll();
    // self.components.systemScroll();
    self.components.sidebarNotifications();
    self.components.sidebarAlerts();
    self.components.settingsMenu();
    self.components.colorControl();
    self.components.cardTruncate();
    self.components.mutationService();
    self.animations.appAnime();
    //moved to examples:
    // self.components.chatDemo();
    self.components.autoComplete();
    // self.components.inlineAlerts();
  })();

  $(window).on('load', function() {
    // APP.components.pagePreloader('off');
  });

  // (function secondary() {
  //     if ($("body[data-id='dashboard'").length) {
  //         self.components.breadcrumbs('Dashboard');
  //         $('.breadcrumbs li:not(:first-child').remove();
  //     }
  //     if ($("body[data-id='clients-list'").length) {
  //         self.components.breadcrumbs('Clients');
  //         $('.breadcrumbs li:not(:first-child').remove();
  //     }
  //     if ($("body[data-id='settings-page'").length) {
  //         self.components.breadcrumbs('Settings', 'General Settings');
  //     }
  //     if ($("body[data-id='settings-page'").length) {
  //         self.components.breadcrumbs('Settings', 'General Settings');
  //     }
  // }());
  //tmp - wip:
  // self.components.tabScroll();
  //unused
  // self.animations.animator();
  // self.animations.animate();
  // self.dashboard.gridShowCase();
  // self.dashboard.cardReadability();
  // self.charts.labelBackground();
};
Antares.prototype.helpers = function() {
  const self = this;

  antaresEvents.on('something_happend', callback => {
    callback();
  });

  antaresEvents.emit('something_happend', () => {
  });

  // $('.main-menu--primary > li:nth-child(3)').addClass('hovered submenu-open');
  //input file manual
  // $('.file-upload').each(function(index, el) {

  //     $(this).find('input.input-upload').on('change', function() {

  //         var curVal = $(this).val();

  //         $(this).siblings('.file-path').val(curVal);

  //     });

  // });

  (function($) {
    $.fn.hasScrollBar = function() {
      return this.get(0) ? this.get(0).scrollWidth > this.innerWidth() : false;
    };
  })(jQuery);
  $('.ddown-multi__init').on('click', function() {
    $(this)
      .closest('.ddown-multi')
      .find('.ddown-multi__menu')
      .perfectScrollbar();
  });

  function radioButtonsBigBg() {
    $('.radio-btns--big .btn').each(function(index, el) {
      var dataBg = $(this).data('bg');
      var dataColor = $(this).data('color');
      if (dataBg) {
        $(this).css('background-image', 'url(' + dataBg + ')');
      }
      if (dataColor) {
        $(this).css('color', 'url(' + dataColor + ')');
      }
    });
  }

  //tmp add expanded sidebar
  // $('#app-wrapper').addClass('main-sidebar--expanded');
  radioButtonsBigBg();
  //     $('.card >* ').css('opacity', '0');
  //     $('.card >* ').css('transition', '500ms');
  // window.addEventListener("load", function(event) {
  //     setTimeout(function() {
  //         $('.card > * ').css('opacity', '1');
  //     }, 500);
  //   });
  // if ($('.grid-container--1col').length) {
  //     $('.app-content .main-content').css('height', '100%');
  // }
  //simulate widnowResizeEnd
  $(window).on('resize', function() {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
    }, 500);
  });
  //use:
  $(window).on('resizeEnd', function() {
    //do something, window hasn't changed size in 500ms
  });
  // cursor at end of input plugin
  jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
      // Cache references
      var $el = $(this),
        el = this;
      // Only focus if input isn't already
      if (!$el.is(':focus')) {
        $el.focus();
      }
      // If this function exists... (IE 9+)
      if (el.setSelectionRange) {
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
        var len = $el.val().length * 2;
        // Timeout seems to be required for Blink
        setTimeout(function() {
          el.setSelectionRange(len, len);
        }, 1);
      } else {
        // As a fallback, replace the contents with itself
        // Doesn't work in Chrome, but Chrome supports setSelectionRange
        $el.val($el.val());
      }
      // Scroll to the bottom, in case we're in a tall textarea
      // (Necessary for Firefox and Chrome)
      this.scrollTop = 999999;
    });
  };
  //if footer absolute add class to container (card)
  // if ( $('.app-content__footer--absolute').length ) {
  //    $(this).closest('.card__content').addClass('');
  // }
  //fix on tags widget
  if ($('.card--tags').length) {
    $('.card--tags')
      .closest('.grid-stack-item-content')
      .css('overflow', 'visible !important');
  }
  //plugin
  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this)
        .addClass('animated ' + animationName)
        .one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
          $(this).show();
        });
    }
  });
  $.fn.extend({
    animateAndRemove: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this)
        .addClass('animated ' + animationName)
        .one(animationEnd, function() {
          $(this).removeClass('animated ' + animationName);
          $(this).remove();
        });
    }
  });

  function isDOMLoaded() {
    return document.readyState == 'complete';
  }

  function trigger() {
    $(window).trigger('resize');
  }

  //cpanel FIx
  $('#translationImport')
    .closest('.input-field__inner')
    .addClass('w100p');

  ready('.select2-dropdown .select2-results__options', function(element) {
    $(element).attr('data-scrollable', 'true');
    APP.components.scroll();
  });
  // fix quick
  // ready('.dataTables_wrapper', function(element) {
  //   $(this).perfectScrollbar();
  // });

  ready('.tbl-c', function(element) {
    $(this).perfectScrollbar('destroy');
  });
};
Antares.prototype.components = {
  autoComplete: function() {},
  mutationService: function() {
    ready('[data-scrollable]', function(element) {
      APP.components.scroll();
    });
  },
  preloader: function() {
    // if (!$('.page-preloader').length) {
    //     return false;
    // }
    var target = $('.main-preloader');

    function mainPrelaoderOn() {
      // target.show();
      // target.velocity({
      //     opacity: '1',
      // }, 250);
    }

    function mainPrelaoderOff() {
      // target.velocity({
      //     opacity: '0',
      // }, 250, function() {
      //     target.hide();
      // });
    }

    // mainPrelaoderOn();
    // setTimeout(function() {
    //     mainPrelaoderOff();
    // }, 5000);
    Pace.start({
      elements: false,
      document: true,
      // Only show the progress on regular and ajax-y page navigation,
      // not every request
      restartOnRequestAfter: false
    });
    // Pace.restart();
    var timer = 2200;
    setTimeout(function() {
      // self.processing = false;
      // Pace.stop();
    }, timer);
  },
  colorControl: function() {
    // pallette control
    $('.c-group .c-single').each(function(index, el) {
      var getC1 = $(this).data('color');
      $(this).css('background', getC1);
    });
    //label color control
    $('.label-circle').each(function(index, el) {
      var getC2 = $(this).data('color');
      $(this).css('color', getC2);
    });
    // timeline pallette control
    $('.timeline .timeline__indicator').each(function(index, el) {
      var getC3 = $(this).data('color');
      $(this).css('color', getC3);
    });
  },
  cardTruncate: function() {
    //truncate size
    function truncateFix() {
      // setTimeout(function() {
      //     $('.card__header-left').each(function(index, el) {
      //         var width = $(this).outerWidth() - 24;
      //         $(this).find('>span').css('max-width', width);
      //     });
      // }, 1000);
    }

    // truncateFix();
    // $(window).on('resize', function() {
    //     truncateFix();
    // });
    // $('.grid-stack').on('change', function(event, ui) {
    //     truncateFix();
    // });
  },
  pagePreloader: function(action) {
    // paceOptions = {
    //     // Disable the 'elements' source
    //     elements: false,
    //     eventLag: true,
    //     document: true,
    //     // Only show the progress on regular and ajax-y page navigation,
    //     // not every request
    //     restartOnRequestAfter: true
    // };
    // var pagePreloader = $('.preloader');
    // if (action === "on") {
    //     // pagePreloader.css({ 'opacity': '1', 'width': '100vw', 'display': 'flex' });
    //     // pagePreloader.find('img').css('width', 'auto');
    //     // console.log('pre.on');
    //     // preloader.on();
    // } else if (action === "off") {
    //     // pagePreloader.velocity({ opacity: 0, width: "toggle", }, 500);
    //     // pagePreloader.find('img').velocity({ width: "toggle", }, 400);
    //     // console.log('pre.off');
    //     setTimeout(function() {
    //         // preloader.off();
    //     }, 1000);
    // } else {
    //     return false;
    // }
  },
  divPreloader: function() {
    $.fn.divPreload = function(action) {
      var self = $(this);
      if (action === 'on') {
        self.prepend('<div class="md-preloader-container"><div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div></div>');
      } else if (action === 'off') {
        setTimeout(function() {
          self.children('.md-preloader-container').remove();
        }, 500);
      } else {
        return false;
      }
    };
  },
  scroll: function() {
    function addScroll(selector, relative) {
      $(selector).each(function(index, el) {
        if ($(this).hasClass('ps-container')) {
          $(this).perfectScrollbar('update');
        }
      });
      var perfectScrollbarCFG = {
        wheelPropagation: true,
        suppressScrollX: true
      };
      if (relative) {
        $(selector)
          .perfectScrollbar(perfectScrollbarCFG)
          .css('position', 'relative');
      } else {
        $(selector).perfectScrollbar(perfectScrollbarCFG);
      }
    }

    enquire.register('screen and (min-width:1200px)', {
      match: function() {
        //main
        addScroll('.app-content', true);
        addScroll('.sidebar--notifications .sidebar__content', true);
        addScroll('.sidebar--alerts .sidebar__content', true);
        //menu
        // addScroll('nav .main-menu--primary', false);
        // addScroll('nav .main-menu--secondary', false);
        // addScroll('nav .submenu', false);
        // addScroll('.menu-aside-container', false);
        //custom selector for scrolling
        addScroll('[data-scrollable]', true);
        addScroll('[data-scrollable--alt]', false);
        (function update(argument) {
          //update
          //update scroll when needed
          $(window).on('resize', function() {
            setTimeout(function() {
              $('.app-content').perfectScrollbar('update');
            }, 500);
          });
          setTimeout(function() {
            $('.ps').perfectScrollbar('update');
          }, 500);
        })();
      },
      unmatch: function() {
        $('.ps').each(function(index, el) {
          $(this).perfectScrollbar('destroy');
        });
      }
    });
  },
  sidebarAlerts: function(action) {
    var alerts_button = $('#main-alerts'),
      sidebar_a = $('.sidebar--alerts'),
      closeElement = $('.sidebar--alerts #close-sidebar'),
      closeSingle = $('.flex-block__close'),
      openClass = 'sidebar--open';

    var openSidebarA = function() {
      sidebar_a.addClass(openClass);
    };
    var closeSidebarA = function() {
      sidebar_a.removeClass(openClass);
    };

    alerts_button.on('click', function(e) {
      e.stopPropagation();
      openSidebarA();
    });

    sidebar_a.on('click', '#close-sidebar', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeSidebarA();
    });
    sidebar_a.find(closeSingle).on('click', function(e) {
      e.stopPropagation();
      $(this)
        .closest('.flex-block')
        .animateAndRemove('fadeOut');
    });

    sidebar_a.on('click', '.sidebar__footer .btn', function(e) {
      sidebar_a.find('.sidebar__list .flex-block').animateAndRemove('fadeOut');
    });

    sidebar_a.on('click', function(e) {
      e.stopPropagation();
    });

    $('.main-content, .main-sidebar, .main-head').on('click', function() {
      closeSidebarA();
    });
  },
  sidebarNotifications: function(action) {
    var notifications_button = $('#main-notifications'),
      sidebar_n = $('.sidebar--notifications'),
      closeElement = $('.sidebar--notifications #close-sidebar'),
      closeSingle = $('.flex-block__close'),
      openClass = 'sidebar--open';

    var openSidebarN = function() {
      sidebar_n.addClass(openClass);
    };
    var closeSidebarN = function() {
      sidebar_n.removeClass(openClass);
    };

    notifications_button.on('click', function(e) {
      e.stopPropagation();
      openSidebarN();
    });

    sidebar_n.on('click', '#close-sidebar', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeSidebarN();
    });
    sidebar_n.find(closeSingle).on('click', function(e) {
      e.stopPropagation();
      $(this)
        .closest('.flex-block')
        .animateAndRemove('fadeOut');
    });
    sidebar_n.on('click', '.sidebar__footer .btn', function(e) {
      sidebar_n.find('.sidebar__list .flex-block').animateAndRemove('fadeOut');
    });

    sidebar_n.on('click', function(e) {
      e.stopPropagation();
    });

    $('.main-content, .main-sidebar, .main-head').on('click', function() {
      closeSidebarN();
    });
  },
  settingsMenu: function(action) {
    //settings menu dropdown

    $('.menu-aside > li').each(function(index, el) {
      if ($(this).children('.menu-aside__submenu').length) {
        $(this).addClass('has-submenu');
      }
    });
    $(document).on('click', '.menu-aside > li.has-submenu', function(e) {
      e.stopPropagation();
      $(this).addClass('submenu-open');
    });
    $(document).on('click', '.menu-aside > li.has-submenu.submenu-open ul', function(e) {
      e.stopPropagation();
    });
    $(document).on('click', '.menu-aside > li.has-submenu.submenu-open', function(e) {
      e.stopPropagation();
      $(this).removeClass('submenu-open');
    });
      var el = $('.menu-aside-container');
    $('.app-content').bind('mousewheel DOMMouseScroll MozMousePixelScroll touchmove', function(e) {
        var toTop = $('.main-head').outerHeight(),
        isPositionFixed = el.css('position') === 'fixed';

      if ($(this).scrollTop() > toTop && !isPositionFixed) {
        el.addClass('menu-aside-container--fixed');
      }
      if ($(this).scrollTop() - 100 < toTop && isPositionFixed) {
        el.removeClass('menu-aside-container--fixed');
      }
    });
      $('.grid-container.grid-container--2col .grid-col--menu .menu-aside:not(.menu-aside--links) li:not(.has-submenu) a').on('click touchstart',function (e) {
          el.addClass('menu-aside-container--fixed');
      })
  },
  frameworkPage: function() {
    var frameworkPage = $('.page-framework');
    //limit
    if (!frameworkPage.length) {
      return false;
    }
    //links
    $(document).on('click', 'page-framework a', function(e) {
      e.preventDefault(); // same thing as above
      return false;
    });
    //height
    $('[data-children-height="equal"] >div').matchHeight();
    APP.components.pagePreloader('off');
  },
  breadcrumbs: function(first, second) {
    // var firstLi = $('.breadcrumbs li:first-child > a'),
    //     secondLi = $('.breadcrumbs li:nth-child(2) .ddown__init a');
    // if (second === undefined || second === null) {
    //     firstLi.html(first);
    // } else {
    //     firstLi.html(first);
    //     secondLi.html(second);
    // }
  },
  tabScroll: function() {
    var self = this;
    // console.log(singleTabsWidth);
    // console.log(tabBarWidth);
    var job = function() {
      setTimeout(function() {
        var tabContainer = $('.card--tabs').find('.mdl-tabs'),
          tabBar = tabContainer.find('.mdl-tabs__tab-bar'),
          arrowLeft = tabContainer.find('.mdl-tabs__arrow--left'),
          arrowRight = tabContainer.find('.mdl-tabs__arrow--right');
        arrowLeft.on('click', function() {
          tabBar.velocity({
            left: '-=' + '20px'
          });
        });
        arrowRight.on('click', function() {
          tabBar.velocity({
            left: '+=' + '20px'
          });
        });
        $('.card--tabs').each(function(index, el) {
          var tabContainer = $(el).find('.mdl-tabs'),
            tabBar = tabContainer.find('.mdl-tabs__tab-bar'),
            tabBarWidth = tabContainer.find('.mdl-tabs__tab-bar').outerWidth(true),
            singleTabsWidth = 0,
            singleTab = tabContainer.find('.mdl-tabs__tab'),
            scrollDistance = singleTab.outerWidth() * 2,
            transition = 300;
          tabBar.find('.mdl-tabs__tab').each(function() {
            singleTabsWidth += $(this).outerWidth();
          });
          console.log(tabBarWidth);
          console.log(singleTabsWidth);
          if (singleTabsWidth > tabBarWidth) {
            tabContainer.addClass('mdl-tabs--arows');
          } else {
            tabContainer.removeClass('mdl-tabs--arows');
          }
        });
      }, 300);
    };
    $(window).on('resize', function() {
      job();
    });
    if ($('.grid-stack').length) {
      $('.grid-stack').on('change', function(event, ui) {
        job();
      });
    }
  }
};
Antares.prototype.animations = {
  //animator
  animator: function(elem, animation) {
    if (!elem || elem === undefined || elem === null) console.log('bad argument');
    $(elem).removeClass('animated');
    $(elem).addClass(animation);
    setTimeout(function() {
      $(elem).removeClass(animation);
      // console.log('Animation Completed.');
    }, 1000);
  },
  animate: function() {
    var self = this;
    enquire.register('screen and (min-width:768px)', {
      match: function() {
        // animator('.main-head', 'animated fadeInDown');
        self.animator('aside', 'animated fadeInLeft');
      },
      unmatch: function() {
        // animator('.main-head', 'animated fadeInDown');
        self.animator('aside', 'animated fadeInLeft');
      }
    });
  },
  appAnime: function() {
    // console.log(anime.easings);
    // anime({
    //     targets: '.card',
    //     scale: [1, .98, 1],
    //     delay: function(el, index) {
    //         return index * 2.7;
    //     },
    //     direction: 'alternate',
    //     loop: false,
    //     elasticity: 0,
    //     easing: 'easeInOutQuad',
    //     // width: 100,
    //     opacity: {
    //         value: 0.5,
    //         duration: 30
    //     },
    // });
    // anime({
    //     targets: '.submenu',
    //     scale: [1, .98, 1],
    //     delay: function(el, index) {
    //         return index * 2.7;
    //     },
    //     direction: 'alternate',
    //     loop: false,
    //     elasticity: 0,
    //     easing: 'easeInOutQuad',
    //     // width: 100,
    //     opacity: {
    //         value: 0.1,
    //         duration: 30
    //     },
    //     begin: function() {
    //         // $('.form-block').css('opacity', '0');
    //     },
    //     update: function() {
    //         // $('.form-block').css('opacity', '0.2');
    //     },
    // });
  }
};
Antares.prototype.RWD = {
  init: function() {
    this.RWDplugin();
    $('.card--tabs').rwdHelper('card--slim', '860', '1200');
    $('.main-head').rwdHelper('main-head--slim', '1050');
    $('.page-dashboard .card--chart').rwdHelper('card-chart--slim', '780');

    // card logs scrolling
    enquire.register('screen and (max-width:768px)', {
      match: function() {
        // here
        // $('.app-content').
      },
      unmatch: function() {}
    });
  },
  RWDplugin: function() {
    $.fn.rwdHelper = function(rwdClass, limitInPx, activationBreakpoint) {
      var self = this;
      if (activationBreakpoint === undefined || null) {
        activationBreakpoint = 0;
      }
      var job = function() {
        if ($(window).width() > activationBreakpoint) {
          if (self.outerWidth() <= limitInPx) {
            self.addClass(rwdClass);
          } else {
            self.removeClass(rwdClass);
          }
        } else {
          self.removeClass(rwdClass);
        }
      };
      $(window).on('resize', function() {
        job();
      });
      job();
    };
  }
};
//not needed
require('./antares_notifications.js');
//fire on document ready
$(function() {
  window.APP = new Antares();
  APP.init();
});
// function displayNotification(type) {
//     noty(APP.noti.type);
// }
//graveyard
// Antares.prototype.destroy = function() {
//     setTimeout(function() {
//         $('body').hide(3000);
//     }, 2000);
//     console.log('hiding...');
//     return true;
// };
// Antares.prototype.bulid = function() {
//     setTimeout(function() {
//         $('body').show(3000);
//     }, 2000);
//     console.log('showing...');
//     return true;
// };
// Antares.prototype.helpers = {
//     logger: function() {
//         console.log(message + " running accordingly.");
//     },
//     positiveNumber: function(argument) {
//         var sandbox = parseInt(argument, 10);
//         if (isNaN(sandbox)) {
//             console.log('Not a Number');
//             return false;
//         }
//         positive = -sandbox > 0 ? -sandbox : sandbox;
//         return positive;
//     },
//     initComponent: function(name, description) {
//         if (typeof name === "function") {
//             name();
//         } else {
//             console.log('||||| Not a Correct Function, im afraid!');
//         }
//         if (typeof description !== 'undefined') logger(description);
//     }
// };
