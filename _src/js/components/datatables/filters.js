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

const AntaresDatatablesFilters = {
  init() {
    this.values();
    this.addFilter();
    this.closeFilter();
    this.editFilter();
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
        var parent = $(this).closest('.ddown__sgl');
        parent
          .find('.filter-spinner--min')
          .spinner(
            'option',
            'max',
            parent.find('.filter-spinner--max').attr('aria-valuenow')
          ); // maximum for min spinner
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
        var parent = $(this).closest('.ddown__sgl');
        parent
          .find('.filter-spinner--max')
          .spinner(
            'option',
            'min',
            parent.find('.filter-spinner--min').attr('aria-valuenow')
          ); // minimum for max spinner
        spinnerToSlider(parent);
      }
    });

    var slider = $('[data-slider]'),
      rangeSlider = $('[data-slider-range-filter]');

    slider.slider({
      // one dot
      slide: function(event, ui) {
        if ($(this).siblings('.slider-val').length) {
          $(this).siblings('.slider-val').val(ui.value);
          $(this).siblings('.slider-val').valid();
        }
      }
    });

    rangeSlider.slider({
      //two dot
      create: function() {
        var parent = $(this).closest('.ddown__sgl');

        var grandParent = $(this).closest('.ddown__content');
        var dataName = grandParent.attr('data-name');
        var dataMin = parseInt(
          grandParent.attr('data-name', dataName).attr('data-min'),
          10
        );
        var dataMax = parseInt(
          grandParent.attr('data-name', dataName).attr('data-max'),
          10
        );
        parent.find('.filter-slider').slider('option', 'min', dataMin);
        parent.find('.filter-slider').slider('option', 'max', dataMax);

        parent
          .find('.filter-slider')
          .slider('values', [
            parent.find('.filter-spinner--min').attr('aria-valuenow'),
            parent.find('.filter-spinner--max').attr('aria-valuenow')
          ]); // add positions to slider
      },
      range: true,
      slide: function(event, ui) {
        // IF YOU TOUCH SLIDER
        var parent = $(this).closest('.ddown__sgl');
        parent.find('.filter-spinner--min').spinner('value', ui.values[0]); //add positions to spinner
        parent.find('.filter-spinner--max').spinner('value', ui.values[1]); //add positions to spinner
        parent
          .find('.filter-spinner--max')
          .spinner(
            'option',
            'min',
            parent.find('.filter-spinner--min').attr('aria-valuenow')
          );
        parent
          .find('.filter-spinner--min')
          .spinner(
            'option',
            'max',
            parent.find('.filter-spinner--max').attr('aria-valuenow')
          );
      }
    });
  },

  addFilter() {
    var self = this;

    function addTemplate(minVal, maxVal, dataMin, dataMax) {
      $('.card-filter').append(
        '' +
          '<div class="filter">' +
          '<div class="ddown ddown--filter-edit ddown--left mr24">' +
          '<div data-filter-type="ammount" data-filter-value="$' +
          minVal +
          ' - $' +
          maxVal +
          '" class="card-filter__sgl ddown__init" data-tooltip-inline="Filter #2"> ' +
          '<span>$' +
          minVal +
          ' - $' +
          maxVal +
          '</span> <i class="zmdi zmdi-close filter-close"></i>' +
          '</div>' +
          '<div class="ddown__content" data-name="services" data-min="' +
          dataMin +
          '" data-max="' +
          dataMax +
          '">' +
          '<div class="ddown__arrow"></div>' +
          '<ul class="ddown__menu">' +
          '<li class="ddown__label"><span>Filter By</span></li>' +
          '<li class="ddown__sgl ddown__sgl--range">' +
          '<div class="filter-slider ui-slider--minimal" data-slider-range-filter="true"></div>' +
          '<div class="form-block ff-rnw mb0">' +
          '<div class="spinner-basic">' +
          '<input class="filter-spinner filter-spinner-mode-min filter-spinner--min" type="number" value="' +
          minVal +
          '"  data-spinner="true" name="value">' +
          '</div>' +
          '<span class="ml16 mr16"> - </span>' +
          '<div class="spinner-basic">' +
          '<input class="filter-spinner filter-spinner-mode-max filter-spinner--max" type="number" value="' +
          maxVal +
          '"  data-spinner="true" name="value2">' +
          '</div>' +
          '</div>' +
          '<a href="#" class="btn btn--uppercase btn--md btn--default mdl-js-button mdl-js-ripple-effect add-filter">Confirm</a>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</div>' +
          '</div>'
      );
    }

    $('.ddown-multi .add-filter').on('click', function() {
      // temp - only 1
      if ($('.card-filter .ddown--filter-edit').length > 0) {
        window.noty(
          $.extend({}, APP.noti.warningFM('lg', 'border'), {
            text: 'Filter Already in Use'
          })
        );
        return false;
      }

      var parent = $(this).closest('.ddown__sgl');
      var minInp = parseInt(parent.find('.filter-spinner--min').val(), 10);
      var maxInp = parseInt(parent.find('.filter-spinner--max').val(), 10);

      var grandParent = $(this).closest('.ddown__content');
      var dataName = grandParent.attr('data-name');
      var dataMin = parseInt(
        grandParent.attr('data-name', dataName).attr('data-min'),
        10
      );
      var dataMax = parseInt(
        grandParent.attr('data-name', dataName).attr('data-max'),
        10
      );

      if (maxInp > minInp && minInp >= dataMin && maxInp <= dataMax) {
        self.filterAlert('success', parent);
        var filterContainer = $(this).closest('.filters').find('.card-filter');
        var parent = $(this).closest('.ddown__sgl'),
          minVal = parent.find('.filter-spinner--min').val(),
          maxVal = parent.find('.filter-spinner--max').val();
        var typeAmmount = addTemplate(minVal, maxVal, dataMin, dataMax);
        filterContainer.prepend(typeAmmount);
        self.values();
        self.editFilter();
        AntaresForms.elements.tooltip();
        $(this).closest('.ddown__content').find('.ddown-multi__submenu').hide();
        $('.ddown').off('mousedown mouseup'); // for restart mouesedown filters scroll
        AntaresForms.elements.scrollCloseDropdowns();
      } else {
        self.filterAlert('error', parent, minInp, maxInp, dataMin, dataMax);
      }
    });
  },
  closeFilter() {
    var self = this;
    $('.card-filter').on('click', '.filter-close', function(e) {
      e.stopPropagation();
      var $self = $(this);
      $(this).closest('.card-filter__sgl').addClass('animated fadeOutRight');
      setTimeout(function() {
        $self.closest('.ddown--filter-edit').remove();
        $self.closest('.card-filter__sgl').remove();
        var tooltipId = $self
            .closest('.card-filter__sgl')
            .attr('aria-describedby'),
          $tooltip = $('#' + tooltipId);
        $tooltip.remove();
        window.noty(
          $.extend({}, APP.noti.errorFM('lg', 'border'), {
            text: 'Deleted filter'
          })
        );
        self.showAllRowsDT();
      }, 300);
    });
  },
  editFilter() {
    var self = this;

    $('.ddown-multi__init').on('click', function() {
      $('.ddown').removeClass('ddown--open');
      $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
    });

    $('.ddown--filter-edit').on('click', function() {
      $('.ddown').removeClass('ddown-multi--open ddown--open');
      $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
    });

    $('.ddown--filter-edit .ddown__menu').on('click', function(e) {
      e.stopPropagation();
    });

    $('.card-filter').find('.add-filter').on('click', function() {
      if ($('.ddown--filter-edit').hasClass('ddown--open')) {
        var parent = $(this).closest('.ddown__sgl');
        var minInp = parseInt(parent.find('.filter-spinner--min').val(), 10);
        var maxInp = parseInt(parent.find('.filter-spinner--max').val(), 10);
        var grandParent = $(this).closest('.ddown__content');
        var dataMin = parseInt(
          grandParent.attr('data-name', 'services').attr('data-min'),
          10
        );
        var dataMax = parseInt(
          grandParent.attr('data-name', 'services').attr('data-max'),
          10
        );
        if (maxInp > minInp && minInp > dataMin && maxInp < dataMax) {
          self.filterAlert('warning', parent);

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

          var minVal = $(this)
            .closest('.ddown__sgl')
            .find('.filter-spinner--min')
            .val();
          var maxVal = $(this)
            .closest('.ddown__sgl')
            .find('.filter-spinner--max')
            .val();
          $(this)
            .closest('.ddown')
            .find('.card-filter__sgl')
            .attr('data-filter-value', '$' + minVal + ' - $' + maxVal);
          $(this)
            .closest('.ddown')
            .find('.card-filter__sgl span')
            .text('$' + minVal + ' - $' + maxVal);
          $(this).closest('.ddown').removeClass('ddown--open');
        } else {
          self.filterAlert('error', parent, minInp, maxInp, dataMin, dataMax);
        }
      }
    });

    self.values();
  },
  filterAlert(category, parent, minInp, maxInp, dataMin, dataMax) {
    if (
      (
        minInp === undefined,
        maxInp === undefined,
        dataMin === undefined,
        dataMax === undefined
      )
    ) {
      minInp = '';
      maxInp = '';
      dataMin = '';
      dataMax = '';
    }
    if (category === 'error') {
      parent
        .find('.filter-spinner--min')
        .addClass('filter-spinner--validation-error');
      parent
        .find('.filter-spinner--max')
        .addClass('filter-spinner--validation-error');
      if (maxInp < minInp) {
        window.noty(
          $.extend({}, APP.noti.errorFM('lg', 'border'), {
            text: 'maxInp < minInp'
          })
        );
      } else if (minInp < dataMin) {
        window.noty(
          $.extend({}, APP.noti.errorFM('lg', 'border'), {
            text: 'minInp < dataMin'
          })
        );
      } else if (maxInp > dataMax) {
        window.noty(
          $.extend({}, APP.noti.errorFM('lg', 'border'), {
            text: 'maxInp > dataMax'
          })
        );
      }
    } else if (category === 'success') {
      parent
        .find('.filter-spinner--min')
        .removeClass('filter-spinner--validation-error');
      parent
        .find('.filter-spinner--max')
        .removeClass('filter-spinner--validation-error');
      window.noty(
        $.extend({}, APP.noti.successFM('lg', 'border'), {
          text: 'Filter Added'
        })
      );

      this.addFilterDT();
    } else if (category === 'warning') {
      parent
        .find('.filter-spinner--min')
        .removeClass('filter-spinner--validation-error');
      parent
        .find('.filter-spinner--max')
        .removeClass('filter-spinner--validation-error');
      window.noty(
        $.extend({}, APP.noti.warningFM('lg', 'border'), {
          text: 'Filter changed'
        })
      );

      var newMin = parent.find('.filter-spinner--min');
      var newmax = parent.find('.filter-spinner--max');

      this.editFilterDT(newMin, newmax);
    }
  },
  addFilterDT() {
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      var min = parseInt($('.tbl-c .filters .filter-spinner--min').val(), 10);
      var max = parseInt($('.tbl-c .filters .filter-spinner--max').val(), 10);
      var age = parseFloat(data[5]) || 0; // use data for the age column

      if (
        (isNaN(min) && isNaN(max)) ||
        (isNaN(min) && age <= max) ||
        (min <= age && isNaN(max)) ||
        (min <= age && age <= max)
      ) {
        return true;
      }
      return false;
    });

    var table = $('.billevo-table').DataTable();
    table.draw();
  },
  editFilterDT(min, max) {
    // $.fn.dataTable.ext.search.length = 0; // clean search array
    $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
      var age = parseFloat(data[5]) || 0; // use data for the age column
      if (
        (isNaN(min) && isNaN(max)) ||
        (isNaN(min) && age <= max) ||
        (min <= age && isNaN(max)) ||
        (min <= age && age <= max)
      ) {
        return true;
      }
      return false;
    });

    var table = $('.billevo-table').DataTable();
    table.draw();
  },
  showAllRowsDT() {
    $.fn.dataTable.ext.search.length = 0; // clean search array
    oTable.search('').columns().search('').draw();
  }
};
$(function() {
  window.AntaresDatatablesFilters = AntaresDatatablesFilters;
  AntaresDatatablesFilters.init();
});
// var values = [];

// oTable
//   .column([5])
//   .data()
//   .flatten()
//   .filter(function(val, index) {
//     val > 220 ? values.push(val) : false;
//     return val > 220 ? true : false;
//   })
//   .draw();
// regExSearch = '^\\s' + values[0] +'\\s*$';
// oTable.column(5).search(regExSearch, true, false).draw();

// oTable.column([5]).data().flatten().search(values);
