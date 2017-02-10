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
 * @package    Antares Front-end
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/


 //
 // Comments Component
 //

 (function() {

     $(function() {

         values();
         addFilter();
         closeFilter();
         editFilter();

     });

     function values() {

         $('.filter-spinner').spinner({
             min: 0,
             max: 3000,
             start: 0,
             culture: "en-US",
             step: 1,
             numberFormat: "C",
             spin: function(event, ui) {

                 //in menu

                 var parent = $(this).closest('.ddown__sgl');
                 var values = [];
                 var valMin = parseInt(parent.find('.filter-spinner--min').val().replace("$", "").replace(/,/g, ''), 10);
                 var valMax = parseInt(parent.find('.filter-spinner--max').val().replace("$", "").replace(/,/g, ''), 10);
                 values.push(valMin);
                 values.push(valMax);
                 // console.log(values);
                 parent.find('.filter-slider').slider("values", values);

             }
         });

         var slider = $('[data-slider]'),
             rangeSlider = $('[data-slider-range]');

         slider.slider({
             slide: function(event, ui) {

                 //if validation - must contain sibling input
                 if ($(this).siblings('.slider-val').length) {
                     $(this).siblings('.slider-val').val(ui.value);
                     $(this).siblings('.slider-val').valid();
                 }
             }

         });

         rangeSlider.slider({
             range: true,
             min: 0,
             max: 3000,
             values: [151, 1241],
             slide: function(event, ui) {

                 ///in menu
                 var parent = $(this).closest('.ddown__sgl ');
                 parent.find(".filter-spinner--min").spinner("value", ui.values[0]);
                 parent.find(".filter-spinner--max").spinner("value", ui.values[1]);

             }
         });

         // $('.filter-date').daterangepicker({
         //     open: function() {
         //         $('.ddown').removeClass('ddown-multi--open ddown--open');
         //         $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
         //     },

         //     change: function(event, data) {



         //         //get dates
         //         var timeRange = $(this).daterangepicker("getRange");
         //         var startDate = timeRange.start;
         //         var endDate = timeRange.end;
         //         var startDateString = JSON.stringify(startDate).slice(0, JSON.stringify(startDate).indexOf("T"));
         //         var startDateFormat = startDateString.replace(/['"]+/g, '');
         //         var endDateString = JSON.stringify(endDate).slice(0, JSON.stringify(endDate).indexOf("T"));
         //         var endDateFormat = endDateString.replace(/['"]+/g, '');

         //         console.log(startDateFormat);
         //         console.log(endDateFormat);

         //         //update tag html
         //         if ($(this).closest('.card-filter').length) {

         //             $(this).prev('[data-filter-type="date"]').attr('data-filter-value', startDateFormat + ' - ' + endDateFormat);
         //             $(this).prev('[data-filter-type="date"]').find('span').text(startDateFormat + ' - ' + endDateFormat);

         //         }

         //         //add new tag
         //         if ($(this).closest('.ddown-multi').length) {

         //             var $self = $(this);

         //             setTimeout(function() {
         //                 //consistent placeholder
         //                 $self.next('button').find('.ui-button-text').html('Date');
         //             }, 500);


         //             var typeDateRange = "";
         //             typeDateRange += "<div data-filter-type=\"date\" data-filter-value=\"" + startDateFormat + ' - ' + endDateFormat + "\" class=\"card-filter__sgl ddown__init mr24\" data-tooltip-inline=\"Filter #2\"><span>" + startDateFormat + ' - ' + endDateFormat + "<\/span> <i class=\"zmdi zmdi-close filter-close\"><\/i><\/div>";
         //             typeDateRange += "<div class=\"is-hidden filter-date\"><\/div>";

         //             var filterContainer = $(this).closest('.card-ctrls').find('.card-filter');

         //             filterContainer.prepend(typeDateRange);
         //             values();
         //             editFilter();

         //         }

         //     },

         //     initialText: 'Date', // placeholder text - shown when nothing is selected
         //     datepickerOptions: {
         //         altFormat: 'yyyy-mm-dd',
         //         dateFormat: 'yyyy-mm-dd',
         //         numberOfMonths: 2,
         //         mirrorOnCollision: false,
         //         presetRanges: [{
         //             text: 'Today',
         //             dateStart: function() {
         //                 return moment()
         //             },
         //             dateEnd: function() {
         //                 return moment()
         //             }
         //         }, {
         //             text: 'Yesterday',
         //             dateStart: function() {
         //                 return moment().subtract('days', 1)
         //             },
         //             dateEnd: function() {
         //                 return moment().subtract('days', 1)
         //             }
         //         }, {
         //             text: 'Last 7 Days',
         //             dateStart: function() {
         //                 return moment().subtract('days', 6)
         //             },
         //             dateEnd: function() {
         //                 return moment()
         //             }
         //         }, {
         //             text: 'Last Week (Mo-Su)',
         //             dateStart: function() {
         //                 return moment().subtract('days', 7).isoWeekday(1)
         //             },
         //             dateEnd: function() {
         //                 return moment().subtract('days', 7).isoWeekday(7)
         //             }
         //         }, {
         //             text: 'Month to Date',
         //             dateStart: function() {
         //                 return moment().startOf('month')
         //             },
         //             dateEnd: function() {
         //                 return moment()
         //             }
         //         }, {
         //             text: 'Previous Month',
         //             dateStart: function() {
         //                 return moment().subtract('month', 1).startOf('month')
         //             },
         //             dateEnd: function() {
         //                 return moment().subtract('month', 1).endOf('month')
         //             }
         //         }, {
         //             text: 'Year to Date',
         //             dateStart: function() {
         //                 return moment().startOf('year')
         //             },
         //             dateEnd: function() {
         //                 return moment()
         //             }
         //         }],
         //         verticalOffset: 0,
         //     }
         // });

         //display dropdown on edit action

     }

     function addFilter() {

         //inisde add menu
         $('.ddown-multi .add-filter').on('click', function() {

             var filterContainer = $(this).closest('.card-ctrls').find('.card-filter');

             var parent = $(this).closest('.ddown__sgl '),
                 minVal = parent.find('.filter-spinner--min').val(),
                 maxVal = parent.find('.filter-spinner--max').val();

             var typeAmmount = "";
             typeAmmount += "<div class=\"ddown ddown--filter-edit ddown--left mr24\">";
             typeAmmount += "<div data-filter-type=\"ammount\" data-filter-value=\"" + minVal + ' - ' + maxVal + "\" class=\"card-filter__sgl ddown__init\" data-tooltip-inline=\"Filter #2\"><span>" + minVal + ' - ' + maxVal + "<\/span> <i class=\"zmdi zmdi-close filter-close\"><\/i><\/div>";
             typeAmmount += "<div class=\"ddown__content\">";
             typeAmmount += "<div class=\"ddown__arrow\"><\/div>";
             typeAmmount += "<ul class=\"ddown__menu\">";
             typeAmmount += "<li class=\"ddown__label\"><span>Filter By<\/span><\/li>";
             typeAmmount += "<li class=\"ddown__sgl ddown__sgl--range\">";
             typeAmmount += "<div class=\"filter-slider ui-slider--minimal\" data-slider-range=\"true\"><\/div>";
             typeAmmount += "<div class=\"form-block ff-rnw mb0\">";
             typeAmmount += "<div class=\"spinner-basic\">";
             typeAmmount += "<input class=\"filter-spinner filter-spinner--min\" value=\"151\" data-spinner=\"true\" name=\"value\">";
             typeAmmount += "<\/div>";
             typeAmmount += "<span class=\"ml16 mr16\"> - <\/span>";
             typeAmmount += "<div class=\"spinner-basic\">";
             typeAmmount += "<input class=\"filter-spinner filter-spinner--max\" value=\"1241\" data-spinner=\"true\" name=\"value2\">";
             typeAmmount += "<\/div>";
             typeAmmount += "<\/div>";
             typeAmmount += "<a href=\"#\" class=\"btn btn--uppercase btn--md btn--default mdl-js-button mdl-js-ripple-effect add-filter\">Confirm<\/a>";
             typeAmmount += "<\/li>";
             typeAmmount += "<\/ul>";
             typeAmmount += "<\/div>";
             typeAmmount += "<\/div>";

             filterContainer.prepend(typeAmmount);
             //reattach plugins
             // AntaresForms.elements.rangeSlider();
             // AntaresForms.elements.spinner();
             //reattach mechanics
             values();
             editFilter();
             AntaresForms.elements.tooltip();
             //close
             $(this).closest('.ddown__content').find('.ddown-multi__submenu').hide();

         });
     }

     function closeFilter() {

         $('.card-filter ').on('click', '.filter-close', function(e) {

             e.stopPropagation();

             var $self = $(this);

             $(this).closest('.card-filter__sgl').addClass('animated fadeOutRight');
             
             setTimeout(function() {

                 $self.closest('.ddown--filter-edit').remove();
                 $self.closest('.card-filter__sgl').remove();
                 var tooltipId = $self.closest('.card-filter__sgl').attr('aria-describedby'),
                 $tooltip = $('#'+tooltipId);
                 $tooltip.remove();

             }, 300);

         });

     }

     function editFilter() {
         $('.ddown-multi__init').on('click', function() {
             //close others
             $('.ddown').removeClass('ddown--open');
             $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
         });


         $('.ddown--filter-edit').on('click', function() {
             //close others
             $('.ddown').removeClass('ddown-multi--open ddown--open');
             $('.ddown .ddown__content').find('.ddown-multi__submenu').hide();
         });

         $('.ddown--filter-edit .ddown__menu').on('click', function(e) {
             e.stopPropagation();
         });

         $('.card-filter').find('.add-filter').on('click', function() {

             minVal = $(this).closest('.ddown__sgl').find('.filter-spinner--min').val();
             maxVal = $(this).closest('.ddown__sgl').find('.filter-spinner--max').val();
             // console.log(minVal);
             // console.log(maxVal);
             //update value after edit!
             $(this).closest('.ddown').find('.card-filter__sgl').attr('data-filter-value', minVal + ' - ' + maxVal);
             $(this).closest('.ddown').find('.card-filter__sgl span').text(minVal + ' - ' + maxVal);

             // close
             $(this).closest('.ddown').removeClass('ddown--open');

         });


         // //edit daterange
         // $('.card-filter [data-filter-type="date"]').on('click', function() {

         //     $(this).closest('.card-filter').find('.comiseo-daterangepicker-triggerbutton').show();
         //     $(this).siblings('.comiseo-daterangepicker-triggerbutton').trigger('click');
         //     $(this).closest('.card-filter').find('.comiseo-daterangepicker-triggerbutton').hide();
         // });


         //edit daterange

         //edit daterange
         // $('.card-filter').on('click', '[data-filter-type="date"]', function() {


         //     $(this).next('.filter-date').next('.comiseo-daterangepicker-triggerbutton').show();
         //     $(this).next('.filter-date').next('.comiseo-daterangepicker-triggerbutton').trigger('click');
         //     $(this).next('.filter-date').next('.comiseo-daterangepicker-triggerbutton').hide();
         // });
         values();
     }

 }).call(this);
