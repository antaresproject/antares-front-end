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

export const AntaresNotificationsPreview = {
  init() {
    this.notiOpenModal();
    this.notiOpenDialog();
    this.notiOpenNoty();
    this.notiOpenSweetAlert();
  },

  // methods
  notiOpenModal() {
    $('.open-box--modal').on('click', function() {
      APP.modal.init({
        element: '.modal--problem',
        title: 'Modal box Preview',
        buttons: {
          Confirm: {
            type: 'primary',
            action: function() {
              AntaresNoty.callNoty('success', 'Confirmed modal', 'lg', 'border');
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
  },
  notiOpenDialog() {
    $('.open-box--dialog').on('click', () => {
      APP.dialog.init({
        content: 'There are many variations of pa Ipsum genera any variations of pa Ipsum genera any variations of pa Ipsum genera any variations of pa Ipsum genera',
        title: 'This is Diablog box Preview',
        actionPosition: 'right',
        buttons: {
          Confirm: {
            type: 'primary',
            action() {
              window.noty(
                $.extend({}, APP.noti.successFM('lg', 'border'), {
                  text: 'Confirmed dialog!'
                })
              );
              window.dialog.close();
            }
          },
          Cancel: {
            type: 'default',
            action() {
              window.dialog.close();
            }
          }
        }
      });
    });
  },
  notiOpenNoty() {
    $('.open-box--noty-success').click(function() {
      AntaresNoty.callNoty('success', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered', 'lg', 'border');
    });
    $('.open-box--noty-alert').click(function() {
      AntaresNoty.callNoty('alert', 'Preview Noty alert', 'lg', 'border');
    });
    $('.open-box--noty-warning').click(function() {
      AntaresNoty.callNoty('warning', 'Preview Noty warning', 'lg', 'border');
    });
    $('.open-box--noty-info').click(function() {
      AntaresNoty.callNoty('info', 'Preview Noty info', 'lg', 'border');
    });
  },
  notiOpenSweetAlert() {
    $('.open-box--sweet-alert-theme1').click(function() {
      APP.swal.init('skin1', 'typeError', {
        title: 'Sweet Alert Preview Title',
        text: 'Sweet Alert Preview Text'
      });
    });
    $('.open-box--sweet-alert-theme2').click(function() {
      APP.swal.init('skin2', 'typeError', {
        title: 'Sweet Alert Preview Title',
        text: 'Sweet Alert Preview Text'
      });
    });
  }
};

$(() => {
  AntaresNotificationsPreview.init();
});

window.AntaresNotificationsPreview = AntaresNotificationsPreview;
