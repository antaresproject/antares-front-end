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

/* global AntaresForms */

const AntaresDatatablesFilters = {

    init() {
        this.values();
        this.addFilter();
        this.closeFilter();
        this.editFilter();
        this.updateDatatables(5);

    },


        // $('.tbl-c .filters .filter-close').on('click', function() {
            
        //     $.fn.dataTable.ext.search.push(

        //         function( settings, data, dataIndex ) {
                    
        //             var min = 0;
        //             var max = 9999;
        //             var age = parseFloat( data[columnIndex] ) || 0;
            
        //             if ( ( isNaN( min ) && isNaN( max ) ) ||
        //                 ( isNaN( min ) && age <= max ) ||
        //                 ( min <= age   && isNaN( max ) ) ||
        //                 ( min <= age   && age <= max ) )
        //             {
        //                 return true;
        //             }
        //             return false;
        //         }
        //     );

        //     window.oTable.draw();

        // });


    updateDatatables(columnIndex) {

        // Event listener to the two range filtering inputs to redraw on input
        $('.tbl-c .filters .add-filter').on('click', function() {

            console.log('asdasd');
            
            $.fn.dataTable.ext.search.push(

                function( settings, data, dataIndex ) {
                    
                    var min = parseInt( $(this).closest('.filters').find('.filter-spinner--min').val(), 10 );
                    var max = parseInt( $(this).closest('.filters').find('.filter-spinner--max').val(), 10 );
                    var age = parseFloat( data[columnIndex] ) || 0;
            
                    if ( ( isNaN( min ) && isNaN( max ) ) ||
                        ( isNaN( min ) && age <= max ) ||
                        ( min <= age   && isNaN( max ) ) ||
                        ( min <= age   && age <= max ) )
                    {
                        return true;
                    }
                    return false;
                }
            );

            window.oTable.draw();

        });

     
    },

    values(){

        $('.filter-spinner-mode-min').spinner({
            start: 0,
            culture: 'en-US',
            step: 1,
            numberFormat: 'C',
            spin: function () {
                var parent = $(this).closest('.ddown__sgl');
                parent.find('.filter-spinner--min').spinner('option', 'min', 0);
                var values = [];
                var valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
                var valMax = parseInt(parent.find('.filter-spinner--max').val().replace('$', '').replace(/,/g, ''), 10);
                if (valMin >= valMax) {
                    valMin = valMax;
                }
                if (valMin < valMax) {
                    valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
                }
                parent.find('.filter-spinner--min').spinner('option', 'max', parent.find('.filter-spinner--max').attr('aria-valuenow'));  // maximum for min spinner
                values.push(valMin);
                values.push(valMax);
                parent.find('.filter-slider').slider('values', values); // add positions to slider
            }
        });
        $('.filter-spinner-mode-max').spinner({
            start: 0,
            culture: 'en-US',
            step: 1,
            numberFormat: 'C',
            spin: function () {                                // IF YOU TOUCH SPINNER
                var parent = $(this).closest('.ddown__sgl');
                parent.find('.filter-spinner--min').spinner('option', 'max', 512);
                var values = [];
                var valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
                var valMax = parseInt(parent.find('.filter-spinner--max').val().replace('$', '').replace(/,/g, ''), 10);
                if (valMin >= valMax) {
                    valMin = valMax;
                }
                if (valMin < valMax) {
                    valMin = parseInt(parent.find('.filter-spinner--min').val(), 10);
                }
                parent.find('.filter-spinner--max').spinner('option', 'min', parent.find('.filter-spinner--min').attr('aria-valuenow'));  // minimum for max spinner
                values.push(valMin);
                values.push(valMax);
                parent.find('.filter-slider').slider('values', values); // add positions to slider
            }
        });
        $('.filter-spinner--min').keypress(function (e) {    //add numbers with help keyboard
            if (e.which == 13) {                     //after press Enter
                var oldInp = $('.filter-spinner--min').attr('aria-valuenow');
                var minInp = parseInt($('.filter-spinner--min').val(), 10);
                var maxInp = parseInt($('.filter-spinner--max').val(), 10);
                if (minInp < maxInp) {
                    $('.filter-slider').slider('values', [minInp, maxInp]);
                    $('.filter-spinner--min').attr('aria-valuenow', minInp);
                    $('.filter-spinner--min').removeClass('filter-spinner--validation-error');
                }
                else {
                    $('.filter-slider').slider('values', [oldInp, maxInp]);
                    $('.filter-spinner--min').addClass('filter-spinner--validation-error');
                }
            }
        }); //add numbers with help keyboard
        $('.filter-spinner--max').keypress(function (e) {   //add numbers with help keyboard
            if (e.which == 13) {                     //after press Enter
                var oldInp = $('.filter-spinner--max').attr('aria-valuenow');
                var minInp = parseInt($('.filter-spinner--min').val(), 10);
                var maxInp = parseInt($('.filter-spinner--max').val(), 10);
                if (maxInp > minInp) {
                    $('.filter-slider').slider('values', [minInp, maxInp]);
                    $('.filter-spinner--max').attr('aria-valuenow', maxInp);
                    $('.filter-spinner--min').removeClass('filter-spinner--validation-error');
                }
                else {
                    $('.filter-slider').slider('values', [minInp, oldInp]);
                    $('.filter-spinner--min').addClass('filter-spinner--validation-error');
                }
            }
        });


        var slider = $('[data-slider]'),
            rangeSlider = $('[data-slider-range-filter]');

        slider.slider({
            slide: function (event, ui) {
                if ($(this).siblings('.slider-val').length) {
                    $(this).siblings('.slider-val').val(ui.value);
                    $(this).siblings('.slider-val').valid();
                }
            }
        });

        rangeSlider.slider({
            create: function () {
                var parent = $(this).closest('.ddown__sgl');
                parent.find('.filter-slider').slider('values', [parent.find('.filter-spinner--min').attr('aria-valuenow'), parent.find('.filter-spinner--max').attr('aria-valuenow')]);// add positions to slider
            },
            range: true,
            min: 0,
            max: 512,
            slide: function (event, ui) {                               // IF YOU TOUCH SLIDER
                var parent = $(this).closest('.ddown__sgl');
                parent.find('.filter-spinner--min').spinner('value', ui.values[0]);  //add positions to spinner
                parent.find('.filter-spinner--max').spinner('value', ui.values[1]);  //add positions to spinner
                parent.find('.filter-spinner--max').spinner('option', 'min', parent.find('.filter-spinner--min').attr('aria-valuenow'));
                parent.find('.filter-spinner--min').spinner('option', 'max', parent.find('.filter-spinner--max').attr('aria-valuenow'));
            }
        });
    },
    addFilter(){

        var self = this;
        function addTemplate(minVal,maxVal) {

            $('.card-filter').append('' +
                '<div class="ddown ddown--filter-edit ddown--left mr24">'+
                '<div data-filter-type="ammount" data-filter-value="$' + minVal + ' - $' + maxVal + '" class="card-filter__sgl ddown__init" data-tooltip-inline="Filter #2"> '+
                '<span>$' + minVal + ' - $' + maxVal + '</span> <i class="zmdi zmdi-close filter-close"></i>'+
                '</div>'+
                '<div class="ddown__content">'+
                '<div class="ddown__arrow"></div>'+
                '<ul class="ddown__menu">'+
                '<li class="ddown__label"><span>Filter By</span></li>'+
                '<li class="ddown__sgl ddown__sgl--range">'+
                '<div class="filter-slider ui-slider--minimal" data-slider-range-filter="true"></div>'+
                '<div class="form-block ff-rnw mb0">'+
                '<div class="spinner-basic">'+
                '<input class="filter-spinner filter-spinner-mode-min filter-spinner--min" value="' + minVal + '"  data-spinner="true" name="value">'+
                '</div>'+
                '<span class="ml16 mr16"> - </span>'+
                '<div class="spinner-basic">'+
                '<input class="filter-spinner filter-spinner-mode-max filter-spinner--max" value="' + maxVal + '"  data-spinner="true" name="value2">'+
                '</div>'+
                '</div>'+
                '<a href="#" class="btn btn--uppercase btn--md btn--default mdl-js-button mdl-js-ripple-effect add-filter">Confirm</a>'+
                '</li>'+
                '</ul>'+
                '</div>'+
                '</div>'
            );
        }
        $('.ddown-multi .add-filter').on('click', function () {

            var filterContainer = $(this).closest('.filters').find('.card-filter');

            var parent = $(this).closest('.ddown__sgl'),
                minVal = parent.find('.filter-spinner--min').val(),
                maxVal = parent.find('.filter-spinner--max').val();

            var typeAmmount = addTemplate(minVal,maxVal);

            filterContainer.prepend(typeAmmount);
            self.values();
            self.editFilter();
            AntaresForms.elements.tooltip();
            $(this).closest('.ddown__content').find('.ddown-multi__submenu').hide();
        });
    },
    closeFilter(){
        $('.card-filter ').on('click', '.filter-close', function (e) {
            e.stopPropagation();
            var $self = $(this);
            $(this).closest('.card-filter__sgl').addClass('animated fadeOutRight');
            setTimeout(function () {
                $self.closest('.ddown--filter-edit').remove();
                $self.closest('.card-filter__sgl').remove();
                var tooltipId = $self.closest('.card-filter__sgl').attr('aria-describedby'),
                    $tooltip = $('#' + tooltipId);
                $tooltip.remove();
            }, 300);
        });
    },
    editFilter(){
        var self = this;
        $('.ddown-multi__init').on('click', function () {
            $('.ddown').removeClass('ddown--open');
            $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
        });

        $('.ddown--filter-edit').on('click', function () {
            $('.ddown').removeClass('ddown-multi--open ddown--open');
            $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
        });

        $('.ddown--filter-edit .ddown__menu').on('click', function (e) {
            e.stopPropagation();
        });

        $('.card-filter').find('.add-filter').on('click', function () {
            var minVal = $(this).closest('.ddown__sgl').find('.filter-spinner--min').val();
            var maxVal = $(this).closest('.ddown__sgl').find('.filter-spinner--max').val();
            $(this).closest('.ddown').find('.card-filter__sgl').attr('data-filter-value', '$' + minVal + ' - $' + maxVal);
            $(this).closest('.ddown').find('.card-filter__sgl span').text('$' + minVal + ' - $' + maxVal);
            $(this).closest('.ddown').removeClass('ddown--open');
        });
        self.values();
    },
};

$(function () {
    window.AntaresDatatablesFilters = AntaresDatatablesFilters;
    AntaresDatatablesFilters.init();
});
