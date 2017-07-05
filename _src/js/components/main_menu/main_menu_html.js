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

// import area
// import { enquire } from 'enquire.js';

import { activeElement } from './active_element.js';

const AntaresMainMenuHtml = {

    init() {
        this.documentReady();
        this.openSubmenu();
        this.openSecondMenu();
        this.mobileOpenMenu();
        this.mobileOpenBottomMenu();
        this.mobileOpenBrand();
        this.tooltips();
    },

    // methods
    tooltips() {
        require('./../menu_tooltips/menu_tooltips.js');
    },
    documentReady() {
        $('.more-trigger').css('top', $('.menu-scroll').height());   //for animation
        $('.main-menu--secondary>li').css('opacity', '0');   //for animation
        $('.main-menu--primary>li').css('opacity', '1');   //for animation
    },
    openSubmenu() {
        enquire.register('screen and (min-width: 768px)', {
            match: function () {
                var parent = $('.main-menu-html');
                parent.find('.main-menu__brand').mouseover(function () {
                    if ($(this).hasClass('has-submenu')) {
                        $(this).addClass('submenu-open');
                    }
                });
                parent.find('.main-menu__brand').mouseleave(function () {
                    if ($(this).hasClass('has-submenu')) {
                        $(this).removeClass('submenu-open');
                    }
                });

                var li = $('.main-menu:not(.main-menu--brand)').find('>li');

                $('.main-menu:not(.main-menu--brand)').each(function () {
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
                    setTimeout(function () {
                        li.removeClass('submenu-open');
                        li.removeClass('hovered');
                    }, 200);

                }
            }
        });
        enquire.register('screen and (max-width: 767px)', {
            match: function () {
                var parent = $('.main-menu-html');
                parent.find('.has-submenu').click(function () {
                    if ($(this).hasClass('submenu-open')) {
                        $(this).removeClass('submenu-open');
                        parent.find('nav').removeClass('submenu-is-active');
                    }
                    else {
                        $(this).addClass('submenu-open');
                        parent.find('nav').addClass('submenu-is-active');
                    }
                });
            }
        });
    },
    openSecondMenu() {
        var parent = $('.main-menu-html'),
            openSecond = false,
            statusAnimation = false;

        parent.find('.more-trigger__inner').click(function () {
            if ($('.more-trigger').hasClass('is-expanded')) {
                $('.more-trigger').removeClass('is-expanded');
                openSecond = false;

                //ANIMATION SECOND TO FIRST
                statusAnimation = true;
                $('.nav-container').addClass('animation-active');
                if (statusAnimation === true) {
                    $('.more-trigger').addClass('ripple-off-active');
                    setTimeout(function () {
                        $('.main-menu--secondary>li').css('opacity', '0');
                        $('.more-trigger').css('top', $('.menu-scroll').height());
                        parent.css('background-color', '#30343d');
                    }, 100);
                    setTimeout(function () {
                        $('.main-menu--primary>li').css('opacity', '1');
                    }, 300);
                    setTimeout(function () {
                        statusAnimation = false;
                        $('.nav-container').removeClass('animation-active');
                        $('.more-trigger').removeClass('ripple-off-active');
                    }, 500);
                }
                //ANIMATION SECOND TO FIRST     END
            }
            else {
                $('.more-trigger').addClass('is-expanded');
                openSecond = true;

                //ANIMATION FIRST TO SECOND
                statusAnimation = true;
                $('.nav-container').addClass('animation-active');
                if (statusAnimation === true) {
                    $('.more-trigger').addClass('ripple-on-active');
                    setTimeout(function () {
                        $('.main-menu--secondary>li').css('opacity', '1');
                        $('.main-menu--primary>li').css('opacity', '0');
                        $('.more-trigger').css('top', $('.menu-scroll').height());
                    }, 100);
                    setTimeout(function () {
                        parent.css('background-color', 'rgb(62, 73, 84)');
                    }, 300);
                    setTimeout(function () {
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
            }
            else {
                parent.find('.menu-scroll').addClass('open-second-menu');
                parent.find('nav').removeClass('submenu-is-active');
            }
        });
    },
    mobileOpenMenu() {
        enquire.register('screen and (max-width: 767px)', {  //Click on 'burger' on top left on mobile mode
            match: function () {
                var parent = $('.main-menu-html');
                parent.next('.app-content').find('.burgericon').click(function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $('#app-wrapper').removeClass('mobile-menu-active');
                    }
                    else {
                        $(this).addClass('active');
                        $('#app-wrapper').addClass('mobile-menu-active');
                    }
                });
            }
        });
    },
    mobileOpenBottomMenu() {
        enquire.register('screen and (max-width: 767px)', {
            match: function () {
                var parent = $('.main-menu-html');
                parent.find('.mobile-ddowns__sgl').click(function () {
                    if ($(this).hasClass('mobile-ddowns__sgl--open')) {
                        $(this).removeClass('mobile-ddowns__sgl--open');
                        if ($(this).hasClass('ddown--logged')) {
                            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
                        }
                        else {
                            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
                        }
                    }
                    else {
                        $(this).addClass('mobile-ddowns__sgl--open');
                        if ($(this).hasClass('ddown--logged')) {
                            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
                        }
                        else {
                            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
                        }
                    }
                });
                $(document).mouseup(function (e) {
                    var container = $(".mobile-ddowns");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
                        $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
                    }
                });
            }
        });
    },
    mobileOpenBrand() {
        enquire.register('screen and (max-width: 767px)', {
            match: function () {
                $('.main-menu__brand').click(function () {
                    if ($('.main-menu--primary>li').hasClass('submenu-open')) {
                        $('nav').addClass('submenu-is-active');
                    }
                    if ($('.main-menu__brand').hasClass('submenu-open')) {
                        $(this).closest('.menu-scroll').find('.main-menu--primary').css('height', '0');
                        $(this).closest('.menu-scroll').find('.main-menu--secondary').css('height', '0');
                    }
                    else {
                        $(this).closest('.menu-scroll').find('.main-menu--primary').css('height', 'auto');
                        $(this).closest('.menu-scroll').find('.main-menu--secondary').css('height', 'auto');
                    }
                });
            }
        });
    },
};

$(function () {
    window.AntaresMainMenuHtml = AntaresMainMenuHtml;
    AntaresMainMenuHtml.init();
});

