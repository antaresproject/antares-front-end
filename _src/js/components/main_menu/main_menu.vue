<template>
    <!-- App sidebar -->
    <div class="nav-container"
         v-bind:class="{'animation-active': mm.animationActive, 'main-sidebar--ca': mm.menuType === 'mm.clientarea' }">
        <div v-if="mm.debugIndicator" class="menu-indicator">{{mm.menuActive}}</div>
        <nav>
            <!-- Main Menu -->
            <div class="menu-scroll">
                <ul class="main-menu main-menu--brand">
                    <li v-bind:class="{'is-relative': mm.menuLock}" class="main-menu__brand">
                        <a href="#">
                            <div class="main-sidebar__logo"></div>
                        </a>
                        <div class="submenu submenu--system js-flex-start">
                            <a href="#" class="submenu__mobile-return">
                                <i class="zmdi zmdi-arrow-left"></i>
                                <span>Brand Menu</span>
                            </a>
                            <section class="section--2col">
                                <header>
                                    <h3>Main Section</h3>
                                </header>
                                <div class="submenu__content">
                                    <div class="submenu__content-left">
                                        <div class="brand-logo"></div>
                                    </div>
                                    <div class="submenu__content-right">
                                        <span class="brand-name">564</span>
                                        <ul class="datarow">
                                            <li class="datarow__sgl" v-for="item in mm.brandMenuAltSection">
                                                <div class="datarow__left">
                                                    <span>{{item.title}}</span>
                                                </div>
                                                <div class="datarow__right">
                                                    <span><i v-if="item.icon" class="zmdi" v-bind:class="item.icon"></i>{{item.desc}}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div class="submenu__content">
                                    <a href="#" class="flex-block flex-block--bold">
                                        <div class="avatar avatar--generic avatar--xs"></div>
                                        <div class="flex-block__content"><span
                                                class="flex-block__title">GimmeMoney</span> <span
                                                class="flex-block__desc">Basic Plan</span></div>
                                        <span class="flex-block__badge">From $99/mo</span>
                                    </a>
                                    <a href="#" class="flex-block flex-block--bold">
                                        <div class="avatar avatar--generic avatar--xs"></div>
                                        <div class="flex-block__content"><span
                                                class="flex-block__title">GimmeMoney</span> <span
                                                class="flex-block__desc">Basic Plan</span></div>
                                        <span class="flex-block__badge">From $99/mo</span>
                                    </a>
                                </div>
                            </section>
                        </div>
                    </li>
                </ul>

                <ul class="main-menu main-menu--primary" v-if="mm.menuActive === 'primary'">
                    <li :key="item.title" :data-index="index" v-for="(item, index) in currentMenu.items"
                        :data-name='item.title'
                        v-bind:class="{'is-active': item.isActive, 'has-submenu': item.submenu, 'is-relative': mm.menuLock}">
                        <a :href="item.url">
                            <!-- DODAJ TI JAKOS ITEM ICON -->
                            <!-- <i class="zmdi {{item.icon}}"></i> -->
                            <i class="zmdi" v-bind:class="[item.icon ? item.icon : 'item.icon', false]"></i>
                            <span class="text">{{item.name}}</span>
                        </a>
                        <!-- submenu -->
                        <div v-if="item.submenu" class="submenu flex-fs"><a href="#" class="submenu__mobile-return"><i
                                class="zmdi zmdi-arrow-left"></i><span>{{item.name}}</span></a>
                            <section>
                                <header>
                                    <h3>{{item.submenuTitle}}</h3>
                                </header>
                                <div class="submenu__content">

                                    <ul class="data-list">
                                        <li v-for="submenuItem in item.submenu" :data-name="submenuItem.title">
                                            <a :href="submenuItem.url"><span>{{submenuItem.name}}</span></a>
                                        </li>
                                    </ul>

                                    <div class="menu-tooltip" :data-menu-item="submenuItem.title"
                                         v-for="submenuItem in item.submenu">
                                        <div class="menu-tooltip__header">
                                            <i class="zmdi zmdi-info-outline"></i>
                                            <span>{{submenuItem.name}}</span>
                                        </div>
                                        <div class="menu-tooltip__content">{{submenuItem.tooltipText}}</div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <!-- submenu | END -->
                    </li>
                </ul>
                <transition-group name="mainmenu" class="main-menu main-menu--secondary" tag="ul" appear
                                  v-on:before-appear="beforeAppear" v-on:before-enter="beforeAppear"
                                  v-on:appear="appear" v-on:enter="appear" v-on:leave="leave" v-bind:css="false"
                                  v-if="mm.menuActive === 'secondary'">
                    <li :key="item.title" :data-index="index" v-for="(item, index) in currentMenu.items"
                        :data-name='item.title'
                        v-bind:class="{'is-active': item.isActive, 'has-submenu': item.submenu, 'is-relative': mm.menuLock}">
                        <a :href="item.url">
                            <i class="zmdi" v-bind:class="[item.icon ? item.icon : 'item.icon', false]"></i>
                            <span class="text">{{item.name}}</span>
                        </a>
                        <!-- submenu -->
                        <div v-if="item.submenu" class="submenu flex-fs">
                            <a href="#" class="submenu__mobile-return">
                                <i class="zmdi zmdi-arrow-left"></i><span>{{item.name}}</span>
                            </a>
                            <section>
                                <header>
                                    <h3>{{item.submenuTitle}}</h3></header>
                                <div class="submenu__content">
                                    <ul class="data-list">
                                        <li v-for="submenuItem in item.submenu"><a
                                                :href="submenuItem.url"><span>{{submenuItem.name}}</span></a></li>
                                    </ul>

                                </div>
                            </section>
                        </div>
                        <!-- submenu | END -->
                    </li>
                </transition-group>


                <div class="client-area-additions" v-if="mm.menuType === 'mm.clientarea'">

                    <div class="item-grp-single" data-tooltip-inline="Notifications" data-tooltip-my-position="top left"
                         data-tooltip-target-position="bottom right">
                        <span class="badge badge--top-right badge--md badge--green">5</span>
                        <div class="mdl-js-button mdl-js-ripple-effect" id="main-notifications">
                            <div class="main-head__alerts"><i class="icon--alert"></i></div>
                        </div>
                    </div>

                    <div class="item-grp-single">
                        <div class="ddown ddown--user">
                            <div class="ddown__init ddown__init--clean mdl-js-button mdl-js-ripple-effect">
                                <div class="avatar avatar--xs">
                                    <img src="img/avatars/avatar_sample_4.png" alt="Avatar"/>
                                </div>
                            </div>
                            <div class="ddown__content">
                                <div class="ddown__arrow"></div>
                                <ul class="ddown__menu">
                                    <li class="ddown__header">
                                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                                            <div class="flex-block">
                                                <div class="avatar avatar--lg">
                                                    <img src="img/brand/brand-rsstudio--lg.png" alt="RS Studio">
                                                </div>
                                                <div class="flex-block__content">
                                                    <span class="flex-block__title">Paweł Bis</span>
                                                    <span class="flex-block__desc">paul@rsstudio.net</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                                            <i class="zmdi zmdi-file-plus"></i> View Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                                            <i class="zmdi zmdi-email"></i> Something Else
                                        </a>
                                    </li>
                                    <li class="ddown__footer">
                                        <a class="mdl-js-button mdl-js-ripple-effect" href="#">
                                            <i class="zmdi zmdi-sign-in"></i> Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="mm.primaryMenu && mm.secondaryMenu" v-on:click="menuSwitcher()" class="more-trigger"
                 v-bind:class="{ 'is-expanded': mm.menuIconToggle === 'secondary', 'ripple-on-active': mm.rippleOnActive, 'ripple-off-active': mm.rippleOffActive }">
                <div class="more-trigger__inner">
                    <div class="main-close" v-if="mm.menuIconToggle === 'primary'">
                        <i class="zmdi zmdi-more"></i><span class="text"></span>
                    </div>
                    <div class="alt-close" v-if="mm.menuIconToggle === 'secondary'">
                        <div class="close close--one"></div>
                        <div class="close close--two"></div>
                    </div>
                </div>
            </div>
            <div v-if="mm.mobileDdowns" class="mobile-ddowns">
                <div class="mobile-ddowns__sgl">
                    <div class="mobile-ddowns__desc">
                        <div class="mobile-ddowns__label">{{mm.mobileDdownsContent.loggedUsText}}</div>
                        <div class="mobile-ddowns__text">{{mm.mobileDdownsContent.loggedUser}}</div>
                    </div>
                    <div class="mobile-ddowns__icon"><i class="zmdi zmdi-caret-down"></i></div>
                    <ul class="mobile-ddowns__menu mobile-ddowns__menu--user">
                        <li class="mobile-ddowns__menu-header">
                            <a href="#">
                                <div class="flex-block">
                                    <div class="avatar avatar--xs"><img :src="mm.mobileDdownsContent.avatarUrl"
                                                                        :alt="mm.mobileDdownsContent.avatarAlt"/>
                                    </div>
                                    <div class="flex-block__content"><span
                                            class="flex-block__title">{{mm.mobileDdownsContent.loggedUser}}</span><span
                                            class="flex-block__desc">{{mm.mobileDdownsContent.companyName}}</span>
                                    </div>
                                    <div class="flex-block__badge"><i class="zmdi zmdi-check"></i></div>
                                </div>
                            </a>
                        </li>
                        <li v-for="item in mm.mobileDdownsContent.mainDdownItems">
                            <a :href="item.url"><span>{{item.text}}</span></a>
                        </li>
                    </ul>
                </div>
                <div class="mobile-ddowns__sgl">
                    <div class="mobile-ddowns__desc">
                        <div class="mobile-ddowns__label">{{mm.mobileDdownsContent.brands.brandTxt}}:</div>
                        <div class="mobile-ddowns__text">{{mm.mobileDdownsContent.brands.currentlySelected}}</div>
                    </div>
                    <div class="mobile-ddowns__icon"><i class="zmdi zmdi-caret-down"></i></div>
                    <ul class="mobile-ddowns__menu mobile-ddowns__menu--brand">
                        <li class="mdl-js-button mdl-js-ripple-effect"
                            v-for="item in mm.mobileDdownsContent.brands.list"
                            v-bind:class="{'is-selected': item.isActive}">
                            <a :href="item.url">
                                <div class="flex-block">
                                    <div class="avatar avatar--xs"><img :src="item.avatarUrl" alt="item.avatarAlt"/>
                                    </div>
                                    <div class="flex-block__content"><span
                                            class="flex-block__title">{{item.name}}</span></div>
                                    <div class="flex-block__badge" v-if="item.isActive"><i
                                            class="zmdi zmdi-check"></i></div>
                                </div>
                            </a>
                        </li>
                        <li class="mobile-ddowns-new mdl-js-button mdl-js-ripple-effect">
                            <a :href="mm.mobileDdownsContent.brands.addNewBrandUrl">
                                <div class="flex-block">
                                    <div class="avatar avatar--xs"><i class="zmdi zmdi-plus-circle-o"></i></div>
                                    <div class="flex-block__content">
                                        <span class="flex-block__title">{{mm.mobileDdownsContent.brands.addNewBrandTxt}}</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>
        </nav>
    </div>
