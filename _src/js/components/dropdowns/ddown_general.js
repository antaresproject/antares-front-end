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

const AntaresDdownGeneral = {
    init() {
        this.scrollCloseDropdowns();
        this.ddownUpZIndex();
        this.clickCloseDropdownDateRange();
        this.mobileDdownFilter();
        this.ddownTopCorrect();
    },

    ddownTopCorrect() {
        // $('.ddown').click(function () {
        //     let thisDdown = $(this);
        //     let btnToTop = thisDdown[0].getBoundingClientRect().top;
        //     let heightOfDdown = thisDdown.find('.ddown__menu').height() + 45;
        //     let btnToBot = $(window).height() - btnToTop;
        //     if (heightOfDdown > btnToTop) {
        //         thisDdown.removeClass('ddown--open-up');
        //         thisDdown.addClass('ddown--open-bottom');
        //         thisDdown.find('.ddown__arrow').removeClass('without-arrows');
        //     } else if (heightOfDdown > btnToBot) {
        //         thisDdown.removeClass('ddown--open-bottom');
        //         thisDdown.addClass('ddown--open-up');
        //         thisDdown.find('.ddown__arrow').addClass('without-arrows');
        //     } else {
        //         thisDdown.removeClass('ddown--open-up');
        //         thisDdown.addClass('ddown--open-bottom');
        //         thisDdown.find('.ddown__arrow').removeClass('without-arrows');
        //     }
        // });
        $('.ddown__menu').removeClass('ddown--open-bottom');
        $('.ddown__menu').removeClass('ddown--open-up');
    },
    closeAllDropdowns() {
        //In console   AntaresForms.elements.closeAllDropdowns()
        const systemDropdowns = {
            init() {
                this.closeDdownSingle();
                this.closeDdownMulti();
            },
            closeDdownSingle() {
                $('.ddown--open').removeClass('ddown--open');
                $('.breadcrumbs li').removeClass('is-active');
            },
            closeDdownMulti() {
                $('.ddown-multi--open').removeClass('ddown-multi--open');
                $('.breadcrumbs li').removeClass('is-active');
                $('.ddown-multi__submenu')
                    .removeClass('is-active')
                    .css('display', 'none');
            }
        };
        const pluginDropdowns = {
            init() {
                this.closeSelect2();
                this.closeTimePicker();
                this.closeAutocomplete();
                this.closeContextMenu();
                this.closeDatePicker();
                this.closeDropJS();
                this.closeMiniColors();
            },
            closeDropJS() {
                $('.this-is-dropczyk--out').removeClass('drop-enabled drop-open');
                $('.dropJS-content-real--client-contacts').removeClass('drop-enabled drop-open');
            },
            closeContextMenu() {
                // $(".context-menu-active").contextMenu("hide"); //need open or error in console
                // $('.billevo-table tbody tr td:not(.dt-actions)').contextMenu( false );
                if ($('ul').is('.context-menu-list')) {
                    $('.context-menu-list').contextMenu('hide');
                }
            },
            closeAutocomplete() {
                // $("[autocomplete]").autocomplete("close"); //need open or error in console
            },
            closeTimePicker() {
                $('.xdsoft_datetimepicker').css('display', 'none');
            },
            closeSelect2() {
                if ($('.select2').hasClass('select2-container--open')) {
                    $('select').select2('close');
                }
            },
            closeDatePicker() {
                $('[data-daterangepicker]').daterangepicker('close');
            },
            closeMiniColors() {
                $('.minicolors').removeClass("minicolors-focus")
                $('.minicolors-panel').css('display', 'none');
            }
        };
        systemDropdowns.init();
        pluginDropdowns.init();
    },
    scrollCloseDropdowns() {
        var self = this;

        function scrollWork(status) {
            if (status === true) {
                $('.app-content, .ps').bind('mousewheel DOMMouseScroll MozMousePixelScroll touchmove', function (event) {
                    var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
                    if (delta >= 0) {
                        self.closeAllDropdowns();
                    } else if (delta < 0) {
                        self.closeAllDropdowns();
                    } else {
                        return false;
                    }
                });
            } else {
                $('.app-content, .ps').unbind('mousewheel DOMMouseScroll MozMousePixelScroll touchmove');
            }
        }

        scrollWork(true); // start work function

        //for dropdowns where you have address bar

        let newW;
        let oldW = window.innerHeight;
        $(window).on('resize', function () {
            enquire.register('screen and (max-width: 1023px)', {
                match: function () {
                    newW = window.innerHeight;
                    let differenceWidthOldAndNew = oldW - newW
                    if (oldW !== newW && differenceWidthOldAndNew < 70) {
                        scrollWork(false);
                    }
                }
            })
            enquire.register('screen and (min-width: 1024px)', {
                match: function () {
                    self.closeAllDropdowns()
                }
            })
        });


        //for dropdowns where you have address bar end

        // FOR DROPDOWN WHEN HE HAVE DOUBLE DROPDOWN

        var parent;
        $('.ddown').on('click touchstart', 'li.has-submenu', function (e) {
            parent = $(this).closest('.ddown');
            scrollWork(false);
        });

        // FOR DROPDOWN WHEN HE HAVE DOUBLE DROPDOWN END

        //WHEN dropdown > devicesHeight
        $('.ddown').on('click touchstart', function () {
            parent = $(this);
            var ddown = parent.find('.ddown__menu');
            setTimeout(function () {
                if (ddown.height() + $('.ddown__menu').offset().top > $(window).height()) {
                    console.log('stopwork');
                    scrollWork(false);
                }
            }, 100);
        });
        //WHEN dropdown > devicesHeightEND

        $(document).click(function () {
            // pomoc dla dropdowns
            if (parent !== undefined && parent.not('ddown--open')) {
                scrollWork(true);
                // console.log('goscrollClose')
            }
        });

        // FOR SPINNERS (filter, general_settings)
        $('.ddown')
            .on('mousedown', '.ui-state-active', function (e) {
                scrollWork(false);
            })
            .on('mouseup', '.ui-state-active', function (e) {
                scrollWork(true);
            });
        // FOR SPINNERS END (filter, general_settings)
    },
    ddownUpZIndex() {
        $(document).mouseup(function (e) {
            var container = $('.ddown');
            if (container.has(e.target).length === 0) {
                $('.grid-stack-item').css('z-index', '0');
            } else {
                $('.grid-stack-item').css('z-index', '0');
                $(e.target)
                    .closest('.grid-stack-item')
                    .css('z-index', '10');
            }
        });
    },
    clickCloseDropdownDateRange() {
        var self = this;
        $(document).mouseup(function (e) {
            var container = $('.ddown');
            var container2 = $('.input-field--group');
            if (!e.target.closest('.ui-widget-content')) {
                if (container.has(e.target).length === 0 || container2.has(e.target).length === 0) {
                    $('[data-daterangepicker]').daterangepicker('close');
                }
            }
        });
        $('.breadcrumbs').click(function () {
            self.closeAllDropdowns;
            $('.grid-stack-item').css('z-index', '0');
        });
    },
    mobileDdownFilter() {
        $('.ddown--view-more-options').click(function () {
            $(this)
                .find('.ddown-multi__submenu')
                .css('display', 'none');
        });
        $('.add-filter').click(function () {
            $(this)
                .closest('.ddown__content')
                .find('.ddown-multi__submenu')
                .removeClass('is-active');
        });
    }
};

$(function () {
    window.AntaresDdownGeneral = AntaresDdownGeneral;
    AntaresDdownGeneral.init();
});

export default AntaresDdownGeneral;
