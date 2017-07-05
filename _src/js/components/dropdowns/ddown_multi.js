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

export const AntaresDdownMulti = {

    init() {
        $.fn.smartPosition = function () {
            if (this.closest(".ddown")
                    .length && (this.closest(".ddown")
                    .hasClass("ddown--open") || this.closest(".ddown")
                    .hasClass("ddown-multi"))) {

                var obj = this[0],
                    offsetTop = (obj.getBoundingClientRect(), this.offset(), this.offset()
                        .top),
                    offsetBottom =
                        ($(window).width() - (this.offset().left + this.outerWidth(!0)), $(window).height() - (this.offset().top + this.outerHeight(!0))),
                        offsetLeft = this.offset().left,
                        elH = this.outerHeight(),
                        target = (this.outerWidth(), this.closest(".ddown__content > ul")),
                        safeValue = (this.closest(".ddown").find(".ddown__init").outerWidth(!0), this.closest(".ddown").find(".ddown__init").outerHeight(!0), 20);
                if (offsetBottom < safeValue && (target.css("top", -elH), target.css("bottom", "auto"),
                        this.closest(".ddown").addClass("ddown--adj-bottom")),
                    offsetTop < safeValue && this.closest(".ddown").addClass("ddown--adj-top"), offsetLeft < safeValue + 230) {
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
        this.submenuMechanics()
    },
    // methods
    close () {
        var container = $("#app-wrapper"),
            dropdown = $(".ddown-multi"),
            submenu = ($(".ddown-multi__menu"),
            $(".ddown-multi__init"),
            $(".ddown-multi .ddown-multi__submenu li.ddown-multi__return"),
            $(".ddown-multi__submenu")),
            dropdownOpenClass = "ddown-multi--open";
        $(".ddown-multi .ddown-multi__menu li a"), $(this);
        $(window).resize(function (event) {
                $(".ddown-multi--open").removeClass("ddown-multi--open")
            }),
        container.on("click", function (e) {
            dropdown.removeClass(dropdownOpenClass), submenu.hide()
        }),
        container.on("click", ".ddown-multi__menu", function (e) {
            e.stopPropagation()
        }),
        container.on("click", ".ddown-multi__submenu", function (e) {
            e.stopPropagation()
        })
    },
    open () {
    var container = $("#app-wrapper"),
        dropdown = $(".ddown-multi"),
        submenu = ($(".ddown-multi__menu"), $(".ddown-multi__init"), $(".ddown-multi .ddown-multi__submenu li.ddown-multi__return"), $(".ddown-multi__submenu")),
        dropdownOpenClass = "ddown-multi--open";
    $(".ddown-multi .ddown-multi__menu li a"), $(this);
    container.on("click", ".ddown-multi", function (e) {
    e.stopPropagation(), $(".ddown")
        .not($(this))
        .removeClass("ddown--open ddown-multi--open"), $(".ddown-multi__menu")
        .css({
            top: "100%",
            bottom: "auto"
        }), $(".ddown-multi__submenu")
        .css({
            top: "100%",
            bottom: "auto"
        }), $(this)
        .toggleClass(dropdownOpenClass), $(this)
        .find(".ddown-multi__menu")
        .smartPosition()
    })
    },
    submenuMechanics () {
    var container = $("#app-wrapper"),
        dropdown = $(".ddown-multi"),
        submenu = ($(".ddown-multi__menu"), $(".ddown-multi__init"), $(".ddown-multi .ddown-multi__submenu li.ddown-multi__return"), $(".ddown-multi__submenu")),
        dropdownOpenClass = "ddown-multi--open";
    $(".ddown-multi .ddown-multi__menu li a"), $(this);
    container.on("click", function (e) {
        $(".ddown-multi")
            .find(".ddown-multi__submenu")
            .removeClass("is-active")
    }), container.on("click", ".ddown-multi__return", function (e) {
        e.preventDefault(), e.stopPropagation(), $(this)
            .closest(".ddown-multi")
            .find(".ddown-multi__submenu")
            .removeClass("is-active")
    }), container.on("click", ".ddown-multi .ddown-multi__menu li a", function (e) {
        e.preventDefault(), e.stopPropagation();
        var self = $(this);
        $(this)
            .closest(".ddown-multi")
            .removeClass(dropdownOpenClass);
        var currentData = $(this)
            .data("target");
        $(this)
            .closest(".ddown-multi")
            .find("[data-name='" + currentData + "']")
            .show(), $(this)
            .closest(".ddown-multi")
            .find("[data-name='" + currentData + "']")
            .addClass("is-active"), self.closest(".ddown-multi")
            .find("[data-name='" + currentData + "']")
            .smartPosition()
    }), container.on("click", ".ddown-multi .ddown-multi__submenu li.ddown-multi__return", function (e) {
        e.stopPropagation(), submenu.hide(), $(this)
            .closest(".ddown-multi")
            .addClass(dropdownOpenClass)
    })
    },


};

$(function() {
    window.AntaresDdownMulti = AntaresDdownMulti;
    AntaresDdownMulti.init();
});

