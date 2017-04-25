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
export const Antares = function() {};
Antares.prototype.init = function() {
    var self = this;
    // APP.components.pagePreloader('on');
    (function core() {
        self.helpers();
        self.RWD.init();
    }());
    (function components() {
        //need to move bowser to separate file
        // self.components.browserDetection();
        self.components.frameworkPage();
        self.components.divPreloader();
        self.components.preloader();
        self.components.scroll();
        // self.components.systemScroll();
        self.components.sidebar();
        self.components.settingsMenu();
        self.components.colorControl();
        self.components.cardTruncate();
        self.components.mutationService();
        self.animations.appAnime();
        //moved to examples:
        // self.components.chatDemo();
        self.components.autoComplete();
        // self.components.inlineAlerts();
    }());

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
    var self = this;


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
        }
    })(jQuery);
    $('.ddown-multi__init').on('click', function() {
        $(this).closest('.ddown-multi').find('.ddown-multi__menu').perfectScrollbar();
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
            if (!$el.is(":focus")) {
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
        $('.card--tags').closest('.grid-stack-item-content').css('overflow', 'visible !important');
    }
    //plugin
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                $(this).show();
            });
        }
    });
    $.fn.extend({
        animateAndRemove: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
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
    $('#translationImport').closest('.input-field__inner').addClass('w100p');
    ready('.select2-dropdown .select2-results__options', function(element) {
        $(element).attr('data-scrollable', 'true');
        APP.components.scroll();
    });
};
Antares.prototype.components = {
    autoComplete: function() {},
    browserDetection: function() {
        /*!
         * Bowser - a browser detector
         * https://github.com/ded/bowser
         * MIT License | (c) Dustin Diaz 2015
         */
        ! function(e, t) {
            typeof module != "undefined" && module.exports ? module.exports = t() : typeof define == "function" && define.amd ? define(e, t) : this[e] = t()
        }("bowser", function() {
            function t(t) {
                function n(e) {
                    var n = t.match(e);
                    return n && n.length > 1 && n[1] || ""
                }

                function r(e) {
                    var n = t.match(e);
                    return n && n.length > 1 && n[2] || ""
                }
                var i = n(/(ipod|iphone|ipad)/i).toLowerCase(),
                    s = /like android/i.test(t),
                    o = !s && /android/i.test(t),
                    u = /nexus\s*[0-6]\s*/i.test(t),
                    a = !u && /nexus\s*[0-9]+/i.test(t),
                    f = /CrOS/.test(t),
                    l = /silk/i.test(t),
                    c = /sailfish/i.test(t),
                    h = /tizen/i.test(t),
                    p = /(web|hpw)os/i.test(t),
                    d = /windows phone/i.test(t),
                    v = /SamsungBrowser/i.test(t),
                    m = !d && /windows/i.test(t),
                    g = !i && !l && /macintosh/i.test(t),
                    y = !o && !c && !h && !p && /linux/i.test(t),
                    b = n(/edge\/(\d+(\.\d+)?)/i),
                    w = n(/version\/(\d+(\.\d+)?)/i),
                    E = /tablet/i.test(t),
                    S = !E && /[^-]mobi/i.test(t),
                    x = /xbox/i.test(t),
                    T;
                /opera/i.test(t) ? T = {
                    name: "Opera",
                    opera: e,
                    version: w || n(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                } : /opr|opios/i.test(t) ? T = {
                    name: "Opera",
                    opera: e,
                    version: n(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || w
                } : /SamsungBrowser/i.test(t) ? T = {
                    name: "Samsung Internet for Android",
                    samsungBrowser: e,
                    version: w || n(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                } : /coast/i.test(t) ? T = {
                    name: "Opera Coast",
                    coast: e,
                    version: w || n(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                } : /yabrowser/i.test(t) ? T = {
                    name: "Yandex Browser",
                    yandexbrowser: e,
                    version: w || n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                } : /ucbrowser/i.test(t) ? T = {
                    name: "UC Browser",
                    ucbrowser: e,
                    version: n(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                } : /mxios/i.test(t) ? T = {
                    name: "Maxthon",
                    maxthon: e,
                    version: n(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                } : /epiphany/i.test(t) ? T = {
                    name: "Epiphany",
                    epiphany: e,
                    version: n(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                } : /puffin/i.test(t) ? T = {
                    name: "Puffin",
                    puffin: e,
                    version: n(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                } : /sleipnir/i.test(t) ? T = {
                    name: "Sleipnir",
                    sleipnir: e,
                    version: n(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                } : /k-meleon/i.test(t) ? T = {
                    name: "K-Meleon",
                    kMeleon: e,
                    version: n(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                } : d ? (T = {
                    name: "Windows Phone",
                    windowsphone: e
                }, b ? (T.msedge = e, T.version = b) : (T.msie = e, T.version = n(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? T = {
                    name: "Internet Explorer",
                    msie: e,
                    version: n(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                } : f ? T = {
                    name: "Chrome",
                    chromeos: e,
                    chromeBook: e,
                    chrome: e,
                    version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                } : /chrome.+? edge/i.test(t) ? T = {
                    name: "Microsoft Edge",
                    msedge: e,
                    version: b
                } : /vivaldi/i.test(t) ? T = {
                    name: "Vivaldi",
                    vivaldi: e,
                    version: n(/vivaldi\/(\d+(\.\d+)?)/i) || w
                } : c ? T = {
                    name: "Sailfish",
                    sailfish: e,
                    version: n(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                } : /seamonkey\//i.test(t) ? T = {
                    name: "SeaMonkey",
                    seamonkey: e,
                    version: n(/seamonkey\/(\d+(\.\d+)?)/i)
                } : /firefox|iceweasel|fxios/i.test(t) ? (T = {
                    name: "Firefox",
                    firefox: e,
                    version: n(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (T.firefoxos = e)) : l ? T = {
                    name: "Amazon Silk",
                    silk: e,
                    version: n(/silk\/(\d+(\.\d+)?)/i)
                } : /phantom/i.test(t) ? T = {
                    name: "PhantomJS",
                    phantom: e,
                    version: n(/phantomjs\/(\d+(\.\d+)?)/i)
                } : /slimerjs/i.test(t) ? T = {
                    name: "SlimerJS",
                    slimer: e,
                    version: n(/slimerjs\/(\d+(\.\d+)?)/i)
                } : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? T = {
                    name: "BlackBerry",
                    blackberry: e,
                    version: w || n(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                } : p ? (T = {
                    name: "WebOS",
                    webos: e,
                    version: w || n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                }, /touchpad\//i.test(t) && (T.touchpad = e)) : /bada/i.test(t) ? T = {
                    name: "Bada",
                    bada: e,
                    version: n(/dolfin\/(\d+(\.\d+)?)/i)
                } : h ? T = {
                    name: "Tizen",
                    tizen: e,
                    version: n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || w
                } : /qupzilla/i.test(t) ? T = {
                    name: "QupZilla",
                    qupzilla: e,
                    version: n(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || w
                } : /chromium/i.test(t) ? T = {
                    name: "Chromium",
                    chromium: e,
                    version: n(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || w
                } : /chrome|crios|crmo/i.test(t) ? T = {
                    name: "Chrome",
                    chrome: e,
                    version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                } : o ? T = {
                    name: "Android",
                    version: w
                } : /safari|applewebkit/i.test(t) ? (T = {
                    name: "Safari",
                    safari: e
                }, w && (T.version = w)) : i ? (T = {
                    name: i == "iphone" ? "iPhone" : i == "ipad" ? "iPad" : "iPod"
                }, w && (T.version = w)) : /googlebot/i.test(t) ? T = {
                    name: "Googlebot",
                    googlebot: e,
                    version: n(/googlebot\/(\d+(\.\d+))/i) || w
                } : T = {
                    name: n(/^(.*)\/(.*) /),
                    version: r(/^(.*)\/(.*) /)
                }, !T.msedge && /(apple)?webkit/i.test(t) ? (/(apple)?webkit\/537\.36/i.test(t) ? (T.name = T.name || "Blink", T.blink = e) : (T.name = T.name || "Webkit", T.webkit = e), !T.version && w && (T.version = w)) : !T.opera && /gecko\//i.test(t) && (T.name = T.name || "Gecko", T.gecko = e, T.version = T.version || n(/gecko\/(\d+(\.\d+)?)/i)), !T.windowsphone && !T.msedge && (o || T.silk) ? T.android = e : !T.windowsphone && !T.msedge && i ? (T[i] = e, T.ios = e) : g ? T.mac = e : x ? T.xbox = e : m ? T.windows = e : y && (T.linux = e);
                var N = "";
                T.windowsphone ? N = n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : i ? (N = n(/os (\d+([_\s]\d+)*) like mac os x/i), N = N.replace(/[_\s]/g, ".")) : o ? N = n(/android[ \/-](\d+(\.\d+)*)/i) : T.webos ? N = n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : T.blackberry ? N = n(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : T.bada ? N = n(/bada\/(\d+(\.\d+)*)/i) : T.tizen && (N = n(/tizen[\/\s](\d+(\.\d+)*)/i)), N && (T.osversion = N);
                var C = N.split(".")[0];
                if (E || a || i == "ipad" || o && (C == 3 || C >= 4 && !S) || T.silk) T.tablet = e;
                else if (S || i == "iphone" || i == "ipod" || o || u || T.blackberry || T.webos || T.bada) T.mobile = e;
                return T.msedge || T.msie && T.version >= 10 || T.yandexbrowser && T.version >= 15 || T.vivaldi && T.version >= 1 || T.chrome && T.version >= 20 || T.samsungBrowser && T.version >= 4 || T.firefox && T.version >= 20 || T.safari && T.version >= 6 || T.opera && T.version >= 10 || T.ios && T.osversion && T.osversion.split(".")[0] >= 6 || T.blackberry && T.version >= 10.1 || T.chromium && T.version >= 20 ? T.a = e : T.msie && T.version < 10 || T.chrome && T.version < 20 || T.firefox && T.version < 20 || T.safari && T.version < 6 || T.opera && T.version < 10 || T.ios && T.osversion && T.osversion.split(".")[0] < 6 || T.chromium && T.version < 20 ? T.c = e : T.x = e, T
            }

            function r(e) {
                return e.split(".").length
            }

            function i(e, t) {
                var n = [],
                    r;
                if (Array.prototype.map) return Array.prototype.map.call(e, t);
                for (r = 0; r < e.length; r++) n.push(t(e[r]));
                return n
            }

            function s(e) {
                var t = Math.max(r(e[0]), r(e[1])),
                    n = i(e, function(e) {
                        var n = t - r(e);
                        return e += (new Array(n + 1)).join(".0"), i(e.split("."), function(e) {
                            return (new Array(20 - e.length)).join("0") + e
                        }).reverse()
                    });
                while (--t >= 0) {
                    if (n[0][t] > n[1][t]) return 1;
                    if (n[0][t] !== n[1][t]) return -1;
                    if (t === 0) return 0
                }
            }

            function o(e, r, i) {
                var o = n;
                typeof r == "string" && (i = r, r = void 0), r === void 0 && (r = !1), i && (o = t(i));
                var u = "" + o.version;
                for (var a in e)
                    if (e.hasOwnProperty(a) && o[a]) {
                        if (typeof e[a] != "string") throw new Error("Browser version in the minVersion map should be a string: " + a + ": " + String(e));
                        return s([u, e[a]]) < 0
                    }
                return r
            }

            function u(e, t, n) {
                return !o(e, t, n)
            }
            var e = !0,
                n = t(typeof navigator != "undefined" ? navigator.userAgent || "" : "");
            return n.test = function(e) {
                for (var t = 0; t < e.length; ++t) {
                    var r = e[t];
                    if (typeof r == "string" && r in n) return !0
                }
                return !1
            }, n.isUnsupportedBrowser = o, n.compareVersions = s, n.check = u, n._detect = t, n
        });
        if (bowser.msie || bowser.msedge) {
            $('body').addClass('msie');
        }
        if (!!window.MSInputMethodContext && !!document.documentMode) {
            $('body').addClass('msie--11');
        }
        //safari
        if (bowser.mac && bowser.safari) {
            $('body').addClass('safari');
        }
    },
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
            if (action === "on") {
                self.prepend('<div class="md-preloader-container"><div class="md-preloader"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div></div>');
            } else if (action === "off") {
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
                suppressScrollX: true,
            };
            if (relative) {
                $(selector).perfectScrollbar(perfectScrollbarCFG).css('position', 'relative');
            } else {
                $(selector).perfectScrollbar(perfectScrollbarCFG);
            }
        }
        enquire.register("screen and (min-width:1200px)", {
            match: function() {
                //main
                addScroll('.app-content', true);
                addScroll('.sidebar--notifications .sidebar__content', true);
                addScroll('.sidebar--alerts .sidebar__content', true);
                //menu
                addScroll('nav .main-menu--primary', false);
                addScroll('nav .main-menu--secondary', false);
                addScroll('nav .submenu', false);
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
                        $('.ps-container').perfectScrollbar('update');
                    }, 500);
                }());
            },
            unmatch: function() {
                $('.ps-container').each(function(index, el) {
                    $(this).perfectScrollbar('destroy');
                });
            },
        });
    },
    sidebar: function(action) {
        var settigns = $('#main-alets'),
            notifications = $('#main-notifications'),
            sidebar = $('.sidebar--notifications'),
            closeElement = $('.sidebar--notifications #close-sidebar'),
            closeSingle = $('.flex-block__close'),
            openClass = 'sidebar--open';
        $(document).on('click', function(e) {
            sidebar.removeClass(openClass);
        });
        $('#main-notifications').on('click', function(e) {
            e.stopPropagation();
            sidebar.addClass(openClass);
        });
        $('.sidebar--notifications').on('click', '#close-sidebar', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sidebar.removeClass(openClass);
        });
        sidebar.find(closeSingle).on('click', function(e) {
            e.stopPropagation();
            $(this).closest('.flex-block').animateAndRemove('fadeOut');
        });
        sidebar.on('click', function(e) {
            e.stopPropagation();
        });
    },
    settingsMenu: function(action) {
        //settings menu dropdown
        /** co to jest ?? **/
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
        $('.app-content').scroll(function(e) {
            var el = $('.menu-aside-container'),
                toTop = $('.main-head').outerHeight(),
                isPositionFixed = (el.css('position') == 'fixed');
            // console.log(toTop);
            // console.log(isPositionFixed);
            if ($(this).scrollTop() > toTop && !isPositionFixed) {
                el.addClass('menu-aside-container--fixed');
            }
            if ($(this).scrollTop() < toTop && isPositionFixed) {
                el.removeClass('menu-aside-container--fixed');
            }
        });
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
                        left: "-=" + '20px'
                    });
                });
                arrowRight.on('click', function() {
                    tabBar.velocity({
                        left: "+=" + '20px'
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
    },
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
        enquire.register("screen and (min-width:768px)", {
            match: function() {
                // animator('.main-head', 'animated fadeInDown');
                self.animator('aside', 'animated fadeInLeft');
            },
            unmatch: function() {
                // animator('.main-head', 'animated fadeInDown');
                self.animator('aside', 'animated fadeInLeft');
            },
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
    },
};
Antares.prototype.RWD = {
    init: function() {
        this.RWDplugin();
        $('.card--tabs').rwdHelper('card--slim', '860', '1200');
        $('.main-head').rwdHelper('main-head--slim', '1050');
        $('.page-dashboard .card--chart').rwdHelper('card-chart--slim', '780');
        //fire once
        // var resizeId;
        $(window).on('resize', function() {
            // APP.components.pagePreloader('on');
            // Pace.restart();
            // clearTimeout(resizeId);
            // resizeId = setTimeout(doneResizing, 1000);
        });

        function doneResizing() {
            // APP.components.pagePreloader('off');
        }
        // card logs scrolling
        enquire.register("screen and (max-width:768px)", {
            match: function() {
                // animator('.main-head', 'animated fadeInDown');
                $('.card--logs .timeline.ps-container').perfectScrollbar('destroy');
            },
            unmatch: function() {
                // animator('.main-head', 'animated fadeInDown');
                $('.card--logs .timeline').perfectScrollbar();
            },
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
    },
};
//not needed
require('./notifications.js');
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