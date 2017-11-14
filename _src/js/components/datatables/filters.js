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
var mySwiper = undefined;
const AntaresDatatablesFilters = {
  init() {
    this.values();
    this.addFilter();
    this.closeFilter();
    this.editFilter();
    this.filtersSwiper();
    this.addDropJSFilters();
  },

  filtersSwiper() {
    $('.swiper-filters').each(function() {
      let self = $(this);
      mySwiper = new Swiper(this, {
        slidesPerView: 'auto',
        nextButton: '.swiper-filters-next',
        prevButton: '.swiper-filters-prev',
        freeMode: true
      });

      $(window).resize(
        _.debounce(function() {
          if (typeof mySwiper.update === 'function') {
            mySwiper.update();
          }
        }, 300)
      );

      window.requestAnimationFrame(() => {
        window.antaresEvents.on('filters.append', function() {
          mySwiper.update();
          unlockSwiperFIlter(mySwiper, self);
          $('.antares-dropjs-filter--out.drop').off('click');
          $('.antares-dropjs-filter--out.drop').on('click', function() {
            let self = $(this);
            setTimeout(function() {
              if (self.hasClass('drop-enabled')) {
                mySwiper.lockSwipes();
              }
            }, 500);
          });
          setTimeout(function() {
            haveSlidesFilter(self);
          }, 300);
        });
        window.antaresEvents.on('filters.beforeClose', function() {
          unlockSwiperFIlter(mySwiper, self);
        });
        window.antaresEvents.on('filters.delete', function() {
          setTimeout(function() {
            mySwiper.update();
            unlockSwiperFIlter(mySwiper, self);
            setTimeout(function() {
              haveSlidesFilter(self);
            }, 300);
              self.find('.swiper-wrapper').css('transform','translate3d(0, 0, 0)')
          }, 300);
        });
      });
    });

    function haveSlidesFilter(element) {
      if (element.find('.swiper-wrapper').children().length !== 0) {
        element.closest('.tab-search--filter').removeClass('swiper--no-slides');
      } else {
        element.closest('.tab-search--filter').addClass('swiper--no-slides');
        element.closest('.tbl-c').adjustCardHeight();
      }

    }
    function unlockSwiperFIlter(mySwiperV, element) {
      let allWidthSlides = 0;
      for (let i = 0; i < element.find('.swiper-slide').length; i++) {
        allWidthSlides += $(element.find('.swiper-slide')[i]).width();
      }
      if (element.closest('.swiper-filters--box .swiper-container').width() < allWidthSlides + 100) {
        if (typeof mySwiperV.unlockSwipes === 'function') {
          mySwiperV.unlockSwipes();
          element.closest('.swiper-filters--box').removeClass('swiper-filters--no-active');
        }
      } else {
        if (typeof mySwiperV.lockSwipes === 'function') {
          mySwiperV.lockSwipes();
          element.closest('.swiper-filters--box').addClass('swiper-filters--no-active');
        }
      }
    }
  },

  addDropJSFilters(target) {
    let lol = {
      dropCgf: {
        position: 'bottom right',
        openOn: 'click',
        constrainToWindow: true,
        constrainToScrollParent: false,
        classes: 'antares-dropjs-filter--out drop',
        hoverOpenDelay: 0,
        hoverCloseDelay: 50,
        focusDelay: 0,
        blurDelay: 50,
        tetherOptions: {
          constraints: [
            {
              to: 'scrollParent',
              pin: true
            }
          ]
        },
        beforeClose: function() {
          window.antaresEvents.emit('filters.beforeClose');
          if ($('.filter--date-picker').hasClass('dropJS-filter--open')) {
            return false;
          } else if ($('.select2-container').hasClass('select2-container--open')) {
            return false;
          }
        }
        // remove: true
      }
    };
    if (target === undefined) {
      target = $('.dropjs--no-active');
    }
    for (let i = 0; i < target.length; i++) {
      let dropTwo;
      dropTwo = new Drop(
        Object.assign(
          {
            target: $(target[i]).find('span:last-of-type')[0],
            content: $(target[i]).next('.dropjs-wrapper')[0]
          },
          lol.dropCgf
        )
      );
      dropTwo.open();
      dropTwo.position();
      dropTwo.close();
      target.removeClass('dropjs--no-active');
    }
    mySwiper.update();
  },
  values() {
    function spinnerToSlider(parent) {
      var values = [];
      var valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
      var valMax = parseInt(
        parent
          .find('.filter-spinner--max')
          .val()
          .replace('$', '')
          .replace(/,/g, ''),
        10
      );
      values.push(valMin);
      values.push(valMax);
      parent.find('.filter-slider').slider('values', values); // add positions to slider
    }

    $('.filter-spinner-mode-min').spinner({
      start: 0,
      culture: 'en-US',
      step: 1,
      numberFormat: 'C',
      spin: function(event, ui) {
        // IF YOU TOUCH SPINNER
        var parent = $(this).closest('.filter-content');
        parent.find('.filter-spinner--min').spinner('option', 'max', parent.find('.filter-spinner--max').attr('aria-valuenow')); // maximum for min spinner
        parent.find('.filter-spinner--min').spinner('option', 'min', parent.attr('data-min'));
        spinnerToSlider(parent);
      }
    });
    $('.filter-spinner-mode-max').spinner({
      start: 0,
      culture: 'en-US',
      step: 1,
      numberFormat: 'C',
      spin: function(event, ui) {
        // IF YOU TOUCH SPINNER
        var parent = $(this).closest('.filter-content');
        parent.find('.filter-spinner--max').spinner('option', 'min', parent.find('.filter-spinner--min').attr('aria-valuenow')); // minimum for max spinner
        parent.find('.filter-spinner--max').spinner('option', 'max', parent.attr('data-max'));
        spinnerToSlider(parent);
      }
    });

    var slider = $('[data-slider]'),
      rangeSlider = $('[data-slider-range-filter]');

    slider.slider({
      // one dot
      slide: function(event, ui) {
        if ($(this).siblings('.slider-val').length) {
          $(this)
            .siblings('.slider-val')
            .val(ui.value);
          $(this)
            .siblings('.slider-val')
            .valid();
        }
      }
    });

    rangeSlider.slider({
      //two dot
      create: function() {
        var parent = $(this).closest('.filter-content');
        var dataName = parent.attr('data-type');
        var dataMin = parseInt(parent.attr('data-type', dataName).attr('data-min'), 10);
        var dataMax = parseInt(parent.attr('data-type', dataName).attr('data-max'), 10);
        parent.find('.filter-slider').slider('option', 'min', dataMin);
        parent.find('.filter-slider').slider('option', 'max', dataMax);

        parent.find('.filter-slider').slider('values', [parent.find('.filter-spinner--min').attr('aria-valuenow'), parent.find('.filter-spinner--max').attr('aria-valuenow')]); // add positions to slider
      },
      range: true,
      slide: function(event, ui) {
        // IF YOU TOUCH SLIDER
        var parent = $(this).closest('.filter-content');
        parent.find('.filter-spinner--min').spinner('value', ui.values[0]); //add positions to spinner
        parent.find('.filter-spinner--max').spinner('value', ui.values[1]); //add positions to spinner
        parent.find('.filter-spinner--max').spinner('option', 'min', parent.find('.filter-spinner--min').attr('aria-valuenow'));
        parent.find('.filter-spinner--min').spinner('option', 'max', parent.find('.filter-spinner--max').attr('aria-valuenow'));
      }
    });

    let dateRangePickerFilter = $('[data-daterangepicker--filter="true"]');

    for (let i = 0; i < dateRangePickerFilter.length; i++) {
      $(dateRangePickerFilter[i]).daterangepicker({
        mirrorOnCollision: true,
        verticalOffset: 0,
        onOpen: function() {
          let thisDropBox = $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text]');
          thisDropBox.addClass('dropJS-filter--open');
        },
        onClose: function() {
          let thisDropBox = $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text]');
          setTimeout(function() {
            thisDropBox.removeClass('dropJS-filter--open');
          }, 500);
        }
      });
      let doubleDate = $(dateRangePickerFilter[i])
        .closest('.filter-content')
        .attr('data-daterangepicker-text');
      var dateStart = moment(doubleDate.split('-')[0]);
      var dateEnd = moment(doubleDate.split('-')[1]);

      $(dateRangePickerFilter[i]).daterangepicker('setRange', { start: dateStart._d, end: dateEnd._d });
    }
  },
  addFilter() {
    var self = this;

    function addTemplateNumber(targetFilter, typeFilter, minVal, maxVal, dataMin, dataMax) {
      console.log('add number filter');
      let templateElement = $('.filter-type--number')
        .closest('.swiper-slide--template')
        .clone();
      let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1);
      templateElement
        .removeClass('swiper-slide--template')
        .addClass('swiper-slide')
        .removeClass('display-none');
      templateElement
        .find('.dropjs-target--template')
        .removeClass('dropjs-target--template')
        .addClass('dropjs-target')
        .removeClass('dropjs--no-active--template')
        .addClass('dropjs--no-active');
      templateElement.find('.filter').attr('data-type', typeFilter);
      templateElement
        .find('.filter-spinner-mode-min--template')
        .removeClass('filter-spinner-mode-min--template')
        .addClass('filter-spinner-mode-min');
      templateElement
        .find('.filter-spinner-mode-max--template')
        .removeClass('filter-spinner-mode-max--template')
        .addClass('filter-spinner-mode-max');
      templateElement
        .find('.dropjs-target')
        .attr('data-filter-value', minVal + ' - ' + maxVal)
        .children('span:last-of-type')
        .html(minVal + ' - ' + maxVal);
      templateElement
        .find('.filter-content')
        .attr('data-type', typeFilter)
        .attr('data-min', dataMin)
        .attr('data-max', dataMax)
        .children('span')
        .html('Filter By ' + nameFilter);
      templateElement.find('.filter-spinner--min').attr('value', minVal);
      templateElement.find('.filter-spinner--max').attr('value', maxVal);
      templateElement.find('.filter-slider').attr('data-slider-range-filter', true);
      templateElement.find('.filter-label').html(typeFilter + ':');
      targetFilter
        .closest('.filters')
        .find('.card-filters--swiper')
        .append(templateElement);
      console.log(templateElement);
    }

    function addTemplateBadge(targetFilter, typeFilter, selectedStatus) {
      let templateElement = $('.filter-type--badge')
        .closest('.swiper-slide--template')
        .clone();
      let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1);
      let thisSlider = targetFilter.closest('.filters').find('.card-filters--swiper');

      templateElement
        .removeClass('swiper-slide--template')
        .addClass('swiper-slide')
        .removeClass('display-none');
      templateElement
        .find('.dropjs-target--template')
        .removeClass('dropjs-target--template')
        .addClass('dropjs-target')
        .removeClass('dropjs--no-active--template')
        .addClass('dropjs--no-active');
      templateElement.find('.select--badge').attr('data-selectAR', true);
      templateElement.find('.filter').attr('data-type', typeFilter);
      templateElement
        .find('.dropjs-target')
        .attr('data-filter-value', nameFilter)
        .children('span:last-of-type')
        .html(selectedStatus);
      templateElement
        .find('.filter-content')
        .attr('data-type', typeFilter)
        .children('span:last-of-type')
        .html('Filter By ' + nameFilter);
      templateElement.find('.filter-label').html(typeFilter + ':');
      thisSlider.append(templateElement);
      for (let i = 0; i < thisSlider.find('.slider-box option').length; i++) {
        if (thisSlider.find('.slider-box option')[i].value === selectedStatus) {
          $(thisSlider.find('.slider-box option')[i]).attr('selected', 'selected');
        }
      }
    }

    function addTemplateDatePicker(targetFilter, typeFilter, thisTextDatePicker) {
      let templateElement = $('.filter-type--date-picker')
        .closest('.swiper-slide--template')
        .clone();
      let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1);

      templateElement
        .removeClass('swiper-slide--template')
        .addClass('swiper-slide')
        .removeClass('display-none');
      templateElement
        .find('.dropjs-target--template')
        .removeClass('dropjs-target--template')
        .addClass('dropjs-target')
        .removeClass('dropjs--no-active--template')
        .addClass('dropjs--no-active');
      templateElement.find('.filter').attr('data-type', typeFilter);
      templateElement
        .find('.filter-content')
        .attr('data-type', typeFilter)
        .attr('data-daterangepicker-text', thisTextDatePicker)
        .children('span:last-of-type')
        .html('Filter By ' + nameFilter);
      templateElement.find('input').attr('data-daterangepicker--filter', true);
      templateElement
        .find('.dropjs-target')
        .attr('data-filter-value', nameFilter)
        .children('span:last-of-type')
        .html(thisTextDatePicker);
      templateElement.find('.filter-label').html(typeFilter + ':');
      targetFilter
        .closest('.filters')
        .find('.card-filters--swiper')
        .append(templateElement);
    }

    $('.ddown-multi .add-filter').on('click', function() {
      console.log('click on add');
      var parent = $(this).closest('.filter-content');
      var typeFilter = parent.attr('data-type');
      if (typeFilter === 'services' || typeFilter === 'created') {
        if (typeFilter === 'services') {
          let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter);
          if (countFilter === undefined) {
            $('.swiper-filters--box').attr('data-filter-' + typeFilter, '1');
          } else if (countFilter === '5') {
            self.filterAlertNumber('error', parent);
            return false;
          } else {
            countFilter++;
            $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter);
          }
        } else if (typeFilter === 'created') {
          let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter);
          if (countFilter === undefined) {
            $('.swiper-filters--box').attr('data-filter-' + typeFilter, '1');
          } else if (countFilter === '5') {
            self.filterAlertNumber('error', parent);
            return false;
          } else {
            countFilter++;
            $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter);
          }
        }
        var minInp = parseInt(parent.find('.filter-spinner--min').val(), 10);
        var maxInp = parseInt(parent.find('.filter-spinner--max').val(), 10);
        var dataName = parent.attr('data-type');
        var dataMin = parseInt(parent.attr('data-type', dataName).attr('data-min'), 10);
        var dataMax = parseInt(parent.attr('data-type', dataName).attr('data-max'), 10);
        if (maxInp > minInp && minInp >= dataMin && maxInp <= dataMax) {
          self.filterAlertNumber('success', parent);
          self.addFilterDT(parent);
          var filterContainer = $(this)
            .closest('.filters')
            .find('.card-filters--swiper');
          var parent = $(this).closest('.filter-content'),
            minVal = parent.find('.filter-spinner--min').val(),
            maxVal = parent.find('.filter-spinner--max').val(),
            tooltipName = parent.closest('ul[data-name]').attr('data-name');
          // tooltipName = tooltipName.charAt(0).toUpperCase() + tooltipName.substr(1).toLowerCase(); //first letter big
          typeAmmount = addTemplateNumber(parent, typeFilter, minVal, maxVal, dataMin, dataMax);
          AntaresForms.elements.tooltip();

          $(this)
            .closest('.filter-content')
            .find('.ddown-multi__submenu')
            .hide();
          $('.antares-dropjs-filter').off('mousedown mouseup'); // for restart mouesedown filters scroll
          AntaresDdownGeneral.scrollCloseDropdowns();
          self.values();
          self.editFilter();
          self.addDropJSFilters(filterContainer.find('.dropjs--no-active'));
        } else {
          self.filterAlertNumber('error', parent, minInp, maxInp, dataMin, dataMax);
        }
      } else if (typeFilter === 'status') {
        var selectedStatus = parent.find('.select2-selection__rendered').attr('title');
        var haveSameStatusFilter = false;
        for (let i = 0; i < $('.filter-type--badge').length; i++) {
          if ($('.filter-type--badge span')[i].textContent === selectedStatus) {
            haveSameStatusFilter = true;
          }
        }
        if (haveSameStatusFilter === false) {
          self.filterAlertBadge('success', selectedStatus);
          var filterContainer = $(this)
            .closest('.filters')
            .find('.card-filters--swiper');
          var parent = $(this).closest('.filter-content');
          let targetFilter = parent;
          var typeAmmount = addTemplateBadge(targetFilter, typeFilter, selectedStatus);
          filterContainer.prepend(typeAmmount);
          self.editFilter();
          AntaresForms.elements.tooltip();
          $(this)
            .closest('.filter-content')
            .find('.ddown-multi__submenu')
            .hide();
          $('.antares-dropjs-filter').off('mousedown mouseup'); // for restart mouesedown filters scroll
          AntaresDdownGeneral.scrollCloseDropdowns();
          self.addDropJSFilters(filterContainer.find('.dropjs--no-active'));
        } else if (haveSameStatusFilter === true) {
          self.filterAlertBadge('error', selectedStatus);
        }
      } else if (typeFilter === 'datePicker') {
        let parent = $(this).closest('.filter-content');
        let thisTextDatePicker = parent.find('.comiseo-daterangepicker-triggerbutton')[0].textContent;
        let filterContainer = $(this)
          .closest('.filters')
          .find('.card-filters--swiper');
        console.log(thisTextDatePicker);
        if (thisTextDatePicker === 'Select date range... ') {
          AntaresNoty.callNoty('alert', 'Pls, select date', 'lg', 'border');
        } else {
          let typeAmmount = addTemplateDatePicker(parent, typeFilter, thisTextDatePicker);
          filterContainer.prepend(typeAmmount);
          self.addDropJSFilters(filterContainer.closest('.filters').find('.dropjs--no-active'));

          $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text="' + thisTextDatePicker + '"]')
            .find('[data-daterangepicker--filter="true"]')
            .daterangepicker({
              mirrorOnCollision: true,
              verticalOffset: 0,
              onOpen: function() {
                let thisDropBox = $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text]');
                thisDropBox.addClass('dropJS-filter--open');
              },
              onClose: function() {
                let thisDropBox = $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text]');
                setTimeout(function() {
                  thisDropBox.removeClass('dropJS-filter--open');
                }, 500);
              }
            });

          let thisOriginalTextDatePicker = parent.find('[data-daterangepicker]').daterangepicker('getRange');
          $('[data-daterangepicker-text="' + thisTextDatePicker + '"] [data-daterangepicker--filter]').daterangepicker('setRange', thisOriginalTextDatePicker);
          self.editFilter();

          $(this)
            .closest('.filter-content')
            .find('.ddown-multi__submenu')
            .hide();
        }
      } else {
      }
      window.antaresEvents.emit('filters.append');
    });
  },
  closeFilter() {
    let self = this;
    $('.filters .btn-filter--clear-all').click(function() {
      let thisBtnClear = $(this);
      let swiperLine = thisBtnClear.closest('.filters').find('.swiper-filters--box');
      for (let i = 0; i < swiperLine[0].attributes.length; i++) {
        //delete count attributes
        let thisAttr = swiperLine[0].attributes[i].name;
        if (thisAttr.substr(0, 11) === 'data-filter') {
          swiperLine.attr(thisAttr, 0);
        }
      }
      swiperLine.find('.swiper-slide').remove();
      swiperLine.find('.ddown--filter-edit').remove();
      swiperLine.find('.card-filter__sgl').remove();
      AntaresNoty.callNoty('alert', 'Deleted ALL filters', 'lg', 'border');

      setTimeout(function() {
        thisBtnClear
          .closest('.filters')
          .find('.ddown-multi')
          .removeClass('ddown-multi--open');
        if (swiperLine.find('.swiper-wrapper').children().length > 0) {
          swiperLine.closest('.tab-search--filter').removeClass('swiper--no-slides');
        } else {
          swiperLine.closest('.tab-search--filter').addClass('swiper--no-slides');
          $('.tbl-c').adjustCardHeight();
        }
        window.antaresEvents.emit('filters.delete');
      }, 300);
    });
    $('.card-filters--swiper').on('click', '.filter-close', function(e) {
      e.stopPropagation();
      var $self = $(this);
      $(this)
        .closest('.card-filter__sgl')
        .addClass('animated fadeOutRight');
      setTimeout(function() {
        var typeFilter = $self.closest('.filter').attr('data-type');
        let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter);
        countFilter--;
        $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter);

        $self.closest('.swiper-slide').remove();
        $self.closest('.ddown--filter-edit').remove();
        $self.closest('.card-filter__sgl').remove();
        var tooltipId = $self.closest('.card-filter__sgl').attr('aria-describedby'),
          $tooltip = $('#' + tooltipId);
        $tooltip.remove();
        AntaresNoty.callNoty('alert', 'Deleted filter', 'lg', 'border');
        self.showAllRowsDT();
        window.antaresEvents.emit('filters.delete');
      }, 300);
    });
  },
  editFilter() {
    var self = this;
    $('.change-filter').off('click');
    $('.change-filter').on('click', function() {
      if ($(this).hasClass('change-filter--number')) {
        var parent = $(this).closest('.filter-content');
        var minInp = parseInt(parent.find('.filter-spinner--min').val(), 10);
        var maxInp = parseInt(parent.find('.filter-spinner--max').val(), 10);
        var dataMin = parseInt(parent.attr('data-type', 'services').attr('data-min'), 10);
        var dataMax = parseInt(parent.attr('data-type', 'services').attr('data-max'), 10);
        if (maxInp > minInp && minInp > dataMin && maxInp < dataMax) {
          self.filterAlertNumber('warning', parent);
          self.editFilterDT(parent);
          var values = [];
          var valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
          var valMax = parseInt(
            parent
              .find('.filter-spinner--max')
              .val()
              .replace('$', '')
              .replace(/,/g, ''),
            10
          );
          values.push(valMin);
          values.push(valMax);
          parent.find('.filter-slider').slider('values', values); // add positions to slider
          var minVal = parent.find('.filter-spinner--min').val();
          var maxVal = parent.find('.filter-spinner--max').val();

          var originTarget = $('.drop-enabled').closest('.antares-dropjs-filter');
          originTarget.find('.card-filter__sgl').attr('data-filter-value', minVal + ' - ' + maxVal);
          originTarget.find('.card-filter__sgl span:last-of-type').text(minVal + ' - ' + maxVal);

          $('.drop').removeClass('drop-enabled');
          $('.drop').removeClass('drop-open');
          $('.drop').removeClass('drop-after-open');
          $('body').removeClass('drop-open');
        } else {
          self.filterAlertNumber('error', parent, minInp, maxInp, dataMin, dataMax);
        }
      } else if ($(this).hasClass('change-filter--badge')) {
        var newSelectStatus = $(this)
          .closest('.slider-box')
          .find('.select2-selection__rendered')
          .attr('title');
        var originTarget = $('.drop-enabled').closest('.antares-dropjs-filter');
        var haveSameStatusFilter = false;
        for (let i = 0; i < $('.filter-type--badge').length; i++) {
          if ($('.filter-type--badge span')[i].textContent === newSelectStatus) {
            haveSameStatusFilter = true;
          }
        }
        if (haveSameStatusFilter === false) {
          originTarget.find('.card-filter__sgl').attr('data-filter-value', newSelectStatus);
          originTarget.find('.card-filter__sgl span:last-of-type').text(newSelectStatus);
          self.filterAlertBadge('warning', newSelectStatus);
          $('.drop').removeClass('drop-enabled');
          $('.drop').removeClass('drop-open');
          $('.drop').removeClass('drop-after-open');
          $('body').removeClass('drop-open');
        } else if (haveSameStatusFilter === true) {
          AntaresNoty.callNoty('alert', 'This filter is already exists', 'lg', 'border');
        }
      } else if ($(this).hasClass('change-filter--date-picker')) {
        let newDate = $(this)
          .closest('.slider-box')
          .find('.comiseo-daterangepicker-triggerbutton')[0].textContent;
        let oldDate = $(this).closest('[data-daterangepicker-text]');
        let allSliderDatePicker = $('.swiper-filters--box [data-type="datePicker"]');
        for (let i = 0; i < allSliderDatePicker.length; i++) {
          let correctTargetText = $(allSliderDatePicker[i]).find('.antares-dropjs-filter--out.drop.drop-target');
          if (correctTargetText.text() === oldDate.attr('data-daterangepicker-text')) {
            correctTargetText.text(newDate);
            oldDate.attr('data-daterangepicker-text', newDate);
          }
        }
        $('.drop').removeClass('drop-enabled');
        $('.drop').removeClass('drop-open');
        $('.drop').removeClass('drop-after-open');
        $('body').removeClass('drop-open');
        AntaresNoty.callNoty('warning', 'Datepicker filter changed', 'lg', 'border');
      }
    });
  },
  filterAlertNumber(category, parent, minInp, maxInp, dataMin, dataMax) {
    if ((minInp === undefined, maxInp === undefined, dataMin === undefined, dataMax === undefined)) {
      minInp = '';
      maxInp = '';
      dataMin = '';
      dataMax = '';
    }
    if (category === 'error') {
      parent.find('.filter-spinner--min').addClass('filter-spinner--validation-error');
      parent.find('.filter-spinner--max').addClass('filter-spinner--validation-error');
      if (maxInp < minInp) {
        AntaresNoty.callNoty('alert', 'maxInp < minInp', 'lg', 'border');
      } else if (minInp < dataMin) {
        AntaresNoty.callNoty('alert', 'minInp < dataMin', 'lg', 'border');
      } else if (maxInp > dataMax) {
        AntaresNoty.callNoty('alert', 'maxInp > dataMax', 'lg', 'border');
      } else if ((minInp === '', maxInp === '', dataMin === '', dataMax === '')) {
        AntaresNoty.callNoty('alert', 'Maximum number of categories', 'lg', 'border');
      }
    } else if (category === 'success') {
      parent.find('.filter-spinner--min').removeClass('filter-spinner--validation-error');
      parent.find('.filter-spinner--max').removeClass('filter-spinner--validation-error');
      AntaresNoty.callNoty('success', 'Filter Added', 'lg', 'border');
    } else if (category === 'warning') {
      parent.find('.filter-spinner--min').removeClass('filter-spinner--validation-error');
      parent.find('.filter-spinner--max').removeClass('filter-spinner--validation-error');
      AntaresNoty.callNoty('warning', 'Filter changed', 'lg', 'border');
    }
  },
  filterAlertBadge(category, selectedStatus) {
    if (selectedStatus === undefined) {
      selectedStatus = '';
    }
    if (category === 'error') {
      AntaresNoty.callNoty('alert', 'Filter "' + selectedStatus + '"' + ' already exists', 'lg', 'border');
    } else if (category === 'warning') {
      AntaresNoty.callNoty('warning', 'Filter changed on "' + selectedStatus + '"', 'lg', 'border');
    } else if (category === 'success') {
      AntaresNoty.callNoty('success', 'Filter "' + selectedStatus + '" Added', 'lg', 'border');
    }
  },
  addFilterDT(parent) {
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      var min = parseInt(parent.find('.filter-spinner--min').val(), 10);
      var max = parseInt(parent.find('.filter-spinner--max').val(), 10);
      var age = parseFloat(data[5]) || 0; // use data for the age column

      if ((isNaN(min) && isNaN(max)) || (isNaN(min) && age <= max) || (min <= age && isNaN(max)) || (min <= age && age <= max)) {
        return true;
      }
      return false;
    });

    var table = $('.billevo-table').DataTable();
    table.draw();
  },
  editFilterDT(parent) {
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      var min = parseInt(parent.find('.filter-spinner--min').val(), 10);
      var max = parseInt(parent.find('.filter-spinner--max').val(), 10);
      var age = parseFloat(data[5]) || 0; // use data for the age column

      if ((isNaN(min) && isNaN(max)) || (isNaN(min) && age <= max) || (min <= age && isNaN(max)) || (min <= age && age <= max)) {
        return true;
      }
      return false;
    });

    var table = $('.billevo-table').DataTable();
    table.draw();
  },
  showAllRowsDT() {
    $.fn.dataTable.ext.search.length = 0; // clean search array
    oTable
      .search('')
      .columns()
      .search('')
      .draw();
  }
};

$(() => {
  window.AntaresDatatablesFilters = AntaresDatatablesFilters;
  AntaresDatatablesFilters.init();
});
