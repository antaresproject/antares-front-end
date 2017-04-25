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


var AntaresGridstack = function() {};
AntaresGridstack.dashboard = AntaresGridstack.dashboard || {};

AntaresGridstack.prototype.init = function() {

    var self = this;

    (function gridstack() {
        self.dashboard.gridStack();
        // self.dashboard.gridShowCase();
        self.dashboard.cardResizePlugin();
        self.dashboard.cardResizeDashboard();
        // self.dashboard.cardReadability();
        self.dashboard.sliders();
        self.dashboard.compare();
        self.dashboard.filterWidgets();
        self.dashboard.widgetActions();
        self.dashboard.tabify();

        self.dashboard.widgetGridEnlarge();

        self.helpers();
    }());


    // $('.grid-stack').data('gridstack').disable();

};

AntaresGridstack.prototype.helpers = function() {


    //gridstack height automation jintegrer babel external automation tool scafolding
    $.fn.extend({

        calcHeight: function() {

            var gS = $('.grid-stack').data('gridstack');
            var gSCH = gS.cellHeight();
            console.log('cell height: ' + gSCH);

            $('.grid-stack-item').each(function(index, el) {

                var itemHeight = $(el).data('gs-height');
                var updatedHeight = itemHeight * gSCH + 'px';
                console.log(updatedHeight);

            });



        }
    });

    // $('.gridstack').calcHeight();

    //slick update

    // if ($('.slick-slider').length) {

    //     $(window).on('resize', function() {

    //         $('.slick-slider')[0].slick.refresh();
    //         // console.log('slick updated!');

    //     });
    //     //slick update
    //     $(window).on('load', function() {

    //         $('.slick-slider')[0].slick.refresh();

    //     });

    // }

    ready('.slick-slider', function(element) {
        // $('.slick-slider')[0].slick.refresh();
        // $('.slick-slider')[0].slick.refresh();
    });

    //slick update | END


    $('.grid-stack-item').each(function(index, el) {

        if ($(this).find('.pagination').length) {

            $(this).addClass('gs-pagination');

        }

    });

    //card RWD 
    $(document).on('click', '.card__mobile-toggle', function() {
        $(this).toggleClass('card__mobile-toggle--open');
        $(this).closest('.card').find('.datarow').toggle();
        $(this).closest('.card').toggleClass('card--mobile-toggled');
    });




};

