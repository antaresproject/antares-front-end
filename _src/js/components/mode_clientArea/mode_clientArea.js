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
 * @version    0.9.2
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */

/* global enquire */

import {antaresCfg} from './../../../config/antares_cfg';
let clientAreaActive;
if (antaresCfg.clientArea === true) {
    clientAreaActive = true;
}

let modeClientArea = false;

function checkModeCA(){
    const url = document.location.href;
    const parts = url.split('_');
    let lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    if (lastSegment === 'CA.html') {
        modeClientArea = true
        $('#app-wrapper').addClass('main-sidebar--top main-sidebar--ca')
    }
    else if (clientAreaActive === true) {
        modeClientArea = true
        $('#app-wrapper').addClass('main-sidebar--top main-sidebar--ca')
    }

}
checkModeCA()
export const AntaresModeClienArea = {
    init() {
        let self = this;
        if (modeClientArea === true) {
            self.clientAreaTopMenu()
            self.documentReady()
            self.footerWidthTopMode()

            self.mobileDisabledTopMenu()
        }
    },

    // methods

    clientAreaTopMenu() {
        enquire.register('screen and (max-width: 1023px)', {
            match: function () {
                $('.client-area').appendTo('.notification-block');
            }
        });
        enquire.register('screen and (min-width: 1024px)', {
            match: function () {
                $('.client-area').appendTo('.menu-scroll');
            }
        });
    },
    // moreTriggerTopHeight() {
    //     enquire.register('screen and (min-width: 1024px)', {
    //         //dla tableta
    //         match: function () {
    //             var widthLi = 0
    //             var menuLength
    //             var widthOneLi
    //             var i
    //             if ($('.menu-scroll').hasClass('open-second-menu')) {
    //                 menuLength = $('.menu-scroll> ul.main-menu--secondary > li').length
    //                 for (i = 0; i < menuLength; i++) {
    //                     widthOneLi = $($('ul.main-menu--secondary > li')[i]).width() + 32 // 32===margins
    //                     widthLi += widthOneLi
    //                 }
    //             }
    //             else {
    //                 menuLength = $('.menu-scroll> ul.main-menu--primary > li').length
    //                 for (i = 0; i < menuLength; i++) {
    //                     widthOneLi = $($('ul.main-menu--primary > li')[i]).width() + 32
    //                     widthLi += widthOneLi
    //                 }
    //             }
    //             var menuWidth = widthLi + $('.menu-scroll .main-menu--brand').width()
    //             $('.more-trigger').css('left', menuWidth + $('.menu-scroll .main-menu--brand').offset().left + 30);
    //         },
    //         unmatch: function () {
    //             $('.more-trigger').css('left', '50%');
    //         }
    //     })
    // },
    documentReady() {
        var self = this;
        enquire.register('screen and (max-width: 1023px)', {
            //dla tableta
            match: function () {
                $('.burgericon').click(function () {
                    if ($('#app-wrapper').hasClass('main-sidebar--top--mobile')) {
                        setTimeout(function () {
                            // self.moreTriggerTopHeight(); //for animation
                        }, 200);
                    }
                });
            }
        });
        enquire.register('screen and (min-width: 1024px)', {
            match: function () {
                // self.moreTriggerTopHeight(); //for animation
                $('.main-menu--secondary>li').css('opacity', '0'); //for animation
                $('.main-menu--primary>li').css('opacity', '1'); //for animation
            }
        });

    },
    footerWidthTopMode() {
        function resizeFooterTop() {
            let width, widthSideMenu;
            width = $('.main-content').width();
            widthSideMenu = $('.grid-col--menu').width()
            enquire.register('screen and (min-width: 1200px)', {
                match: function () {
                    $('.app-content__footer').css('width', width - widthSideMenu);
                }
            })
            enquire.register('screen and (min-width:768px) and (max-width: 1199px)', {
                match: function () {
                    $('.app-content__footer').css('width', width);
                }
            })
        }

        setTimeout(function () {
            resizeFooterTop()
        }, 700)
        $(window).resize(
            _.debounce(function () {
                resizeFooterTop()
            }, 300)
        );

    },

    mobileDisabledTopMenu() {
        enquire.register('screen and (max-width: 1023px)', {
            //dla tablet
            match: function () {
                $('#app-wrapper').removeClass('main-sidebar--top');
                    $('#app-wrapper').addClass('main-sidebar--top--mobile');
                    setTimeout(function () {
                        $('aside.main-menu-html').addClass('transition-300');
                    }, 500)
            },
            unmatch: function () {
                $('aside.main-menu-html').removeClass('transition-300');
                $('#app-wrapper').addClass('main-sidebar--top');
                $('#app-wrapper').removeClass('main-sidebar--top--mobile');
                $('#app-wrapper').removeClass('mobile-menu-active');
            }
        });
    }
};

$(() => {
    window.AntaresModeClienArea = AntaresModeClienArea;
    AntaresModeClienArea.init();
});