</template>

<script>

    var Velocity = require('./../../external/velocity.js');
    var menuAim = require('./../../external/modified/menu_aim.js');

    export default {
        name: 'main-menu',
        data: function () {
            return {

                "loaded": false,
                "mm": {},
                "currentMenu": [],
                "dataUrl": '', //default value - debug
            }

        },
        created() {
            var self = this;
            self.dataUrl = $('aside.main-sidebar').attr('data-url');
            // console.log(self.dataUrl);
            this.fetchData();

            // self.mm = response.body;
            // self.mm.menuActive = 'primary';
            // self.currentMenu = self.mm.primaryMenu;

            // self.setDomScreenPosition();

        },
        mounted: function () {
            var self = this;

            this.$nextTick(function () {
                self.mm.menuVisible = true;
                self.menuAnimator();
                self.tooltips();
            });

            this.menuMobileToggle();
            this.mobileDDownsControl();

            setTimeout(function () {

                self.onReady()

            }, 600);


        },

        watch: {

            currentMenu: function (newVal) {

                var self = this;

                if (newVal.items != undefined && newVal.name === 'secondary') {

                    let singleItemHeight = $(self.$el).find('.main-menu').not('.main-menu--brand').find('li').eq(0).height();
                    let singleItemWidth = $(self.$el).find('.main-menu').not('.main-menu--brand').find('li').eq(0).width();

                    setTimeout(function () {

                        if (self.mm.menuType === 'top') {

                            // var valLeft = parseInt($(self.$el).find('.menu-scroll').css('padding-left'),10) + (singleItemWidth * newVal.items.length + 110);
                            // $('.more-trigger').css('left', valLeft);

                        } else {

                            var valTop = 80 + (singleItemHeight * newVal.items.length);
                            $('.more-trigger').css('top', valTop);

                        }

                    }, 120);

                }
            }

        },
        methods: {


            closeMobileMenuOnClickOutside() {


                $(document).on('click', function (e) {


                    if ($('#app-wrapper').hasClass('mobile-menu-active')) {

                        let target = $(e.target);

                        if (
                            target.hasClass('menu-scroll') ||
                            target.closest('.menu-scroll').length ||
                            target.hasClass('burgericon') ||
                            target.hasClass('more-trigger')
                        ) {
                            return false;
                        }

                        $('#app-wrapper').removeClass('mobile-menu-active');
                        $('.burgericon').removeClass('active');

                    }

                });


            },

            setMenuActive(menuToDisplayFirst) {

                var self = this;

                if (menuToDisplayFirst === 'primary') {

                    self.mm.menuActive = 'primary';
                    self.currentMenu = self.mm.primaryMenu;

                } else if (menuToDisplayFirst === 'secondary') {

                    self.mm.menuActive = 'secondary';
                    self.currentMenu = self.mm.secondaryMenu;

                } else {

                    self.mm.menuActive = 'primary';
                    self.currentMenu = self.mm.primaryMenu;
                }
            },

            fetchData() {

                let self = this;

                this.$http.get(self.dataUrl).then(response => {

                    self.mm = response.body;
                    self.setMenuActive(self.mm.menuOnLoad);
                    self.setDomScreenPosition();
                    self.loaded = true;

                }, response => {

                    console.log('menu ajax error');

                });


            },

            setDomScreenPosition() {

                let self = this;

                // expadned (wide state)
                if (self.mm.menuType === 'wide') {
                    $('#app-wrapper').addClass('main-sidebar--expanded');
                }

                // expadned (wide state)
                if (self.mm.menuType === 'top') {
                    $('#app-wrapper').addClass('main-sidebar--top');
                }
            },

            menuAnimator() {

                var self = this;

                // proper animation

                self.$nextTick(function () {

                    if (self.mm.menuType === 'top') {

                        // var elementsLength = $('.main-menu--primary > li').length;
                        // var menuPadding = $('aside.main-sidebar .menu-scroll').css('padding-left');
                        // self.mm.topMenuLeftValue = $('.main-menu').not('.main-menu--brand').find('> li').width() * elementsLength + 110 + parseInt(menuPadding,10);
                        // $('.more-trigger').css('left', self.mm.topMenuLeftValue);

                    } else {

                        $('.more-trigger').css('top', self.mm.primaryMenuHeight);

                    }

                });

            },

            tooltips() {

                setTimeout(function () {

                    $('.main-menu > li .submenu').find('.submenu__content li').each(function (index, el) {


                        var data = $(el).attr('data-name');

                        if (data !== undefined) {

                            $(el).on('mouseover', function () {


                                $(el).closest('.submenu').find('[data-menu-item=' + data + ']').velocity({
                                    opacity: 1
                                }, {
                                    duration: 150,
                                    display: "block"
                                });

                            });

                            $(el).on('mouseout', function () {

                                $(".main-sidebar .velocity-animating").velocity("stop", true);

                                $(el).closest('.submenu').find('.menu-tooltip').velocity({
                                    opacity: 0
                                }, {
                                    duration: 120,
                                    display: "none"
                                });

                            });

                        }

                    });


                }, 300);

            },

            menuSwitcher: function () {


                var self = this;

                let itemHeight = 70;
                let brandMenuHeight = 80;
                let primaryItemsLength = self.mm.primaryMenu.items.length;
                let secondaryItemsLength = self.mm.secondaryMenu.items.length;
                self.mm.primaryMenuHeight = primaryItemsLength * itemHeight + brandMenuHeight;
                self.mm.secondaryMenuHeight = secondaryItemsLength * itemHeight + brandMenuHeight;

                self.mm.animationActive = true; //turn on overflow hidden

                if (self.mm.menuActive === 'primary') {
                    if (self.mm.menuAnimationLock) {
                        return false;
                    }

                    self.mm.menuIconToggle = 'secondary';
                    self.mm.menuAnimationLock = true;
                    self.mm.rippleOnActive = true; //turn on Ripple
                    self.currentMenu = self.mm.secondaryMenu;
                    self.mm.menuActive = 'secondary';

                    setTimeout(function () {
                        $('.main-sidebar').css('background-color', '#3e4954');
                        self.mm.rippleOnActive = false;
                    }, 300);

                    setTimeout(function () {
                        self.mm.animationActive === true ? self.mm.animationActive = false : false;
                        self.$nextTick(function () {
                            self.mm.menuAnimationLock = false;
                            self.onReady()
                        });
                    }, 500);

                } else {
                    if (self.mm.menuAnimationLock) {
                        return false;
                    }
                    self.mm.menuAnimationLock = true;
                    self.mm.menuIconToggle = 'primary';
                    // start cover ripple animation
                    $('.main-sidebar').css('background-color', '#2d353d');
                    $('.main-menu--secondary').css('z-index', '99999');
                    self.mm.rippleOffActive = true; //turn on Ripple
                    self.$nextTick(function () {
                        self.currentMenu = [];

                        if (self.mm.menuType === 'top') {

                            // Velocity($('.more-trigger')[0], {
                            //     opacity: 1,
                            //     left: self.mm.topMenuLeftValue
                            // });

                        } else {

                            Velocity($('.more-trigger')[0], {
                                opacity: 1,
                                top: self.mm.primaryMenuHeight
                            });
                        }

                    });
                    setTimeout(function () {
                        self.mm.menuActive = 'primary';
                        self.currentMenu = self.mm.primaryMenu;
                        $(self.$el).find('.main-menu--primary').css('position', 'absolute');
                    }, 200);
                    setTimeout(function () {
                        $(self.$el).find('.main-menu--primary').css('position', 'static');
                        self.mm.rippleOffActive = false;
                    }, 500)
                    setTimeout(function () {
                        self.mm.animationActive === true ? self.mm.animationActive = false : false;
                        self.mm.menuAnimationLock = false;
                        self.$nextTick(function () {
                            self.onReady()
                        });
                    }, 500)
                }

                //tooltips

                self.$nextTick(function () {
                    self.tooltips();
                });

                // setTimeout(function() {
                //     self.mm.animationActive = false;
                // }, 2500)

            },

            beforeAppear: function (el) {

                var self = this;

                if (self.mm.menuType === 'top') {

                    el.style.top = "-150px";


                } else {

                    el.style.left = "-150px";
                }

                el.style.opacity = "0.5";
            },
            appear: function (el, done) {

                var self = this;

                var delay = el.dataset.index * self.mm.rippleDuration;

                setTimeout(function () {

                    if (self.mm.menuType === 'top') {

                        Velocity(el, {
                            opacity: 1,
                            top: '0px'
                        }, {
                            complete: done
                        })

                    } else {

                        Velocity(el, {
                            opacity: 1,
                            left: '0px'
                        }, {
                            complete: done
                        })

                    }

                }, delay)
            },
            beforeEnter: function (el) {


                if (self.mm.menuType === 'top') {

                    console.log('before enter');

                    el.style.top = "-200px";


                } else {

                    el.style.left = "200px";
                }

                el.style.opacity = "0";
            },
            enter: function (el, done) {
                var self = this;
                var delay = el.dataset.index * self.mm.rippleDuration;

                if (self.mm.menuType === 'top') {
                    setTimeout(function () {
                        Velocity(el, {
                            opacity: 1,
                            top: '0px'
                        }, {
                            complete: done
                        })
                    }, delay)
                } else {
                    setTimeout(function () {
                        Velocity(el, {
                            opacity: 1,
                            left: '0px'
                        }, {
                            complete: done
                        })
                    }, delay)

                }

            },
            leave: function (el, done) {
                var self = this;
                var delay = el.dataset.index * self.mm.rippleDuration;

                if (self.mm.menuType === 'top') {

                    setTimeout(function () {
                        Velocity(el, {
                            opacity: 0,
                            top: '-200px'
                        }, {
                            complete: done
                        })
                    }, delay)

                } else {

                    setTimeout(function () {
                        Velocity(el, {
                            opacity: 0,
                            left: '200px'
                        }, {
                            complete: done
                        })
                    }, delay)

                }

            },

            menuMobileToggle() {

                var self = this;
                //toggle menu - click
                $('#app-wrapper').on('click', '.burgericon', function (e) {
                    $(this).toggleClass('active');
                    $('#app-wrapper').toggleClass('mobile-menu-active');
                    e.stopPropagation();
                    setTimeout(function () {
                        // RWD
                        enquire.register("screen and (max-width:768px)", {
                            match: function () {
                                // self.closeMobileMenuOnClickOutside();
                            }
                        });
                    }, 500)

                });


            },

            mobileDDownsControl() {




                //MAIN MENU CUSTOM MENUS
                //MOBILE DROPOWNS:
                var menuDrodpownSingle = $('.mobile-ddowns__sgl'),
                    singleOption = $('.mobile-ddowns__menu');


                //Open submenu
                $('#app-wrapper').on('click.menubig', '.mobile-ddowns__sgl', function (e) {
                    e.stopPropagation();
                    menuDrodpownSingle.not($(this)).removeClass('mobile-ddowns__sgl--open');
                    $(this).toggleClass('mobile-ddowns__sgl--open');
                });


                //Close Submeu
                $('#app-wrapper').on('click.menubig', '#app-wrapper', function (e) {
                    menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');
                });

                //select single option
                $('#app-wrapper').on('click.menubig', '.mobile-ddowns__menu', function (e) {
                    // console.log('click');
                    singleOption.removeClass('is-selected');
                    $(this).addClass('is-selected');
                    setTimeout(function () {
                        menuDrodpownSingle.removeClass('mobile-ddowns__sgl--open');
                    }, 400);
                });


                var self = this;

                enquire.register("screen and (max-width:768px)", {

                    match: function () {

                        $('#app-wrapper').on('click', '.mobile-ddowns__sgl', function (e) {

                            e.stopPropagation();
                            $('.mobile-ddowns__sgl').removeClass('mobile-ddowns__sgl--open');

                        });


                        $('#app-wrapper').on('click', '.mobile-ddowns__sgl', function (e) {

                            e.stopPropagation();

                            if ($(this).hasClass('mobile-ddowns__sgl--open')) {

                                $(this).removeClass('mobile-ddowns__sgl--open');

                            } else {
                                $(this).addClass('mobile-ddowns__sgl--open');
                            }
                        });

                        $('#app-wrapper').not('.mobile-ddowns').on('click', function () {
                            $('.mobile-ddowns__sgl').removeClass('mobile-ddowns__sgl--open');
                        });

                    }

                });


            },


            onReady: function () {
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
                        match: function () {
                            var currentLi = $(row);
                            li.removeClass('hovered');
                            $('.main-menu--brand > li').removeClass('hovered submenu-open');
                            currentLi.addClass('hovered');
                            //if has submenu
                            if (currentLi.children('.submenu').length) {                    // BUG, if you have ONLY one submenu (one icon) you cant reopen submenu
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
                        match: function () {
                            setTimeout(function () {
                                li.removeClass('submenu-open');
                                li.removeClass('hovered');
                            }, 200);
                        }
                    });
                }

                //SMALL SCREEN
                //Screen Size <768
                enquire.register("screen and (max-width:767px)", {
                    match: function () {
                        // detatch
                        $('nav *').off('.menubig');
                        $(".main-menu:not(.main-menu--brand)").each(function (index, el) {
                            $(this).menuAim({
                                activate: function () {
                                },
                                exitMenu: function () {
                                },
                                rowSelector: "> li",
                                submenuSelector: "*",
                                submenuDirection: "right"
                            });
                        });
                        //disable links
                        menu.find('.main menu >li a').addClass('disabled');
                        $('.main-menu:not(.main-menu--brand) li.has-submenu:not(.more-trigger)').on('click.menusmall', function (ev) {
                            $('.main-menu li').removeClass('submenu-open');
                            $(this).addClass('submenu-open');
                            $(this).closest('.main-menu').addClass('nopadding');
                            //new mechanics - rwd menu | tmp
                            $(this).closest('nav').addClass('submenu-is-active');
                            if ($(this).closest('.main-menu--brand').length) {
                                // $(this).closest('nav').addClass('submenu-is-active--brand');
                            }
                        });

                        //brand
                        $('.main-menu--brand li').on('click.menusmall', function (ev) {
                            $(this).addClass('submenu-open');
                            $(this).closest('nav').addClass('submenu-is-active');
                            $(this).closest('nav').addClass('submenu-is-active--brand');
                            // $('.menu-scroll').css('height', 'calc(100vh + 0px)');
                        });

                        //scroll top
                        $('.main-menu li').on('click.menusmall', function (ev) {
                            $('.menu-scroll').scrollTop(0);
                            $(this).closest('.main-menu').scrollTop(0);
                        });

                        $('.main-menu li').on('click.menusmall', function (ev) {
                            var href = $(this).find('a').attr('href');
                            window.location.replace(href);
                        });

                        //menu RWD
                        // GO back - submenu
                        $('#app-wrapper').on('click.menusmall', '.submenu__mobile-return', function () {
                            if ($(this).closest('.main-menu--brand').length) {
                                $(this).closest('nav').removeClass('submenu-is-active--brand');
                                $(this).closest('nav').removeClass('submenu-is-active');
                                $(this).closest('nav').find('.main-menu > li').removeClass('submenu-open');
                            }
                            // $('.menu-scroll').css('height', 'auto');
                            $(".main-menu__brand").removeClass('submenu-open');
                            $('.menu-scroll').scrollTop(0);

                            //new mechanics - rwd menu
                            $(this).closest('.has-submenu').toggleClass('submenu-open');
                            $(this).closest('.main-menu').removeClass('no-scroll');
                            $(this).closest('.main-menu').removeClass('nopadding');
                            //  $(this).closest('.main-menu').removeClass('submenu-opened');
                            $(this).closest('nav').removeClass('submenu-is-active');
                        });
                    },
                    unmatch: function () {
                        menu.find('li a').removeClass('disabled');
                    }
                });
                //BIG SCREEN
                // //Screen Size <768
                enquire.register("screen and (min-width:768px)", {
                    match: function () {
                        // detach
                        $('nav *').off('.menusmall');
                        // console.log('DETACH MFKR NAV SMALL!');
                        //aim menu - NO LAG VERSION
                        //exclude brand menu
                        //Reset AIM on mobile (disable)
                        $(".main-menu:not(.main-menu--brand)").each(function (index, el) {
                            $(this).menuAim({
                                activate: activateSubmenu,
                                exitMenu: deactivateSubmenu,
                                rowSelector: "> li",
                                submenuSelector: ".has-submenu",
                                submenuDirection: "right"
                            });
                        });
                        //Separate mechanic for brand without AIM
                        $('.main-menu--brand > li').on('mouseover.menubig', function () {
                            $(this).addClass('hovered submenu-open');
                        });
                        //off
                        aside.on('mouseleave.menubig', function () {
                            setTimeout(function () {
                                $('.main-menu--brand > li').removeClass('hovered submenu-open');
                            }, 200);
                        });
                        //Separate mechanic for brand without AIM | OFF
                    },
                    unmatch: function () {
                    },
                });


            }
        }
    }