AntaresGridstack.prototype.dashboard = {

    widgetGridEnlarge: function() {

        //save vars without overwrite with click functions
        var savedPositions = [];
        $('.grid-stack-item').each(function() {
            var $this = $(this);
            savedPositions.push({
                x: $this.attr('data-gs-x'),
                y: $this.attr('data-gs-y'),
                w: $this.attr('data-gs-width'),
                h: $this.attr('data-gs-height'),
            });
        });

        // console.log(savedPositions);

        //enlarge mechanics
        $('#app-wrapper .card .card-maximize').on('click', function() {

            var self = $(this);

            var widget = $(this).closest('.grid-stack-item');
            var grid = $(this).closest('.grid-stack').data('gridstack');

            //set best height to simulate modal
            var currentCellH = grid.cellHeight();
            var headH = $('.main-head').outerHeight(true);
            var windowH = $(window).height();
            var appropriateHeight = (windowH - headH - 485) / currentCellH;

            var openCloseSwitch = $(this).data('openCloseSwitch');

            //identify card number
            var index = widget.index();

            if (!openCloseSwitch) {
                grid.update(widget, 0, 0, 12, appropriateHeight);
                $('.app-content').scrollTop(0);
                widget.addClass('is-maximized');

            } else {
                $('.grid-stack-item').each(function(index, el) {
                    grid.update(el, parseInt(savedPositions[index].x, 10), parseInt(savedPositions[index].y, 10), parseInt(savedPositions[index].w, 10), parseInt(savedPositions[index].h, 10));
                    $(el).removeClass('is-maximized');
                });
            }

            $(this).data("openCloseSwitch", !openCloseSwitch);

        });

    },
    gridStack: function() {
        var grid = $('.grid-stack').data('gridstack');
        var gridstack_options = {
            // verticalMargin: 1,
            animate: false,
            minWidth: 600,
            float: false,
            alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            resizable: {
                // handles: 'e, se, s, sw, w'
                handles: 'e, se, s, sw, w, n'
            },
            cellHeight: 15,
            verticalMargin: 20,
            handle: '.move-button'
        };



        $('.grid-stack').gridstack(gridstack_options);




        //widget edit control
        (function editWidgets() {

            $('#widgets-edit').on('click', function(e) {

                e.preventDefault();
                var grid = $('.grid-stack').data('gridstack');

                if ($('.app-content').hasClass('app-content--widgets-movable')) {

                    grid.disable();

                    $(this).children('i').removeClass('icon--widgets-edit-alt').addClass('icon--widgets-edit');
                    $('.app-content').toggleClass('app-content--widgets-movable');
                    $('.app-content').removeClass('app-content--widgets-editable');

                } else {

                    grid.enable();

                    $(this).children('i').removeClass('icon--widgets-edit').addClass('icon--widgets-edit-alt');
                    $('.app-content').toggleClass('app-content--widgets-movable');

                }
                // $(this).data("enabled", !enabled);
            });

            //manual close button
            $('.card-bar__close').on('click', function(e) {

                $('.app-content').toggleClass('app-content--widgets-movable');

            });

            //widgets editable view
            $(document).on('click', '.remove-button', function() {

                // var grid = $('.grid-stack').data('gridstack'),
                //     el = $(this).closest('.grid-stack-item');
                //     grid.removeWidget(el);

                // var $self = $(this);

                // APP.swal.init('skin1', 'typeInfo', {
                //     title: 'Are you sure?',
                //     text: 'Widget will be removed.'
                // });

                // $('.sweet-container').addClass('widget-remove');
                // $('.sweet-container.widget-remove .sweet-confirm').on('click', function() {

                //     console.log($self);
                //     var grid = $('.grid-stack').data('gridstack'),
                //         el = $self.closest('.grid-stack-item');

                //     grid.removeWidget(el);

                // });
                // $('.sweet-container').removeClass('widget-remove');



            });

            $(document).on('click', '.card__edit-icons *', function() {

                var el = $(this).closest('.grid-stack-item');
                el.css('z-index', '7');
            });

            $(document).on('click', '.card__edit-view .ddown__menu li', function() {

                $('.app-content').addClass('app-content--widgets-editable');

            });


        })();

    },
    compare: function() {
        // compare
        // $('.card--chart [data-icheck]').on('ifChecked', function(event) {
        //     $(this).closest('.card').addClass('card--compare');
        // });

        // $('.card--chart [data-icheck]').on('ifUnchecked', function(event) {
        //     $(this).closest('.card').removeClass('card--compare');
        // });

    },

    gridShowCase: function(nthChild) {

        // var self = this;

        // //init
        // $(document).on('click', '.main-sidebar__logo', function(e) {

        //     //helpers
        //     var getRandomArbitrary = function(min, max) {
        //         return Math.random() * (max - min) + min;
        //     };

        //     var getRandomInt = function(min, max) {
        //         return Math.floor(Math.random() * (max - min + 1)) + min;
        //     };

        //     var grid = $('.grid-stack').data('gridstack');

        //     //wiggle a single card
        //     if (typeof nthChild != 'undefined') {

        //         console.log('|||||| recalucating selected card!');

        //         if (nthChild === 0)
        //             nthChild += 1;

        //         var el = $('.grid-stack-item:nth-child(' + nthChild + ')'),
        //             elX = getRandomInt(1, 9),
        //             elY = getRandomInt(1, 31),
        //             elW = getRandomInt(3, 16),
        //             elH = getRandomInt(8, 15);

        //         grid.update(el, elX, elY, elW, elH);
        //         var lastClass = el.find('.card').attr('class').split(' ');
        //         var name = lastClass[lastClass.length - 1];
        //         console.log('Showcasing ' + name + '.');

        //     } else {

        //         console.log('|||||| recalucating all cards...');

        //         (function shuffleAll() {

        //             $('.grid-stack-item').each(function(index, el) {

        //                 var elX = getRandomInt(1, 9),
        //                     elY = getRandomInt(1, 31),
        //                     elW = getRandomInt(3, 16),
        //                     elH = getRandomInt(8, 15),
        //                     newNthChild = getRandomInt(0, 7);

        //                 grid.update(el, elX, elY, elW, elH);
        //             });

        //         })();

        //     }

        // });

    },

    cardResizePlugin: function() {

        //gridstack resize plugin
        $.fn.cardResize = function(newWidth, newHeight, newX, newY) {

            var grid = $('.grid-stack').data('gridstack'),
                cardContainer = this.closest('.grid-stack-item'),
                originalX = this.attr('data-gs-x'),
                originalY = this.attr('data-gs-y'),
                originalW = this.attr('data-gs-width'),
                originalH = this.attr('data-gs-height');

            if (newHeight === null && newX === null && newY === null) {
                grid.update(cardContainer, originalX, originalY, newWidth, originalH);
            } else if ((newX === null && newY === null)) {
                grid.update(cardContainer, originalX, originalY, newWidth, newHeight);
            } else if ((newY === null)) {
                grid.update(cardContainer, newX, originalY, newWidth, newHeight);
            } else {
                grid.update(cardContainer, newX, newY, newWidth, newHeight);
            }

        };

    },
    cardResizeDashboard: function() {

        var chart1 = $('.card--chart.card--green'),
            chart2 = $('.card--chart.card--orange'),
            chart3 = $('.card--chart.card--violet'),
            chart4 = $('.card--chart.card--blue'),
            systemInfo = $('.card--info'),
            news = $('.card--news'),
            systemLogs = $('.card--logs'),
            w = $(window).width(),
            grid = $('.grid-stack').data('gridstack');

        //how to trun autoposition with js?
        // $('.grid-stack').attr('data-gs-auto-position', '1').data('data-gs-auto-position', '1');
        // $.fn.cardResize = function(newWidth, newHeight, newX, newY)

        if (!grid) {
            return false;
        }

        enquire.register("screen and (min-width:1200px) and (max-width:1500px) ", {

            match: function() {

                chart1.cardResize(12, 10, 0, 0);
                chart2.cardResize(12, 10, 0, 10);
                chart3.cardResize(12, 10, 0, 20);
                chart4.cardResize(12, 10, 0, 30);

                systemInfo.cardResize(6, 11, 0, 45);
                news.cardResize(6, 11, 6, 45);
                systemLogs.cardResize(12, 11, 0, 56);

            }

        });

        enquire.register("screen and (min-width:1501px)", {

            match: function() {

                chart1.cardResize(6, 10, 0, 0);
                chart2.cardResize(6, 10, 6, 0);
                chart3.cardResize(6, 10, 0, 10);
                chart4.cardResize(6, 10, 6, 10);

                systemInfo.cardResize(3, 11, 0, 20);
                news.cardResize(3, 11, 3, 20);
                systemLogs.cardResize(6, 11, 6, 20);

            }

        });

    },

    sliders: function() {




        if (!$('[data-slick="true"]').length) {
            return false;
        }

        var newsSlider = $('.card--news .card__slider'),
            cardNewsHeaderH = $('.card--news .card__header').height(),
            cardH = $('.card--news').height() - (cardNewsHeaderH + 12);

        var slick_options = {
            arrows: false,
            autoplay: false,
            dots: false,
            speed: 350
        };

        $('[data-slick="true"]').not('.slick-initialized').slick(slick_options);

        //custom buttons
        $(document).on('click', '[data-slickPrev="true"]', function(e) {
            newsSlider.slick('slickPrev');
        });

        $(document).on('click', '[data-slickNext="true"]', function(e) {
            newsSlider.slick('slickNext');
        });

        $('.card--news .slick-slide').css('height', cardH);

        $('.grid-stack').on('change', function(e, items) {


            // //memory leak!
            // var something = (function() {
            //     var executed = false;
            //     return function() {
            //         if (!executed) {
            //             executed = true;
            //             console.log(e);


            //         }
            //     };
            // })();





        });

    },
    cardReadability: function() {

    },
    filterWidgets: function() {

        require("list.js");

        var options = {
            valueNames: [
                { data: ['widget'] },
            ],
            searchClass: 'mdl-textfield__input',
            listClass: 'card-bar__items'
        };
        var widgetSort = new List('widgets-list', options);

    },
    widgetActions: function() {

        //draggable
        var $el = $('.card-bar .card-bar__sgl');
        var $container = $(".main-content .grid-stack");


        $container.droppable({
            accept: $el,
        });


        $el.draggable({
            stop: function(event, ui) {

                console.log(ui);
                console.log(event);

            },
            revert: function(valid, ui) {

                var $self = $(this);

                if (!valid) {
                    return !valid;
                } else {



                    this.velocity({
                        opacity: '0',
                    }, 500, function() {
                        $self.remove();
                        AntaresGridstack.dashboard.filterWidgets();
                    });
                    return valid;
                }
            }
        });

        // $container.on("dropout", function(e, ui) {
        //    ui.draggable.addClass("out"); 
        // });

        // console.log('OD NALOGU DO NALOGU');

        //draggable end

        $('div.grid-stack-item').on('click', 'a.widget-edit', function(e) {
            e.preventDefault();
            handler = $(this);
            container = handler.parents('.panel:first').find('.panel-body:first');
            $.ajax({
                url: $(this).attr('href'),
                success: function(response) {
                    container.html(response);
                    handler.parents('.btn-group').removeClass('open');
                    handler.parents('.btn').removeClass('dropdown-toggle');
                }
            });
            return false;
        });
        $('#delete-widget').on('hidden.bs.modal', function(e) {
            $('#delete-widget').find('a.btn-primary').attr('href', '#');
            return true;
        });
        $('div.grid-stack').on('click', 'a.widget-disable', function(e) {
            modal = $('#delete-widget');
            button = modal.find('a.btn-primary');
            button.attr('rel', $(this).attr('rel'));
            button.attr('href', $(this).attr('href'));
            modal.modal('show');
            return false;
        });
        $('#delete-widget').on('click', 'a.widget-disable-button', function(e) {
            id = $(this).attr('rel');
            href = $(this).attr('href');
            container = $('div.grid-stack-item[id=' + id + ']');
            gridstack = container.parents('div.grid-stack:first').data('gridstack');
            $('#delete-widget').modal('hide');

            $.ajax({
                url: href,
                success: function(response) {
                    gridstack.removeWidget(container);
                    $('a.add-widget[rel=' + id + ']').parent().removeClass('hidden');
                },
                error: function(error) {
                    noty({
                        text: error.responseJSON.message,
                        type: 'error',
                        dismissQueue: true,
                        layout: 'bottomRight',
                        closeWith: ['click'],
                        theme: 'relax',
                        maxVisible: 10,
                        timeout: 3000,
                        animation: {
                            open: 'animated bounceInRight',
                            close: 'animated bounceOutRight',
                            easing: 'swing',
                            speed: 500
                        }
                    });
                }
            });
            gridstack.batch_update();
            gridstack.commit();
            return false;
        });
        $('div.grid-stack-item').on('click', 'a.widget-refresh', function(e) {
            e.preventDefault();
            handler = $(this);
            container = handler.parents('.panel:first').find('.panel-body:first');
            $.ajax({
                url: handler.attr('href'),
                success: function(response) {
                    container.html(response);
                    handler.parents('.btn-group').removeClass('open');
                    handler.parents('.btn').removeClass('dropdown-toggle');
                }
            });
            return false;
        });
    },

    tabify: function() {


    }

};

