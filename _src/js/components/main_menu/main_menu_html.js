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

// import area
// import { enquire } from 'enquire.js';
import { antaresCfg } from './../../../config/antares_cfg';
import menuAim from 'jquery-menu-aim';

let menuTopActive;

if (antaresCfg.mainMenuType === 'top') {
  // menuTopActive = antaresCfg.mainMenuType;
  menuTopActive = true;
}

const AntaresMainMenuHtml = {
  init() {
    this.documentReady();
    this.mobileDisabledTopMenu();
    this.columnsTopMenu();
    this.openSubmenu();
    this.openSecondMenu();
    this.mobileOpenMenu();
    this.mobileOpenBottomMenu();
    this.mobileOpenBrand();
    this.tooltips();
    this.triggerResizeTopHeight();
  },

  // methods
  triggerResizeTopHeight() {
    $(window).resize(function() {
      $('.more-trigger').css('top', $('.menu-scroll').height());
    });
  },
  documentReady() {
    if (menuTopActive === true) {
      enquire.register('screen and (max-width: 1023px)', {
        //dla tableta
        match: function() {
          $('.burgericon').click(function() {
            if ($('#app-wrapper').hasClass('main-sidebar--top--mobile')) {
              setTimeout(function() {
                $('.more-trigger').css('top', $('.menu-scroll').height()); //for animation
              }, 200);
            }
          });
        }
      });
      enquire.register('screen and (min-width: 1024px)', {
        match: function() {
          $('.more-trigger').css('top', $('.menu-scroll').height()); //for animation
          $('.main-menu--secondary>li').css('opacity', '0'); //for animation
          $('.main-menu--primary>li').css('opacity', '1'); //for animation
        }
      });
    } else {
      $('.more-trigger').css('top', $('.menu-scroll').height()); //for animation
      $('.main-menu--secondary>li').css('opacity', '0'); //for animation
      $('.main-menu--primary>li').css('opacity', '1'); //for animation
    }
  },
  openSubmenu() {
    if (menuTopActive === true) {
      enquire.register('screen and (max-width: 1023px)', {
        //dla tableta
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.has-submenu').click(function() {
            if ($('#app-wrapper').hasClass('main-sidebar--top--mobile')) {
              if ($(this).hasClass('submenu-open')) {
                $(this).removeClass('submenu-open');
                parent.find('nav').removeClass('submenu-is-active');
              } else {
                $(this).addClass('submenu-open');
                parent.find('nav').addClass('submenu-is-active');
              }
            }
          });
        }
      });
      enquire.register('screen and (min-width: 1024px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.main-menu__brand').mouseover(function() {
            if ($(this).hasClass('has-submenu')) {
              $(this).addClass('submenu-open');
            }
          });
          parent.find('.main-menu__brand').mouseleave(function() {
            if ($(this).hasClass('has-submenu')) {
              $(this).removeClass('submenu-open');
            }
          });

          var li = $('.main-menu:not(.main-menu--brand)').find('>li');

          $('.main-menu:not(.main-menu--brand)').each(function() {
            $(this).menuAim({
              activate: activateSubmenu,
              exitMenu: deactivateSubmenu,
              rowSelector: '> li',
              submenuSelector: '*',
              submenuDirection: 'right'
            });
          });

          function activateSubmenu(row) {
            var currentLi = $(row);
            li.removeClass('hovered');
            $('.main-menu--brand > li').removeClass('hovered submenu-open');
            currentLi.addClass('hovered');
            //if has submenu
            if (currentLi.children('.submenu').length) {
              li.removeClass('submenu-open');
              currentLi.addClass('submenu-open');
            } else {
              li.removeClass('submenu-open');
            }
          }

          function deactivateSubmenu() {
            setTimeout(function() {
              li.removeClass('submenu-open');
              li.removeClass('hovered');
            }, 200);
          }

          $('.main-menu>li').menuAim('destroy');
          $('.main-menu').menuAim('destroy');
          $('.main-menu:not(.main-menu--brand)').menuAim('destroy');
        }
      }); // dla compa
    } else {
      enquire.register('screen and (min-width: 768px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.main-menu__brand').mouseover(function() {
            if ($(this).hasClass('has-submenu')) {
              $(this).addClass('submenu-open');
            }
          });
          parent.find('.main-menu__brand').mouseleave(function() {
            if ($(this).hasClass('has-submenu')) {
              $(this).removeClass('submenu-open');
            }
          });

          var li = $('.main-menu:not(.main-menu--brand)').find('>li');

          $('.main-menu:not(.main-menu--brand)').each(function() {
            $(this).menuAim({
              activate: activateSubmenu,
              exitMenu: deactivateSubmenu,
              rowSelector: '> li',
              submenuSelector: '*',
              submenuDirection: 'right'
            });
          });

          function activateSubmenu(row) {
            var currentLi = $(row);
            li.removeClass('hovered');
            $('.main-menu--brand > li').removeClass('hovered submenu-open');
            currentLi.addClass('hovered');
            //if has submenu
            if (currentLi.children('.submenu').length) {
              li.removeClass('submenu-open');
              currentLi.addClass('submenu-open');
            } else {
              li.removeClass('submenu-open');
            }
          }

          function deactivateSubmenu() {
            setTimeout(function() {
              li.removeClass('submenu-open');
              li.removeClass('hovered');
            }, 200);
          }
        }
      });
      enquire.register('screen and (max-width: 767px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.has-submenu').click(function() {
            if ($(this).hasClass('submenu-open')) {
              $(this).removeClass('submenu-open');
              parent.find('nav').removeClass('submenu-is-active');
            } else {
              $(this).addClass('submenu-open');
              parent.find('nav').addClass('submenu-is-active');
            }
          });
        }
      });
    }
  },
  openSecondMenu() {
    var parent = $('.main-menu-html'),
      openSecond = false,
      statusAnimation = false;

    parent.find('.more-trigger__inner').click(function() {
      if ($('.more-trigger').hasClass('is-expanded')) {
        $('.more-trigger').removeClass('is-expanded');
        openSecond = false;

        //ANIMATION SECOND TO FIRST
        statusAnimation = true;
        $('.nav-container').addClass('animation-active');
        if (statusAnimation === true) {
          $('.more-trigger').addClass('ripple-off-active');
          setTimeout(function() {
            $('.main-menu--secondary>li').css('opacity', '0');
            $('.more-trigger').css('top', $('.menu-scroll').height());
            parent.css('background-color', '#30343d');
          }, 100);
          setTimeout(function() {
            $('.main-menu--primary>li').css('opacity', '1');
          }, 300);
          setTimeout(function() {
            statusAnimation = false;
            $('.nav-container').removeClass('animation-active');
            $('.more-trigger').removeClass('ripple-off-active');
          }, 500);
        }
        //ANIMATION SECOND TO FIRST     END
      } else {
        $('.more-trigger').addClass('is-expanded');
        openSecond = true;

        //ANIMATION FIRST TO SECOND
        statusAnimation = true;
        $('.nav-container').addClass('animation-active');
        if (statusAnimation === true) {
          $('.more-trigger').addClass('ripple-on-active');
          setTimeout(function() {
            $('.main-menu--secondary>li').css('opacity', '1');
            $('.main-menu--primary>li').css('opacity', '0');
            $('.more-trigger').css('top', $('.menu-scroll').height());
          }, 100);
          setTimeout(function() {
            parent.css('background-color', 'rgb(62, 73, 84)');
          }, 300);
          setTimeout(function() {
            statusAnimation = false;
            $('.nav-container').removeClass('animation-active');
            $('.more-trigger').removeClass('ripple-on-active');
          }, 500);
        }
        //ANIMATION FIRST TO SECOND    END
      }
      if (openSecond === false) {
        parent.find('.menu-scroll').removeClass('open-second-menu');
        parent.find('.has-submenu').removeClass('submenu-open');
        parent.find('nav').removeClass('submenu-is-active');
      } else {
        parent.find('.menu-scroll').addClass('open-second-menu');
        parent.find('nav').removeClass('submenu-is-active');
      }
    });
  },
  mobileOpenMenu() {
    var parent = $('.main-menu-html');
    parent.next('.app-content').find('.burgericon').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#app-wrapper').removeClass('mobile-menu-active');
      } else {
        $(this).addClass('active');
        $('#app-wrapper').addClass('mobile-menu-active');
      }
    });
  },
  mobileOpenBottomMenu() {
    if (menuTopActive === true) {
      var parent = $('.main-menu-html');
      parent.find('.mobile-ddowns__sgl').click(function() {
        if ($(this).hasClass('mobile-ddowns__sgl--open')) {
          $(this).removeClass('mobile-ddowns__sgl--open');
          if ($(this).hasClass('ddown--logged')) {
            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          } else {
            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
          }
        } else {
          $(this).addClass('mobile-ddowns__sgl--open');
          if ($(this).hasClass('ddown--logged')) {
            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          } else {
            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
          }
        }
      });
      $(document).mouseup(function(e) {
        var container = $('.mobile-ddowns');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
        }
      });
    } else {
      enquire.register('screen and (max-width: 767px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.mobile-ddowns__sgl').click(function() {
            if ($(this).hasClass('mobile-ddowns__sgl--open')) {
              $(this).removeClass('mobile-ddowns__sgl--open');
              if ($(this).hasClass('ddown--logged')) {
                $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              } else {
                $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
              }
            } else {
              $(this).addClass('mobile-ddowns__sgl--open');
              if ($(this).hasClass('ddown--logged')) {
                $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              } else {
                $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
              }
            }
          });
          $(document).mouseup(function(e) {
            var container = $('.mobile-ddowns');
            if (
              !container.is(e.target) &&
              container.has(e.target).length === 0
            ) {
              $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
            }
          });
        }
      });
    }
  },
  mobileOpenBrand() {
    if (menuTopActive === true) {
      $('.main-menu__brand').click(function() {
        if ($('.main-menu__brand').hasClass('submenu-open')) {
          $(this).closest('.menu-scroll').addClass('brand-open');
        } else {
          $(this).closest('.menu-scroll').removeClass('brand-open');
          $('nav').removeClass('submenu-is-active');
        }
        if ($('.main-menu--primary>li').hasClass('submenu-open')) {
          $('nav').addClass('submenu-is-active');
        }
      });
    } else {
      enquire.register('screen and (max-width: 767px)', {
        match: function() {
          $('.main-menu__brand').click(function() {
            if ($('.main-menu--primary>li').hasClass('submenu-open')) {
              $('nav').addClass('submenu-is-active');
            }
            if ($('.main-menu__brand').hasClass('submenu-open')) {
              $(this)
                .closest('.menu-scroll')
                .find('.main-menu--primary')
                .css('height', '0');
              $(this)
                .closest('.menu-scroll')
                .find('.main-menu--secondary')
                .css('height', '0');
            } else {
              $(this)
                .closest('.menu-scroll')
                .find('.main-menu--primary')
                .css('height', 'auto');
              $(this)
                .closest('.menu-scroll')
                .find('.main-menu--secondary')
                .css('height', 'auto');
            }
          });
        }
      });
    }
  },
  tooltips() {
    require('./../menu_tooltips/menu_tooltips.js');
  },
  columnsTopMenu() {
    if (menuTopActive === true) {
      enquire.register('screen and (min-width: 1024px)', {
        // dla compa
        match: function() {
          $('.main-sidebar--top  li.has-submenu').hover(function() {
            if ($('#app-wrapper').hasClass('main-sidebar--top')) {
              console.log('hover');
              var ul = $('li.submenu-open .submenu__content > .data-list');
              if (ul.height() > 400) {
                console.log('work');
                ul.find('li').addClass('li-columns');
              }
              $('.menu-scroll').removeClass('brand-open');
            }
          });
        }
      });
    }
  },
  mobileDisabledTopMenu() {
    if (menuTopActive === true) {
      enquire.register('screen and (max-width: 1023px)', {
        //dla tablet
        match: function() {
          $('#app-wrapper').removeClass('main-sidebar--top');
          $('#app-wrapper').addClass('main-sidebar--top--mobile');
        },
        unmatch: function() {
          $('#app-wrapper').addClass('main-sidebar--top');
          $('#app-wrapper').removeClass('main-sidebar--top--mobile');
          $('#app-wrapper').removeClass('mobile-menu-active');
        }
      });
    }
  }
};

$(() => {
  window.AntaresMainMenuHtml = AntaresMainMenuHtml;
  AntaresMainMenuHtml.init();
});
