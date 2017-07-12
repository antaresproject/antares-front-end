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

$(document).ready(function() {
    $('.open-modal').on('click', function() {
        APP.modal.init({

            element: '.modal--problem',
            title: 'Success Confirmation Modal',
            buttons: {
                'Confirm': {
                    type: 'primary',
                    action: function() {
                        alert('action1');
                        $.modal.close();
                    },
                },
                'Cancel': {
                    type: 'default',
                    action: function() {
                        $.modal.close();
                    },
                },
            }
        });
    });

    $('.go-back').on('click', function() {
        history.go(-1);
    });

});