$(function() {
    window.AntaresGridstack = new AntaresGridstack();
    window.AntaresGridstack.init();
});

//gridstack preload
$(window).on('load', function() {
    $('.grid-stack').css('opacity', '1');
});

//function Grid(container) {
//    var grid = $('.grid-stack').data('gridstack');
//    this.container = container;
//    this.start = function () {
//        $(this.container).gridstack({
//            vertical_margin: 1,
//            animate: false,
//            always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
//            resizable: {
//                handles: 'e, se, s, sw, w'
//            }
//        });
//    }
//    this.enable = function () {
//        $('.widget-selector').removeClass('hidden');
//        $(this.container).each(function (index, item) {
//            $(item).find('.widget-actions').removeClass('hidden');
//            gridstack = $(item).data('gridstack');
//            gridstack.resizable('.grid-stack-item[data-gs-no-resize=1]', false);
//            gridstack.movable('.grid-stack-item[data-gs-no-move=1]', false);
//            gridstack.resizable('.grid-stack-item[data-gs-no-resize=""]', true);
//            gridstack.movable('.grid-stack-item[data-gs-no-move=""]', true);
//        });
//    }
//    this.disable = function () {
//        $('.widget-selector').addClass('hidden');
//        $(this.container).each(function (index, item) {
//            selector = $(item).find('.widget-actions');
//            if (!selector.hasClass('hidden')) {
//                selector.addClass('hidden');
//            }
//            gridstack = $(item).data('gridstack');
//            gridstack.resizable('.grid-stack-item', false);
//            gridstack.movable('.grid-stack-item', false);
//        });
//    }
//}
//
//$(document).ready(function () {
//
//    var gridStack = new Grid('.grid-stack)';
//    gridStack.start();
//    gridStack.disable();
//    $('div.widget-selector').on('click', 'a.add-widget', function (e) {
//        e.preventDefault();
//        handler = $(this);
//        container = $('div.grid-stack:first');
//        var grid = container.data('gridstack');
//        gridStack.start();
//        id = handler.attr('rel');
//        $.ajax({
//            url: handler.attr('href'),
//            success: function (response) {
//                $widget = response;
//                grid.add_widget(response, handler.attr('x'), handler.attr('y'), handler.attr('width'), handler.attr('height'), false);
//                $('div.widget-selector').find('div.dropdown').removeClass('open');
//                $('div.widget-selector a.add-widget[rel=' + id + ']').parent().addClass('hidden');
//                gridStack.start();
//                $('.widget-actions').removeClass('hidden');
//            },
//            error: function (error) {
//                $('div.widget-selector').find('div.dropdown').removeClass('open');
//            }
//        });
//        return false;
//    });
//
//    $('div.grid-stack-item').on('click', 'a.widget-edit', function (e) {
//        e.preventDefault();
//        handler = $(this);
//        container = handler.parents('.panel:first').find('.panel-body:first');
//        $.ajax({
//            url: $(this).attr('href'),
//            success: function (response) {
//                container.html(response);
//                handler.parents('.btn-group').removeClass('open');
//                handler.parents('.btn').removeClass('dropdown-toggle');
//            }
//        });
//        return false;
//    });
//    $('#delete-widget').on('hidden.bs.modal', function (e) {
//        $('#delete-widget').find('a.btn-primary').attr('href', '#');
//        return true;
//    });
//    $('div.grid-stack').on('click', 'a.widget-disable', function (e) {
//        modal = $('#delete-widget');
//        button = modal.find('a.btn-primary');
//        button.attr('rel', $(this).attr('rel'));
//        button.attr('href', $(this).attr('href'));
//        modal.modal('show');
//        return false;
//    });
//    $('#delete-widget').on('click', 'a.widget-disable-button', function (e) {
//        id = $(this).attr('rel');
//        href = $(this).attr('href');
//        container = $('div.grid-stack-item[id=' + id + ']');
//        gridstack = container.parents('div.grid-stack:first').data('gridstack');
//        $('#delete-widget').modal('hide');
//
//        $.ajax({
//            url: href,
//            success: function (response) {
//                gridstack.remove_widget(container);
//                $('a.add-widget[rel=' + id + ']').parent().removeClass('hidden');
//            },
//            error: function (error) {
//                noty({
//                    text: error.responseJSON.message,
//                    type: 'error',
//                    dismissQueue: true,
//                    layout: 'bottomRight',
//                    closeWith: ['click'],
//                    theme: 'relax',
//                    maxVisible: 10,
//                    timeout: 3000,
//                    animation: {
//                        open: 'animated bounceInRight',
//                        close: 'animated bounceOutRight',
//                        easing: 'swing',
//                        speed: 500
//                    }
//                });
//            }
//        });
//        gridstack.batch_update();
//        gridstack.commit();
//
//
//        return false;
//    });
//
//
//    $('div.grid-stack-item').on('click', 'a.widget-refresh', function (e) {
//        e.preventDefault();
//        handler = $(this);
//        container = handler.parents('.panel:first').find('.panel-body:first');
//        $.ajax({
//            url: handler.attr('href'),
//            success: function (response) {
//                container.html(response);
//                handler.parents('.btn-group').removeClass('open');
//                handler.parents('.btn').removeClass('dropdown-toggle');
//            }
//        });
//        return false;
//    });
//    $('div.app-inner__top-bar').on('click', 'i.icon-grid', function (e) {
//        e.preventDefault();
//        var gridStack = new Grid('.grid-stack');
//
//        $('div.gridable-container').toggleClass(function (index, currentclass) {
//            if ($(this).is('.overlayed') == false) {
//                gridStack.enable();
//            } else {
//                gridStack.disable();
//            }
//            return "overlayed";
//        });
//        return false;
//    });
//});
