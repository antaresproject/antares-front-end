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
 * @version    0.9.2
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */


export const listOfDropJS = {
    init() {
        this.initDropJS()
    },

    initDropJS(){
        $(document).on('mouseover', "[data-dropJS--target]", function (event) {
            // Element already has a qTip? Return.
            if ($(this).hasClass('drop-target')) {
                return;
            }
            $(this).each(function () {
                let dropJS = new Drop({
                    position: 'bottom left',
                    openOn: 'click',
                    classes: 'data-dropJS--target',
                    target: $(this)[0],
                    content: $(this).find('[data-dropJS--wrapper]')[0],
                    tetherOptions: {
                        constraints: [
                            {
                                to: 'scrollParent',
                                pin: true
                            }
                        ]
                    }
                })
                dropJS.open();
                dropJS.position();
                dropJS.close();
            })
        })



        $(document).on('mouseover', "[data-dropJS-hover--target]", function (event) {
            // Element already has a qTip? Return.
            if ($(this).hasClass('drop-target')) {
                return;
            }
            $(this).each(function () {
                let dropJShover = new Drop({
                    position: 'right top',
                    openOn: 'hover',
                    classes: 'data-dropJS--target',
                    target: $(this)[0],
                    content: $(this).find('[data-dropJS-hover--wrapper]')[0],
                    tetherOptions: {
                        constraints: [
                            {
                                to: 'scrollParent',
                                pin: true
                            }
                        ]
                    }
                })
                dropJShover.open();
                dropJShover.position();
                dropJShover.close();
            })
        })


    }

};

$(() => {
    listOfDropJS.init();
    window.listOfDropJS = listOfDropJS;
});


