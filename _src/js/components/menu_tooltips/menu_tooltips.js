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
const AntaresMenuTooltips = {
    init() {
        this.ActiveMenuTooltips();

    },
    ActiveMenuTooltips() {
        $('.main-menu > li .submenu').find('.submenu__content li').each(function (index, el) {
            let data = $(el).attr('data-name');
            if (data !== undefined) {
                $(el).on('mouseover', function () {
                    $(el).closest('.submenu').find('[data-menu-item=' + data + ']').velocity({
                        opacity: 1
                    }, {
                        duration: 150,
                        display: "block"
                    });
                });
                $(el).on('mouseout', function () {
                    $(".main-sidebar .velocity-animating").velocity("stop", true);
                    $(el).closest('.submenu').find('.menu-tooltip').velocity({
                        opacity: 0
                    }, {
                        duration: 120,
                        display: "none"
                    });
                });
            }
        });
    },
};
$(function () {
    window.AntaresMenuTooltips = AntaresMenuTooltips;
    AntaresMenuTooltips.init();
});