</script>
<style lang="less">

    @transition: 300ms;
    @transition-ripple-on: 300ms;
    @transition-ripple-off: 400ms;
    @icon-size: 22px;


    @media only screen and (min-height: 320px) and (max-height: 450px) {
        aside.main-sidebar .menu-scroll .main-menu--brand {

            // display: none;
            // Why, the fuck?!
        }

    }

    @media only screen and (min-height: 768px) {
        aside.main-sidebar .menu-scroll > ul:last-of-type {
            max-height: ~"calc(100vh - 170px)";
        }
    }

    @media only screen and (max-width: 768px) {
        aside.main-sidebar .menu-scroll > ul:last-of-type {
            /*flex: none;*/
            /*height: auto;*/
            padding-bottom: 0px;
            /*max-height: ~"calc(100vh - 220px)";*/
        }

        aside.main-sidebar ul.main-menu:first-of-type {
            height: 100%;
        }

        aside.main-sidebar .submenu-is-active ul.main-menu:first-of-type {
            // display: none;
        }

        aside.main-sidebar ul.main-menu li.submenu-open .submenu {
            overflow: auto !important;
            height: auto;
            max-height: ~"calc(100vh - 70px)";
        }

        aside div nav.submenu-is-active {
            .more-trigger {
                display: none;
            }
        }

        aside div.more-trigger {
            z-index: 1;
        }

        aside div nav.submenu-is-active .menu-scroll > ul:last-of-type {
            max-height: none;
            height: 100vh;
        }

        .submenu-is-active {
            height: ~"calc(100vh - 140px)";
            .menu-scroll > ul:last-of-type > li:not(.submenu-open) {
                display: none;
            }
            .menu-scroll {
                height: auto;
                max-height: ~"calc(100vh - 70px)" !important;
            }
        }

        aside.main-sidebar .menu-scroll {
            height: auto;
            max-height: ~"calc(100vh - 140px)";
            overflow: auto;
        }

        aside.main-sidebar .menu-scroll > ul:last-of-type {
            /*max-height: none;*/
            overflow: initial;
            height: auto;
            max-height: ~"calc(100vh - 140px)";
        }

        .main-menu__brand .submenu--system {

            max-height: auto !important;
            height: 100% !important;

        }

        aside.main-sidebar .main-menu__brand.submenu-open .submenu.submenu--system {

            top: 70px;
            max-height: ~'calc(100vh - 70px - 70px)';

        }

    }

    aside div.more-trigger {
        z-index: 10;
        &.is-expanded {
            .more-trigger__inner {
                position: relative;
                background-color: #02A8F3;
            }
            i {
                color: #fff;
            }
        }
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        flex-flow: column wrap;
        cursor: pointer;
        &:hover {
            i,
            span {
                color: #fff;
            }
        }
        .alt-close {
            position: relative;
            width: @icon-size;
            height: @icon-size;
            display: flex;
            align-items: center;
            justify-content: center;
            .close {
                background-color: #fff;
                width: @icon-size;
                height: 3px;
                border-radius: 5px;
            }
            @top: 10px;
            .close--one {
                transform: rotate(45deg);
                position: absolute;
                top: @top;
                left: 0;
            }
            .close--two {
                transform: rotate(315deg);
                position: absolute;
                top: @top;
                left: 0;
            }
        }
        .more-trigger__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column wrap;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #3e4954;
            transition: @transition;
            .main-close {
                height: 34px;
            }
        }
        i,
        span {
            color: #8a8f99;
            transition: @transition;
        }
        i {
            font-size: 34px;
            margin-top: 0px;
        }
        span {
            font-size: 13px;
            font-weight: 500;
        }
    }

    @media only screen and (min-width: 768px) {

        aside.main-sidebar {
            transition: 0ms;
        }

        .dummy-menu {
            position: absolute;
            left: 0;
            width: 98px;
        }

        aside.main-sidebar nav ul.main-menu {
            height: auto;

            overflow: auto;
        }

        .main-menu > li {
            transition: 0ms; // position: relative;
        }

        .mainmenu-enter-active,
        .mainmenu-leave-active {
            // transition: all 1s;
        }

        .mainmenu-enter,
        .mainmenu-leave-to
            /* .list-leave-active for <2.1.8 */
        {
            opacity: 0;
            transform: translateY(30px);
        }

        div.more-trigger {
            position: relative;
            .more-trigger__inner {
                z-index: 1;
            }
        }

        .nav-container.animation-active {
            overflow: hidden;
            .submenu {
                opacity: 0 !important;
                display: none !important;
            }
            .main-menu {
                z-index: 10;
                position: relative;
            }
            .main-menu.main-menu--brand {
                z-index: 20;
            }
            div.more-trigger {
                @keyframes menuRippleOn {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(50);
                    }
                }
                @keyframes menuRippleOff {
                    0% {
                        transform: scale(50);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                &:before {
                    content: '';
                    width: 48px;
                    height: 48px;
                    background-color: #3e4954;
                    position: absolute;
                    border-radius: 50%;
                    top: 11px;
                    left: 25px;
                    display: block;
                    z-index: 9;
                    animation-fill-mode: forwards;
                }
                &.ripple-on-active {
                    &:before {
                        display: block;
                        z-index: 9;
                        animation: menuRippleOn @transition-ripple-on cubic-bezier(.17, .67, .98, .11);
                        animation-fill-mode: forwards;
                    }
                }
                &.ripple-off-active {
                    &:before {
                        display: block;
                        z-index: 9;
                        animation: menuRippleOff @transition-ripple-off cubic-bezier(0.45, 0.05, 0.55, 0.95);
                        animation-fill-mode: forwards;
                    }
                }
                .more-trigger__inner {
                    z-index: 10;
                }
            }
        }

        .dummy-menu {
            position: relative;
            width: 98px;
            height: 280px;
            background: #252728;
        }

        aside div.more-trigger {
            position: absolute;
            width: 98px;
            transition: 100ms ease-out;
            &.is-expanded {
                transition: 300ms ease-out;
                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }

    .is-relative {
        position: relative !important;
    }

    .menu-indicator {
        position: fixed;
        bottom: 0;
        left: 0;
        background: transparent;
        color: #fff;
        font-size: 12px;
        z-index: 99;
        width: 98px;
        text-transform: uppercase;
        text-align: center;
        padding: 10px 0;
    }

    // #app-wrapper aside.main-sidebar nav ul.main-menu .submenu-open .submenu{
    //     left: 97px
    // }

    #app-wrapper.main-sidebar--top {

        @transition-ripple-off: 500ms;
        @transition-ripple-on: 500ms;

        .more-trigger {

            &.ripple-on-active {

                &:before {
                    animation: menuRippleOn @transition-ripple-on ease-in-out;
                }
            }

            &.ripple-off-active {
                &:before {
                    animation: menuRippleOff @transition-ripple-off ease-in-out;
                }
            }
        }

        .main-menu {

            overflow: visible;

            &.main-menu--primary > li a,
            &.main-menu--secondary > li a {

                flex-flow: row nowrap;

                span,
                i {
                    margin-top: 0
                }

                i {
                    font-size: 24px;
                    margin-right: 16px;
                }
            }
        }
    }

    // Tooltip

    aside.main-sidebar {

        .menu-tooltip {

            background: #2d353d;
            position: absolute;
            left: 16px;
            bottom: 32px;
            //tmp
            min-height: 100px;
            width: ~'calc(100% - 32px )';
            border-radius: 5px;
            padding: 24px;
            display: none;
            opacity: 0;

            .menu-tooltip__header {

                display: flex;
                align-items: center;
                justify-content: flex-start;

                i {
                    font-size: 24px;
                    color: #02A8F3 !important;
                    padding-right: 13px;

                }

                span {
                    color: #fff;
                    font-size: 15px;
                    font-weight: 500;

                }

            }

            .menu-tooltip__content {

                font-size: 13px;
                color: #b8becc;
                font-weight: normal;
                padding-top: 16px;

            }

        }

        // to do - overflow battle
        @media only screen and (max-height: 700px) {

            .submenu {

                overflow: visible !important;

            }

            .menu-tooltip {

                left: 364px;

            }

        }

    }

    // Menu Expadned - Wide

    #app-wrapper.main-sidebar--expanded {

        .more-trigger {

            left: 65px;

        }

    }

    @menu-top-height: 80px;
    @menu-element-width: 110px;
    @menu-top-padding: 200px;

    #app-wrapper.main-sidebar--top {

        .app-content {
            padding: 0 @menu-top-padding;
        }

        aside.main-sidebar ul.main-menu .submenu section {
            border-top: 0;
        }

        aside.main-sidebar .main-sidebar__logo {
            margin-top: 0;
            margin-bottom: 0;
        }

        .menu-tooltip {

            background: #2d353d;
            position: absolute;
            left: auto;
            right: @menu-top-padding;
            top: 40px;
            height: ~'calc(100% - 70px)';
            width: 306px;
            bottom: 32px;
            //tmp
            // min-height:100px;

        }

        .app-content {
            margin-top: @menu-top-height;
        }

        aside.main-sidebar {

            width: 100vw;
            height: @menu-top-height;
            position: absolute;
            z-index: 11;

            .menu-scroll,
            nav,
            .main-menu,
            .main-menu li a {

                height: @menu-top-height;

            }

            .main-menu li {

                // position: relative;

            }

            .main-menu:not(.main-menu--brand) li {

                width: auto;
                margin-right: 32px;

            }

        }

        .menu-indicator {

            bottom: auto;
            top: 19px;
            left: auto;
            right: 0px;

        }

        .menu-scroll {

            width: 100%;
            padding: 0 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: row nowrap;

        }

        .main-menu--brand {
            flex: 0;
            min-width: @menu-element-width;
            width: @menu-element-width;

            li.main-menu__brand {
                margin: 0;
            }
        }

        .main-menu--primary,
        .main-menu--secondary {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            padding-right: 100px; // space for 'more button'

        }

        .main-menu .submenu {
            // display:none !important;

            // lets go

            width: 100%;
            height: 320px;
            position: absolute;
            top: 80px;
            left: 0;
            padding: 0 @menu-top-padding;

            .submenu__content {

                .data-list {

                    // width:200px;

                    li {
                        height: 32px;
                    }

                }

            }
        }

        .more-trigger {

            right: 203px;
            left: auto;
            z-index: 20;
            margin-bottom: 0;
            height: 80px;
            top: 0;
        }

    }

    // CLIENT AREA
    #app-wrapper.main-sidebar--top {

        .main-menu--primary,
        .main-menu--secondary {
            padding-right: 80px;
        }

        .main-menu__brand > a {
            width: 144px;
        }

        .main-sidebar--ca {

            .client-area-additions {

                z-index: 19;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            #main-notifications {
                position: relative;
                width: 40px;
                height: 40px;
                cursor: pointer;
                // right: 40px;

                .mdl-button__ripple-container {

                    border-radius: 50%;
                }

            }

            .item-grp-single {

                &:first-child {
                    right: 48px;
                    top: 4px;
                }

                position: relative;
                cursor: pointer;
                right: 24px;

                .mdl-button__ripple-container {

                    border-radius: 50%;
                }
            }

            .more-trigger {

                right: 320px;
                display: none;
            }

        }

    }

    #app-wrapper aside.main-sidebar ul.main-menu > li > a span,
    #app-wrapper aside.main-sidebar ul.main-menu > li > a i {
        transition: 300ms;
    }

    #app-wrapper aside.main-sidebar ul.main-menu > li >,
    #app-wrapper aside.main-sidebar ul.main-menu > li > a {
        transition: 0ms;
    }

    aside.main-sidebar {

        nav.submenu-is-active {

            .submenu {

                display: block;

            }

            .main-menu--brand {

            }

        }

        nav .submenu {
            display: none;
        }

    }

    @logo-distance-top: 70px;

    #app-wrapper nav.submenu-is-active--brand {

        .main-menu--brand {
            height: 100vh;

            .submenu {
                // margin-top:@logo-distance-top
            }

        }

        .main-menu--primary,
        .main-menu--secondary {
            display: none;

        }

    }

    #app-wrapper nav.submenu-is-active {

        .main-menu--primary,
        .main-menu--secondary {

            position: static;

            .submenu {

                margin-top: @logo-distance-top
            }
        }

    }


</style>
