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

const AntaresForms = {
  init() {
    var self = this;

    this.helpers();

    (function UiElements() {
      self.elements.checkboxesAndRadios();
      self.elements.datePicker();
      self.elements.rangeSlider();
      self.elements.simplePaginationList();
      self.elements.select();
      self.elements.spinner();
      self.elements.tooltip();

      self.elements.activateWithSelected(); //only custom code
      self.elements.clickCloseDropdownDateRange(); //only custom code
      self.elements.ddownUpZIndex(); //only custom code
      self.elements.footerShadow(); //only custom code
      self.elements.mobileDdownFilter(); //only custom code
      self.elements.mobileSelectMenu(); //only custom code
      self.elements.readOnly(); //only custom code
      self.elements.search(); //only custom code
      self.elements.scrollCloseDropdowns(); //only custom code



    })();

    //MDL reinit
    componentHandler.upgradeAllRegistered();
  },

  helpers() {
    $(window).on('resize', function() {
      $('select').select2('close');
    });

    function menuAsideRWD() {
      var mobileMenu = $('.menu-mobile-settings');
      //restrain
      if (!mobileMenu.length) {
        return;
      }
      mobileMenu.find('option').remove();
      var groups = [];
      $('.menu-aside li').each(function() {
        var link = $(this).find('> a').attr('href');
        var text = $(this).find('> a > span').eq(0).text();
        //validate if not empty
        if (!$(this).hasClass('menu-aside__title')) {
          //if has submenu
          if ($(this).hasClass('has-submenu')) {
            //  create optgroup if none
            if (!$('optgroup[label="' + text + '"]').length) {
              mobileMenu.append('<optgroup label="' + text + '"></optgroup>');
              groups.push(text);
            }
            //deal with submenu children
          } else if ($(this).parent('.menu-aside__submenu').length) {
            // console.log(groups)

            mobileMenu
              .find('optgroup[label="' + groups[0] + '"]')
              .append('<option value="' + link + '">' + text + '</option>');
            // mobileMenu.find('optgroup').append('<option value="' + link + '">' + text + '</option>');
          } else {
            //normal options
            groups = [];
            mobileMenu.append(
              '<option value="' + link + '">' + text + '</option>'
            );
          }
        }
      });
    }

    menuAsideRWD();
  },

  elements: {

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
      var dateRangeOptionsDashboard = {
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

      $('.page-dashboard [data-daterangepicker]').daterangepicker(
        $.extend({}, dateRangeOptionsDashboard, {
          initialText: 'Select time period to analize'
        })
      );

      //Screen Size <768
      enquire.register('screen and (max-width:768px)', {
        match: function() {
          $('.page-dashboard [data-daterangepicker]').daterangepicker(
            'destroy'
          );
          $('.page-dashboard [data-daterangepicker]').daterangepicker(
            $.extend({}, dateRangeOptionsDashboard, {
              initialText: 'Select time period to analize'
            })
          );
        }
      });

      // class cleanup
      var classesToRemove = [
        'ui-button',
        'ui-widget',
        'ui-state-default',
        'ui-corner-all',
        'ui-button-text-only'
      ];

      var $target = $('.comiseo-daterangepicker-buttonpanel button');
      $.each(classesToRemove, function(i, v) {
        $target.removeClass(v);
      });
      $target.mouseover(function() {
        $(this).removeClass('ui-state-hover');
      });

      // time
      var timepicker = $('[data-timepicker]'),
        datepicker = $('[data-datepicker]'),
        datetimepicker = $('[data-datetimepicker]');

      timepicker.datetimepicker({
        datepicker: false,
        format: 'H:i'
        // onChangeDateTime: function() {
        //     $(this).validate();
        // },

        // onShow: function () {
        // $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
        // },
        // onClose: function () {
        //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
        // }
      });
      $(window).scroll(function() {
        $('.xdsoft_datetimepicker').css('display', 'none');
      });
      datepicker.datetimepicker({
        timepicker: false,
        format: 'd.m.Y'
        // onShow: function () {
        //     $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
        // },
        // onClose: function () {
        //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
        // }
      });

      datetimepicker.datetimepicker({
        datepicker: true
        // onShow: function () {
        //     $('.app-content[data-scroll-blocked]').addClass('data-scroll-blocked-pickers')
        // },
        // onClose: function () {
        //     $('.app-content[data-scroll-blocked]').removeClass('data-scroll-blocked-pickers')
        // }
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
    },
    rangeSlider() {
      var slider = $('[data-slider]'),
        rangeSlider = $('[data-slider-range]');

      slider.slider({
        range: 'min',
        slide: function(event, ui) {
          //if validation - must contain sibling input
          if ($(this).siblings('.slider-val').length) {
            $(this).siblings('.slider-val').val(ui.value);
            // $(this).siblings('.slider-val').valid();
          }
        }
      });

      rangeSlider.slider({
        range: true,
        min: 0,
        max: 3000,
        values: [575, 2000],
        slide: function() {}
      });
    },
    simplePaginationList() {
      // pagination
      require('./external/simple_pagination.js');

      // Consider adding an ID to your table
      // incase a second table ever enters the picture.
      var items = $('.datarow .timeline li');
      var numItems = items.length;
      var perPage = 10;

      // Only show the first 2 (or first `per_page`) items initially.
      items.slice(perPage).hide();
      $('.current10').click(function() {
        perPage = 10;
        $('.simple-pagination--list').pagination('updateItemsOnPage', 10);
        $('.current100').removeClass('active');
        $('.current25').removeClass('active');
        $('.current10').addClass('active');
        $('.current50').removeClass('active');
        $('.simple-pagination--current')
          .closest('.pagination')
          .prev('ul.timeline')
          .perfectScrollbar('update');
      });
      $('.current25').click(function() {
        perPage = 25;
        $('.simple-pagination--list').pagination('updateItemsOnPage', 25);
        $('.current100').removeClass('active');
        $('.current10').removeClass('active');
        $('.current25').addClass('active');
        $('.current50').removeClass('active');
        $('.simple-pagination--current')
          .closest('.pagination')
          .prev('ul.timeline')
          .perfectScrollbar('update');
      });
      $('.current50').click(function() {
        perPage = 50;
        $('.simple-pagination--list').pagination('updateItemsOnPage', 50);
        $('.current100').removeClass('active');
        $('.current10').removeClass('active');
        $('.current25').removeClass('active');
        $('.current50').addClass('active');
        $('.simple-pagination--current')
          .closest('.pagination')
          .prev('ul.timeline')
          .perfectScrollbar('update');
      });
      $('.current100').click(function() {
        perPage = 100;
        $('.simple-pagination--list').pagination('updateItemsOnPage', 100);
        $('.current10').removeClass('active');
        $('.current25').removeClass('active');
        $('.current100').addClass('active');
        $('.current50').removeClass('active');
        $('.simple-pagination--current')
          .closest('.pagination')
          .prev('ul.timeline')
          .perfectScrollbar('update');
      });
      // Now setup the pagination using the `.pagination-page` div.
      $('.simple-pagination--list').pagination({
        items: numItems,
        itemsOnPage: perPage,
        // currentPage: 0,
        cssStyle: 'antares-pagination',
        prevText: '<i class="zmdi zmdi-long-arrow-left"></i>',
        nextText: '<i class="zmdi zmdi-long-arrow-right"></i>',
        onPageClick: function(pageNumber) {
          var showFrom = perPage * (pageNumber - 1);
          var showTo = showFrom + perPage;
          items.hide().slice(showFrom, showTo).show();
          componentHandler.upgradeAllRegistered();
          $('.simple-pagination--list')
            .closest('.pagination')
            .prev('ul.timeline')
            .perfectScrollbar('update');
        }
      });
      componentHandler.upgradeAllRegistered();
    },
    select() {
      //select close on remove option - fix

      var $element = $('select');

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

      (function select2() {
        //select2 - better, faster, harder, stronger

        var select2Base = {
          dropdownAutoWidth: true,
          // placeholder: 'Select an option',
          theme: 'selectAR',
          allowClear: true,
          //disable search below
          minimumResultsForSearch: Infinity
        };

        // $.fn.select2.defaults.set("theme", "AR");

        $('[data-selectAR]').select2(select2Base).on('change', function() {
          //validation if needed
          if ($(this).closest('.form-validation').length) {
            // $(this).valid();
          }
          $(this).closest('.input-field').removeClass('error');
        });

        //WITH SEARCH
        $('[data-selectAR--search]')
          .select2(
            $.extend({}, select2Base, {
              minimumResultsForSearch: 1
            })
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });

        //MDL
        $('[data-selectAR--mdl]')
          .select2(
            $.extend({}, select2Base, {
              theme: 'mdl'
            })
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });

        //MDL big
        $('[data-selectAR--mdl-big]')
          .select2(
            $.extend({}, select2Base, {
              theme: 'mdl-big'
            })
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });
        //MDL short (v2)
        $('[data-selectAR--mdl-short]')
          .select2(
            $.extend({}, select2Base, {
              theme: 'mdl-short'
            })
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });

        //Select - tags
        $('[data-selectAR--tags]')
          .select2(
            $.extend({}, select2Base, {
              theme: 'tags'
            })
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });

        //Select - custom input (tags with 1 option)
        $('[data-selectAR--custom-input]')
          .select2(
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
          )
          .on('change', function() {
            //validation if needed
            if ($(this).closest('.form-validation').length) {
              // $(this).valid();
            }
            $(this).closest('.input-field').removeClass('error');
          });

        //https://github.com/select2/select2/issues/3901
        // $('[data-selectAR]').select2(select2Base);
        // //https://github.com/select2/select2/issues/3901
        //Flags integration
        //on init

        $('select[data-flag-select]').each(function() {
          if ($(this).find('option:selected').length) {
            var flag = $(this).find('option:selected').data('country');
          } else {
            return false;
          }

          $(this)
            .siblings('.input-field__icon')
            .find('.flag-icon')
            .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
        });

        $(
          'select[data-flag-select], [data-flag-select-translations]'
        ).on('change', function() {
          if ($(this).find('option:selected').length) {
            var flag = $(this).find('option:selected').data('country');
          } else {
            return false;
          }

          $(this)
            .siblings('.input-field__icon')
            .find('.flag-icon')
            .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
        });

        //on init
        $('[data-flag-select]').select2({
          minimumResultsForSearch: Infinity,
          dropdownAutoWidth: true,
          templateResult: function(data) {
            if (data.element && data.element.attributes['data-country']) {
              // console.log(data);
              var flagCode = data.element.attributes['data-country'].nodeValue;
              var $state = $(
                '<span class="flag-icon flag-icon-' +
                  flagCode +
                  '"></span><span>' +
                  data.text +
                  '</span>'
              );
              return $state;
            } else {
              return data.text;
            }
          }
        });

        //on init
        $('[data-flag-select-translations]').select2({
          theme: 'translations',
          dropdownAutoWidth: true,
          templateResult: function(data) {
            if (data.element && data.element.attributes['data-country']) {
              // console.log(data);
              var flagCode = data.element.attributes['data-country'].nodeValue;
              var $state = $(
                '<span class="flag-icon flag-icon-' +
                  flagCode +
                  '"></span><span>' +
                  data.text +
                  '</span>'
              );
              return $state;
            } else {
              return data.text;
            }
          }
        });

        //on init
        // Flag integration with search

        $('select[data-flag-select--search]').each(function() {
          if ($(this).find('option:selected').length) {
            var flag = $(this).find('option:selected').data('country');
          } else {
            return false;
          }

          $(this)
            .siblings('.input-field__icon')
            .find('.flag-icon')
            .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
        });

        $('select[data-flag-select-translations]').each(function() {
          if ($(this).find('option:selected').length) {
            var flag = $(this).find('option:selected').data('country');
          } else {
            return false;
          }
          $(this)
            .siblings('.input-field__icon')
            .find('.flag-icon')
            .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
        });

        $('[data-flag-select--search]').select2({
          dropdownAutoWidth: true,
          minimumResultsForSearch: 1,
          closeOnSelect: false,
          templateResult: function(data) {
            if (data.element && data.element.attributes['data-country']) {
              // console.log(data);
              var flagCode = data.element.attributes['data-country'].nodeValue;
              var $state = $(
                '<span class="flag-icon flag-icon-' +
                  flagCode +
                  '"></span><span>' +
                  data.text +
                  '</span>'
              );
              return $state;
            } else {
              return data.text;
            }
          }
        });

        $('select[data-flag-select--search]').on('change', function() {
          if ($(this).find('option:selected').length) {
            var flag = $(this).find('option:selected').data('country');
          } else {
            return false;
          }

          $(this)
            .siblings('.input-field__icon')
            .find('.flag-icon')
            .attr('class', 'flag-icon ' + 'flag-icon-' + flag);
        });
      })();

      // prefix control

      $('select').each(function() {
        if ($(this).attr('data-prefix')) {
          if (!$(this).next('.select2').find('.select__prefix').length) {
            var prefixValue = $(this).data('prefix');
            // $(this).siblings('.select2').find('.select2-selection__rendered').attr('data-prefix', prefixValue );
            $(this)
              .next('.select2')
              .find('.select2-selection__rendered')
              .prepend(
                '<span class="select__prefix">' + prefixValue + '</span>'
              );

            $(this).on('change', function() {
              $(this)
                .next('.select2')
                .find('.select2-selection__rendered')
                .prepend(
                  '<span class="select__prefix">' + prefixValue + '</span>'
                );
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
      $('[data-tooltip-inline!=""]').qtip({
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
          effect: function() {
            $(this).fadeIn(300); // "this" refers to the tooltip
          }
        },
        hide: {
          effect: function() {
            $(this).fadeOut(300); // "this" refers to the tooltipc1
          }
        },

        events: {
          show: function(event, api) {
            var $el = $(api.elements.target[0]);
            $el.qtip(
              'option',
              'position.my',
              $el.data('tooltip-my-position') == undefined
                ? 'top center'
                : $el.data('tooltip-my-position')
            );
            $el.qtip(
              'option',
              'position.at',
              $el.data('tooltip-target-position') == undefined
                ? 'bottom center'
                : $el.data('tooltip-target-position')
            );

            // $(document).one("click", function() { $(".item-grp-single").qtip('hide'); });  issue #256
          }
        }
      });
      enquire.register('screen and (max-width: 1366px)', {
        match: function() {
          $('[data-tooltip-mobile="true"]').each(function() {
            // Notice the .each() loop, discussed below
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
                effect: function() {
                  $(this).fadeOut(300); // "this" refers to the tooltip
                }
              },
              events: {
                show: function(event, api) {
                  var $el = $(api.elements.target[0]);
                  $el.qtip(
                    'option',
                    'position.my',
                    $el.data('tooltip-my-position') == undefined
                      ? 'top center'
                      : $el.data('tooltip-my-position')
                  );
                  $el.qtip(
                    'option',
                    'position.at',
                    $el.data('tooltip-target-position') == undefined
                      ? 'bottom center'
                      : $el.data('tooltip-target-position')
                  );
                }
              }
            });
          });
        },
        unmatch: function() {
          $('[data-hasqtip]').each(function() {
            $(this).qtip('destroy');
          });
        }
      });

      enquire.register('screen and (min-width: 1367px)', {
        match: function() {
          $('[data-tooltip="true"]').each(function() {
            // Notice the .each() loop, discussed below
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
                effect: function() {
                  $(this).fadeOut(300); // "this" refers to the tooltip
                }
              },
              events: {
                show: function(event, api) {
                  var $el = $(api.elements.target[0]);
                  $el.qtip(
                    'option',
                    'position.my',
                    $el.data('tooltip-my-position') == undefined
                      ? 'top center'
                      : $el.data('tooltip-my-position')
                  );
                  $el.qtip(
                    'option',
                    'position.at',
                    $el.data('tooltip-target-position') == undefined
                      ? 'bottom center'
                      : $el.data('tooltip-target-position')
                  );
                }
              }
            });
          });
        },
        unmatch: function() {
          $('[data-hasqtip]').each(function() {
            $(this).qtip('destroy');
          });
        }
      });
    },
    spinner() {
      $('[data-spinner="true"]').spinner({
        min: 0,
        max: 1000000000,
        start: 0,
        culture: 'en-US',
        step: 1,
        numberFormat: 'C'
      });
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
        },
        closeContextMenu() {
          // $(".context-menu-active").contextMenu("hide"); //need open or error in console
        },
        closeAutocomplete() {
          // $("[autocomplete]").autocomplete("close"); //need open or error in console
        },
        closeTimePicker() {
          $('.xdsoft_datetimepicker').css('display', 'none');
        },
        closeSelect2() {
          $('select').select2('close');
        },
        closeDatePicker() {
          $('[data-daterangepicker]').daterangepicker('close');
        }
      };
      systemDropdowns.init();
      pluginDropdowns.init();
    },

    activateWithSelected() {
      $('.card-ctrls').click();
      let table = $('#table-ma');
      table.click(function() {
        if (table.attr('disabled')) {
          table.closest('.ddown--left').removeClass('ddown--open');
        } else {
          table.closest('.ddown--left').addClass('ddown--open');
        }
      });
    },
    clickCloseDropdownDateRange() {
      var self = this;
      $(document).mouseup(function(e) {
        var container = $('.ddown');
        var container2 = $('.input-field--group');
        if (!e.target.closest('.ui-widget-content')) {
          if (
            container.has(e.target).length === 0 ||
            container2.has(e.target).length === 0
          ) {
            $('[data-daterangepicker]').daterangepicker('close');
          }
        }
      });
      $('.breadcrumbs').click(function() {
        self.closeAllDropdowns;
        $('.grid-stack-item').css('z-index', '0');
      });
    },
    ddownUpZIndex() {
      $('.ddown').click(function() {
        $(this).closest('.grid-stack-item').css('z-index', '10');
      });
      $('body').click(function() {
        $('.grid-stack-item').css('z-index', '0');
      });
    },
    footerShadow() {
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
              if (
                element.scrollHeight - element.scrollTop ===
                element.clientHeight
              ) {
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
    mobileDdownFilter() {
      $('.ddown--view-more-options').click(function() {
        $(this).find('.ddown-multi__submenu').css('display', 'none');
      });
      $('.add-filter').click(function() {
        $(this)
          .closest('.ddown__content')
          .find('.ddown-multi__submenu')
          .removeClass('is-active');
      });
    },
    mobileSelectMenu() {
      $('#select-anchor').change(function(e) {
        let selectValue = $(this).select2('data')[0].id;
        setTimeout(function() {
          window.location.hash = selectValue;
        }, 50);
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
          $(
            document
          ).on('click', '.main-head .search-box > i:first-child', function() {
            $('.main-head').addClass('main-head--mobile--search'); // #62 toggle na add
            searchSingle.addClass('search-box--toggled');

            $(this)
              .closest('.search-box')
              .find('.search-box__mdl-textfield input')
              .focus();
          });
          $(
            document
          ).on(
            'click',
            '.main-head .search-box .search-box__close',
            function() {
              $('.main-head').removeClass('main-head--mobile--search'); // #62 toggle na remove
              $(this).closest('.search-box').removeClass('search-box--toggled');
            }
          );
        },
        unmatch: function() {
          search.show();
          $('.main-head').removeClass('main-head--mobile--search');
          // search.toggleClass('search-box--toggled');
          $(
            document
          ).on('click', '.main-head .search-box i:first-child', function(e) {
            $('.main-head').removeClass('main-head--mobile--search'); // #62 add line
            $(this).closest('.search-box').removeClass('search-box--toggled'); // #62 add line
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
      $(
        '.search-box--closable .search-box__search-field'
      ).on('input', function() {
        if ($(this).val().length === 0) {
          $(this).closest('.search-box').find('.search-box__close').hide();
        } else {
          $(this).closest('.search-box').find('.search-box__close').show();
        }
      });
    },
    scrollCloseDropdowns() {
      var self = this;
      $('.app-content').unbind(
        'mousewheel DOMMouseScroll MozMousePixelScroll touchmove'
      );
      $(
        '.app-content'
      ).bind(
        'mousewheel DOMMouseScroll MozMousePixelScroll touchmove',
        function(event) {
          var delta = parseInt(
            event.originalEvent.wheelDelta || -event.originalEvent.detail
          );
          if (delta >= 0) {
            self.closeAllDropdowns();
          } else if (delta < 0) {
            self.closeAllDropdowns();
          } else {
            return false;
          }
        }
      );

      $('.ddown')
        .on('mousedown', '.ui-state-active', function(e) {
          $('.app-content').unbind(
            'mousewheel DOMMouseScroll MozMousePixelScroll touchmove'
          );
        })
        .on('mouseup', '.ui-state-active', function(e) {
          $(
            '.app-content'
          ).bind(
            'mousewheel DOMMouseScroll MozMousePixelScroll touchmove',
            function(event) {
              var delta = parseInt(
                event.originalEvent.wheelDelta || -event.originalEvent.detail
              );
              if (delta >= 0) {
                self.closeAllDropdowns();
              } else if (delta < 0) {
                self.closeAllDropdowns();
              } else {
                return false;
              }
            }
          );
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
