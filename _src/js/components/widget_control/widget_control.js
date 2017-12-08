import _ from 'underscore';
// Antares Gridsack Widgets Control
let savedPositions = [];
export default {
    init() {
        this.widgetAdd();
        this.filterWidgets();
        this.gsMaximize();
        this.gsHeightAdjust();
        this.gsResize();
        this.gsZeroDataRWD();
        this.gsDashboardRWD();
        this.gsEditMode();
        this.gsRWDGeneral();
        this.gsClientsDetailsRWD();
        // this.backendClientDetailsRWD();
        this.rwdHelperDev();
        this.backend();
        let self = this
        setTimeout(function () {
            self.saveGridParams();
        },1000)
    },
    // methods

    backend() {
        window.antaresEvents.on('dt_data_loaded', dtInstance => {
            $(dtInstance)
                .find('tbody')
                .adjustCardHeight();
        });
    },
    widgetAdd() {
        const self = this;
        const $el = $('.card-bar .card-bar__sgl');
        const $container = $('.main-content .grid-stack');

        $container.droppable({
            accept: $el,
            drop(event, ui) {
                // console.log('Widget added!');
            }
        });

        $el.draggable({
            stop(event, ui) {
                // console.log(ui);
                // console.log(event);
            },

            start() {
                // self.simulateNewGsi();
            },
            revert(valid, ui) {
                var $self = $(this);

                if (!valid) {
                    return !valid;
                } else {
                    this.velocity(
                        {
                            opacity: '0'
                        },
                        500,
                        function () {
                            $self.remove();
                            self.filterWidgets();
                        }
                    );
                    return valid;
                }
            }
        });
    },

    filterWidgets() {
        require('list.js');

        let options = {
            valueNames: [
                {
                    data: ['widget']
                }
            ],
            searchClass: 'mdl-textfield__input',
            listClass: 'card-bar__items'
        };

        let widgetSort = new List('widgets-list', options);
    },
    gsRWDGeneral() {
        enquire.register(bpTabMin768Max1199, {
            match() {
                $('.card--chart')
                    .closest('.grid-stack-item')
                    .addClass('grid-size--xs');
                $('.card--logs')
                    .closest('.grid-stack-item')
                    .addClass('grid-size--xs');
            },
            unmatch() {
                $('.card--chart')
                    .closest('.grid-stack-item')
                    .removeClass('grid-size--xs');
                $('.card--logs')
                    .closest('.grid-stack-item')
                    .addClass('grid-size--xs');
            }
        });
    },

    clickClassHelper(arm) {
        if (arm !== false) {
            // selec rects for debugging
            let componentData = [];

            // $(document).bind('keydown', 'alt', e => {

            $('body').on('click.tmp', e => {
                // if (e.target === 'undefined') {
                //   return false;
                // }
                const $target = $(e.target);
                let current = $target.attr('class');

                if (current == undefined) {
                    return false;
                }

                componentData.push(current);

                // removeClass();

                // console.log(componentData);
            });
            // });
            $(document).bind('keyup', e => {
                $(document).off('click.temp');
            });
        }
    },

    widgetInternalRWD() {
        //target = $(.grid-stack-item');
        function clearGridStackRWDClasess($target) {
            // clearGridStackRWDClasess('.')
            //   clearGridStackRWDClasess();
            $target.removeClass('grid-size--xs grid-size--sm grid-size--md grid-size--lg grid-size--xl');
        }

        function addGridStackRWDClasses($target) {
            // init point
            clearGridStackRWDClasess($target);
            window.requestAnimationFrame(() => {
                // const windowW = parseInt($(window).width(), 10);
                const GSWidth = $target.attr('data-gs-width');
                // console.log(windowW);
                if (GSWidth <= 6) {
                    $target.addClass('grid-size--xs');
                } else if (GSWidth <= 8) {
                    $target.addClass('grid-size--sm');
                } else if (GSWidth <= 10) {
                    $target.addClass('grid-size--md');
                } else if (GSWidth <= 12) {
                    $target.addClass('grid-size--lg');
                } else if (GSWidth <= 24) {
                    $target.addClass('grid-size--xl');
                }
            }, 100);
        }

        const grid = $('.grid-stack').data('gridstack');
        const $grid = $('.grid-stack');

        grid.on('change', (event, items) => {
            //   console.log(items);
            // if (items == null) {
            //   return false;
            // }
            // for (let i = 0; i < items.length; i++) {
            //   let $GSItem = $(items[i].el);
            //   addGridStackRWDClasses($GSItem);
            // }
        });
    },
    gsHeightAdjust() {
        const self = this;

        $.fn.adjustCardHeight = function (disablePS) {
            const windowW = $(window).width();
            const $self = this;
            const elem = $(this).closest('.grid-stack-item');
            const grid = $('.grid-stack').data('gridstack');
            const gsi = $(this).closest('.grid-stack-item');
            const gsiHeight = gsi.outerHeight(true);
            const card = gsi.find('.card');
            const cardHeight = card.outerHeight(true);

            if ($('.app-content').hasClass('app-content--widgets-movable')) {
                return false;
            }
            if (card.hasClass('card--unadjustable') || gsi.find('.tbl-c').hasClass('card--unadjustable')) {
                return false;
            }

            if (card.hasClass('card--no-adjust')) {
                return false;
            }

            // fail safe data - attr
            var attr = gsi.attr('data-no-adjust');
            if (typeof attr !== typeof undefined && attr !== false) {
                return false;
            }

            if (disablePS === true) {
                this.closest('.grid-stack-item-content')
                    .find('.ps')
                    .each((index, el) => {
                        $(el).perfectScrollbar('destroy');
                    });
            }

            function heightCalc() {
                let wholeElementHeight = 0;
                let newGsiHeightVal = 0;
                const currentElementHeight = 0;
                // init

                getRealHeight(card.find('.card__content'));

                function getRealHeight(elem) {
                    // if it exists
                    elem.closest('.grid-stack-item').addClass('is-being-calculated');
                    // calc
                    wholeElementHeight = card.outerHeight(true);

                    window.requestAnimationFrame(() => {

                        elem.closest('.grid-stack-item').removeClass('is-being-calculated');
                    });

                    return wholeElementHeight;
                }

                if (grid) {
                    newGsiHeightVal = Math.round((parseInt(wholeElementHeight, 10) + grid.opts.verticalMargin) / (grid.cellHeight() + grid.opts.verticalMargin));
                }

                if (card.hasClass('card--news')) {
                    newGsiHeightVal++;
                }
                //screen and (min-width:768px) and (max-width:1365px)
                enquire.register(bpMin768, {
                    match: function () {
                        // if (!card.hasClass('card--chart')) {
                        window.requestAnimationFrame(() => {
                            gsi.attr('data-gs-height', newGsiHeightVal);
                            if (grid) {
                                grid.resize(gsi, gsi.attr('data-gs-width'), newGsiHeightVal);
                            }
                        });
                        // }
                    },
                    unmatch: function () {
                        window.requestAnimationFrame(() => {
                            gsi.attr('data-gs-height', newGsiHeightVal);

                            if (grid) {
                                grid.resize(gsi, gsi.attr('data-gs-width'), newGsiHeightVal);
                            }
                        });
                    }
                });
            }

            heightCalc();
            return 'Element updated!';
        };

        if (typeof window.oTable === 'function') {
            window.oTable.on('responsive-display', function () {
                $('.tbl-c').adjustCardHeight();
            });
        }
        enquire.register(bpMobLapMin768Max1366, {
            match() {
                $('.card--chart [data-icheck]').each(function () {
                    let self = $(this)
                    $(this).on('ifChanged.checkCompare', function () {
                        $(this)
                            .closest('.card')
                            .find('.card__right .mobile-toogle--target')
                            .css('opacity', '0');
                        window.requestAnimationFrame(() => {
                            $(this)
                                .closest('.card')
                                .find('.card__content')
                                .adjustCardHeight();
                        });
                        window.requestAnimationFrame(() => {
                            $(this)
                                .closest('.card')
                                .find('.card__right .mobile-toogle--target')
                                .css('opacity', '1');
                        });
                    });
                })
                $('.card--info').on('click.checkCardInfo', '.mobile-toogle--box', () => {
                    window.requestAnimationFrame(() => {
                        $('.card--info .card__content').adjustCardHeight();
                    });
                });
                $('.card--contacts').on('click.checkCardContact', '.card__mobile-toggle', () => {
                    window.requestAnimationFrame(() => {
                        $('.card--contacts').adjustCardHeight();
                    });
                });
            },
            unmatch() {
                $('.card--chart [data-icheck]').each(function () {
                    $(this).off('ifChanged.checkCompare');
                })
                $('.card--info').off('click.checkCardInfo', '.mobile-toogle--box');
                $('.card--contacts').off('click.checkCardContact', '.card__mobile-toggle');
            }
        });


        $('.card--logs').on('click', '.pagination', (index, el) => {
            window.requestAnimationFrame(() => {
                if (parseInt($(window).width(), 10) > 767) {
                    $('.card--logs .card__content').adjustCardHeight();
                    // console.log('should work');
                }
                // console.log('reason');
            });
        });

        $('.card-datatables').on('click', '.add-filter, .change-filter', (index, el) => {
            window.requestAnimationFrame(() => {
                if (parseInt($(window).width(), 10) > 767) {
                    $('.card-datatables .card').adjustCardHeight();
                }
            });
        });

        $('tbl-c:not(.selected-mode--active)').on('click', 'td:first-of-type', (index, el) => {
            window.requestAnimationFrame(() => {
                if (parseInt($(window).width(), 10) > 767) {
                    $('.card-datatables .card').adjustCardHeight();
                }
            });
        });

        $('.select--category').on('select2:select', function (e) {
            $(e.target)
                .closest('.tbl-c')
                .adjustCardHeight();
        });

        const thisWW = $(window).width();

        function gsiAdjust() {
            $('.grid-stack-item').each((index, elem) => {
                window.requestAnimationFrame(() => {
                    $(elem)
                        .find('.card__content')
                        .adjustCardHeight();
                    $(elem)
                        .find('.tbl-c')
                        .adjustCardHeight();
                });
            });
        }


        enquire.register(bpTabVMin768Max1023, {
            match: function () {
                gsiAdjust();
            },
            unmatch: function () {
                gsiAdjust();
            }
        });
        enquire.register(bpTabHMin1024Max1199, {
            match: function () {
                gsiAdjust();
            },
            unmatch: function () {
                gsiAdjust();
            }
        });
        enquire.register(bpLapMin1200Max1366, {
            match: function () {
                gsiAdjust();
            }
        });
    },
    saveGridParams() {
        const self = this;
        if (savedPositions === undefined) {
            return;
        }
        if (savedPositions.length === 0) {
            $('.grid-stack-item').each(function (index) {
                const $this = $(this);
                $this.attr('data-antares-grid-index', index)
                savedPositions.push({
                    x: $this.attr('data-gs-x'),
                    y: $this.attr('data-gs-y'),
                    w: $this.attr('data-gs-width'),
                    h: $this.attr('data-gs-height')
                });
            });
        }
        else {
            $('.grid-stack-item').each(function () {
                const $this = $(this);
                let indexOfWidget = $this.attr('data-antares-grid-index')
                savedPositions[indexOfWidget].x = $this.attr('data-gs-x')
                savedPositions[indexOfWidget].y = $this.attr('data-gs-y')
                savedPositions[indexOfWidget].w = $this.attr('data-gs-width')
                savedPositions[indexOfWidget].h = $this.attr('data-gs-height')
            });
        }
    },
    gsMaximize() {
        const self = this;
        $('#app-wrapper .card .card-maximize').each(function () {
            const $maximizeButton = $(this);
            $maximizeButton.on('click', function () {
                const $self = $(this);
                const widget = $(this).closest('.grid-stack-item');
                const indexOfWidget = parseInt(widget.attr('data-antares-grid-index'), 10)
                const grid = $(this)
                    .closest('.grid-stack')
                    .data('gridstack'); //set best height to simulate modal
                const currentCellH = grid.cellHeight();
                const headH = $('.main-head').outerHeight(true);
                const windowH = $(window).height();
                const appropriateHeight = (windowH - headH - 485) / currentCellH;
                const openCloseSwitch = $(this).data('openCloseSwitch'); //identify card number
                const index = widget.index();
                widget.addClass('recently-click-grid')
                if (!openCloseSwitch) {
                    grid.update(widget, 0, 0, 24, appropriateHeight);
                    $('.app-content').scrollTop(0);
                    widget.addClass('is-maximized');
                    widget.find('.card__content').adjustCardHeight();
                } else {

                    $('.grid-stack-item').each((index, el) => {
                        if ($(el).hasClass('is-maximized') && $(el).hasClass('recently-click-grid')) {
                            grid.update(el, parseInt(savedPositions[index].x, 10), parseInt(savedPositions[index].y, 10), parseInt(savedPositions[index].w, 10), parseInt(savedPositions[index].h, 10));
                        } else if ($(el).not('.recently-click-grid') && $(el).hasClass('is-maximized')) {
                        }
                        else if ($(el).not('.is-maximized') && $(el).not('.recently-click-grid')) {
                            grid.update(el, parseInt(savedPositions[index].x, 10), parseInt(savedPositions[index].y, 10), parseInt(savedPositions[index].w, 10), parseInt(savedPositions[index].h, 10));
                        }
                    });
                    widget.removeClass('is-maximized');
                    widget.find('.card__content').adjustCardHeight();
                    window.requestAnimationFrame(() => {
                        $('.grid-stack-item:not(.is-maximized)').each(function () {
                            $(this).find('.card:not(.card--chart)').adjustCardHeight();
                        })
                    })
                    $($('.is-maximized').get().reverse()).each(function (index,el) {
                        grid.update(el, 0, 0, 24, 12);
                        $(this).find('.card').adjustCardHeight();
                    })
                }
                setTimeout(function () {
                    widget.removeClass('recently-click-grid')
                }, 500)
                $(this).data('openCloseSwitch', !openCloseSwitch);
            });
        })

    },
    gsDashboardRWD() {
        //enumerate
        $('.grid-stack-item .card--chart').each((index, elem) => {
            $(elem).attr('data-chart-number', index + 1);
        });

        var grid = $('.grid-stack').data('gridstack');
        const dashboard = $('.page-dashboard');
        const w = $(window).width();
        const c1 = $('.card--chart').eq(0);
        const c2 = $('.card--chart').eq(1);
        const c3 = $('.card--chart').eq(2);
        const c4 = $('.card--chart').eq(3);
        const systemInfo = $('.card--info');
        const news = $('.card--news');
        const systemLogs = $('.card--logs');

        if (dashboard.length) {
            enquire.register(bpDesMin1367, {
                match() {
                    window.requestAnimationFrame(() => {
                        $('.card--chart').each(function () {
                            $(this).cardResize($(this).attr('data-gs-x'), $(this).attr('data-gs-y'), $(this).attr('data-gs-width'), 10);
                            $(this)
                                .closest('.grid-stack-item')
                                .attr('data-gs-min-height', '10');
                        });
                        $('.card--logs').each(function () {
                            $(this)
                                .closest('.grid-stack-item')
                                .attr('data-gs-min-height', '8');
                        });
                        $('.card--info').each(function () {
                            $(this)
                                .closest('.grid-stack-item')
                                .attr('data-gs-min-height', '8');
                        });
                        $('[data-scrollable]').perfectScrollbar();
                    });
                }
            });
            enquire.register(bpDesBigMin1450, {
                match() {
                    window.requestAnimationFrame(() => {
                        c1.cardResize(0, 0, 12, 10);
                        c2.cardResize(12, 0, 12, 10);
                        c3.cardResize(0, 10, 12, 10);
                        c4.cardResize(12, 10, 12, 10);
                        systemInfo.cardResize(0, 20, 6, 10);
                        news.cardResize(6, 20, 6, 10);
                        systemLogs.cardResize(12, 20, 12, 12);
                    });
                }
            });
            enquire.register(bpLapDesMin1200max1449, {
                match() {
                    window.requestAnimationFrame(() => {
                        c1.cardResize(0, 0, 12, 14);
                        c2.cardResize(12, 0, 12, 14);
                        c3.cardResize(0, 14, 12, 14);
                        c4.cardResize(12, 14, 12, 14);
                        systemInfo.cardResize(0, 28, 6, 10);
                        news.cardResize(6, 28, 6, 10);
                        systemLogs.cardResize(12, 28, 12, 12);
                    });
                }
            });
            enquire.register(bpTabMin768Max1199, {
                match() {
                    c1.cardResize(0, 0, 12, 20);
                    c2.cardResize(12, 0, 12, 14);
                    c3.cardResize(0, 20, 12, 14);
                    c4.cardResize(12, 14, 12, 14);
                    systemInfo.cardResize(0, 34, 12, 13);
                    news.cardResize(12, 28, 12, 18);
                    systemLogs.cardResize(0, 48, 24, 17);
                }
            });
        }
    },
    gsZeroDataRWD() {
        //enumerate
        $('.grid-stack-item .card--zd').each((index, elem) => {
            $(elem).attr('data-chart-number', index + 1);
        });

        var grid = $('.grid-stack').data('gridstack');
        const zeroData = $('.page-zero-data');
        const cz1 = $('.card--zd').eq(0);
        const cz2 = $('.card--zd').eq(1);
        const cz3 = $('.card--zd').eq(2);
        const cz4 = $('.card--zd').eq(3);

        if (zeroData.length) {
            enquire.register(bpTabDesMin1024max1449, {
                match() {
                    setTimeout(function () {
                        // window.requestAnimationFrame(() => {
                        cz1.cardResize(0, 0, 6, 10);
                        cz2.cardResize(0, 10, 10, 12);
                        cz3.cardResize(0, 24, 12, 16);
                        cz4.cardResize(0, 40, 16, 18);
                    }, 300);
                }
            });
            enquire.register(bpTabVMin768Max1023, {
                match() {
                    setTimeout(function () {
                        // window.requestAnimationFrame(() => {
                        cz1.cardResize(0, 0, 7, 10);
                        cz2.cardResize(0, 10, 10, 12);
                        cz3.cardResize(0, 24, 14, 18);
                        cz4.cardResize(0, 40, 16, 18);
                    }, 300);
                }
            });
        }
    },
    gsClientsDetailsRWD() {
        if (!$('.page-clients-details').length) {
            return false;
        }

        const grid = $('.grid-stack').data('gridstack');
        const cardInfo = $('.card--detail-info');
        const cardContacts = $('.card--contacts');
        const cardTabs = $('.card--tabs');
        const cardLogs = $('.card--logs');
        const cardSmallChart = $('.card--chart-small');

        // how to? paramaters: newX, newY, newWidth, newGsiHeightVal
        enquire.register(bpDesMin1367, {
            match() {
                cardInfo.cardResize(0, 0, 5, 20);
                cardTabs.cardResize(5, 0, 14, 19);
                cardSmallChart.cardResize(19, 0, 5, 11);
                cardContacts.cardResize(0, 20, 5, 10);
                cardLogs.cardResize(5, 19, 14, 16);
            }
        });
        enquire.register(bpTabLapMin1024Max1366, {
            match() {
                cardInfo.cardResize(0, 0, 8, 20);
                cardTabs.cardResize(8, 0, 16, 18);
                cardSmallChart.cardResize(0, 31, 8, 12);
                cardContacts.cardResize(0, 20, 8, 11);
                cardLogs.cardResize(8, 19, 16, 10);
            }
        });
        enquire.register(bpTabVMin768Max1023, {
            match() {
                cardInfo.cardResize(0, 0, 9, 20);
                cardTabs.cardResize(9, 0, 15, 18);
                cardSmallChart.cardResize(0, 31, 9, 12);
                cardContacts.cardResize(0, 20, 9, 11);
                cardLogs.cardResize(9, 20, 15, 10);
            }
        });
    },
    gsEditMode() {
        const grid = $('.grid-stack').data('gridstack');

        const $grid = $('.grid-stack');

        function enableGrid() {
            window.requestAnimationFrame(() => {
                $('.app-content').addClass('app-content--widgets-movable');
                $('#widgets-edit')
                    .children('i')
                    .removeClass('icon--widgets-edit')
                    .addClass('icon--widgets-edit-alt');
                grid.enable();
                $grid.find('.grid-stack-item').each((index, el) => {
                    grid.movable($(el), true);
                });
            });
            // $('.app-content--widgets-movable .grid-stack').draggable(); //active this
        }

        function disableGrid() {
            window.requestAnimationFrame(() => {
                if (grid !== undefined) {
                    grid.disable();
                    $('#widgets-edit')
                        .children('i')
                        .removeClass('icon--widgets-edit-alt')
                        .addClass('icon--widgets-edit');
                    $('.app-content').removeClass('app-content--widgets-movable');
                }
            });
        }

        // Disable on mobile & tabletss
        enquire.register(bpTabMax1199, {
            match() {
                disableGrid();
            }
        });

        $('#widgets-edit').on('click', e => {
            e.preventDefault();

            if ($('.app-content').hasClass('app-content--widgets-movable')) {
                disableGrid();
            } else {
                enableGrid();
            }
        });

        // manual close button
        $('.card-bar__close').on('click', e => {
            disableGrid();
        });

        // remove Widgets
        $(document).on('click', '.remove-button', function () {
            const $el = $(this).closest('.grid-stack-item');

            APP.swal.init('skin1', 'typeInfo', {
                title: 'Are you sure?',
                text: 'Widget will be removed.'
            });

            $('.sweet-container').addClass('widget-remove');
            $('.sweet-container.widget-remove .sweet-confirm').on('click', () => {
                window.requestAnimationFrame(() => {
                    grid.removeWidget($el[0]);
                });
            });
            $('.sweet-container').removeClass('widget-remove');
        });
    },
    gsResize() {
        $.fn.cardResize = function (newX, newY, newWidth, newGsiHeightVal) {
            const grid = $('.grid-stack').data('gridstack');
            const gsi = this.closest('.grid-stack-item');
            const originalX = this.attr('data-gs-x');
            const originalY = this.attr('data-gs-y');
            const originalW = this.attr('data-gs-width');
            const originalH = this.attr('data-gs-height');

            function doTheResize() {
                if (typeof grid !== 'undefined') {
                    // console.log('update:', newX, newY, newWidth, newGsiHeightVal);
                    grid.update(gsi, newX, newY, newWidth, newGsiHeightVal);
                }
            }

            doTheResize();
        };
    },
    gsClientsListRWD() {
        if (!$('.page-datatables').length) {
            return false;
        }
        const grid = $('.grid-stack').data('gridstack');
        const cardTable = $('.grid-stack')
            .find('.tbl-c')
            .closest('.card');
        enquire.register(bpDesMin1367, {
            match() {
                cardTable.cardResize(0, 0, 24, 19);
            }
        });
    },
    backendClientDetailsRWD() {
        //        if (!$('.page-clients-details').length) {
        //            return false;
        //        }

        const grid = $('.grid-stack').data('gridstack');
        const cardInfo = $('.card--detail-info');
        const cardContacts = $('.card--contacts');
        const cardTabs = $('.card--tabs');
        const cardLogs = $('.card--logs');
        const cardSmallChart = $('.card--chart-small');

        // how to? paramaters: newX, newY, newWidth, newGsiHeightVal
        //desktop
        $('.grid-stack-item').each(function (index, item) {
            var $desktop = $(item).data('desktop'),
                $tablet = $(item).data('tablet'),
                $mobile = $(item).data('mobile');

            if ($desktop !== undefined) {
                // console.log($desktop);
                enquire.register(bpDesMin1367, {
                    match() {
                        $(item).cardResize($desktop[0], $desktop[1], $desktop[2], $desktop[3]);
                        window.requestAnimationFrame(() => {
                            $(item).adjustCardHeight();
                        });
                    }
                });
            }
            if ($tablet !== undefined) {
                enquire.register(bpMobLapMin768Max1366, {
                    match() {
                        $(item).cardResize($tablet[0], $tablet[1], $tablet[2], $tablet[3]);
                        window.requestAnimationFrame(() => {
                            $(item).adjustCardHeight();
                        });
                    }
                });
            }
            if ($mobile !== undefined) {
                enquire.register(bpMobMax767, {
                    match() {
                        $(item).cardResize($mobile[0], $mobile[1], $mobile[2], $mobile[3]);
                        window.requestAnimationFrame(() => {
                            $(item).adjustCardHeight();
                        });
                    }
                });
            }
        });
    },
    rwdHelperDev() {
        //tmp menu helper
        //         $(document).bind('keydown', 'alt', e => {
        //           $('.main-menu--primary .has-submenu').eq(0).addClass('submenu-open');
        //         });

        require('./../../external/jquery.hotkeys.js');
        let grid = $('.grid-stack').data('gridstack');
        $(document).bind('keydown', 'alt+q', function () {
            let serializedData = _.map(
                $('.grid-stack > .grid-stack-item:visible'),
                function (el) {
                    el = $(el);
                    var node = el.data('_gridstack_node');
                    return {
                        title: $(el)
                            .find('.card')
                            .attr('class'),
                        x: node.x,
                        y: node.y,
                        width: node.width,
                        height: node.height
                    };
                },
                this
            ); // give it to me
            console.log(serializedData);
        });
    }
};
