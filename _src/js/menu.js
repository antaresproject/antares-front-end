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


;
(function(window) {

    require('jquery-menu-aim');


    $(function() {

        //VARIABLES

        var animClass1 = 'animated fadeInLeft',
            menuToggle = $('.burgericon'),
            menu = $('.main-menu:not(.main-menu--brand)'),
            siteWrapper = $('#app-wrapper'),
            li = $('.main-menu:not(.main-menu--brand)').find('>li'),
            a = $('.main-menu a'),
            aside = $('aside');


        //add submenu and active class
        li.each(function(index, el) {

            var liName = $(this).data('name'),
                bodyID = $('body').data('id');

            // if ($(this).children('.submenu').length) {
            //     $(this).addClass('has-submenu');
            // } 
            // if ($(this).data('name') === bodyID && bodyID) {
            //     $(this).addClass('is-active');
            // }

        });

        //limit
        if (!menu.length) {
            return false;
        }

        //SMALL SCREEN
        //Screen Size <768
        enquire.register("screen and (max-width:767px)", {





            match: function() {


                // detach
                $('nav *').off('.menubig');
                // console.log('DETACH MFKR NAV BIG!');



                var hammerTarget = document.getElementById('app-wrapper'),
                    hammer = new Hammer.Manager(hammerTarget),
                    swipe = new Hammer.Swipe(),
                    tap = new Hammer.Tap(),
                    press = new Hammer.Tap();

                $(".main-menu:not(.main-menu--brand)").each(function(index, el) {

                    $(this).menuAim({

                        activate: function() {

                        },
                        exitMenu: function() {

                        },

                        // Selector for identifying which elements in the menu are rows
                        // that can trigger the above events. Defaults to "> li".
                        rowSelector: "> li",

                        // You may have some menu rows that aren't submenus and therefore
                        // shouldn't ever need to "activate." If so, filter submenu rows w/
                        // this selector. Defaults to "*" (all elements).
                        submenuSelector: "*",

                        // Direction the submenu opens relative to the main menu. This
                        // controls which direction is "forgiving" as the user moves their
                        // cursor from the main menu into the submenu. Can be one of "right",
                        // "left", "above", or "below". Defaults to "right".
                        submenuDirection: "right"
                    });

                });




                //toggle menu - click
                $(document).on('click.menusmall', '.burgericon', function(e) {
                    menuToggle.toggleClass('active');
                    siteWrapper.toggleClass('mobile-menu-active');
                    return false;
                });

                //disable links
                menu.find('.main menu >li a').addClass('disabled');

                hammer.add(new Hammer.Swipe());

                //toggle menu - swipe
                $(document).hammer().on('swipeleft.menusmall', '#app-wrapper', function() {
                    menuToggle.toggleClass('active');
                    siteWrapper.removeClass('mobile-menu-active');
                    console.log('SWIPE MENU CLOSED');
                });

                $(document).hammer().on('swiperight.menusmall', '#app-wrapper', function() {
                    menuToggle.toggleClass('active');
                    siteWrapper.addClass('mobile-menu-active');
                    console.log('SWIPE MENU OPEN');
                });

                //Tap - submenu
                // hammer.add(new Hammer.Tap());
                $('.main-menu:not(.main-menu--brand) li.has-submenu:not(.more-trigger)').on('click.menusmall', function(ev) {

                    //add
                    // $(this).closest('.main-menu').scrollTop(0);
                    // $(this).closest('.main-menu').addClass('no-scroll');

                    // $(this).closest('.main-menu').addClass('submenu-opened');

                    $('.main-menu li').removeClass('submenu-open');
                    $(this).addClass('submenu-open');
                    //new mechanics - rwd menu | tmp
                    $(this).closest('nav').addClass('submenu-is-active');
                    if ($(this).closest('.main-menu--brand').length) {

                        $(this).closest('nav').addClass('submenu-is-active--brand');

                    }

                    $('.menu-scroll').css('height', '100vh');



                });


                //brand
                $('.main-menu--brand li').on('click.menusmall', function(ev) {

                    $(this).addClass('submenu-open');
                    $('.menu-scroll').css('height', '100vh');

                    //add
                    // $(this).closest('.main-menu').scrollTop(0);
                    // $(this).closest('.main-menu').addClass('no-scroll');
                    // $(this).closest('.main-menu').addClass('submenu-opened');

                });


                //scrOLL TOP
                $('.main-menu li').on('click.menusmall', function(ev) {

                    $('.menu-scroll').scrollTop(0);

                });

                //Press - Act as link
                // hammer.add(new Hammer.Press());

                $('.main-menu li').on('click.menusmall', function(ev) {

                    var href = $(this).find(a).attr('href');
                    window.location.replace(href);

                });

                //menu RWD 
                // GO back - submenu
                $(document).on('click.menusmall', '.submenu__mobile-return', function() {

                    if ($(this).closest('.main-menu--brand').length) {

                        $(this).closest('nav').removeClass('submenu-is-active--brand');
                    }

                    $('.menu-scroll').css('height', 'auto');
                    $('.menu-scroll').scrollTop(0);
                    //new mechanics - rwd menu
                    $(this).closest('li').toggleClass('submenu-open');
                    $(this).closest('.main-menu').removeClass('no-scroll');
                    //  $(this).closest('.main-menu').removeClass('submenu-opened');

                    $(this).closest('nav').removeClass('submenu-is-active');

                });


            },
            unmatch: function() {


                // $('nav *').off("click.menusmall");
                // menuToggle.off("click.menusmall");
                // siteWrapper.off("mouseleave.menusmall");
                // a.off("click.linkdisable");
                // $('.main-menu li').off("press.menusmall");
                // $('.main-menu li').off("tap.menusmall");
                // $('.main-menu li').off("swiperight.menusmall");
                // $('.main-menu li').off("swipeleft.menusmall");
                menu.find('li a').removeClass('disabled');
            }
        });


        //BIG SCREEN

        // //Screen Size <768
        enquire.register("screen and (min-width:768px)", {

            match: function() {


                // detach
                $('nav *').off('.menusmall');
                // console.log('DETACH MFKR NAV SMALL!');


                //aim menu - NO LAG VERSION 
                //exclude brand menu


                //Reset AIM on mobile (disable)
                $(".main-menu:not(.main-menu--brand)").each(function(index, el) {

                    $(this).menuAim({

                        activate: activateSubmenu,
                        exitMenu: deactivateSubmenu,

                        // Selector for identifying which elements in the menu are rows
                        // that can trigger the above events. Defaults to "> li".
                        rowSelector: "> li",

                        // You may have some menu rows that aren't submenus and therefore
                        // shouldn't ever need to "activate." If so, filter submenu rows w/
                        // this selector. Defaults to "*" (all elements).
                        submenuSelector: "*",

                        // Direction the submenu opens relative to the main menu. This
                        // controls which direction is "forgiving" as the user moves their
                        // cursor from the main menu into the submenu. Can be one of "right",
                        // "left", "above", or "below". Defaults to "right".
                        submenuDirection: "right"
                    });

                });

                //Separate mechanic for brand without AIM

                $('.main-menu--brand > li').on('mouseover.menubig', function() {

                    $(this).addClass('hovered submenu-open');

                });

                //off 
                aside.on('mouseleave.menubig', function() {

                    setTimeout(function() {

                        $('.main-menu--brand > li').removeClass('hovered submenu-open');

                    }, 200);

                });

                //Separate mechanic for brand without AIM | OFF

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

                function deactivateSubmenu(row) {

                    setTimeout(function() {
                        li.removeClass('submenu-open');
                        li.removeClass('hovered');
                        // console.log('actions!');
                    }, 200);

                }


            },

            unmatch: function() {

            },

        });

        // *instant action* mechanics

        //std
        // li.on('mouseover', function() {

        //     li.removeClass('hovered');
        //     $(this).addClass('hovered');

        //     //if has submenu
        //     if ($(this).children('.submenu').length) {

        //         var self = $(this);
        //         li.removeClass('submenu-open');
        //         self.addClass('submenu-open');

        //     } else {

        //       li.removeClass('submenu-open');

        //     }

        // });

        // aside.on('mouseleave.menubig', function() {
        //     setTimeout(function() {
        //         li.removeClass('submenu-open');
        //         // $('.submenu').removeClass(animClass1);
        //     }, 300);
        // });



        //MAIN MENU CUSTOM MENUS
        //MOBILE DROPOWNS:

        var menuDrodpownSingle = $('.mobile-ddowns__sgl'),
            singleOption = $('.mobile-ddowns__menu');

        //Open submenu
        $(document).on('click.menubig', '.mobile-ddowns__sgl', function(e) {

            e.stopPropagation();
            menuDrodpownSingle.not($(this)).removeClass('mobile-ddowns__sgl--open');
            $(this).toggleClass('mobile-ddowns__sgl--open');

        });

        //Close Submeu
        $(document).on('click.menubig', '#app-wrapper', function(e) {

            menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');

        });

        //select single option
        $(document).on('click.menubig', '.mobile-ddowns__menu', function(e) {

            // console.log('click');
            singleOption.removeClass('is-selected');
            $(this).addClass('is-selected');
            setTimeout(function() {
                menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');
            }, 400);

        });


        //MENU PRIMARY SECONDARY TOGGLE

        $('nav').on('click.menubig', 'li.more-trigger', function() {

            $(this).toggleClass('is-expanded');
            // $(this).find('.zmdi:nth-child(1)').toggleClass('is-hidden');
            // $(this).find('.zmdi:nth-child(2)').toggleClass('is-hidden');
            $('nav .main-menu.main-menu--primary').toggleClass('is-hidden');
            $('nav .main-menu.main-menu--secondary').toggleClass('is-hidden');

        });


    }());

})(window);
