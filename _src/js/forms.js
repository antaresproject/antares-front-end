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

import { Antares } from './mechanics';
var AntaresForms = function() {};
AntaresForms.elements = AntaresForms.elements || {};
AntaresForms.validation = AntaresForms.validation || {};

AntaresForms.prototype.init = function() {
    var self = this;
    (function elements() {
        self.elements.helpers();
        self.elements.rangeSlider();
        self.elements.datepicker();
        self.elements.select();
        self.elements.search();
        self.elements.checkAndRadio();
        self.elements.spinner();
        self.elements.tooltip();
        self.elements.readOnly();
    }());

    (function validation() {
        // self.validation.jqueryStage();
        self.validation.ajaxStage();
    }());

};

AntaresForms.prototype.elements = {

    helpers: function() {

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

            $('.menu-aside li').each(function(index, el) {

                var link = $(this).find('> a').attr('href');
                var text = $(this).find('> a > span').eq(0).text();

                //validate if not empty 
                if (!$(this).hasClass('menu-aside__title')) {

                    //if has submenu
                    if ($(this).hasClass('has-submenu')) {

                        //  create optgroup if none
                        if (!$('optgroup[label="' + text + '"').length) {

                            mobileMenu.append('<optgroup label="' + text + '"></optgroup>');
                            groups.push(text);
                        }

                        //deal with submenu children  
                    } else if ($(this).parent('.menu-aside__submenu').length) {


                        mobileMenu.find('optgroup[label=' + groups[0] + ']').append('<option value="' + link + '">' + text + '</option>');

                    }

                    //normal options
                    else {

                        groups = [];
                        mobileMenu.append('<option value="' + link + '">' + text + '</option>');
                    }

                }
            });

        }

        menuAsideRWD();



    },

    readOnly: function() {

        // readonly state
        //checkbox
        $('.form-block').each(function(index, el) {

            var self = $(this);

            self.find('input[readonly]').on('ifChecked', function(e) {
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
    spinner: function(action) {

        $('[data-spinner="true"]').spinner({
            min: 0,
            max: 3000,
            start: 0,
            culture: "en-US",
            step: 1,
            numberFormat: "C",
            spin: function(event, ui) {

                // var values = [];
                // var val1 = parseInt($('#ds1').val().replace("$", ""), 10);
                // var val2 = parseInt($('#ds2').val().replace("$", ""), 10);
                // values.push(val1);
                // values.push(val2);
                // console.log(values);
                // $('#ds1').closest('li').find("[data-slider-range]").slider("values", values );

            }
        });
    },
    tooltip: function(action) {


        enquire.register("screen and (min-width:767px)", {

            // OPTIONAL
            // If supplied, triggered when a media query matches.
            match: function() {


                $('[data-tooltip="true"]').each(function() { // Notice the .each() loop, discussed below
                    $(this).qtip({
                        style: {
                            classes: 'ar',
                            tip: {
                                width: 9,
                                height: 5,
                            },
                        },
                        content: {
                            text: $(this).next('div.tooltip-content') // Use the "div" element next to this for the content
                        },
                        position: {
                            // my: 'top center', // Position my top left...
                            // at: 'bottom center', // at the bottom right of...
                            // viewport: $('.main-content'),
                            viewport: $(window),
                            adjust: {
                                method: 'shift'
                            }

                        },
                        show: {
                            effect: function(offset) {
                                $(this).fadeIn(300); // "this" refers to the tooltip
                            }
                        },
                        hide: {
                            effect: function(offset) {
                                $(this).fadeOut(300); // "this" refers to the tooltip
                            }
                        },
                        events: {
                            show: function(event, api) {
                                var $el = $(api.elements.target[0]);
                                $el.qtip('option', 'position.my', ($el.data('tooltip-my-position') == undefined) ? 'top center' : $el.data('tooltip-my-position'));
                                $el.qtip('option', 'position.at', ($el.data('tooltip-target-position') == undefined) ? 'bottom center' : $el.data('tooltip-target-position'));
                            }
                        },
                        // position: {
                        //     viewport: $(window),
                        // }
                    });
                });

                //inline implementation

                $('[data-tooltip-inline!=""]').qtip({
                    style: {
                        classes: 'ar',
                        tip: {
                            width: 9,
                            height: 5,
                        },
                    },
                    position: {
                        // my: 'top center', // Position my top left...
                        // at: 'bottom center', // at the bottom right of...
                        // viewport: $('.main-content'),
                        viewport: $(window),
                        adjust: {
                            method: 'shift'
                        }

                    },
                    content: {
                        attr: 'data-tooltip-inline'
                    },
                    show: {
                        effect: function(offset) {
                            $(this).fadeIn(300); // "this" refers to the tooltip
                        }
                    },
                    hide: {
                        effect: function(offset) {
                            $(this).fadeOut(300); // "this" refers to the tooltip
                        }
                    },
                    events: {
                        show: function(event, api) {
                            var $el = $(api.elements.target[0]);
                            $el.qtip('option', 'position.my', ($el.data('tooltip-my-position') == undefined) ? 'top center' : $el.data('tooltip-my-position'));
                            $el.qtip('option', 'position.at', ($el.data('tooltip-target-position') == undefined) ? 'bottom center' : $el.data('tooltip-target-position'));
                        }
                    },
                });

            },

            unmatch: function() {

                $('[data-hasqtip]').each(function(index, el) {
                    $(this).qtip('destroy');
                });


            },

        });


    },
    checkAndRadio: function(action) {


        // init only when needed
        $('[data-icheck="true"]').each(function(index, el) {
            if (!$(this).closest('.icheckbox_billevo').length) {
                $(this).iCheck({
                    checkboxClass: 'icheckbox_billevo',
                    radioClass: 'iradio_billevo',
                    increaseArea: '30%',
                });
            }
        });



    },
    search: function() {

        var search = $('.main-head '),
            searchSingle = $('.main-head .search-box'),
            trigger = $('.main-head .search-box > i:first-child'),
            close = $('.main-head .search-box .search-box__close');

        //Screen Size <768
        enquire.register("screen and (max-width:768px)", {
            match: function() {

                // searchSingle.toggleClass('search-box--toggled');

                // searchSingle.find('i:first-child').on('click', function(e) {
                //     searchSingle.toggleClass('search-box--toggled');
                // });

                $(document).on('click', '.main-head .search-box > i:first-child', function(e) {
                    $('.main-head').toggleClass('main-head--mobile--search');
                    searchSingle.addClass('search-box--toggled');

                    $(this).closest('.search-box').find('.search-box__mdl-textfield input').focus();
                });

                $(document).on('click', '.main-head .search-box .search-box__close', function(e) {
                    // $('.main-head').removeClass('main-head--mobile--search');
                    // searchSingle.removeClass('search-box--toggled');
                    // searchSingle.hide();
                    $('.main-head').toggleClass('main-head--mobile--search');
                    $(this).closest('.search-box').removeClass('search-box--toggled');
                });

                // close.on('click', function(e) {
                //      $('.main-head').removeClass('main-head--mobile--search');
                // });

            },
            unmatch: function() {

                search.show();
                $('.main-head').removeClass('main-head--mobile--search');
                // search.toggleClass('search-box--toggled');

                $(document).on('click', '.main-head .search-box i:first-child', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                });




            },
        });

        //closable modificator action

        $('.search-box--closable').on('click', '.search-box__close', function() {

            $(this).closest('.search-box').find('.search-box__search-field').val('');
            $(this).hide();

        });

        $('.search-box--closable .search-box__search-field').on('input', function() {

            if ($(this).val().length === 0) {

                $(this).closest('.search-box').find('.search-box__close').hide();
            } else {

                $(this).closest('.search-box').find('.search-box__close').show();
            }

        });
    },
    datepicker: function() {


        var dateRangeOptionsDashboard = {
            datepickerOptions: {
                numberOfMonths: 2,
                mirrorOnCollision: false,
                verticalOffset: 0,
            }
        };

        //range
        $('[data-daterangepicker]').daterangepicker();

        $('.page-dashboard [data-daterangepicker]').daterangepicker($.extend({}, dateRangeOptionsDashboard, { initialText: 'Select time period to analize' }));

        //Screen Size <768
        enquire.register("screen and (max-width:768px)", {
            match: function() {

                $('.page-dashboard [data-daterangepicker]').daterangepicker('destroy');
                $('.page-dashboard [data-daterangepicker]').daterangepicker($.extend({}, dateRangeOptionsDashboard, { initialText: 'Select time period to analize' }));
            },
        });

        // class cleanup
        var classesToRemove = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-button-text-only'];

        var $target = $('.comiseo-daterangepicker-buttonpanel button');
        $.each(classesToRemove, function(i, v) {
            $target.removeClass(v);
        });

        $target.mouseover(function() {
            $(this).removeClass("ui-state-hover");
        });




        //class cleanup | END


        // time
        var timepicker = $('[data-timepicker]'),
            datepicker = $('[data-datepicker]'),
            datetimepicker = $('[data-datetimepicker]');

        timepicker.datetimepicker({
            datepicker: false,
            format: 'H:i',
            // onChangeDateTime: function() {
            //     $(this).validate();
            // },
        });

        datepicker.datetimepicker({
            timepicker: false,
            format: 'd.m.Y'
        });

        datetimepicker.datetimepicker({
            datepicker: true,
        });

        $.datetimepicker.setLocale('en');




        // alt datepicker

        if ($('[data-alt-datepicker]').length) {

            $('[data-alt-datepicker]').bootstrapMaterialDatePicker({ switchOnClick: true, weekStart: 0, time: false });

        }

        if ($('[data-alt-timepicker]').length) {

            $('[data-alt-timepicker]').bootstrapMaterialDatePicker({ switchOnClick: true, date: false });

        }

        if ($('[data-alt-datetimepicker]').length) {

            $('[data-alt-datetimepicker]').bootstrapMaterialDatePicker({ switchOnClick: true, format: 'dddd DD MMMM YYYY - HH:mm' });

        }

    },
    rangeSlider: function(action) {

        var slider = $('[data-slider]'),
            rangeSlider = $('[data-slider-range]');

        slider.slider({
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
            slide: function(event, ui) {
                // $(this).find("#ds1").spinner("value", ui.values[0]);
                // $(this).find("#ds2").spinner("value", ui.values[1]);
            }
        });

    },
    select: function() {

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
                width: '100%',
                dropdownAutoWidth: true,
                // placeholder: 'Select an option',
                theme: "selectAR",
                allowClear: true,
                //disable search below
                minimumResultsForSearch: Infinity,

            };

            // $.fn.select2.defaults.set("theme", "AR");

            $('[data-selectAR]').select2(select2Base).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });

            //WITH SEARCH
            $('[data-selectAR--search]').select2($.extend({}, select2Base, { minimumResultsForSearch: 1 })).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });

            //MDL
            $('[data-selectAR--mdl]').select2($.extend({}, select2Base, { theme: "mdl" })).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });

            //MDL big
            $('[data-selectAR--mdl-big]').select2($.extend({}, select2Base, { theme: "mdl-big" })).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });
            //MDL short (v2)
            $('[data-selectAR--mdl-short]').select2($.extend({}, select2Base, { theme: "mdl-short" })).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });


            //Select - tags
            $('[data-selectAR--tags]').select2($.extend({}, select2Base, { theme: "tags" })).on("change", function(e) {

                //validation if needed
                if ($(this).closest('.form-validation').length) {
                    // $(this).valid();
                }
                $(this).closest('.input-field').removeClass('error');

            });

            //Select - custom input (tags with 1 option)
            $('[data-selectAR--custom-input]').select2($.extend({}, select2Base, {
                createTag: function(term, data) {
                    if ($(data).filter(function() {
                            return this.text.localeCompare(term) === 0;
                        }).length === 0) {
                        return { text: term, id: '123' };
                    }
                },
                multiple: true,
                tags: true,
                theme: "custom-input",
                maximumSelectionLength: 1,
            })).on("change", function(e) {

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


            $('select[data-flag-select]').each(function(index, el) {

                if ($(this).find('option:selected').length) {

                    var flag = $(this).find('option:selected').data('country');

                } else {

                    return false;

                }

                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            });

            $('select[data-flag-select], [data-flag-select-translations]').on('change', function() {

                if ($(this).find('option:selected').length) {

                    var flag = $(this).find('option:selected').data('country');

                } else {

                    return false;

                }

                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            });

            //on init
            $('[data-flag-select]').select2({
                minimumResultsForSearch: Infinity,
                templateResult: function(data, container) {
                    if (data.element && data.element.attributes["data-country"]) {
                        // console.log(data);
                        var flagCode = data.element.attributes["data-country"].nodeValue;
                        var flagHtml = '';
                        flagHtml += '<span class="flag-icon flag-icon-' + flagCode + '"></span>';
                        var html = $.parseHTML(flagHtml);
                        // console.log($(container));
                        // $(container).append(flagHtml);
                        // $(container).prepend(data.text);
                        var $state = $(
                            '<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>'
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
                templateResult: function(data, container) {
                    if (data.element && data.element.attributes["data-country"]) {
                        // console.log(data);
                        var flagCode = data.element.attributes["data-country"].nodeValue;
                        var flagHtml = '';
                        flagHtml += '<span class="flag-icon flag-icon-' + flagCode + '"></span>';
                        var html = $.parseHTML(flagHtml);
                        // console.log($(container));
                        // $(container).append(flagHtml);
                        // $(container).prepend(data.text);
                        var $state = $(
                            '<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>'
                        );
                        return $state;

                    } else {

                        return data.text;

                    }

                }          

            });

            //on init

            // Flag integration with search


            $('select[data-flag-select--search]').each(function(index, el) {

                if ($(this).find('option:selected').length) {
                    var flag = $(this).find('option:selected').data('country');
                } else {
                    return false;
                }

                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            });

            $('select[data-flag-select-translations]').each(function(index, el) {

                if ($(this).find('option:selected').length) {
                    var flag = $(this).find('option:selected').data('country');
                } else {
                    return false;
                }
                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);

            });

            $('[data-flag-select--search]').select2({
                minimumResultsForSearch: 1,
                closeOnSelect: false,
                templateResult: function(data, container) {

                    if (data.element && data.element.attributes["data-country"]) {

                        // console.log(data);
                        var flagCode = data.element.attributes["data-country"].nodeValue;
                        var flagHtml = '';
                        flagHtml += '<span class="flag-icon flag-icon-' + flagCode + '"></span>';
                        var html = $.parseHTML(flagHtml);
                        // console.log($(container));
                        // $(container).append(flagHtml);
                        // $(container).prepend(data.text);
                        var $state = $(
                            '<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>'
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

                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            });


        }());

        // prefix control

        $('select').each(function(index, el) {

            if ($(this).attr('data-prefix')) {

                if (!$(this).next('.select2').find('.select__prefix').length) {

                    var prefixValue = $(this).data('prefix');
                    // $(this).siblings('.select2').find('.select2-selection__rendered').attr('data-prefix', prefixValue );
                    $(this).next('.select2').find('.select2-selection__rendered').prepend('<span class="select__prefix">' + prefixValue + '</span>');

                    $(this).on('change', function() {
                        $(this).next('.select2').find('.select2-selection__rendered').prepend('<span class="select__prefix">' + prefixValue + '</span>');
                    });

                }
            }

        });

    },
};

AntaresForms.prototype.validation = {

    jqueryStage: function() {

        var validationClass = $('.form-validation');

        if (!validationClass.length) {
            return;
        }

        mdlFixes = function(action) {

                //mdl validation fix
                $(".mdl-textfield__input").blur(function() {
                    if (!this.value) {
                        $(this).prop('required', true);
                        $(this).parent().addClass('is-invalid');
                    }
                });

                // $(".mdl-textfield__input").parent().removeClass('is-invalid');

            },
            //wait on class change
            // var $div = $("[data-datepicker='true']");
            // var observer = new MutationObserver(function(mutations) {
            //     mutations.forEach(function(mutation) {
            //         if (mutation.attributeName === "class") {
            //             var attributeValue = $(mutation.target).prop(mutation.attributeName);
            //             console.log("Class attribute changed to:", attributeValue);
            //         }
            //     });
            // });    
            // observer.observe($div[0],  {
            //     attributes: true
            // });

            // $div.addClass('red');

            //submit with link
            // $('.btn--submit').on('click', function() {
            //     $(this).closest('.form-validation').submit();
            // });

            //check validity
            $.fn.isValid = function() {
                return this[0].checkValidity();
            };

        $('.form-validation').each(function(index, el) {
            $(this).validate({
                debug: true,
                errorElement: 'span',
                rules: {
                    // name: {
                    //     required: true
                    // },
                    // password: {
                    //   required: true
                    // },
                    // number: {
                    //   required: true
                    // },
                    // select: "required"
                },
                messages: {
                    text: "Required Field",
                    password: "Password required",
                },
                showErrors: function(errorMap, errorList) {
                    $(el).find(".form-errors").html("Your form contains " + this.numberOfInvalids() + " errors, see details below.");
                    this.defaultShowErrors();
                },
                //AFAIK fires on form submit
                errorPlacement: function(error, element) {

                    var elem = element;

                    //default

                    error.appendTo(element.closest('.form-block'));

                    // grid
                    if (elem.closest('form.form--hor').length) {
                        $(error).addClass('col-dt-14 col-dt-offset-2 col-13 col-offset-3 col-mb-11 col-mb-offset-5');

                    } else {
                        $(error).addClass('col-16');
                    }


                },
                //need to follow the label
                success: function(label, element) {

                    //default
                    label.remove();

                },
                highlight: function(element) {

                    var elem = $(element);

                    //default
                    elem.addClass("error");

                    //datepicker
                    if (elem.attr('data-daterangepicker')) {

                        elem.siblings('.comiseo-daterangepicker-triggerbutton').addClass('error');

                        //on change
                        elem.on('change', function() {
                            elem.siblings('.comiseo-daterangepicker-triggerbutton').removeClass('error');
                            elem.closest('.form-block').find('span.error').hide();
                        });

                    }

                    //icheck
                    else if (elem.attr('data-icheck')) {

                        elem.closest('.icheckbox_billevo').addClass('error');
                        elem.closest('.iradio_billevo').addClass('error');

                        //on change
                        elem.on('ifChecked', function() {

                            elem.closest('.form-block').find('span.error').hide();
                            elem.closest('.icheckbox_billevo').removeClass('error');
                            elem.closest('.iradio_billevo').removeClass('error');

                        });

                        elem.on('ifUnchecked', function() {

                            elem.closest('.form-block').find('span.error').show();
                            elem.closest('.icheckbox_billevo').addClass('error');
                            elem.closest('.iradio_billevo').addClass('error');

                        });

                    }

                    //switch pure css
                    else if (elem.hasClass("switch-checkbox")) {
                        elem.siblings('.switch-container').addClass('error');

                        //on change
                        elem.on('change', function() {
                            elem.siblings('.switch-container').removeClass('error');
                            // $(element).closest('.form-block').find('label.error').hide();
                        });

                    }

                    //type file
                    else if (elem.is("[type='file']")) {
                        elem.closest('.file-upload').addClass('error');
                        elem.closest('.form-block').find('label.file-upload.error').show();
                    }
                    //type slider
                    else if (elem.hasClass('slider-val')) {

                        elem.siblings('.ui-slider').addClass('error');

                    }
                    //select
                    else if (elem.hasClass("select2-hidden-accessible")) {
                        elem.closest('.form-block').addClass('error');
                    }

                },
                unhighlight: function(element) {

                    var elem = $(element);

                    //default
                    elem.removeClass("error");

                    //datepicker
                    if (elem.attr('data-daterangepicker')) {
                        elem.siblings('.comiseo-daterangepicker-triggerbutton').removeClass('error');
                    }

                    //icheck
                    else if (elem.attr('data-icheck')) {
                        elem.closest('.icheckbox_billevo').removeClass('error');
                        elem.closest('.iradio_billevo').removeClass('error');
                    }

                    //type file
                    else if (elem.is("[type='file']")) {
                        elem.closest('.file-upload').removeClass('error');
                    }

                    //switch pure css
                    else if (elem.hasClass("switch-checkbox")) {
                        elem.siblings('.switch-container').removeClass('error');
                    }

                    //type slider
                    else if (elem.hasClass('slider-val')) {
                        elem.siblings('.ui-slider').removeClass('error');
                    }

                    //type select
                    else if (elem.hasClass("select2-hidden-accessible")) {
                        elem.closest('.form-block').removeClass('error');
                    }

                },
                ignore: '.select2-search__field',
            });
        });

        // button disable 
        // $('.form-validation input').on('keyup blur', function () { // fires on every keyup & blur
        //     if ($(this).closest('.form-validation').valid()) {                   // checks form for validity
        //         $(this).closest('.form-validation').children('.btn--submit').prop('disabled', false);        // enables button
        //     } else {
        //         $(this).closest('.form-validation').children('.btn--submit').prop('disabled', 'disabled');   // disables button
        //     }
        // });

    },
    ajaxStage: function() {

        //active form validation
        // $('#form-valid-test').yiiactiveform({
        //     'validateOnSubmit': true,
        //     'validateOnChange': false,
        //     'errorCss': 'error',
        //     'errorCssClass': 'error',
        //     'summaryID': 'form-errors',
        //     'attributes': [{
        //             'id': 'testName',
        //             'inputID': 'testName',
        //             'name': 'testName',
        //             'errorID': 'email_error',
        //             'enableAjaxValidation': true,
        //             'summary': true,
        //             'inputContainer': 'div.form-block'
        //         }]
        // });

        // $('.form-validation--yii').yiiactiveform({
        //     'validateOnSubmit': true,
        //     'validateOnChange': false,
        //     'errorCss': 'error',
        //     'errorCssClass': 'error',
        //     'summaryID': 'form-errors',
        //     'attributes': [{
        //         'id': 'testName',
        //         'inputID': 'testName',
        //         'name': 'testName',
        //         'errorID': 'email_error',
        //         'enableAjaxValidation': true,
        //         'summary': true,
        //         'inputContainer': 'div.form-block'
        //     }]
        // });

    }

};

function AjaxLoader() {

    this.reInit = function() {

        AntaresForms.elements.select();
        AntaresForms.elements.checkAndRadio();
        AntaresForms.elements.tooltip();
        AntaresForms.elements.datepicker();
        AntaresForms.elements.rangeSlider();
        AntaresForms.elements.readOnly();

        //MDL reinit
        componentHandler.upgradeAllRegistered();
    };

    this.reValidate = function() {
        // AntaresForms.validation.jqueryStage();
    };

}

$(function() {
    AntaresForms = new AntaresForms();
    AntaresForms.init();


    //wait, damnit! for the dom!
    setTimeout(function() {

        ready('select', function(element) {
            AntaresForms.elements.select();
        });

    }, 7000);


});
