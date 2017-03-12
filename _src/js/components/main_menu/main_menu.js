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


/*====================================================
=              Antares Main Menu Component           =
====================================================*/

/**

    TODO:
    - SUBMENUS

 */


require('script!jquery-menu-aim');


// STATE MANAGEMENT
(function(window) {

    /*----------  Vue  ----------*/

    this.antaresMainMenu = new Vue({
        el: 'main-menu',
        name: 'main-menu',
        template: '#main-menu-template',
        data: function() {
            return {
                expanded: false, // more width
                isAttachedToTop: false,
                brandButton: true,
                mobileDdowns: true,
                menuActive: 'primary',
                brandMenu: [{
                    title: 'BillEvo',
                    url: '#'
                }],
                menuList: [{
                    // PRIMARY
                    name: 'primary',
                    classList: 'main-menu--primary',
                    items: [{
                            name: 'Dashboard', // displayed text
                            title: 'dashboard', // interal use
                            url: 'index.html',
                            icon: 'zmdi-view-dashboard',
                            isActive: true,
                        }, {
                            name: 'Settings', // displayed text
                            title: 'settings', // interal use
                            url: '#',
                            icon: 'zmdi-shopping-cart',
                            isActive: false,
                            submenuTitle: 'Upper Menu',
                            submenu: [{
                                name: 'General Settings',
                                url: 'general_settings.html'
                            }, {
                                name: 'Email Settings',
                                url: 'email_settings.html'
                            }, {
                                name: 'Brand Settings',
                                url: 'brand_settings.html'
                            }]
                        }, {
                            name: 'Brand List', // displayed text
                            title: 'brand-list', // interal use
                            url: 'brand_list.html',
                            icon: 'zmdi-layers',
                            isActive: false,
                        }, {
                            name: 'Clients List', // displayed text
                            title: 'clients_list', // interal use
                            url: 'clients_list.html',
                            icon: 'zmdi-accounts',
                            isActive: false,
                        }, {
                            name: 'Clients Details', // displayed text
                            title: 'clients_details', // interal use
                            url: 'clients_details.html',
                            icon: 'zmdi-account-circle',
                            isActive: false,
                        },
                        {
                            name: 'Components', // displayed text
                            title: 'components', // interal use
                            url: '#',
                            icon: 'zmdi-layers',
                            isActive: false,
                            submenuTitle: 'Components List',
                            submenu: [{
                                name: 'Files Widget',
                                url: 'widget_files.html'
                            },]
                        },
                        {
                            name: 'Forms', // displayed text
                            title: 'forms', // interal use
                            url: '#',
                            icon: 'zmdi-group-work',
                            isActive: false,
                            submenuTitle: 'Forms Examples',
                            submenu: [{
                                name: 'Forms Vertival (default)',
                                url: 'forms.html',
                            }, {
                                name: 'Horizontal Forms Example',
                                url: 'forms-hor.html',
                            }]
                        },
                    ],
                }, {
                    // SECONDARY
                    name: 'secondary',
                    classList: 'main-menu--secondary',
                    items: [{
                            name: 'Login Page', // displayed text
                            title: 'login-page', // interal use
                            url: 'login-page.html',
                            icon: 'zmdi-audio',
                            isActive: false,
                        }, {
                            name: 'Errors', // displayed text
                            title: 'errors', // interal use
                            url: '#',
                            icon: 'zmdi-group-work',
                            isActive: false,
                            submenuTitle: 'Error Pages List',
                            submenu: [{
                                name: 'Error 400',
                                url: 'error_400.html'
                            }, {
                                name: 'Error 404',
                                url: 'error_404.html'
                            }, {
                                name: 'Error 500',
                                url: 'error_500.html'
                            }]
                        },
                        // {
                        //     name: 'WOAH', // displayed text
                        //     title: 'woah-demo', // interal use
                        //     url: 'dev-demo.html',
                        //     icon: 'zmdi-filter-list',
                        //     isActive: false,
                        // }, 
                        {
                            name: 'Steps Page', // displayed text
                            title: 'steps-page', // interal use
                            url: 'steps.html',
                            icon: 'zmdi-trending-down',
                            isActive: false,
                        }
                    ],
                }]
            };

        },
        mounted: function() {

            this.menuPosition();
            this.onReady();

        },

        methods: {

            test: function() {


                alert('asdasd');
            },

            onReady: function() {

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
                    // li.each(function(index, el) {

                    //     var liName = $(this).data('name'),
                    //         bodyID = $('body').data('id');

                    // });

                    // restrain
                    if (!menu.length) {
                        return false;
                    }


                    function activateSubmenu(row) {

                        enquire.register("screen and (min-width:768px)", {

                            match: function() {

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

                        });
                    }

                    function deactivateSubmenu(row) {

                        enquire.register("screen and (min-width:768px)", {

                            match: function() {


                                setTimeout(function() {
                                    li.removeClass('submenu-open');
                                    li.removeClass('hovered');
                                    // console.log('actions!');
                                }, 200);

                            }

                        });

                    }

                    //toggle menu - click
                    $('#app-wrapper').on('click', '.burgericon', function(e) {
                        $(this).toggleClass('active');
                        siteWrapper.toggleClass('mobile-menu-active');
                        // return false;
                    });

                    //SMALL SCREEN
                    //Screen Size <768
                    enquire.register("screen and (max-width:767px)", {

                        match: function() {

                            // detatch
                            $('nav *').off('.menubig');

                            $(".main-menu:not(.main-menu--brand)").each(function(index, el) {

                                $(this).menuAim({
                                    activate: function() {},
                                    exitMenu: function() {},
                                    rowSelector: "> li",
                                    submenuSelector: "*",
                                    submenuDirection: "right"
                                });

                            });

                            //disable links
                            menu.find('.main menu >li a').addClass('disabled');

                            $('.main-menu:not(.main-menu--brand) li.has-submenu:not(.more-trigger)').on('click.menusmall', function(ev) {


                                $('.main-menu li').removeClass('submenu-open');
                                $(this).addClass('submenu-open');
                                $(this).closest('.main-menu').addClass('nopadding');
                                //new mechanics - rwd menu | tmp
                                $(this).closest('nav').addClass('submenu-is-active');
                                if ($(this).closest('.main-menu--brand').length) {

                                    $(this).closest('nav').addClass('submenu-is-active--brand');

                                }


                            });


                            //brand
                            $('.main-menu--brand li').on('click.menusmall', function(ev) {

                                $(this).addClass('submenu-open');
                                $('.menu-scroll').css('height', '100vh');

                            });


                            //scroll top
                            $('.main-menu li').on('click.menusmall', function(ev) {

                                $('.menu-scroll').scrollTop(0);
                                $(this).closest('.main-menu').scrollTop(0);

                            });

                            $('.main-menu li').on('click.menusmall', function(ev) {

                                var href = $(this).find('a').attr('href');
                                window.location.replace(href);

                            });

                            //menu RWD 
                            // GO back - submenu
                            $('#app-wrapper').on('click.menusmall', '.submenu__mobile-return', function() {

                                if ($(this).closest('.main-menu--brand').length) {
                                    $(this).closest('nav').removeClass('submenu-is-active--brand');
                                }

                                // $('.menu-scroll').css('height', 'auto');
                                $('.menu-scroll').scrollTop(0);
                                //new mechanics - rwd menu
                                $(this).closest('li').toggleClass('submenu-open');
                                $(this).closest('.main-menu').removeClass('no-scroll');
                                $(this).closest('.main-menu').removeClass('nopadding');
                                //  $(this).closest('.main-menu').removeClass('submenu-opened');

                                $(this).closest('nav').removeClass('submenu-is-active');

                            });


                        },
                        unmatch: function() {
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
                                    rowSelector: "> li",
                                    submenuSelector: ".has-submenu",
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

                        },

                        unmatch: function() {

                        },

                    });

                    //MAIN MENU CUSTOM MENUS
                    //MOBILE DROPOWNS:

                    var menuDrodpownSingle = $('.mobile-ddowns__sgl'),
                        singleOption = $('.mobile-ddowns__menu');

                    //Open submenu
                    $('#app-wrapper').on('click.menubig', '.mobile-ddowns__sgl', function(e) {

                        e.stopPropagation();
                        menuDrodpownSingle.not($(this)).removeClass('mobile-ddowns__sgl--open');
                        $(this).toggleClass('mobile-ddowns__sgl--open');

                    });

                    //Close Submeu
                    $('#app-wrapper').on('click.menubig', '#app-wrapper', function(e) {

                        menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');

                    });

                    //select single option
                    $('#app-wrapper').on('click.menubig', '.mobile-ddowns__menu', function(e) {

                        // console.log('click');
                        singleOption.removeClass('is-selected');
                        $(this).addClass('is-selected');
                        setTimeout(function() {
                            menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');
                        }, 400);

                    });


                }());
            },

            menuDdownActivate: function() {

            },

            menuSwitcher: function() {

                var self = this;

                if (self.menuActive === null && self.menuActive === undefined) {

                    return null;
                }

                if (self.menuActive === 'primary') {

                    this.menuActive = 'secondary';

                } else {

                    this.menuActive = 'primary';
                }

            },
            menuPosition: function() {

                // expadned (wide state)
                if (this.expanded === true) {
                    $('#app-wrapper').addClass('main-sidebar--expanded');
                }

            }
        },


    })

})(this);

/*=====   Antares Main Menu Component | END ======*/
