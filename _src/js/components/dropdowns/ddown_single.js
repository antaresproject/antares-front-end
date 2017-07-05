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

export const AntaresDdownSingle = {

    init() {
        $.fn.smartPosition = function () {
            if (this.closest(".ddown")
                    .length && (this.closest(".ddown")
                    .hasClass("ddown--open") || this.closest(".ddown")
                    .hasClass("ddown-multi"))) {

                var obj = this[0],
                    offsetTop = (obj.getBoundingClientRect(), this.offset(), this.offset()
                        .top),
                    offsetBottom = ($(window)
                        .width() - (this.offset()
                        .left + this.outerWidth(!0)), $(window)
                        .height() - (this.offset()
                        .top + this.outerHeight(!0))),
                    offsetLeft = this.offset()
                        .left,
                    elH = this.outerHeight(),
                    target = (this.outerWidth(), this.closest(".ddown__content > ul")),
                    safeValue = (this.closest(".ddown")
                        .find(".ddown__init")
                        .outerWidth(!0), this.closest(".ddown")
                        .find(".ddown__init")
                        .outerHeight(!0), 20);
                if (offsetBottom < safeValue && (target.css("top", -elH), target.css("bottom", "auto"), this.closest(".ddown")
                        .addClass("ddown--adj-bottom")), offsetTop < safeValue && this.closest(".ddown")
                        .addClass("ddown--adj-top"), offsetLeft < safeValue + 230) {
                    if ($(this)
                            .closest(".breadcrumbs")
                            .length) {
                        target.css("left", "-15px"), target.css("right", "auto");
                        var arrow = target.siblings(".ddown__arrow"),
                            breadWidth = target.closest("li")
                                .width();
                        arrow.css({
                            right: "auto",
                            left: breadWidth + 7
                        })
                    }
                    this.closest(".ddown")
                        .addClass("ddown--adj-left")
                }
            }
        };
        this.close();
        this.open();
        this.classMod();
        this.arrowPos();
        this.brand()
    },

    // methods

    close () {
        var container = $("#app-wrapper"),
            ddown = $(".ddown"),
            menu = $(".ddown__menu"),
            subMenu = $(".ddown__submenu"),
            menuLi = $(".ddown__menu li");
        $(this);
        $(window).resize(function (event) {
        $(".ddown--open").removeClass("ddown--open")
            })
        , container.on("click", function () { $(".ddown--open")
                .removeClass("ddown--open"), $(".breadcrumbs li")
                .removeClass("is-active"), $(".ddown")
                .removeClass("ddown--adj-top"), $(".ddown")
                .removeClass("ddown--adj-bottom"), $(".ddown")
                .removeClass("ddown--adj-left"), $(".ddown")
                .removeClass("ddown--adj-right")
        })
    },
    open  () {
        var container = $("#app-wrapper"),
            ddown = $(".ddown"),
            menu = $(".ddown__menu"),
            subMenu = $(".ddown__submenu"),
            menuLi = $(".ddown__menu li");
        $(this);
        container.on("click", ".ddown", function (e) {
            return e.stopPropagation(),
                $(".ddown").not($(this)).removeClass("ddown--open ddown-multi--open"),
                $(".ddown__menu").css({
                    top: "auto",
                    bottom: "auto"
                }),
                $(".ddown").removeClass("ddown--adj-top"),
                $(".ddown").removeClass("ddown--adj-bottom"),
                $(".ddown").removeClass("ddown--adj-left"),
                $(".ddown").removeClass("ddown--adj-right"),
            !$(this).hasClass("ddown-multi") && (!$(this).find(".ddown__init").prop("disabled")
            &&
            (ddown.not($(this)).removeClass("ddown--open"),
                $(this).addClass("ddown--open"),
                $(this).find(".ddown__menu").smartPosition(),
                void($(this).closest(".breadcrumbs").length && $(this).closest("li").addClass("is-active"))))
        })
    },
    arrowPos () {
        var container = $("#app-wrapper"),
            ddown = $(".ddown"),
            menu = $(".ddown__menu"),
            subMenu = $(".ddown__submenu"),
            menuLi = $(".ddown__menu li");
        $(this);
        $(".breadcrumbs li")
            .each(function (index, el) {
                if (!$(this)
                        .find(".ddown")
                        .length) return !1;
                var topArrowLeft = $(this)
                            .find(".ddown__init")
                            .offset()
                            .left + $(this)
                            .find(".ddown__init")
                            .outerWidth(),
                    bottomArrowLeft = $(this)
                            .find(".ddown__arrow")
                            .offset()
                            .left + $(this)
                            .find(".ddown__arrow")
                            .outerWidth(),
                    distance = topArrowLeft - bottomArrowLeft,
                    currentBottomLeft = parseInt($(this)
                        .find(".ddown__arrow")
                        .css("left"), 10);
                $(this)
                    .find(".ddown__arrow")
                    .css("left", distance + currentBottomLeft + 7)
            })
    },
    brand () {
        var container = $("#app-wrapper"),
            ddown = $(".ddown"),
            menu = $(".ddown__menu"),
            subMenu = $(".ddown__submenu"),
            menuLi = $(".ddown__menu li");
        $(this);
        $(document)
            .on("click", ".ddown--brand li", function () {
                $(this)
                    .hasClass("ddown__header") || $(this)
                    .hasClass("ddown__footer") || ($(".ddown--brand li")
                    .removeClass("is-selected"), $(this)
                    .addClass("is-selected"))
            }), $(document)
            .on("click", ".mobile-ddowns__menu--brand li", function () {
                $(".mobile-ddowns__menu--brand li")
                    .removeClass("is-selected"), $(this)
                    .addClass("is-selected")
            })
    },
    classMod () {
        var container = $("#app-wrapper"),
            ddown = $(".ddown"),
            menu = $(".ddown__menu"),
            subMenu = $(".ddown__submenu"),
            menuLi = $(".ddown__menu li");
        $(this);
    menu.each(function (index, el) {
        $(this)
            .children(".ddown__header")
            .length || $(this)
            .children(".ddown__footer")
            .length || $(this)
            .addClass("ddown__menu--innerpadd")
    }), subMenu.each(function (index, el) {
        $(this)
            .children(".ddown__header")
            .length || $(this)
            .children(".ddown__footer")
            .length || $(this)
            .addClass("ddown__menu--innerpadd")
    }), menuLi.each(function (index, el) {
        $(this)
            .children(".ddown__submenu")
            .length && $(this)
            .addClass("has-submenu")
    }), ddown.each(function (index, el) {
        $(this)
            .find(".ddown__init")
            .children("i")
            .length && $(this)
            .addClass("ddown__shorty")
    })
},

};

$(function() {
    window.AntaresDdownSingle = AntaresDdownSingle;
    AntaresDdownSingle.init();
});

