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
        this.filtersSwiper();
        // this.randomNumbers();
    },
    randomNumbers() {
        $('.ddown-multi .btn--dropdown').click(() => {
            var r1;
            var r2;
            $('.ddown-multi .ddown__content .ddown__sgl .slider-box').html('WORK RANDOMIZER (randomNumbers())');
            function randomNumberFilter() {
                r1 = Math.floor(Math.random() * 460 + 15);
                r2 = Math.floor(Math.random() * 460 + 15);
            }

            randomNumberFilter();
            if (r1 > r2) {
                randomNumberFilter();
            } else {
                $('.ddown-multi .filter-spinner--min').val(r1);
                $('.ddown-multi .filter-spinner--max').val(r2);
                randomNumberFilter();
            }
        });
    },
    filtersSwiper() {
        var mySwiper = undefined;
        var slidesOnPage = 4;

        mySwiper = new Swiper('.swiper-filters', {
            slidesPerView: slidesOnPage,
            nextButton: '.swiper-filters-next',
            prevButton: '.swiper-filters-prev',
            freeMode: true
        });
        enquire.register('screen and (max-width: 767px)', {
            match: function () {
                slidesOnPage = 2;
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        enquire.register('screen and (min-width: 768px) and (max-width: 1023px)', {
            match: function () {
                slidesOnPage = 4;
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        enquire.register('screen and (min-width: 1024px) and (max-width: 1199px)', {
            match: function () {
                slidesOnPage = 6;
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        enquire.register('screen and (min-width: 1200px) and (max-width: 1350px)', {
            match: function () {
                slidesOnPage = 8;
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        enquire.register('screen and (min-width: 1351px) and (max-width: 1499px)', {
            match: function () {
                let gsWidth = $('.card-datatables')
                    .closest('.grid-stack-item')
                    .attr('data-gs-width');
                if (gsWidth >= 12 && gsWidth <= 20) {
                    slidesOnPage = 6;
                } else {
                    slidesOnPage = 3;
                }
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        enquire.register('screen and (min-width: 1500px)', {
            match: function () {
                let gsWidth = $('.card-datatables')
                    .closest('.grid-stack-item')
                    .attr('data-gs-width');
                if (gsWidth >= 12 && gsWidth <= 17) {
                    slidesOnPage = 6;
                } else {
                    slidesOnPage = 3;
                }
                mySwiper.params.slidesPerView = slidesOnPage;
            }
        });
        function updateCountSwiperSliders(passedSlidesOnPage) {
            var slideWidth = $('.swiper-slide .drop-target').width();
            var slideRealWidth = $('.filters .swiper-slide').width();
            var freeSpaceInSlide = slideRealWidth - slideWidth;

            if (freeSpaceInSlide > slideWidth) {
                slidesOnPage = passedSlidesOnPage + 1;
                mySwiper.params.slidesPerView = slidesOnPage;
            } else if (freeSpaceInSlide + slideWidth < slideWidth) {
                slidesOnPage = passedSlidesOnPage - 1;
                mySwiper.params.slidesPerView = slidesOnPage;
            } else if (freeSpaceInSlide < slideWidth) {
                if (freeSpaceInSlide + slideWidth - 20 < slideWidth) {
                    slidesOnPage = passedSlidesOnPage - 1;
                    mySwiper.params.slidesPerView = slidesOnPage;
                }
            }

            if ($('.swiper-filters--box .swiper-slide').length > slidesOnPage) {
                if (typeof mySwiper.unlockSwipes === 'function') {
                    mySwiper.unlockSwipes();
                    $('.swiper-filters--box').removeClass('swiper-filters--no-active');
                }
            } else {
                if (typeof mySwiper.lockSwipes === 'function') {
                    mySwiper.lockSwipes();
                    $('.swiper-filters--box').addClass('swiper-filters--no-active');
                }
            }
        }

        function activateSwiper() {
            function updateSwiper(status) {
                if (status === true) {


                    if (typeof mySwiper.update === 'function') {
                        mySwiper.update();
                    }

                    $('.swiper-filters--box .filter-close').on('click', function () {
                        // when delete filter
                        setTimeout(function () {
                            updateSwiper(false);
                            updateSwiper(true);
                            $('.filters .swiper-wrapper').css('transform', 'translate3d(0px, 0px, 0px)');
                        }, 400);
                        $('.antares-dropjs-filter--out').removeClass('drop-enabled drop-open');
                        $('.antares-dropjs-filter').removeClass('drop-enabled');
                        setTimeout(function () {
                            if ($('.swiper-filters--box .swiper-wrapper').children().length > 0) {
                                $('.tab-search--filter').removeClass('swiper--no-slides');
                            } else {
                                $('.tab-search--filter').addClass('swiper--no-slides');
                                $('.tbl-c').adjustCardHeight();

                            }
                        }, 500);
                        updateCountSwiperSliders(slidesOnPage);

                    });

                    enquire.register('screen and (max-width: 767px)', {
                        //mobile readonly for multiple
                        match: function () {
                        },
                        unmatch: function () {
                            $('.drop-target').off('click');
                        }
                    });
                    enquire.register('screen and (min-width: 768px)', {
                        //mobile readonly for multiple
                        match: function () {
                            setTimeout(function () {
                                $('.drop-target').on('click', function () {
                                    let openDrop = $('.antares-dropjs-filter--out.drop-element.drop-enabled');
                                    let leftForDrop = openDrop.offset().left;
                                    if (leftForDrop > 30) {
                                        openDrop.removeClass('drop-open--right');
                                    } else {
                                        openDrop.removeClass('drop-open--right');
                                        openDrop.addClass('drop-open--right');
                                    }
                                });
                            }, 500);
                        },
                        unmatch: function () {
                            $('.drop-target').off('click');
                            $('.antares-dropjs-filter--out.drop-element').removeClass('drop-open--right');
                        }
                    });
                } else {
                    $('.swiper-slide').off('click');
                    $('.swiper-filters--box .filter-close').off('click');
                    $('.drop-target').off('click');
                }
            }

            $('#widgets-edit').on('click', e => {
                e.preventDefault();
                if ($('.app-content').hasClass('app-content--widgets-movable')) {
                    setTimeout(function () {
                        updateCountSwiperSliders(slidesOnPage);
                        updateSwiper(false);
                        updateSwiper(true);
                    }, 100);
                } else {
                    setTimeout(function () {
                        updateCountSwiperSliders(slidesOnPage);
                        updateSwiper(false);
                        updateSwiper(true);
                    }, 100);
                }
            }); //update after resize gridstack

            function cancelSelectMode() {
                let containerTbody = $('.dataTables_wrapper tbody');
                let parentTblc = containerTbody.closest('.tbl-c')
                parentTblc.find('tr').removeClass('is-selected');
                parentTblc.find('#table-ma').attr('disabled', true);
                parentTblc.find('#table-ma span').html('0 Items Selected');
                parentTblc.removeClass('selected-mode--active');
                parentTblc.removeClass('selected-mode--touch-active');
                parentTblc.find('table tbody tr td').removeClass('no-arrow');
                parentTblc.find('.btn-with-selected').removeClass('display-flex');
            }

            $('.card-bar__close').on('click', e => {
                setTimeout(function () {
                    updateCountSwiperSliders(slidesOnPage);
                    updateSwiper(false);
                    updateSwiper(true);
                }, 100);
                cancelSelectMode()
            }); //update after resize gridstack

            $('.filters .btn-filter--clear-all').click(function () {
                setTimeout(function () {
                    updateSwiper(false);
                    updateSwiper(true);
                }, 200);
                cancelSelectMode()
            });
            $('.swiper-filters--box + .ddown .ddown__sgl .add-filter').on('click', function () {
                // when add filter
                updateCountSwiperSliders(slidesOnPage);
                updateSwiper(false);
                updateSwiper(true);
                setTimeout(function () {
                    if ($('.swiper-filters--box .swiper-wrapper').children().length > 0) {
                        $('.tab-search--filter').removeClass('swiper--no-slides');
                        $('.filters .swiper-wrapper').css('transform', 'translate3d(0px, 0px, 0px)');
                    } else {
                        $('.tab-search--filter').addClass('swiper--no-slides');
                        $('.tbl-c').adjustCardHeight();

                    }
                }, 300);
                cancelSelectMode()
            });

            updateSwiper(true);
        }

        activateSwiper(true);

        $('.swiper-filters--box:not(.swiper-filters--no-active)')
            .closest('.card')
            .mousedown(function () {
                $('.swiper-filters--box:not(.swiper-filters--no-active)').addClass('mouse-hand--grab');
            })
            .mouseup(function () {
                $('.swiper-filters--box:not(.swiper-filters--no-active)').removeClass('mouse-hand--grab');
            });
        $(window).resize(
            _.debounce(function () {
                updateCountSwiperSliders(slidesOnPage);
                if (typeof mySwiper.update === 'function') {
                    mySwiper.update();
                }
            }, 300)
        );
    },
    dropCgf: {
        position: 'bottom right',
        openOn: 'click',
        constrainToWindow: true,
        constrainToScrollParent: false,
        classes: 'antares-dropjs-filter--out drop',
        hoverOpenDelay: 0,
        hoverCloseDelay: 50,
        // openDelay: 3000,
        focusDelay: 0,
        blurDelay: 50

        // remove: true
    },
    mobileDropJS: {
        tetherOptions: {
            constraints: [
                {
                    to: 'scrollParent',
                    pin: true
                }
            ]
        }
    },

    addDropJSFilters(target) {
        const self = this;
        let dropTwo;

        dropTwo = new Drop(
            Object.assign(
                {
                    target: target.find('span')[target.length - 1],
                    content: target.next('.dropjs-wrapper')[0]
                },
                self.dropCgf,
                self.mobileDropJS
            )
        );
        dropTwo.open();
        dropTwo.position();
        dropTwo.close();


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
            spin: function (event, ui) {
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
            spin: function (event, ui) {
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
            slide: function (event, ui) {
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
            create: function () {
                var parent = $(this).closest('.filter-content');
                var dataName = parent.attr('data-type');
                var dataMin = parseInt(parent.attr('data-type', dataName).attr('data-min'), 10);
                var dataMax = parseInt(parent.attr('data-type', dataName).attr('data-max'), 10);
                parent.find('.filter-slider').slider('option', 'min', dataMin);
                parent.find('.filter-slider').slider('option', 'max', dataMax);

                parent.find('.filter-slider').slider('values', [parent.find('.filter-spinner--min').attr('aria-valuenow'), parent.find('.filter-spinner--max').attr('aria-valuenow')]); // add positions to slider
            },
            range: true,
            slide: function (event, ui) {
                // IF YOU TOUCH SLIDER
                var parent = $(this).closest('.filter-content');
                parent.find('.filter-spinner--min').spinner('value', ui.values[0]); //add positions to spinner
                parent.find('.filter-spinner--max').spinner('value', ui.values[1]); //add positions to spinner
                parent.find('.filter-spinner--max').spinner('option', 'min', parent.find('.filter-spinner--min').attr('aria-valuenow'));
                parent.find('.filter-spinner--min').spinner('option', 'max', parent.find('.filter-spinner--max').attr('aria-valuenow'));
            }
        });


    },
    addFilter() {
        var self = this;

        function addTemplateNumber(targetFilter, typeFilter, minVal, maxVal, dataMin, dataMax) {
            let templateElement = $('.filter-type--number').closest('.swiper-slide--template').clone();
            let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1)
            templateElement.removeClass('swiper-slide--template').addClass('swiper-slide').removeClass('display-none')
            templateElement.find('.dropjs-target--template').removeClass('dropjs-target--template').addClass('dropjs-target')
            templateElement.find('.filter').attr('data-type', typeFilter)
            templateElement.find('.filter-spinner-mode-min--template').removeClass('filter-spinner-mode-min--template').addClass('filter-spinner-mode-min')
            templateElement.find('.filter-spinner-mode-max--template').removeClass('filter-spinner-mode-max--template').addClass('filter-spinner-mode-max')
            templateElement.find('.dropjs-target').attr('data-filter-value', minVal + ' - ' + maxVal).children('span').html(minVal + ' - ' + maxVal)
            templateElement.find('.filter-content').attr('data-type', typeFilter).attr('data-min', dataMin).attr('data-max', dataMax).children('span').html('Filter By ' + nameFilter)
            templateElement.find('.filter-spinner--min').attr('value', minVal)
            templateElement.find('.filter-spinner--max').attr('value', maxVal)
            templateElement.find('.filter-slider').attr('data-slider-range-filter', true)
            targetFilter.closest('.filters').find('.card-filters--swiper').append(templateElement)
        }

        function addTemplateBadge(targetFilter, typeFilter, selectedStatus) {
            let templateElement = $('.filter-type--badge').closest('.swiper-slide--template').clone();
            let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1)
            let thisSlider = targetFilter.closest('.filters').find('.card-filters--swiper')

            templateElement.removeClass('swiper-slide--template').addClass('swiper-slide').removeClass('display-none')
            templateElement.find('.dropjs-target--template').removeClass('dropjs-target--template').addClass('dropjs-target')
            templateElement.find('.select--badge').attr('data-selectAR', true)
            templateElement.find('.filter').attr('data-type', typeFilter)
            templateElement.find('.dropjs-target').attr('data-filter-value', nameFilter).children('span').html(selectedStatus)
            templateElement.find('.filter-content').attr('data-type', typeFilter).children('span').html('Filter By ' + nameFilter)
            thisSlider.append(templateElement)
            for (let i = 0; i < thisSlider.find('.slider-box option').length; i++) {
                if (thisSlider.find('.slider-box option')[i].value === selectedStatus) {
                    $(thisSlider.find('.slider-box option')[i]).attr('selected', 'selected');
                }
            }
        }

        function addTemplateDatePicker(targetFilter, typeFilter, thisTextDatePicker) {
            let templateElement = $('.filter-type--date-picker').closest('.swiper-slide--template').clone();
            let nameFilter = typeFilter.charAt(0).toUpperCase() + typeFilter.substr(1)

            templateElement.removeClass('swiper-slide--template').addClass('swiper-slide').removeClass('display-none')
            templateElement.find('.dropjs-target--template').removeClass('dropjs-target--template').addClass('dropjs-target')
            templateElement.find('.filter').attr('data-type', typeFilter)
            templateElement.find('[data-daterangepicker]').attr('data-default-data', thisTextDatePicker)
            templateElement.find('.filter-content').attr('data-type', typeFilter).attr('data-daterangepicker-text', thisTextDatePicker).children('span').html('Filter By ' + nameFilter)
            templateElement.find('input').attr('data-daterangepicker--filter', true)
            templateElement.find('.dropjs-target').attr('data-filter-value', nameFilter).children('span').html(thisTextDatePicker)
            targetFilter.closest('.filters').find('.card-filters--swiper').append(templateElement)


        }

        $('.ddown-multi .add-filter').on('click', function () {
            var parent = $(this).closest('.filter-content');
            var typeFilter = parent.attr('data-type');
            if (typeFilter === 'services' || typeFilter === 'created') {
                if (typeFilter === 'services') {
                    let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter)
                    if (countFilter === undefined) {
                        $('.swiper-filters--box').attr('data-filter-' + typeFilter, '1')
                    }
                    else if (countFilter === '5') {
                        self.filterAlertNumber('error', parent);
                        return false
                    }
                    else {
                        countFilter++;
                        $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter)
                    }
                }
                else if (typeFilter === 'created') {
                    let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter)
                    if (countFilter === undefined) {
                        $('.swiper-filters--box').attr('data-filter-' + typeFilter, '1')
                    }
                    else if (countFilter === '5') {
                        self.filterAlertNumber('error', parent);
                        return false
                    }
                    else {
                        countFilter++;
                        $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter)
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

                    $(this).closest('.filter-content').find('.ddown-multi__submenu').hide();
                    $('.antares-dropjs-filter').off('mousedown mouseup'); // for restart mouesedown filters scroll
                    AntaresDdownGeneral.scrollCloseDropdowns();
                    self.values();
                    self.editFilter();
                    self.addDropJSFilters(filterContainer.find('.dropjs-target'));
                } else {
                    self.filterAlertNumber('error', parent, minInp, maxInp, dataMin, dataMax);
                }
            }
            else if (typeFilter === 'status') {
                var selectedStatus = parent.find('.select2-selection__rendered').attr('title');
                var haveSameStatusFilter = false;
                for (let i = 0; i < $('.filter-type--badge').length; i++) {
                    if ($('.filter-type--badge span')[i].textContent === selectedStatus) {
                        haveSameStatusFilter = true;
                    }
                }
                if (haveSameStatusFilter === false) {
                    self.filterAlertBadge('success', selectedStatus);
                    var filterContainer = $(this).closest('.filters').find('.card-filters--swiper');
                    var parent = $(this).closest('.filter-content');
                    let targetFilter = parent
                    var typeAmmount = addTemplateBadge(targetFilter, typeFilter, selectedStatus);
                    filterContainer.prepend(typeAmmount);
                    self.editFilter();
                    AntaresForms.elements.tooltip();
                    $(this).closest('.filter-content').find('.ddown-multi__submenu').hide();
                    $('.antares-dropjs-filter').off('mousedown mouseup'); // for restart mouesedown filters scroll
                    AntaresDdownGeneral.scrollCloseDropdowns();
                    self.addDropJSFilters(filterContainer.find('.dropjs-target'));
                } else if (haveSameStatusFilter === true) {
                    self.filterAlertBadge('error', selectedStatus);
                }
            }
            else if (typeFilter === 'datePicker') {
                let parent = $(this).closest('.filter-content');
                let thisTextDatePicker = parent.find('.comiseo-daterangepicker-triggerbutton')[0].textContent
                let filterContainer = $(this).closest('.filters').find('.card-filters--swiper');
                if (thisTextDatePicker === 'Select date range...') {
                }
                else {
                    let typeAmmount = addTemplateDatePicker(parent, typeFilter, thisTextDatePicker);
                    filterContainer.prepend(typeAmmount);
                    self.addDropJSFilters(filterContainer.closest('.filters').find('.dropjs-target'));

                    $('.drop.antares-dropjs-filter--out.drop-element [data-daterangepicker-text="'+thisTextDatePicker+'"').find('[data-daterangepicker--filter="true"]').daterangepicker({
                        mirrorOnCollision: true,
                        verticalOffset: 0,
                    })

                    let thisOriginalTextDatePicker = parent.find("[data-daterangepicker]").daterangepicker("getRange")
                    $('[data-daterangepicker-text="' + thisTextDatePicker + '"] [data-daterangepicker--filter]').daterangepicker("setRange", thisOriginalTextDatePicker);
                    self.editFilter();

                    $('.drop.antares-dropjs-filter--out .comiseo-daterangepicker-triggerbutton').off('click.dateDrop').on('click.dateDrop', function () {
                        if ($(this).closest('.drop').hasClass('dropjs-display-block')) {
                            $(this).closest('.drop').removeClass('dropjs-display-block')
                        }
                        else {
                            $(this).closest('.drop').addClass('dropjs-display-block')
                        }
                    })
                    $('.comiseo-daterangepicker-buttonpanel button,.comiseo-daterangepicker-presets li').off('click.dateDrop').on('click.dateDrop', function () {
                        if ($('.drop').hasClass('dropjs-display-block')) {
                            setTimeout(function () {
                                $('body').addClass('drop-open')
                                $('.drop.dropjs-display-block').addClass('drop-enabled drop-open').removeClass('dropjs-display-block')
                            }, 300)
                        }
                        else {
                            $('.drop').removeClass('dropjs-display-block')
                        }
                    })
                    $(this).closest('.filter-content').find('.ddown-multi__submenu').hide();

                }

            }
            else {
            }
        });
    },
    closeFilter() {
        let self = this;
        $('.filters .btn-filter--clear-all').click(function () {
            let thisBtnClear = $(this)
            let swiperLine = thisBtnClear.closest('.filters').find('.swiper-filters--box')
            for (let i = 0; i < swiperLine[0].attributes.length; i++) {  //delete count attributes
                let thisAttr = swiperLine[0].attributes[i].name
                if (thisAttr.substr(0, 11) === 'data-filter') {
                    swiperLine.attr(thisAttr, 0)
                }
            }
            swiperLine.find('.swiper-slide').remove();
            swiperLine.find('.ddown--filter-edit').remove();
            swiperLine.find('.card-filter__sgl').remove();
            window.noty(
                $.extend({}, APP.noti.errorFM('lg', 'border'), {
                    text: 'Deleted ALL filters'
                })
            );
            setTimeout(function () {
                thisBtnClear.closest('.filters').find('.ddown-multi').removeClass('ddown-multi--open');
                if (swiperLine.find('.swiper-wrapper').children().length > 0) {
                    swiperLine.closest('.tab-search--filter').removeClass('swiper--no-slides');
                } else {
                    swiperLine.closest('.tab-search--filter').addClass('swiper--no-slides');
                    $('.tbl-c').adjustCardHeight();

                }
            }, 300);
        });
        $('.card-filters--swiper').on('click', '.filter-close', function (e) {
            e.stopPropagation();
            var $self = $(this);
            $(this)
                .closest('.card-filter__sgl')
                .addClass('animated fadeOutRight');
            setTimeout(function () {
                var typeFilter = $self.closest('.filter').attr('data-type');
                let countFilter = $('.swiper-filters--box').attr('data-filter-' + typeFilter)
                countFilter--;
                $('.swiper-filters--box').attr('data-filter-' + typeFilter, countFilter)

                $self.closest('.swiper-slide').remove();
                $self.closest('.ddown--filter-edit').remove();
                $self.closest('.card-filter__sgl').remove();
                var tooltipId = $self.closest('.card-filter__sgl').attr('aria-describedby'),
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
        $('.change-filter').off('click');
        $('.change-filter').on('click', function () {
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
                    originTarget.find('.card-filter__sgl span').text(minVal + ' - ' + maxVal);

                    $('.drop').removeClass('drop-enabled');
                    $('.drop').removeClass('drop-open');
                    $('.drop').removeClass('drop-after-open');
                    $('body').removeClass('drop-open');
                } else {
                    self.filterAlertNumber('error', parent, minInp, maxInp, dataMin, dataMax);
                }
            }
            else if ($(this).hasClass('change-filter--badge')) {
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
                    originTarget.find('.card-filter__sgl span').text(newSelectStatus);
                    self.filterAlertBadge('warning', newSelectStatus);
                    $('.drop').removeClass('drop-enabled');
                    $('.drop').removeClass('drop-open');
                    $('.drop').removeClass('drop-after-open');
                    $('body').removeClass('drop-open');
                } else if (haveSameStatusFilter === true) {
                    window.noty(
                        $.extend({}, APP.noti.errorFM('lg', 'border'), {
                            text: 'This filter is already exists'
                        })
                    );
                }
            }
            else if ($(this).hasClass('change-filter--date-picker')) {
                let newDate = $(this).closest('.slider-box').find('.comiseo-daterangepicker-triggerbutton')[0].outerText
                let oldDate = $(this).closest('[data-daterangepicker-text]');
                let allSliderDatePicker = $('.swiper-filters--box [data-type="datePicker"]')
                for (let i = 0; i < allSliderDatePicker.length; i++) {
                    let correctTargetText = $(allSliderDatePicker[i]).find('.antares-dropjs-filter--out.drop.drop-target')
                    if (correctTargetText.text() === oldDate.attr('data-daterangepicker-text')) {
                        correctTargetText.text(newDate)
                        oldDate.attr('data-daterangepicker-text', newDate)
                    }
                }
                $('.drop').removeClass('drop-enabled');
                $('.drop').removeClass('drop-open');
                $('.drop').removeClass('drop-after-open');
                $('body').removeClass('drop-open');
                window.noty(
                    $.extend({}, APP.noti.warningFM('lg', 'border'), {
                        text: 'CHANGE DATEPICKER (devwarning)'
                    })
                );
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
            } else if (minInp === '', maxInp === '', dataMin === '', dataMax === '') {
                window.noty(
                    $.extend({}, APP.noti.errorFM('lg', 'border'), {
                        text: 'Maximum number of categories'
                    })
                );
            }

        } else if (category === 'success') {
            parent.find('.filter-spinner--min').removeClass('filter-spinner--validation-error');
            parent.find('.filter-spinner--max').removeClass('filter-spinner--validation-error');
            window.noty(
                $.extend({}, APP.noti.successFM('lg', 'border'), {
                    text: 'Filter Added'
                })
            );


        } else if (category === 'warning') {
            parent.find('.filter-spinner--min').removeClass('filter-spinner--validation-error');
            parent.find('.filter-spinner--max').removeClass('filter-spinner--validation-error');
            window.noty(
                $.extend({}, APP.noti.warningFM('lg', 'border'), {
                    text: 'Filter changed'
                })
            );


        }
    },
    filterAlertBadge(category, selectedStatus) {
        if (selectedStatus === undefined) {
            selectedStatus = '';
        }
        if (category === 'error') {
            window.noty(
                $.extend({}, APP.noti.errorFM('lg', 'border'), {
                    text: 'Filter "' + selectedStatus + '"' + ' already exists'
                })
            );
        } else if (category === 'warning') {
            window.noty(
                $.extend({}, APP.noti.warningFM('lg', 'border'), {
                    text: 'Filter changed on "' + selectedStatus + '"'
                })
            );
        } else if (category === 'success') {
            window.noty(
                $.extend({}, APP.noti.successFM('lg', 'border'), {
                    text: 'Filter "' + selectedStatus + '" Added'
                })
            );
        }
    },
    addFilterDT(parent) {
        $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
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
        $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
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
    },

};

$(() => {
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
