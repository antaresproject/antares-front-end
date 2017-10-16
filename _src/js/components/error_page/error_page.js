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

$(document).ready(() => {
  $('.open-modal').on('click', function() {
    APP.modal.init({
      element: '.modal--problem',
      title: 'Something went wrong...',
      buttons: {
        Confirm: {
          type: 'primary',
          action: function() {
            alert('action1');
            $.modal.close();
          }
        },
        Cancel: {
          type: 'default',
          action: function() {
            $.modal.close();
          }
        }
      }
    });
  });
  // $('.open-modal').on('click', () => {
  //   const currentDialog = document.querySelector('dialog.is-current');
  //
  //   APP.dialog.init({
  //     content: 'There are many variations of pa Ipsum genera any variations of pa Ipsum genera any variations of pa Ipsum genera any variations of pa Ipsum genera',
  //     title: 'This is Diablog box TEST',
  //     actionPosition: 'right',
  //
  //     buttons: {
  //       Confirm: {
  //         type: 'primary',
  //         action() {
  //             window.noty(
  //                 $.extend({}, APP.noti.successFM('lg', 'border'), {
  //                     text: 'Confirmed!'
  //                 })
  //             );
  //             window.dialog.close();
  //         }
  //       },
  //       Cancel: {
  //         type: 'default',
  //         action() {
  //           window.dialog.close();
  //         }
  //       }
  //     }
  //   });
  // });
});
