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

/*global componentHandler enquire ready */

// import {antaresCfg} from './../config/antares_cfg';

const AntaresForms = {
  init() {
    let self = this;
    this.helpers();

    self.elements.checkboxesAndRadios();
    self.elements.datePicker();
    self.elements.rangeSlider();
    self.elements.simplePaginationList();
    self.elements.select();
    self.elements.spinner();
    self.elements.tooltip();

    self.elements.activateWithSelected(); //only custom code
    self.elements.footerShadow(); //only custom code
    self.elements.mobileSelectMenu(); //only custom code
    self.elements.readOnly(); //only custom code
    self.elements.search(); //only custom code

    self.elements.tabsSwiper();
    // self.elements.closeDdownBreadcrumbs();

    self.elements.openSearchFilters();
    self.elements.tablePagination();
    self.elements.searchLogs();
    self.elements.disabledDashboardChartCompareMode();
    self.elements.stopScroll();
    self.elements.updateHeightChartJS();
    self.elements.cardChartHeaderTruncate();
    self.elements.checkIfNeedTruncateTooltip();
    self.elements.classForChart();

    //MDL reinit
    componentHandler.upgradeAllRegistered();
  },

  helpers() {
    document.onkeydown = function(e) {
      //#145
      var li;
      var oldScroll;
      var bottomScroll;
      if ($('.antares-ac li').hasClass('is-selected')) {
        li = $('.ac-open .is-selected').height();
        oldScroll = $('.ac-open .ps__scrollbar-y-rail').css('top');
        oldScroll = oldScroll.substring(0, oldScroll.length - 2);
        bottomScroll = $('.ac-container--wrapper ul').height() - $('.ac-container--wrapper').height();
      }
      switch (e.keyCode) {
        case 38:
          if (oldScroll <= 0) {
          } else {
            var newScroll = parseInt(oldScroll) - li;
            $('.ac-container--wrapper')
              .scrollTop(newScroll)
              .perfectScrollbar('update');
            // console.log(newScroll);
          }
          break;
        case 40:
          if (oldScroll >= bottomScroll) {
          } else {
            // console.log('down else');
            var newScroll = parseInt(oldScroll) + li;
            $('.ac-container--wrapper')
              .scrollTop(newScroll)
              .perfectScrollbar('update');
          }
          break;
      }
    };

    // enquire.register('screen and (max-width: 1366px)', { //#155 -> 27 // comment because
    //     //mobile readonly for multiple
    //     match: function () {
    //         $('select').on('select2:open', function () {
    //             $('input').prop('focus', 0);
    //         });
    //     }
    // });

    window.requestAnimationFrame(() => {
      $('input[hover]')
        .closest('.iradio_billevo')
        .addClass('hover');
    });
  },

  elements: {
    closeDdownBreadcrumbs() {
      // $('.breadcrumbs').click(function () {
      //     if ($('.ddown').hasClass('ddown--open')) {
      //         window.requestAnimationFrame(function () {
      //             AntaresDdownGeneral.closeAllDropdowns();
      //         });
      //     }
      // });
    },
    openSearchFilters() {
      // enquire.register('screen and (max-width:768px)', {
      //   match: function() {

      // console.log('opensear on');
      $('.tab-search .search-box .zmdi-search').click(function() {
        // console.log('click');
        if ($('.tab-search').hasClass('tab-search--open-search')) {
          $(this)
            .closest('.tab-search')
            .removeClass('tab-search--open-search');
        } else {
          $(this)
            .closest('.tab-search')
            .addClass('tab-search--open-search')
            .find('input')
            .focus();
        }
      });
      //   }
      // });
    },
    tabsSwiper() {
      var mySwiper = undefined;

      function activateSwiper() {
        var widthAllTabs = 0;
        for (let i = 1; i <= $('.swiper-mdl-tabs .swiper-slide').length; i++) {
          widthAllTabs += $('.swiper-mdl-tabs .swiper-slide:nth-child(' + i + ')').width();
        }
        if ($('.swiper-container').width() < widthAllTabs) {
          mySwiper = new Swiper('.swiper-mdl-tabs', {
            slidesPerView: 'auto',
            nextButton: '.swiper-mdl-tabs-next',
            prevButton: '.swiper-mdl-tabs-prev'
          });
        } else if (mySwiper !== undefined) {
          mySwiper.destroy();
          mySwiper = undefined;
          $('.swiper-mdl-tabs').removeClass('swiper-container-horizontal');
        }
      }

      activateSwiper(true);
      $(window).resize(function() {
        activateSwiper();
      });
    },
    checkboxesAndRadios() {
      // init only when needed
      $('[data-icheck="true"]').each(function() {
        if (!$(this).closest('.icheckbox_billevo').length) {
          $(this).iCheck({
            checkboxClass: 'icheckbox_billevo',
            radioClass: 'iradio_billevo',
            increaseArea: '30%'
          });
        }
      });
    },
    datePicker() {
      const dateRangeOptionsDashboard = {
        datepickerOptions: {
          numberOfMonths: 2,
          mirrorOnCollision: true, //
          verticalOffset: 0
        }
      };

      //range
      $('[data-daterangepicker]').daterangepicker({
        onOpen: function() {
          if ($('button').hasClass('comiseo-daterangepicker-bottom')) {
            $('.comiseo-daterangepicker')
              .addClass('arrow-bottom')
              .removeClass('arrow-top');
          } else {
            $('.comiseo-daterangepicker')
              .addClass('arrow-top')
              .removeClass('arrow-bottom');
          }
        }
      });

      enquire.register('screen and (max-width:768px)', {
        match: function() {
          $('[data-daterangepicker--filter="true"]').daterangepicker('destroy');
          $('[data-daterangepicker--filter="true"]').daterangepicker(
            $.extend({}, dateRangeOptionsDashboard, {
              initialText: 'Select time period to analize'
            })
          );
        }
      });

      $('.page-dashboard [data-daterangepicker]').daterangepicker(
        $.extend({}, dateRangeOptionsDashboard, {
          initialText: 'Select time period to analize'
        })
      );

      //Screen Size <768
      enquire.register('screen and (max-width:768px)', {
        match: function() {
          $('.page-dashboard [data-daterangepicker]').daterangepicker('destroy');
          $('.page-dashboard [data-daterangepicker]').daterangepicker(
            $.extend({}, dateRangeOptionsDashboard, {
              initialText: 'Select time period to analize'
            })
          );
        }
      });
      // class cleanup
      var classesToRemove = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-button-text-only'];

      var $target = $('.comiseo-daterangepicker-buttonpanel button');
      $.each(classesToRemove, function(i, v) {
        $target.removeClass(v);
      });
      $target.mouseover(function() {
        $(this).removeClass('ui-state-hover');
      });

      // time
      const timepicker = $('[data-timepicker]');
      const datepicker = $('[data-datepicker]');
      const datetimepicker = $('[data-datetimepicker]');

      timepicker.datetimepicker({
        datepicker: false,
        format: 'H:i',
        onGenerate(ct, $input) {
          $input.prop('readonly', true);
          let $this = $(this);
          $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
          $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
        }
      });

      datepicker.datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        onGenerate(ct, $input) {
          $input.prop('readonly', true);
          let $this = $(this);
          $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
          $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
        }
      });

      datetimepicker.datetimepicker({
        datepicker: true,
        onGenerate(ct, $input) {
          $input.prop('readonly', true);
          let $this = $(this);
          $this.find('.xdsoft_date').removeClass('xdsoft_disabled');
          $this.find('.xdsoft_time').removeClass('xdsoft_disabled');
        }
      });

      $.datetimepicker.setLocale('en');

      // alt datepicker

      if ($('[data-alt-datepicker]').length) {
        $('[data-alt-datepicker]').bootstrapMaterialDatePicker({
          switchOnClick: true,
          weekStart: 0,
          time: false
        });
      }

      if ($('[data-alt-timepicker]').length) {
        $('[data-alt-timepicker]').bootstrapMaterialDatePicker({
          switchOnClick: true,
          date: false
        });
      }

      if ($('[data-alt-datetimepicker]').length) {
        $('[data-alt-datetimepicker]').bootstrapMaterialDatePicker({
          switchOnClick: true,
          format: 'dddd DD MMMM YYYY - HH:mm'
        });
      }

      $(window).scroll(() => {
        $('.xdsoft_datetimepicker').css('display', 'none');
      });
    },
    rangeSlider() {
      var slider = $('[data-slider]'),
        rangeSlider = $('[data-slider-range]');

      slider.slider({
        range: 'min',
        slide(event, ui) {
          //if validation - must contain sibling input
          if ($(this).siblings('.slider-val').length) {
            $(this)
              .siblings('.slider-val')
              .val(ui.value);
            // $(this).siblings('.slider-val').valid();
          }
        }
      });

      rangeSlider.slider({
        range: true,
        min: 0,
        max: 3000,
        values: [575, 2000],
        slide() {}
      });
    },
    simplePaginationList() {
      // pagination
      require('./external/simple_pagination.js');

      var perPage = 10; // dont change position in code of this variable!

      function currentNumber(number) {
        // after click, variable perPage -> refresh simplePagination
        $('.current' + number).click(function() {
          perPage = number;
          let parent = $(this).closest('.datarow');
          parent.find('.simple-pagination--list').pagination('updateItemsOnPage', number);
          parent.find('.current10').removeClass('active'); // all disable
          parent.find('.current25').removeClass('active');
          parent.find('.current50').removeClass('active');
          parent.find('.current100').removeClass('active');

          parent.find('.current' + number).addClass('active'); // enable correct
          parent.find('> div').perfectScrollbar('update');
          AntaresForms.elements.logsCorrectTimelineBorder();
        });
      }

      currentNumber(10);
      currentNumber(25);
      currentNumber(50);
      currentNumber(100);

      $('.simple-pagination--list').each(function() {
        let parent = $(this).closest('.datarow');
        let items = parent.find('.timeline li');
        let numItems = items.length;
        items.slice(perPage).hide();
        $(this).pagination({
          items: numItems,
          itemsOnPage: perPage,
          cssStyle: 'antares-pagination',
          prevText: '<i class="zmdi zmdi-long-arrow-left"></i>',
          nextText: '<i class="zmdi zmdi-long-arrow-right"></i>',
          displayedPages: 3,
          ellipsePageSet: false,
          edges: 1,
          onPageClick: function(pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items
              .hide()
              .slice(showFrom, showTo)
              .show();
            parent.find('> div').perfectScrollbar('update');
            componentHandler.upgradeAllRegistered();
            parent.adjustCardHeight();
            AntaresForms.elements.logsCorrectTimelineBorder();
          }
        });
        parent.adjustCardHeight();
      });

      componentHandler.upgradeAllRegistered();
    },
    select() {
      //select close on remove option - fix

      const $element = $('select');

      $element.on('select2:unselect', function(e) {
        var $self = $(this);

        //tmp
        if ($self.closest('.ddown-multi__submenu').length) {
          e.preventDefault();
          setTimeout(function() {
            $self.closest('.ddown-multi__submenu').css('display', 'block');
          }, 10);
        }

        function cancelAndRemove(event) {
          event.preventDefault();
          removeEvents();
        }

        function removeEvents() {
          $element.off('select2:opening', cancelAndRemove);
          $element.off('select2:closing', cancelAndRemove);
        }

        $element.on('select2:opening', cancelAndRemove);
        $element.on('select2:closing', cancelAndRemove);
        setTimeout(removeEvents, 0);
      });

      var select2Base = {
        dropdownAutoWidth: true,
        theme: 'selectAR',
        allowClear: true
        // placeholder: 'Select an option',
        //disable search below
        // minimumResultsForSearch: Infinity
      };

      // $.fn.select2.defaults.set("theme", "AR");

      // Select2 Init - Standard
      $('[data-selectAR]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'selectAR ' + myData
          })
        );
      });

      // Select2 Init - Search
      $('[data-selectAR--search]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'selectAR ' + myData,
            minimumResultsForSearch: 1
          })
        );
      });

      // Select2 Init - Tags
      $('[data-selectAR--tags-add-new]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'selectAR ' + myData,
            tags: true
          })
        );
      });

      // Select2 Init - Mdl
      $('[data-selectAR--mdl]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'mdl' + myData
          })
        );
      });

      // Select2 Init - Mdl Big
      $('[data-selectAR--mdl-big]').each(function() {
        // if ($(this).data('select2')) {
        //     return false;
        // }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'mdl-big ' + myData
          })
        );
      });

      // Select2 Init - Mdl Short
      $('[data-selectAR--mdl-short]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'mdl-short ' + myData
          })
        );
      });

      // Select2 Init - Tags
      $('[data-selectAR--tags]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        let myData = $(this).attr('data-select2--class');
        if (myData === undefined) {
          myData = '';
        }
        $(this).select2(
          $.extend({}, select2Base, {
            theme: 'tags ' + myData
          })
        );
      });

      // Select2 Init - Tags with 1 option
      $('[data-selectAR--custom-input]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        $(this).select2(
          $.extend({}, select2Base, {
            createTag: function(term, data) {
              if (
                $(data).filter(function() {
                  return this.text.localeCompare(term) === 0;
                }).length === 0
              ) {
                return {
                  text: term,
                  id: '123'
                };
              }
            },
            multiple: true,
            tags: true,
            theme: 'custom-input',
            maximumSelectionLength: 1
          })
        );
      });

      //https://github.com/select2/select2/issues/3901
      // $('[data-selectAR]').select2(select2Base);
      // //https://github.com/select2/select2/issues/3901
      //Flags integration
      //on init

      // Select2 Init - Flag
      $('select[data-flag-select]').each(function() {
        if ($(this).find('option:selected').length) {
          var flag = $(this)
            .find('option:selected')
            .data('country');
        } else {
          return false;
        }

        $(this)
          .siblings('.input-field__icon')
          .find('.flag-icon')
          .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
      });

      $('select[data-flag-select]').on('change', function() {
        if ($(this).find('option:selected').length) {
          var flag = $(this)
            .find('option:selected')
            .data('country');
        } else {
          return false;
        }

        $(this)
          .siblings('.input-field__icon')
          .find('.flag-icon')
          .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
      });

      // Select2 Init - Flag 2
      $('[data-flag-select]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        $(this).select2({
          minimumResultsForSearch: Infinity,
          theme: 'selectAR',
          dropdownAutoWidth: true,
          templateResult: function(data) {
            if (data.element && data.element.attributes['data-country']) {
              // console.log(data);
              var flagCode = data.element.attributes['data-country'].nodeValue;
              var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
              return $state;
            } else {
              return data.text;
            }
          }
        });
      });

      // Select2 Init - Flag with search
      $('select[data-flag-select--search]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        if ($(this).find('option:selected').length) {
          var flag = $(this)
            .find('option:selected')
            .data('country');
        } else {
          return false;
        }

        $(this)
          .siblings('.input-field__icon')
          .find('.flag-icon')
          .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
      });

      // Select2 Init - Flag with search v2
      $('[data-flag-select--search]').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        $(this).select2({
          dropdownAutoWidth: true,
          theme: 'selectAR',
          minimumResultsForSearch: 1,
          closeOnSelect: false,
          templateResult: function(data) {
            if (data.element && data.element.attributes['data-country']) {
              // console.log(data);
              var flagCode = data.element.attributes['data-country'].nodeValue;
              var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
              return $state;
            } else {
              return data.text;
            }
          }
        });
      });

      $('select[data-flag-select--search]').on('change', function() {
        if ($(this).find('option:selected').length) {
          var flag = $(this)
            .find('option:selected')
            .data('country');
        } else {
          return false;
        }

        $(this)
          .siblings('.input-field__icon')
          .find('.flag-icon')
          .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
      });

      // Select2 Init - Prefix Control
      $('select').each(function() {
        if ($(this).data('select2')) {
          return false;
        }
        if ($(this).attr('data-prefix')) {
          if (
            !$(this)
              .next('.select2')
              .find('.select__prefix').length
          ) {
            var prefixValue = $(this).data('prefix');
            // $(this).siblings('.select2').find('.select2-selection__rendered').attr('data-prefix', prefixValue );
            $(this)
              .next('.select2')
              .find('.select2-selection__rendered')
              .prepend('<span class="select__prefix">' + prefixValue + '</span>');

            $(this).on('change', function() {
              $(this)
                .next('.select2')
                .find('.select2-selection__rendered')
                .prepend('<span class="select__prefix">' + prefixValue + '</span>');
            });
          }
        }
      });
    },

    spinner() {
      $('[data-spinner="true"]').spinner({
        min: 0,
        max: 3000,
        start: 0,
        culture: 'en-US',
        step: 1,
        numberFormat: 'C'
      });
    },
    tooltip() {
      $('[data-tooltip-inline]').qtip({
        hide: 'click'
      });

      $('.mdl-button__ripple-container').on('click', function() {
        $('[data-hasqtip]').qtip('hide');
      });

      function tooltipDesktop() {
        $(document).on('mouseover', "[data-tooltip-inline != '']", function(event) {
          // Element already has a qTip? Return.
          if ($(this).qtip('api')) {
            return;
          }

          // Create our new one
          $(this).qtip({
            style: {
              classes: 'ar',
              tip: {
                width: 9,
                height: 5
              }
            },
            position: {
              viewport: $(window),
              adjust: {
                method: 'shift'
              }
            },
            content: {
              attr: 'data-tooltip-inline'
            },
            show: {
              effect() {
                $(this).fadeIn(300); // "this" refers to the tooltip
              }
            },
            hide: {
              effect() {
                $(this).fadeOut(300); // "this" refers to the tooltipc1
              }
            },

            events: {
              show: function(event, api) {
                var $el = $(api.elements.target[0]);
                $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));

                // $(document).one("click", function() { $(".item-grp-single").qtip('hide'); });  issue #256
              }
            }
          });
        });

        $(document).on('mouseover', "[data-tooltip='true']", function(event) {
          // Element already has a qTip? Return.
          if ($(this).qtip('api')) {
            return;
          }

          $(this).qtip({
            style: {
              classes: 'ar',
              tip: {
                width: 9,
                height: 5
              }
            },
            content: {
              text: $(this).next('div.tooltip-content') // Use the "div" element next to this for the content
            },
            position: {
              viewport: $(window),
              adjust: {
                method: 'shift'
              }
            },
            show: {
              effect: function() {
                $(this).fadeIn(300); // "this" refers to the tooltip
              }
            },
            hide: {
              // effect: function () {
              //     $(this).fadeOut(300); // "this" refers to the tooltip
              // }
            },
            events: {
              show: function(event, api) {
                var $el = $(api.elements.target[0]);
                $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));
                $('.cp-brand').off('click.tooltip');
                $el.on('click.tooltip', function() {
                  api.hide();
                });
              }
            }
          });
        });
      }

      tooltipDesktop();
    },

    activateWithSelected() {
      $('.card-ctrls').click();
      let table = $('#table-ma');
      table.click(function() {
        window.requestAnimationFrame(() => {
          if (table.attr('disabled')) {
            table.closest('.ddown--left').removeClass('ddown--open');
          } else {
            table.closest('.ddown--left').addClass('ddown--open');
          }
        });
      });
    },
    footerShadow() {
      $(window).scroll(function() {
        if ($(window).scrollTop() > $(document).height() - $(window).height() - 100) {
          $('.app-content__footer').addClass('noboxshadow');
        } else {
          $('.app-content__footer').removeClass('noboxshadow');
        }
      });
      if ($('.app-content__footer').length) {
        setTimeout(function() {
          $('.app-content').on('ps-y-reach-end', function() {
            $('.app-content__footer').addClass('noboxshadow');
          });
        }, 500);

        $('.app-content').on('ps-scroll-up', function() {
          $('.app-content__footer').removeClass('noboxshadow');
        });

        enquire.register('screen and (max-width:1199px)', {
          match: function() {
            var element = $('.app-content')[0];
            element.addEventListener('scroll', function(event) {
              var element = event.target;
              if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                $('.app-content__footer').addClass('noboxshadow');
              } else {
                $('.app-content__footer').removeClass('noboxshadow');
              }
            });
          }
        });
      }

      if ($('.menu-aside-container').length) {
        $('.menu-aside-container').on('ps-y-reach-end', function(e) {
          e.preventDefault();
          return false;
        });
      }
    },
    mobileSelectMenu() {
      $('#select-anchor').change(function(e) {
        let selectValue = $(this).select2('data')[0].id;
        window.requestAnimationFrame(() => {
          window.location.hash = selectValue;
        });
        e.preventDefault();
      });
    },
    readOnly() {
      // readonly state
      //checkbox
      $('.form-block').each(function() {
        var self = $(this);

        self.find('input[readonly]').on('ifChecked', function() {
          setTimeout(function() {
            self.find('input[readonly]').iCheck('uncheck');
          }, 50);
        });
      });

      //swittch
      $('.switch-checkbox[readonly]').on('click', function() {
        return false;
      });
    },
    search() {
      var search = $('.main-head '),
        searchSingle = $('.main-head .search-box');
      //Screen Size <768
      enquire.register('screen and (max-width:767px)', {
        // #62 768 -> 767
        match: function() {
          $(document).on('click', '.main-head .search-box > i:first-child', function() {
            $('.main-head').addClass('main-head--mobile--search'); // #62 toggle na add
            searchSingle.addClass('search-box--toggled');
            searchSingle.find('input').focus();
            $(this)
              .closest('.search-box')
              .find('.search-box__mdl-textfield input')
              .focus();
          });
          $(document).on('click', '.main-head .search-box .search-box__close', function() {
            $('.main-head').removeClass('main-head--mobile--search'); // #62 toggle na remove
            $(this)
              .closest('.search-box')
              .removeClass('search-box--toggled');
          });
        },
        unmatch: function() {
          search.show();
          $('.main-head').removeClass('main-head--mobile--search');
          // search.toggleClass('search-box--toggled');
          $(document).on('click', '.main-head .search-box i:first-child', function(e) {
            $('.main-head').removeClass('main-head--mobile--search'); // #62 add line
            $(this)
              .closest('.search-box')
              .removeClass('search-box--toggled'); // #62 add line
            e.preventDefault();
            e.stopPropagation();
            return false;
          });
        }
      });
      //closable modificator action
      $('.search-box--closable').on('click', '.search-box__close', function() {
        $(this)
          .closest('.search-box')
          .find('.search-box__search-field')
          .val('');
        $(this).hide();
      });
      $('.search-box--closable .search-box__search-field').on('input', function() {
        if ($(this).val().length === 0) {
          $(this)
            .closest('.search-box')
            .find('.search-box__close')
            .hide();
        } else {
          $(this)
            .closest('.search-box')
            .find('.search-box__close')
            .show();
        }
      });
    },
    tablePagination() {
      setTimeout(function() {
        let table = $('.pagination--type2');
        table.find('a').addClass('mdl-js-button mdl-js-ripple-effect');
        componentHandler.upgradeAllRegistered();
        table.find('a').removeClass('prev');
        table.find('a').removeClass('next');
        table
          .find('a.current')
          .prev()
          .addClass('prev');
        table
          .find('a.current')
          .next()
          .addClass('next');
        table.click(function() {
          table.find('a').addClass('mdl-js-button mdl-js-ripple-effect');
          componentHandler.upgradeAllRegistered();
          table.find('a').removeClass('prev');
          table.find('a').removeClass('next');
          table
            .find('a.current')
            .prev()
            .addClass('prev');
          table
            .find('a.current')
            .next()
            .addClass('next');
        });
      }, 300);
    },
    searchLogs() {
      let parent = $('.card--logs');

      function searchLogsAll() {
        var minlen = 2;
        var keyint = 350;
        var term = '';
        var time_keyup = 0;
        var time_search = 0;

        function dosearch() {
          term = parent.find('.mdl-textfield__input').val();
          parent.find('.timeline').addClass('search-logs--in-progress');
          $('.timeline__entry').removeClass('search-logs--this-line');
          $('span.logs-search').each(function() {
            //delete old marked
            $(this)
              .after($(this).html())
              .remove();
          });
          var t = '';
          $('.timeline__padding > div').each(function() {
            //  magic THIS
            // console.log($(this).html())
            let thisLine = $(this)
              .html()
              .replace(new RegExp(term, 'ig'), '<span class="logs-search">$&</span>');
            // console.log(thisLine)
            $(this).html(thisLine);
          });
          $('span.logs-search')
            .closest('.timeline__entry')
            .addClass('search-logs--this-line');
          $('.timeline').adjustCardHeight();
          AntaresForms.elements.logsCorrectTimelineBorder();
        }

        parent.find('.mdl-textfield__input').keyup(function() {
          var d1 = new Date();
          time_keyup = d1.getTime();
          if (parent.find('.mdl-textfield__input').val() !== term) {
            // check if line is change
            if (parent.find('.mdl-textfield__input').val().length >= minlen) {
              // check size line
              setTimeout(function() {
                // wait next tick
                var d2 = new Date();
                time_search = d2.getTime();
                if (
                  time_search - time_keyup >=
                  keyint // check the interval between clicks
                )
                  dosearch(); // if all ok
              }, keyint);
            } else {
              // else input line is empty
              parent.find('.timeline').removeClass('search-logs--in-progress');
              $('span.logs-search').each(function() {
                // delete old marked
                $(this)
                  .after($(this).html())
                  .remove();
              });
              $('.timeline__entry').removeClass('search-logs--this-line');
              $('.timeline').adjustCardHeight();
            }
          }
          AntaresForms.elements.logsCorrectTimelineBorder();
        });
      }

      searchLogsAll();

      $('select.card-ctrls--select2')
        .select2()
        .on('select2:select select2:unselect', function() {
          let dataTypeLogs = $(this).select2('val');
          $(this)
            .closest('.card__content')
            .find('.timeline__entry--ok, .timeline__entry')
            .removeClass('select-logs--this-line');
          parent.find('.timeline').addClass('select-logs--in-progress');
          parent.addClass('pagination--hide');
          var counterLines = 0;
          for (let i = 0; i < parent.find('.timeline__padding > div').length; i++) {
            if ($(parent.find('.timeline__indicator')[i]).attr('data-logs-type') === dataTypeLogs) {
              counterLines = counterLines + 1;
              $(parent.find('.timeline__indicator')[i])
                .closest('.timeline__entry--ok,.timeline__entry')
                .addClass('select-logs--this-line');
            }
          }
          if (dataTypeLogs === 'All') {
            setTimeout(function() {
              $('.current10').click();
              $('.timeline__entry').removeClass('select-logs--this-line');
              parent.find('.timeline').removeClass('select-logs--in-progress');
              parent.removeClass('pagination--hide');
              AntaresForms.elements.logsCorrectTimelineBorder();
            });
          }
          $('.timeline').adjustCardHeight();
          AntaresForms.elements.logsCorrectTimelineBorder();
        });
    },
    disabledDashboardChartCompareMode() {
      enquire.register('screen and (max-width: 1199px)', {
        unmatch: function() {
          $('.compare-mode--checkbox').iCheck('uncheck');
        }
      });
      enquire.register('screen and (min-width: 1200px)', {
        unmatch: function() {
          $('.compare-mode--checkbox').iCheck('uncheck');
        }
      });
    },
    stopScroll() {
      function hoverStopScroll(selector) {
        $(selector)
          .mouseenter(function() {
            $('.app-content').perfectScrollbar('destroy');
          })
          .mouseleave(function() {
            $('.app-content').perfectScrollbar();
          });
      }

      enquire.register('screen and (min-width: 1200px)', {
        match: function() {
          hoverStopScroll('.ui-spinner');
        }
      });
    },
    updateHeightChartJS() {
      function updateHeight(device) {
        setTimeout(function() {
          $('.card--chart').each(function() {
            let target;
            if (device === 'mob') {
              target = $(this).find('.card__left');
            } else if (device === 'desc') {
              target = $(this);
            }
            let thisHeightChart = target.height() - 60;
            $(this)
              .find('.chart')
              .css('height', thisHeightChart);
          });
        }, 200);
      }

      enquire.register('screen and (max-width: 1449px)', {
        match: function() {
          updateHeight('mob');
          $(window).resize(
            _.debounce(function() {
              updateHeight('mob');
            }, 300)
          );
        },
        unmatch: function() {
          updateHeight('desc');
          $(window).resize(
            _.debounce(function() {
              updateHeight('desc');
            }, 300)
          );
        }
      });

      enquire.register('screen and (min-width: 1450px)', {
        match: function() {
          updateHeight('desc');

          function updateHeightCharts(containerTarget) {
            if (containerTarget === undefined) {
              return false;
            }
            let thisHeightChart = containerTarget.find('.card--chart').height() - 60;

            containerTarget.find('.chart').css('height', thisHeightChart);
          }

          var container;
          $('.ui-resizable-handle').mousedown(function() {
            container = $(this).closest('.grid-stack-item');
          });
          $('.grid-stack').on('change.gridHEightCharts', function(event, ui) {
            updateHeightCharts(container);
          });
        },
        unmatch: function() {
          $('.grid-stack').off('change.gridHEightCharts');
        }
      });
    },
    logsCorrectTimelineBorder() {
      $('.card--logs .timeline > li').removeClass('is-logs--show');
      $('.card--logs .timeline > li:visible:last').addClass('is-logs--show');
    },
    cardChartHeaderTruncate() {
      $('.card--chart .card__header').each(function() {
        let self = $(this);

        function giveTruncate() {
          let widthHeader = self.width();
          let thisNameSpan = self.find('.card__header-left span');
          let widthCardName = self.find('.card__header-left span').width();
          let widthDatePickerButton = self.find('.card__header-right > form').width();
          let widthForNameCard = widthHeader - widthDatePickerButton;
          if (widthForNameCard - 15 < widthCardName) {
            let thisSpanText = thisNameSpan.text();
            thisNameSpan.attr('data-tooltip-inline', thisSpanText);
            thisNameSpan.qtip({
              style: {
                classes: 'ar',
                tip: {
                  width: 9,
                  height: 5
                }
              },
              position: {
                viewport: $(window),
                adjust: {
                  method: 'shift'
                }
              },
              content: {
                attr: 'data-tooltip-inline'
              },
              show: {
                effect() {
                  $(this).fadeIn(300); // "this" refers to the tooltip
                }
              },
              hide: {
                effect() {
                  $(this).fadeOut(300); // "this" refers to the tooltipc1
                }
              },

              events: {
                show: function(event, api) {
                  var $el = $(api.elements.target[0]);
                  $el.qtip('option', 'position.my', $el.data('tooltip-my-position') == undefined ? 'top center' : $el.data('tooltip-my-position'));
                  $el.qtip('option', 'position.at', $el.data('tooltip-target-position') == undefined ? 'bottom center' : $el.data('tooltip-target-position'));

                  // $(document).one("click", function() { $(".item-grp-single").qtip('hide'); });  issue #256
                }
              }
            });
          } else {
            thisNameSpan.removeAttr('data-tooltip-inline');
            thisNameSpan.qtip('destroy');
          }
        }

        $(window).resize(
          _.debounce(function() {
            giveTruncate();
          }, 300)
        );
        $('.grid-stack').on('change.gridNameTruncate', function(event, ui) {
          giveTruncate();
        });
      });
    },
    checkIfNeedTruncateTooltip() {
      $('.check-truncate-tooltip').each(function() {
        let $self = $(this);
        let thisSelfWidth = $self.width();
        let grandFatherWidth = $self
          .parent()
          .parent()
          .width();
        let positionLeft = $self.position().left;
        if (thisSelfWidth > grandFatherWidth && (positionLeft > 10 || grandFatherWidth - positionLeft > 10)) {
          let maxWidthForSelf = grandFatherWidth - positionLeft - 20;
          $self.attr('data-tooltip-inline', $self.text());
          $self
            .css('overflow', 'hidden')
            .css('white-space', 'nowrap')
            .css('text-overflow', 'ellipsis')
            .css('max-width', maxWidthForSelf);
        }
      });
    },
    classForChart() {
      enquire.register('screen and (max-width: 767px)', {
        match: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--mobile chart--tablet chart--laptop chart--desktop')
            .addClass('chart--mobile');
        },
        unmatch: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--mobile');
        }
      });
      enquire.register('screen and (min-width: 768px) and (max-width:1023px)', {
        match: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--mobile chart--tablet chart--laptop chart--desktop')
            .addClass('chart--tablet');
        },
        unmatch: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--tablet');
        }
      });
      enquire.register('screen and (min-width:1024px) and (max-width:1366px)', {
        match: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--mobile chart--tablet chart--laptop chart--desktop')
            .addClass('chart--laptop');
        },
        unmatch: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--laptop');
        }
      });
      enquire.register('screen and (min-width:1367px)', {
        match: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--mobile chart--tablet chart--laptop chart--desktop')
            .addClass('chart--desktop');
        },
        unmatch: function() {
          $('.card--chart')
            .closest('.card-container')
            .removeClass('chart--desktop');
        }
      });
    }
  }
};

$(function() {
  window.AntaresForms = AntaresForms;
  AntaresForms.init();

  ready('select', function() {
    window.AntaresForms.elements.select();
  });
});
