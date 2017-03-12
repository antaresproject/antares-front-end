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

/* jshint expr: true */

require('script-loader!tinycolor2');
require('./../../external/modified/jquery.minicolors.js');


function SetBrandColors() {
    this.addStyles = function(indicator, elements, styles, value) {
            $('[data-desc="style-second-first-texts"]').remove();
            $('head').append("<style data-desc='brand-colors-" + indicator + "'>" + elements + "{" + styles + ":" + value + ' !important' + "}</style>");
            return true;
        },
        this.clearStyles = function(indicator) {
            $('[data-desc="brand-colors-' + indicator + '"]').remove();
            return true;
        },
        this.updateColorManually = function() {
            $('input.cp').on('keyup', function() {
                var theColor = tinycolor($(this).val());
                //if is hex and not accept 3digit format
                if (theColor.isValid() && $(this).val().length == '7') {
                    $(this).closest('.cp-brand__preview').find('.minicolors-input').minicolors('value', $(this).val());
                    $(this).qtip('destroy');
                } else if ($(this).val().length == 7 && !theColor.isValid()) {
                    console.log('incorrectColor');
                    $(this).qtip({
                        style: {
                            classes: 'ar',
                            tip: {
                                width: 9,
                                height: 5,
                            },
                        },
                        content: {
                            text: $(this).data('tooltip-text')
                        },
                        show: {
                            ready: true
                        },
                        hide: {
                            delay: 1000
                        },
                        position: {
                            viewport: $(window)
                        }
                    });
                }
            });
            // $('input.cp').inputmask('\\#######');
        },
        this.defaultColors = function() {
            // $('.cp-brand--typo').eq(0).find('.minicolors-theme-ar-small').eq(0).find('.minicolors-swatch-color').css('background', '#fff');
            // $('.cp-brand--typo').eq(0).find('.minicolors-theme-ar-small').eq(1).find('.minicolors-swatch-color').css('background', '#90dcfe');
            // $('.cp-brand--typo').eq(1).find('.minicolors-theme-ar-small').eq(0).find('.minicolors-swatch-color').css('background', '#fff');
            // $('.cp-brand--typo').eq(1).find('.minicolors-theme-ar-small').eq(1).find('.minicolors-swatch-color').css('background', '#6f8194');
            // $('.cp-brand--typo').eq(2).find('.minicolors-theme-ar-small').eq(0).find('.minicolors-swatch-color').css('background', '#414857');
            // $('.cp-brand--typo').eq(2).find('.minicolors-theme-ar-small').eq(1).find('.minicolors-swatch-color').css('background', '#3ca53c');
        },
        this.colorPickersBig = function() {
            //default values
            var self = this;
            $('.cp-brand__ar-big').minicolors({
                theme: 'ar-big',
                textfield: false,
                format: 'hex',
                letterCase: 'lowercase',
                show: function() {
                    $(this).closest('.cp-brand').css('flex', '2');
                    $(this).closest('.minicolors').css('z-index', '35');
                },
                hide: function() {
                    $(this).closest('.cp-brand').css('flex', '1');
                    $(this).closest('.minicolors').css('z-index', '1');
                },
                change: function(value, opacity) {
                    var temp = tinycolor(value);
                    var hex = temp.toHexString();
                    //update dev input
                    $(this).closest('.cp-brand').find('.cp').attr('value', hex);
                    if ($(this).closest('.cp-brand--primary').length) {
                        var mr = tinycolor.mostReadable(value, ["#000"], { includeFallbackColors: true, level: "AAA", size: "small" }).toHexString();
                        $('.cp-brand--typo.cp-brand--primary').find('input.cp').css('color', mr);
                        $(this).closest('.cp-brand').find('.cp-brand__title').css('color', mr);
                        $(this).closest('.cp-brand').find('input.cp').css('color', mr);
                        var modPri1 = tinycolor(value).darken(3).toString(),
                            modPri2 = tinycolor(value).brighten(5).toString(),
                            modPri3 = tinycolor(value).brighten(10).toString(),
                            modPri4 = tinycolor(value).lighten(32).toString(),
                            modPri5= tinycolor(value).darken(4).toString(),
                            //PRIMARY
                            primary = "primary";
                        self.clearStyles(primary);
                        //MAIN COLOR
                        var primaryTargets = [
                                '.ddown.ddown--brand .ddown__menu li.is-selected .flex-block:after',
                                'aside.main-sidebar ul.main-menu .submenu.submenu--system section.section--2col .submenu__content .submenu__content-right .datarow .datarow__right i',
                                '.flex-block .flex-block__badge',
                                '.dropzone-form .dz-message .dz-m__content span',
                                '.ddown .ddown__menu > li:hover > a',
                                '.ddown .ddown__menu > li:hover > a i',
                                'i.zmdi-help-outline.help--trigger:hover',
                                //new
                                'aside.main-sidebar ul.main-menu .submenu.submenu--system section.section--2col .submenu__content .submenu__content-right .datarow .datarow__right i',
                                '.main-menu .is-active .icon, .main-menu .is-active i, .main-menu .is-active .text',
                                '.ddown.ddown--brand .ddown__menu li.is-selected .flex-block, .ddown.ddown--brand .ddown__menu li.is-selected .flex-block .flex-block__title',
                                '#table-ma',
                                '.timeline li.timeline__entry--ok:before',
                                '.timeline li a',
                                '.ddown.ddown--brand .ddown__menu li.is-selected .flex-block',
                                '.ddown.ddown--brand .ddown__menu li.is-selected .flex-block .flex-block__title'
                            ],
                            primaryTargetsBackground = [
                                '.app-content:before',
                                '.switch .switch-checkbox:checked + .switch-container',
                                '.app-content__footer .btn--submit',
                                '.menu-aside-container',
                                '.app-content:before',
                                //new
                                '.mdl-textfield__label:after',
                                '.card.card--chart-small .card__header',
                                '.card.card--chart-small .card__header-chart',
                                '.card.card--primary-light',
                                '.btn.btn--primary',
                            ],
                            primaryTargetsBorder = [
                                '.breadcrumbs .ddown__menu',
                                //new
                                'aside.main-sidebar ul.main-menu li:nth-child(1).submenu-open > a:after',
                                'aside.main-sidebar ul.main-menu.main-menu--secondary li:nth-child(1).submenu-open > a:after',
                                'aside.main-sidebar ul.main-menu.main-menu--secondary li:nth-child(2).submenu-open > a:after',
                                'aside.main-sidebar.main-menu.main-menu--brand li:nth-child(1).submenu-open > a:after',
                                'aside.main-sidebar ul.main-menu li:nth-child(2).submenu-open > a:after'
                            ],
                            primaryTargetsMod1 = [
                                '.menu-aside li.is-active a',
                                '.breadcrumbs > li.is-active',
                            ],
                            primaryTargetsMod3 = [
                                '.badge',
                                '.ddown--brand .ddown__init',
                                '#table-ma.is-disabled',
                            ];
                            primaryTargetsMod4 = [
                                '.tbl-c .billevo-table tr.is-selected td',
                                '.tbl-c .billevo-table tr.ui-selected td',
                                '.tbl-c .billevo-table tr.ui-selecting td'
                            ];
                            primaryTargetsMod5 = [
                                '.tbl-c .billevo-table tr.is-selected td',
                                '.tbl-c .billevo-table tr.ui-selected td',
                                '.tbl-c .billevo-table tr.ui-selecting td'
                            ];
                        //color
                        for (var i = 0; i < primaryTargets.length; i++) {
                            self.addStyles(primary, primaryTargets[i], 'color', value);
                        }
                        //background
                        for (var j = 0; j < primaryTargetsBackground.length; j++) {
                            self.addStyles(primary, primaryTargetsBackground[j], 'background-color', value);
                        }
                        //border
                        for (var k = 0; k < primaryTargetsBorder.length; k++) {
                            self.addStyles(primary, primaryTargetsBorder[k], 'border-color', value);
                        }
                        //mod1
                        for (var l = 0; l < primaryTargetsMod1.length; l++) {
                            self.addStyles(primary, primaryTargetsMod1[l], 'background-color', modPri1);
                        }
                        //mod3
                        for (var h = 0; h < primaryTargetsMod3.length; h++) {
                            self.addStyles(primary, primaryTargetsMod3[h], 'background-color', modPri3);
                        }
                        //mod4
                        for (var u = 0; u < primaryTargetsMod4.length; u++) {
                            self.addStyles(primary, primaryTargetsMod4[u], 'background-color', modPri4);
                        }
                        //mod5
                        for (var ub = 0; ub < primaryTargetsMod5.length; ub++) {
                            self.addStyles(primary, primaryTargetsMod5[ub], 'border-color', modPri5);
                        }
                        //apply
                        $('.colors-text-main-first').val(value);
                        $(this).closest('.color-pickers').find('.cp-brand--typo.cp-brand--primary').find('.cp-brand__preview').css('background-color', value);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(0).css('background-color', modPri1);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(1).css('background-color', modPri2);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(2).css('background-color', modPri3);
                        $('.colors-main-mod1').val(modPri1);
                        $('.colors-main-mod2').val(modPri2);
                        $('.colors-main-mod3').val(modPri3);
                    } else if ($(this).closest('.cp-brand--secondary').length) {
                        var mr3 = tinycolor.mostReadable(value, ["#000"], { includeFallbackColors: true, level: "AAA", size: "small" }).toHexString();
                        $('.cp-brand--typo.cp-brand--secondary').find('input.cp').css('color', mr3);
                        $(this).closest('.cp-brand').find('.cp-brand__title').css('color', mr3);
                        $(this).closest('.cp-brand').find('input.cp').css('color', mr3);
                        var modSec1 = tinycolor(value).darken(3).toString(),
                            modSec2 = tinycolor(value).brighten(9).saturate(2).darken(1).toString(),
                            modSec3 = tinycolor(value).brighten(36).toString();
                        //SECONDARY
                        var secondary = "secondary";
                        self.clearStyles(secondary);
                        self.addStyles(secondary, 'aside.main-sidebar', 'background-color', value);
                        self.addStyles(secondary, 'aside.main-sidebar ul.main-menu .submenu', 'background-color', modSec1);
                        self.addStyles(secondary, 'aside.main-sidebar ul.main-menu > li.more-trigger', 'border-color', modSec1);
                        //apply
                        //how to get var name with ternation without eval
                        // for (var i = 0; i < 3; i++) {
                        //     $this.closest('.cp-brand').find('.cp-brand__sgl').eq(i).css('background-color', ["modSec"+(i+1)]);
                        //     console.log( eval(["modSec"+(i+1)]) );
                        // }
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(0).css('background-color', modSec1);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(1).css('background-color', modSec2);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(2).css('background-color', modSec3);
                        $(this).closest('.color-pickers').find('.cp-brand--typo.cp-brand--secondary').find('.cp-brand__preview').css('background-color', value);
                        $('.colors-secondary-mod1').val(modSec1);
                        $('.colors-secondary-mod2').val(modSec2);
                        $('.colors-secondary-mod3').val(modSec3);
                    } else if ($(this).closest('.cp-brand--tetriary').length) {
                        var mr2 = tinycolor.mostReadable(value, ["#000"], { includeFallbackColors: true, level: "AAA", size: "small" }).toHexString();
                        $('.cp-brand--typo.cp-brand--tetriary').find('input.cp').css('color', mr2);
                        $(this).closest('.cp-brand').find('.cp-brand__title').css('color', mr2);
                        $(this).closest('.cp-brand').find('input.cp').css('color', mr2);
                        var modTet1 = tinycolor(value).darken(17).desaturate(8).toString(),
                            modTet2 = tinycolor(value).darken(4).desaturate(9).toString(),
                            modTet3 = tinycolor(value).lighten(3).desaturate(7).toString();
                        //apply
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(0).css('background-color', modTet1);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(1).css('background-color', modTet2);
                        $(this).closest('.cp-brand').find('.cp-brand__sgl').eq(2).css('background-color', modTet3);
                        $(this).closest('.color-pickers').find('.cp-brand--typo.cp-brand--tetriary').find('.cp-brand__preview').css('background-color', value);
                        $('.colors-background-mod1').val(modTet1);
                        $('.colors-background-mod2').val(modTet2);
                        $('.colors-background-mod3').val(modTet3);
                    }
                    //apply to each big color area
                    $(this).closest('.cp-brand__preview').css('background-color', value);
                    // while (value.charAt(0) === '#')
                    // value = value.substr(1);
                    $(this).closest('.cp-brand').find('input.cp').val(value);
                }
            });
            //default colors on init
            (function miniColorValuesBrand() {
                var dC1 = $('.color-pickers .col-group:first-child .cp-brand--primary .cp').val(),
                    dC2 = $('.color-pickers .col-group:first-child .cp-brand--secondary .cp').val(),
                    dC3 = $('.color-pickers .col-group:first-child .cp-brand--tetriary .cp').val();
                $('.cp-brand--primary .cp-brand__ar-big').minicolors('value', { color: dC1 });
                $('.cp-brand--secondary .cp-brand__ar-big').minicolors('value', { color: dC2 });
                $('.cp-brand--tetriary .cp-brand__ar-big').minicolors('value', { color: dC3 });
            }());
            //additional click on pallets 
            $('.cp-brand__pallete').on('click', function() {
                $(this).siblings('.cp-brand__preview').find('.minicolors-input').minicolors('show');
            });
        },
        this.colorPickersSmall = function() {
            //Small color pickers
            var self = this;
            $('.cp-brand__p-sgl').minicolors({
                textfield: false,
                format: 'hex',
                letterCase: 'lowercase',
                theme: 'ar-small',
                show: function() {
                    $(this).closest('.cp-brand').css('flex', '2');
                },
                hide: function() {
                    $(this).closest('.cp-brand').css('flex', '1');
                },
                change: function(value, opacity) {
                    var temp = tinycolor(value);
                    var hex = temp.toHexString();
                    //update dev input
                    $(this).closest('.cp-brand__preview').find('.cp').attr('value', hex);
                    $(this).closest('.minicolors').next('.color-saver').val(value);
                    if ($(this).hasClass('cp-brand__p-sgl--left')) {
                        $(this).closest('.cp-brand').find('.cp-brand__preview:first-child .cp-brand__big').css('color', value);
                        if ($(this).closest('.cp-brand--primary').length) {
                            //PRIMARY LEFT
                            var primaryLeft = "primary-left",
                                primaryLeftTargets = [
                                    '.menu-aside li a span, .menu-aside li a i',
                                    '.breadcrumbs > li:last-child .ddown__init a, .breadcrumbs .ddown .ddown__content .ddown__arrow:after,.breadcrumbs .ddown .ddown__init.ddown__init--white:after, .ddown .ddown__init.ddown__init--white i',
                                    '.item-grp  i',
                                    '.btn.btn--brand',
                                    '.ddown .ddown__init.ddown__init--white:after, .ddown .ddown__init.ddown__init--white i'
                                ];
                            self.clearStyles(primaryLeft);
                            for (var q = 0; q < primaryLeftTargets.length; q++) {
                                self.addStyles(primaryLeft, primaryLeftTargets[q], 'color', value);
                            }
                            //apply
                            $('.colors-text-main-first').val(value);
                        }
                        if ($(this).closest('.cp-brand--secondary').length) {
                            //SECONDARY LEFT
                            var secondartLeft = "secondary-left",
                                secondartLeftTargets = [
                                    'aside.main-sidebar ul.main-menu > li > a',
                                    'aside.main-sidebar ul.main-menu > li > a .icon',
                                    'aside.main-sidebar ul.main-menu > li > a i'
                                ];
                            self.clearStyles(secondartLeft);
                            for (var a = 0; a < secondartLeftTargets.length; a++) {
                                self.addStyles(secondartLeft, secondartLeftTargets[a], 'color', value);
                            }
                            //apply
                            $('.colors-text-secondary-first').val(value);
                        }
                        if ($(this).closest('.cp-brand--tetriary').length) {
                            //TETRIARY LEFT
                            var tetriaryLeft = "tetriary-left",
                                tetriaryLeftTargets = [
                                    '.form-block label:not(.switch)',
                                ];
                            self.clearStyles(tetriaryLeft);
                            for (var s = 0; s < tetriaryLeftTargets.length; s++) {
                                self.addStyles(tetriaryLeft, tetriaryLeftTargets[s], 'color', value);
                            }
                            //apply
                            $('.colors-text-background-first').val(value);
                        }
                    } else if ($(this).hasClass('cp-brand__p-sgl--right')) {
                        $(this).closest('.cp-brand').find('.cp-brand__preview:last-child .cp-brand__big').css('color', value);
                        if ($(this).closest('.cp-brand--primary').length) {
                            //PRIMARY RIGHT
                            var primaryRight = "primary-right",
                                primaryRightTargets = [
                                    '.search-box .search-box__search-field',
                                    '.search-box > i',
                                    '.search-box .search-box__mdl-textfield .mdl-textfield__label'
                                ],
                                primaryRightTargetsBorder = [
                                    '.search-box .search-box__search-field',
                                ];
                            self.clearStyles(primaryRight);
                            for (var f = 0; f < primaryRightTargets.length; f++) {
                                self.addStyles(primaryRight, primaryRightTargets[f], 'color', value);
                            }
                            for (var d = 0; d < primaryRightTargetsBorder.length; d++) {
                                self.addStyles(primaryRight, primaryRightTargetsBorder[d], 'border-color', value);
                            }
                            //apply
                            $('.colors-text-main-second').val(value);
                        }
                        if ($(this).closest('.cp-brand--secondary').length) {
                            //SECONDARY RIGHT
                            var secondaryRight = "secondary-right";
                            self.clearStyles(secondaryRight);
                            var secondaryRightTargets = [
                                'aside.main-sidebar ul.main-menu > li > a:hover',
                                'aside.main-sidebar ul.main-menu > li > a:hover .icon',
                                'aside.main-sidebar ul.main-menu > li > a:hover i',
                                'aside.main-sidebar ul.main-menu > li.hovered .text',
                                'aside.main-sidebar ul.main-menu > li.hovered .icon',
                                'aside.main-sidebar ul.main-menu > li.hovered i'
                            ];
                            for (var g = 0; g < secondaryRightTargets.length; g++) {
                                self.addStyles(secondaryRight, secondaryRightTargets[g], 'color', value);
                            }
                            //apply
                            $('.colors-text-secondary-second').val(value);
                        }
                        if ($(this).closest('.cp-brand--tetriary').length) {
                            //TETRIARY RIGHT
                            var tetriaryRight = "tetriary-right";
                            self.clearStyles(tetriaryRight);
                            self.addStyles(tetriaryRight, 'form fieldset legend', 'color', value);
                            //apply
                            $('.colors-text-background-second').val(value);
                        }
                    }
                    $(this).closest('.cp-brand__preview').find('input.cp').val(value);
                    //contrast
                    var mr4 = tinycolor.mostReadable(value, ["#000"], { includeFallbackColors: true, level: "AAA", size: "small" }).toHexString();
                    $(this).closest('.cp-brand__preview').find('input.cp').css('color', mr4);
                }
            });
            (function miniColorValuesTypo() {
                var primaryTypo = $('.cp-brand--primary.cp-brand--typo'),
                    secondaryTypo = $('.cp-brand--secondary.cp-brand--typo'),
                    tetriaryTypo = $('.cp-brand--tetriary.cp-brand--typo');
                var smallDC1 = primaryTypo.find('.cp-brand__preview:nth-child(1) .cp').val();
                var smallDC2 = primaryTypo.find('.cp-brand__preview:nth-child(2) .cp').val();
                var smallDC3 = secondaryTypo.find('.cp-brand__preview:nth-child(1) .cp').val();
                var smallDC4 = secondaryTypo.find('.cp-brand__preview:nth-child(2) .cp').val();
                var smallDC5 = tetriaryTypo.find('.cp-brand__preview:nth-child(1) .cp').val();
                var smallDC6 = tetriaryTypo.find('.cp-brand__preview:nth-child(2) .cp').val();
                primaryTypo.find('.cp-brand__preview:nth-child(1) .cp-brand__p-sgl').minicolors('value', { color: smallDC1 });
                primaryTypo.find('.cp-brand__preview:nth-child(2) .cp-brand__p-sgl').minicolors('value', { color: smallDC2 });
                secondaryTypo.find('.cp-brand__preview:nth-child(1) .cp-brand__p-sgl').minicolors('value', { color: smallDC3 });
                secondaryTypo.find('.cp-brand__preview:nth-child(2) .cp-brand__p-sgl').minicolors('value', { color: smallDC4 });
                tetriaryTypo.find('.cp-brand__preview:nth-child(1) .cp-brand__p-sgl').minicolors('value', { color: smallDC5 });
                tetriaryTypo.find('.cp-brand__preview:nth-child(2) .cp-brand__p-sgl').minicolors('value', { color: smallDC6 });
            }());
        };
    this.defaultColors();
    this.colorPickersSmall();
    this.colorPickersBig();
    this.updateColorManually();
}
$(document).ready(function() {
    var antaresBrandColors = new SetBrandColors();
});






