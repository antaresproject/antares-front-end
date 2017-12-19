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

/* jshint expr: true */

require('script-loader!tinycolor2');
require('./../../external/modified/jquery.minicolors.js');

const AntaresBrandColors = {
  init() {
    this.defaultColors();
    this.colorPickersSmall();
    this.colorPickersBig();
    // this.updateColorManually();
    this.resetStyle();
  },
  setLastChosenColorsOnLoad() {
    setTimeout(function() {
      $('.minicolors-input.cp').each(function() {
        let colorToBeSet = $(this).val();
        $(this).minicolors('value', colorToBeSet);
      });
    }, 1500);
  },
  defaultColors() {
    function takeDefaultColor(type, order) {
      if (order === undefined) {
        order = false;
      }
      if (order === false) {
        var color = $('.standard-color--' + type).css('background-color');
        var colorTiny = tinycolor(color);
        $('.standard-color--' + type + '+input').val(colorTiny.toHexString());
      } else {
        var color = $('.standard-color--' + type + '-' + order).css('color');
        var colorTiny = tinycolor(color);
        $('.standard-color--' + type + '-' + order)
          .closest('.cp-brand__ar-big')
          .find('.cp')
          .val(colorTiny.toHexString());
      }
    }

    takeDefaultColor('main');
    takeDefaultColor('main', 'first');
    takeDefaultColor('main', 'second');
    takeDefaultColor('secondary');
    takeDefaultColor('secondary', 'first');
    takeDefaultColor('secondary', 'second');
    takeDefaultColor('background');
    takeDefaultColor('background', 'first');
    takeDefaultColor('background', 'second');
  },
  addStyles(indicator, elements, styles, value, id) {
    $('[data-desc=brand-colors-' + indicator + '_' + id + ']').remove();
    window.requestAnimationFrame(function() {
      $('head').append("<style class='antares-bc' data-desc='brand-colors-" + indicator + '_' + id + "'>" + elements + '{' + styles + ':' + value + ' !important' + '}</style>');

      var currentBrandValues = $('.antares-bc').text();

      if ($('textarea.brand-colors-container').length > 0) {
        $('textarea.brand-colors-container').val(currentBrandValues);
      }
    });

    return true;
  },
  clearStyles(indicator) {
    $('[data-desc="brand-colors-' + indicator + '"]').remove();
    return true;
  },
  resetStyle() {
    var self = this;
    $('.reset-style').click(function() {
      self.defaultColors();
      AntaresBrandColors.colorPickersBig();
      AntaresBrandColors.colorPickersSmall();
    });
  },
  updateColorManually() {
    $('input.cp').on('keyup', function() {
      var theColor = tinycolor($(this).val());
      //if is hex and not accept 3digit format
      if (theColor.isValid() && $(this).val().length === '7') {
        $(this)
          .closest('.cp-brand__preview')
          .find('.minicolors-input')
          .minicolors('value', $(this).val());
        $(this).qtip('destroy');
      } else if ($(this).val().length === 7 && !theColor.isValid()) {
        $(this).qtip({
          style: {
            classes: 'ar',
            tip: {
              width: 9,
              height: 5
            }
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
  },
  colorPickersBig() {
    //default values
    var self = this;
    let $self = $(this);
    $('.cp-brand__ar-big input').each(function() {
      let $thisMiniColor = $(this);
      let defaultColor = $thisMiniColor.attr('value');
      $thisMiniColor.minicolors({
        theme: 'ar-big',
        textfield: false,
        format: 'hex',
        letterCase: 'lowercase',
        animationSpeed: 50,
        animationEasing: 'swing',
        changeDelay: 0,
        control: 'hue',
        defaultValue: '',
        hideSpeed: 100,
        inline: false,
        keywords: '',
        opacity: false,
        position: 'bottom left',
        showSpeed: 100,
        show: function() {
          $(this)
            .closest('.cp-brand')
            .css('flex', '2');
          $(this)
            .closest('.minicolors')
            .css('z-index', '35');
        },
        hide: function() {
          $(this)
            .closest('.cp-brand')
            .css('flex', '1');
          $(this)
            .closest('.minicolors')
            .css('z-index', '1');
        },
        change: function(value, opacity) {
          let $selfInChange = $(this);
          var zeroColor = tinycolor(value).toString(),
            darkenColor = tinycolor(value)
              .darken(6)
              .toString(),
            normalColor = tinycolor(value)
              .brighten(9)
              .saturate(2)
              .darken(3)
              .toString(),
            lighterColor = tinycolor(value)
              .brighten(20)
              .toString();
          var mr = tinycolor
            .mostReadable(value, ['#000'], {
              includeFallbackColors: true,
              level: 'AAA',
              size: 'small'
            })
            .toHexString();

          if ($selfInChange.closest('.cp-brand--primary').length) {
            // MAIN----------------------------------------
            $('meta[name="theme-color"], meta[name="msapplication-navbutton-color"], meta[name="apple-mobile-web-app-status-bar-style"]').attr('content', value);
            $('.cp-brand--typo.cp-brand--primary')
              .find('input.cp')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('.cp-brand__title')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('input.cp')
              .css('color', mr);
            self.clearStyles(primary);
            var primary = 'primary';

            var zeroMode = ['.grid-col--menu, .menu-mobile-settings', '.app-content:before', '.menu-aside-container', '.comiseo-daterangepicker .comiseo-daterangepicker-buttonpanel .btn--primary:hover'],
              darkenMode = ['.breadcrumbs > li.is-active', '.menu-mobile-settings + .select2 .select2-selection', '#app-wrapper.main-sidebar--top--mobile.mobile-menu-active .main-head', '.card-bar .card-bar__close'],
              normalMode = [
                '.ddown--brand .ddown__init',
                '#table-ma.is-disabled',
                '.btn.btn--brand',
                '.switch .switch-checkbox:checked + .switch-container',
                '.app-content__footer .btn--submit',
                '.menu-aside li.is-active a',
                // '.mdl-textfield__label:after',
                '.table-key .table-key__mobile-open.table-key__mobile-open--open',
                '.card.card--chart-small .card__header',
                '.card.card--chart-small .card__header-chart',
                '.card.card--primary-light',
                '.btn.btn--primary',
                '.select2-container .select2-selection--multiple .select2-selection__rendered li.select2-selection__choice',
                'table.collapsed tbody tr.parent td:first-child:before',
                '.icheckbox_antares:active',
                '.icheckbox_antares:focus',
                '.icheckbox_antares:hover',
                '#app-wrapper .icheckbox_antares.hover',
                'aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl ul.mobile-ddowns__menu',
                '.ddown.ddown-multi .ddown-multi__submenu > li.ddown-multi__return',
                '.icheckbox_antares.checked',
                '.mdl-tabs.is-upgraded .mdl-tabs__tab.is-active:after',
                '.form-block .radio-btns [data-type="radio-btn"] input:checked + .btn',
                '#notification-counter, .main-head .item-grp-single .badge ',
                '.error-container .top-area',
                '.mdl-tabs__tab .mdl-tabs__ripple-container .mdl-ripple'
              ],
              lightMode = ['.tbl-c .antares-table tr.is-selected td', '.tbl-c .antares-table tr.ui-selected td', '.tbl-c .antares-table tr.ui-selecting td', 'aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl ul.mobile-ddowns__menu li.mobile-ddowns__menu-header', '.btn.btn--highlight'];

            var primaryColorNormal = [
              '.grid-stack-item-content .card.card--pagination .tbl-c .pagination--type2 .dataTables_paginate span > .mdl-js-button.current',
              '.dataTables_length a.active',
              '.timeline li a',
              '.pagination .antares-pagination ul li .active, .pagination .antares-pagination ul li.active span',
              '#app-wrapper .tbl-c--zd .zd .zd__header i',
              '.card--info .col-group.admin',
              '.tbl-c table tr td a:not(.btn--primary)',
              '.mdl-tabs .mdl-tabs__tab.is-active',
              '.app-content.page-login .login-box .password-reset',
              '.mdl-badge--no-background',
              '.zd__header i',
              // '.item-grp  i',
              '.ddown.ddown--user .ddown__menu li a i:before',
              'aside.main-sidebar .menu-tooltip .menu-tooltip__header i',
              '.select2-dropdown ul.select2-results__options li.select2-results__option[aria-selected="true"]:after',
              'aside.main-sidebar .menu-tooltip .menu-tooltip__header span'
            ];

            var primaryBackgroundLighter = ['.tbl-c .antares-table tr.is-selected td, .tbl-c .antares-table tr.ui-selected td, .tbl-c .antares-table tr.ui-selecting td', '.error-container .top-area .error-message'];

            for (var io = 0; io < primaryBackgroundLighter.length; io++) {
              self.addStyles(primary, primaryBackgroundLighter[io], 'background', lighterColor, 'lighterColor');
            }

            self.addStyles(tetriary, '.error-container .bottom-area', 'background', normalColor, 'normalMode');

            for (var iu = 0; iu < primaryColorNormal.length; iu++) {
              self.addStyles(primary, primaryColorNormal[iu], 'color', normalColor, 'normalMode');
            }

            var primaryColorLighter = ['.breadcrumbs > li:not(".active"):first-child'];

            for (var xu = 0; xu < primaryColorLighter.length; xu++) {
              self.addStyles(primary, primaryColorLighter[xu], 'color', lighterColor, 'lighterColor');
            }

            var primaryColorDarken = ['.app-content.page-login .login-box .input-field .mdl-textfield__input'];
            for (var xu = 0; xu < primaryColorDarken.length; xu++) {
              self.addStyles(primary, primaryColorDarken[xu], 'color', darkenColor, 'darkenMode');
            }

            // gradient
            let gradient = 'linear-gradient(to right, ' + darkenColor + ' 0%, ' + lighterColor + ' 100%)';
            self.addStyles(primary, '.app-content.page-login', 'background-image', gradient, 'normalColor');

            for (var z = 0; z < zeroMode.length; z++) {
              self.addStyles(primary, zeroMode[z], 'background-color', zeroColor, 'zeroMode');
            }
            for (var l = 0; l < darkenMode.length; l++) {
              self.addStyles(primary, darkenMode[l], 'background-color', darkenColor, 'darkenMode');
            }
            for (var h = 0; h < normalMode.length; h++) {
              self.addStyles(primary, normalMode[h], 'background-color', normalColor, 'normalMode');
            }
            for (var u = 0; u < lightMode.length; u++) {
              self.addStyles(primary, lightMode[u], 'background-color', lighterColor, 'lighterColor');
            }

            let primaryBorderDarken = ['.antares-dropjs-filter .drop-enabled', '.table-key .table-key__input', '.icheck-label:hover > .icheckbox_antares, .icheckbox_antares.hover'];

            for (var z = 0; z < primaryBorderDarken.length; z++) {
              self.addStyles(primary, primaryBorderDarken[z], 'border-color', darkenColor, 'darkenColor');
            }
            self.addStyles(primary, '.antares-dropjs-filter .drop-enabled', 'color', darkenColor, 'darkenColor');
            self.addStyles(primary, 'aside.main-sidebar .main-menu .submenu__content .is-active span', 'color', lighterColor, 'lighterColor');

            $('.colors-text-main-first').val(zeroColor);

            let thisColorPicker = $selfInChange.closest('.cp-brand').find('.cp-brand__sgl');
            thisColorPicker.eq(0).css('background-color', darkenColor);
            thisColorPicker.eq(1).css('background-color', normalColor);
            thisColorPicker.eq(2).css('background-color', lighterColor);
            $selfInChange
              .closest('.color-pickers')
              .find('.cp-brand--typo.cp-brand--primary')
              .find('.cp-brand__preview')
              .css('background-color', zeroColor);
            $('.colors-main-mod1').val(darkenColor);
            $('.colors-main-mod2').val(normalColor);
            $('.colors-main-mod3').val(lighterColor);
          } else if ($selfInChange.closest('.cp-brand--secondary').length) {
            //SECONDARY--------------------
            $('.cp-brand--typo.cp-brand--secondary')
              .find('input.cp')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('.cp-brand__title')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('input.cp')
              .css('color', mr);
            var secondary = 'secondary';
            self.clearStyles(secondary);

            var zeroMode = ['aside.main-sidebar[data-menu-on-load="primary"]', '.color-pickers .cp-brand--typo.cp-brand--secondary .cp-brand__preview'],
              darkenMode = ['aside.main-sidebar ul.main-menu:not(.main-menu--brand) .submenu', 'aside.main-sidebar ul.main-menu > li.more-trigger', '.main-menu-html div.more-trigger.is-expanded .more-trigger__inner', 'aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl ul.mobile-ddowns__menu', '#app-wrapper.main-sidebar--top .main-sidebar nav ul.main-menu .submenu-open .submenu'],
              normalMode = ['aside.main-sidebar[data-menu-on-load="secondary"]', '.main-menu-html div.more-trigger .more-trigger__inner', '.main-menu-html .nav-container.animation-active div.more-trigger:before', 'aside.main-sidebar .menu-tooltip', '#app-wrapper aside.main-sidebar .mobile-ddowns', '#app-wrapper aside.main-sidebar ul.main-menu li.submenu-open .submenu .submenu__mobile-return'],
              lightMode = ['#app-wrapper aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl ul.mobile-ddowns__menu li:hover', '#app-wrapper .card-bar', 'body #app-wrapper.main-sidebar--top .main-sidebar.simple-submenu nav ul.main-menu .submenu-open .submenu'];

            for (var z = 0; z < zeroMode.length; z++) {
              self.addStyles(secondary, zeroMode[z], 'background-color', zeroColor, 'zeroColor');
            }
            for (var l = 0; l < darkenMode.length; l++) {
              self.addStyles(secondary, darkenMode[l], 'background-color', darkenColor, 'darkenColor');
            }
            for (var h = 0; h < normalMode.length; h++) {
              self.addStyles(secondary, normalMode[h], 'background-color', normalColor, 'normalColor');
            }
            for (var u = 0; u < lightMode.length; u++) {
              self.addStyles(secondary, lightMode[u], 'background-color', lighterColor, 'lighterColor');
            }

            self.addStyles(secondary, '#app-wrapper aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl.mobile-ddowns__sgl--open:after', 'color', darkenColor, 'darkenColor');
            self.addStyles(secondary, '.select2-dropdown ul.select2-results__options li.select2-results__option[aria-selected="true"]', 'color', darkenColor, 'darkenColor');
            self.addStyles(secondary, '.select2-dropdown ul.select2-results__options li.select2-results__option[aria-selected="true"]:after', 'color', darkenColor, 'darkenColor');
            self.addStyles(secondary, '#app-wrapper aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl ul.mobile-ddowns__menu li.mobile-ddowns__menu-header', 'border-color', normalColor, 'normalColor');
            self.addStyles(secondary, '#app-wrapper aside.main-sidebar .mobile-ddowns .mobile-ddowns__sgl', 'border-color', darkenColor, 'darkenColor');
            self.addStyles(secondary, '#app-wrapper.main-sidebar--top .main-sidebar.simple-submenu nav ul.main-menu .submenu-open a:after', 'border-color', 'transparent ' + zeroColor + ' transparent transparent', 'zeroColor');
            self.addStyles(secondary, '#app-wrapper.main-sidebar--top .main-sidebar.simple-submenu[data-menu-on-load="secondary"] nav ul.main-menu .submenu-open a:after', 'border-color', 'transparent ' + normalColor + ' transparent transparent', 'zeroColor');
            self.addStyles(secondary, '#app-wrapper.main-sidebar--top aside.main-sidebar ul.main-menu > li.submenu-open > a:after', 'border-color', 'transparent ' + zeroColor + ' transparent transparent', 'zeroColor');
            self.addStyles(secondary, '#app-wrapper:not(.main-sidebar--top) aside[data-menu-on-load="secondary"] ul.main-menu .submenu-open.has-submenu a:after', 'border-color', 'transparent ' + zeroColor + ' transparent transparent', 'zeroColor');
            self.addStyles(secondary, '#app-wrapper.main-sidebar--top aside.main-sidebar[data-menu-on-load="secondary"] ul.main-menu > li.submenu-open > a:after', 'border-color', 'transparent ' + normalColor + ' transparent transparent', 'normalColor');
            self.addStyles(secondary, '#app-wrapper:not(.main-sidebar--top) aside[data-menu-on-load="secondary"] ul.main-menu .submenu-open.has-submenu a:after', 'border-color', 'transparent ' + normalColor + ' transparent transparent', 'normalColor');

            let thisColorPicker = $selfInChange.closest('.cp-brand').find('.cp-brand__sgl');
            thisColorPicker.eq(0).css('background-color', darkenColor);
            thisColorPicker.eq(1).css('background-color', normalColor);
            thisColorPicker.eq(2).css('background-color', lighterColor);
            $selfInChange
              .closest('.color-pickers')
              .find('.cp-brand--typo.cp-brand--secondary')
              .find('.cp-brand__preview')
              .css('background-color', zeroColor);
            $('.colors-secondary-mod1').val(darkenColor);
            $('.colors-secondary-mod2').val(normalColor);
            $('.colors-secondary-mod3').val(lighterColor);
          } else if ($selfInChange.closest('.cp-brand--tetriary').length) {
            // BACKGROUND--------------------

            $('.cp-brand--typo.cp-brand--tetriary')
              .find('input.cp')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('.cp-brand__title')
              .css('color', mr);
            $selfInChange
              .closest('.cp-brand')
              .find('input.cp')
              .css('color', mr);
            var tetriary = 'tetriary';

            var normalModeBorder = ['fieldset .form-block input', 'fieldset .form-block textarea', '.select2 .select2-selection'],
              zeroMode = [],
              darkenMode = ['body'],
              normalMode = ['.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y'],
              lightMode = [];

            for (var b = 0; b < normalModeBorder.length; b++) {
              self.addStyles(tetriary, normalModeBorder[b], 'border-color', normalColor, 'normalColor');
            }
            for (var z = 0; z < zeroMode.length; z++) {
              self.addStyles(tetriary, zeroMode[z], 'background-color', zeroColor, 'zeroColor');
            }
            for (var l = 0; l < darkenMode.length; l++) {
              self.addStyles(tetriary, darkenMode[l], 'background-color', darkenColor, 'darkenColor');
            }
            for (var h = 0; h < normalMode.length; h++) {
              self.addStyles(tetriary, normalMode[h], 'background-color', normalColor, 'normalColor');
            }
            for (var u = 0; u < lightMode.length; u++) {
              self.addStyles(tetriary, lightMode[u], 'background-color', lighterColor, 'lighterColor');
            }

            let thisColorPicker = $selfInChange.closest('.cp-brand').find('.cp-brand__sgl');
            thisColorPicker.eq(0).css('background-color', darkenColor);
            thisColorPicker.eq(1).css('background-color', normalColor);
            thisColorPicker.eq(2).css('background-color', lighterColor);
            $selfInChange
              .closest('.color-pickers')
              .find('.cp-brand--typo.cp-brand--tetriary')
              .find('.cp-brand__preview')
              .css('background-color', zeroColor);
            $('.colors-background-mod1').val(darkenColor);
            $('.colors-background-mod2').val(normalColor);
            $('.colors-background-mod3').val(lighterColor);
          }

          $selfInChange.closest('.cp-brand__preview').css('background-color', zeroColor);
          // $selfInChange
          //   .closest('.cp-brand')
          //   .find('input.cp')
          //   .val(zeroColor);
        }
      });
      // $('.cp-brand__pallete').on('click', function() {
      //   $thisMiniColor.minicolors('show');
      // });
      $('.reset-style').click(function() {
        $thisMiniColor.minicolors('value', defaultColor);
      });
    });
  },
  colorPickersSmall() {
    //Small color pickers
    var self = this;
    $('.cp-brand__p-sgl input').each(function() {
      let $thisMiniColor = $(this);
      let defaultColor = $thisMiniColor.attr('value');
      $thisMiniColor.minicolors({
        textfield: false,
        format: 'hex',
        theme: 'ar-small',
        letterCase: 'lowercase',
        animationSpeed: 50,
        animationEasing: 'swing',
        changeDelay: 0,
        control: 'hue',
        defaultValue: '',
        hideSpeed: 100,
        inline: false,
        keywords: '',
        opacity: false,
        position: 'bottom left',
        showSpeed: 100,
        show: function() {
          $(this)
            .closest('.cp-brand')
            .css('flex', '2');
        },
        hide: function() {
          $(this)
            .closest('.cp-brand')
            .css('flex', '1');
        },
        change: function(value, opacity) {
          var temp = tinycolor(value);
          var hex = temp.toHexString();
          //update dev input
          $(this)
            .closest('.cp-brand__preview')
            .find('.cp')
            .attr('value', hex);
          $(this)
            .closest('.minicolors')
            .next('.color-saver')
            .val(value);
          if (
            $(this)
              .closest('.cp-brand__p-sgl')
              .hasClass('cp-brand__p-sgl--left')
          ) {
            $(this)
              .closest('.cp-brand')
              .find('.cp-brand__preview:first-child .cp-brand__big')
              .css('color', value);
            if ($(this).closest('.cp-brand--primary').length) {
              //PRIMARY LEFT
              var primaryLeft = 'primary-left',
                primaryLeftTargets = [
                  '.menu-aside li a span, .menu-aside li a i, .menu-aside li a:after, .badge.badge--md',
                  '.main-head .mdl-textfield--AR label.mdl-textfield__label',
                  '.ddown.ddown--brand .ddown__menu .flex-block__title,.ddown.ddown--brand .ddown__menu .ddown__footer a',
                  '.breadcrumbs > li:last-child .ddown__init a, .breadcrumbs > li > a,.breadcrumbs > li:last-child:before, .breadcrumbs .ddown .ddown__content .ddown__arrow:after,.breadcrumbs .ddown .ddown__init.ddown__init--white:after, .ddown .ddown__init.ddown__init--white i',
                  '.btn.btn--brand',
                  '.menu-mobile-settings + .select2 .select2-selection__rendered',
                  '.ddown .ddown__init.ddown__init--white:after, .ddown .ddown__init.ddown__init--white i'
                ];
              self.clearStyles(primaryLeft);
              self.addStyles(primaryLeft, '.burgericon > a .line', 'background', value, 'standard_value');
              for (var q = 0; q < primaryLeftTargets.length; q++) {
                self.addStyles(primaryLeft, primaryLeftTargets[q], 'color', value, 'standard_value');
              }
              //apply
              $('.colors-text-main-first').val(value);
            }
            if ($(this).closest('.cp-brand--secondary').length) {
              //SECONDARY LEFT
              var secondartLeft = 'secondary-left',
                secondartLeftTargets = ['aside.main-sidebar ul.main-menu > li > a', 'aside.main-sidebar ul.main-menu .submenu section .data-list li a', 'aside.main-sidebar ul.main-menu .submenu ul > li span'];
              self.clearStyles(secondartLeft);
              for (var a = 0; a < secondartLeftTargets.length; a++) {
                self.addStyles(secondartLeft, secondartLeftTargets[a], 'color', value, 'standard_value');
              }
              //apply
              $('.colors-text-secondary-first').val(value);
            }
            if ($(this).closest('.cp-brand--tetriary').length) {
              //TETRIARY LEFT
              var tetriaryLeft = 'tetriary-left',
                tetriaryLeftTargets = ['.form-block label:not(.switch)'];
              self.clearStyles(tetriaryLeft);
              for (var s = 0; s < tetriaryLeftTargets.length; s++) {
                self.addStyles(tetriaryLeft, tetriaryLeftTargets[s], 'color', value, 'standard_value');
              }
              //apply
              $('.colors-text-background-first').val(value);
            }
          } else if (
            $(this)
              .closest('.cp-brand__p-sgl')
              .hasClass('cp-brand__p-sgl--right')
          ) {
            $(this)
              .closest('.cp-brand')
              .find('.cp-brand__preview:last-child .cp-brand__big')
              .css('color', value);
            if ($(this).closest('.cp-brand--primary').length) {
              //PRIMARY RIGHT
              var primaryRight = 'primary-right',
                primaryRightTargets = [],
                primaryRightTargetsBorder = ['.search-box .search-box__search-field'];
              self.clearStyles(primaryRight);
              for (var f = 0; f < primaryRightTargets.length; f++) {
                self.addStyles(primaryRight, primaryRightTargets[f], 'color', value, 'standard_value');
              }
              for (var d = 0; d < primaryRightTargetsBorder.length; d++) {
                self.addStyles(primaryRight, primaryRightTargetsBorder[d], 'border-color', value, 'standard_value');
              }
              //apply
              $('.colors-text-main-second').val(value);
            }
            if ($(this).closest('.cp-brand--secondary').length) {
              //SECONDARY RIGHT
              var secondaryRight = 'secondary-right';
              self.clearStyles(secondaryRight);
              var secondaryRightTargets = [
                'aside.main-sidebar ul.main-menu > li > a:hover',
                'aside.main-sidebar ul.main-menu > li > a:hover .icon',
                'aside.main-sidebar ul.main-menu > li > a:hover i',
                'aside.main-sidebar ul.main-menu > li.hovered .text',
                'aside.main-sidebar ul.main-menu > li.hovered .icon',
                'aside.main-sidebar .menu-scroll ul.main-menu > li.is-active > a > i',
                'aside.main-sidebar .menu-scroll ul.main-menu > li.is-active > a > .text',
                'aside.main-sidebar ul.main-menu > li.hovered > a i',
                'aside.main-sidebar ul.main-menu .submenu section .data-list li a:hover span'
              ];
              for (var g = 0; g < secondaryRightTargets.length; g++) {
                self.addStyles(secondaryRight, secondaryRightTargets[g], 'color', value, 'standard_value');
              }
              //apply
              $('.colors-text-secondary-second').val(value);
            }
            if ($(this).closest('.cp-brand--tetriary').length) {
              //TETRIARY RIGHT
              var tetriaryRight = 'tetriary-right';
              self.clearStyles(tetriaryRight);
              self.addStyles(tetriaryRight, 'form fieldset legend', 'color', value, 'standard_value');
              //apply
              $('.colors-text-background-second').val(value);
            }
          }
          //contrast
          var mr4 = tinycolor
            .mostReadable(value, ['#000'], {
              includeFallbackColors: true,
              level: 'AAA',
              size: 'small'
            })
            .toHexString();
          $(this)
            .closest('.cp-brand__preview')
            .find('input.cp')
            .css('color', mr4);
        }
      });
      $('.reset-style').click(function() {
        $thisMiniColor.minicolors('value', defaultColor);
      });
    });
  }
};

$(function() {
  window.AntaresBrandColors = AntaresBrandColors;
  AntaresBrandColors.init();
});

$(window).on('load', () => {
  AntaresBrandColors.setLastChosenColorsOnLoad();
});
