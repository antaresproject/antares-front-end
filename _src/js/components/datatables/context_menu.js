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
const AntaresContextMenu = {
    init() {
        this.arContextMenuMutate();
    },
    arContextMenu() {


        enquire.register('screen and (min-width: 320px)', {
            //mobile readonly for multiple
            match: function () {
                if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
                    var timer;
                    $('.billevo-table tbody tr').on("touchstart", function () {
                        var thisTR = $(this)
                        timer = setTimeout(function () {
                            $('tr').removeClass('is-selected')
                            $('.context-menu-list').trigger('contextmenu:hide')
                            let $self = thisTR;
                            if ($self.hasClass('child')) {
                                $self = $self.prev()
                            }
                            $self.addClass('is-selected')
                            if (!$self.hasClass('is-selected')) {
                                $self.addClass('is-selected');
                                $self.closest('.tbl-c').find('#table-ma').attr("disabled", true);
                            }
                        }, 2 * 500);
                    }).on("touchend", function () {
                        clearTimeout(timer);
                    });
                }
            },
            unmatch: function () {
                $('.billevo-table tbody tr').off("touchstart touchend")
            }
        });


        //each roww
        $('.billevo-table tbody tr:not(.child)').each(function (index, item) {

            enquire.register('screen and (min-width: 320px)', {
                match: function () {
                    if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
                        $.contextMenu({
                            selector: '.billevo-table tbody tr.is-selected td:not(.dt-actions):not(:first-of-type)',
                            build: function (trigger, e) {  // 'trigger' this is the last element (td:not(.dt-actions)) that is written by the line above (30 line)
                                trigger = trigger.closest('tr')
                                if (trigger.is('.child')) {
                                    trigger = trigger.prev(".parent")
                                    return getItems(trigger);
                                }
                                else {
                                    return getItems(trigger);
                                }
                            },
                            trigger: 'left',
                            events: {
                                show: function () {
                                    $('.context-menu-active').each(function () {
                                        $(this).contextMenu("hide");
                                    });

                                },
                            },
                        });
                    }
                    else {
                        $.contextMenu({
                            selector: '.billevo-table tbody tr td:not(.dt-actions)',
                            build: function (trigger, e) {  // 'trigger' this is the last element (td:not(.dt-actions)) that is written by the line above (30 line)
                                $('tr').removeClass('is-selected')
                                trigger = trigger.closest('tr')
                                if (trigger.is('.child')) {
                                    trigger = trigger.prev(".parent")
                                    return getItems(trigger);
                                }
                                else {
                                    return getItems(trigger);
                                }

                            },
                            events: {
                                show: function () {
                                    $('.context-menu-active').each(function () {
                                        $(this).contextMenu("hide");
                                    });
                                    let $self = $(this).closest('tr');
                                    if ($self.hasClass('child')) {
                                        $self = $self.prev()
                                    }
                                    $self.addClass('is-selected')
                                    if (!$self.hasClass('is-selected')) {
                                        $self.closest('table').find('tr').removeClass('is-selected');
                                        $self.addClass('is-selected');
                                        $self.closest('.tbl-c').find('#table-ma').attr("disabled", true);
                                    }
                                },
                            },
                        });
                    }
                },
                unmatch: function () {
                    $.contextMenu('destroy');
                }
            })


            // RIGHT TRIGGER ON DOTS
            $.contextMenu({
                selector: '.billevo-table td.dt-actions',
                build: function (trigger) {
                    return getItems(trigger);
                },
                trigger: 'left',
                events: {
                    show: function () {
                        $('tr').removeClass('is-selected')
                        $('.context-menu-active').each(function () {
                            $(this).contextMenu("hide");
                        });

                        var $self = $(this).closest('tr');
                        $self.addClass('is-selected')
                        if (!$self.hasClass('is-selected')) {
                            $self.closest('.tbl-c').find('#table-ma').attr("disabled", true);
                        }
                    },
                },
            });
        });


        let getItems = function (trigger) {
            var element = {},
                elements = {},
                $target = $(trigger);
            if ($(trigger).is('tr')) {
                var $target = $(trigger);
            } else if ($(trigger).is('td')) {
                var $target = $(trigger).closest('tr');
            }

            function isURL(str) {
                var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return pattern.test(str);
            }

            //if multiActions
            if ($target.closest('.tbl-c').find('tr.is-selected').length > 1) {
                $(trigger).closest('.tbl-c').find('#table-ma').closest('.ddown').find('.ddown__menu li').each(function (index, el) {
                    var $el = $(el),
                        $name = $el.find('>a span:first').text(),
                        $text = $el.find('>a span:first').text(),
                        $icon = $icon[1],
                        $href = $el.find('>a').attr('href');
                    element[$name] = {
                        'callback': function () {
                            if (isURL($href) && $href !== '#') {
                                window.location.href = $href;
                            }
                        },
                        'icon': $icon,
                        'name': $text,
                    };
                    elements = $.extend({}, element);
                });//This function is responsible for the menu (quantity <a>)
                return {
                    items: elements
                };
            }
            //if single action
            else {
                $target.find('.cm-actions > ul > li > a').each(function (index, el) {  //This function is responsible for the menu (quantity <a>)
                    var $el = $(el),
                        $name = $el.text(),
                        $text = $el.data('text'),
                        $icon = $el.data('icon'),
                        $href = $el.attr('href');
                    element[$name] = {
                        'callback': function () {
                            if (isURL($href) && $href !== '#') {
                                window.location.href = $href;
                            }
                        },
                        'icon': $icon,
                        'name': $text,
                    };
                    // has submenu
                    if ($(el).closest('li').find('> ul').length) {
                        element[$name] = {
                            'name': $text,
                            // 'icon': $icon,
                            items: {},
                        };
                        var subMenuEl = $(el).closest('li').find('> ul a');
                        subMenuEl.each(function (index, el) {
                            var $el = $(el),
                                $subName = $el.text(),
                                $subText = $el.data('text'),
                                $subIcon = $el.data('icon'),
                                $subHref = $el.attr('href');
                            element[$name].items[$subName] = {
                                'callback': function () {
                                    if (isURL($subHref) && $subHref !== '#') {
                                        window.location.href = $subHref;
                                    }
                                },
                                'icon': $subIcon,
                                'name': $subText,
                            };
                        });
                    }
                    elements = $.extend({}, element);
                });//This function is responsible for the menu (quantity <a>)
                return {
                    items: elements
                };
            }
        };


        //fix - close on body
        $('#app-wrapper').on('click', function () {
            $('.context-menu-active').each(function () {
                $(this).contextMenu("hide");
            });
        });
    },
    arContextMenuMutate() {
        var self = this;
        ready('.tbl-c .dataTable tr', function (element) {
            self.arContextMenu();
        });
    }
};
$(function () {
    window.AntaresContextMenu = AntaresContextMenu;
    AntaresContextMenu.init();
});
