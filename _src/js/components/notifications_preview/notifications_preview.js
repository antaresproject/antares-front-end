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
    notiOpenModal(){
        $('.open-box--modal').on('click', function () {
            APP.modal.init({
                element: '.modal--problem',
                title: 'Modal box Preview',
                buttons: {
                    Confirm: {
                        type: 'primary',
                        action: function () {
                            window.noty(
                                $.extend({}, APP.noti.successFM('lg', 'border'), {
                                    text: 'Confirmed modal!'
                                })
                            );
                            $.modal.close();
                        }
                    },
                    Cancel: {
                        type: 'default',
                        action: function () {
                            $.modal.close();
                        }
                    }
                }
            });
        });
    },
    notiOpenDialog(){
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
    notiOpenNoty(){
        $('.open-box--noty-success').click(function () {
            window.noty(
                $.extend({}, APP.noti.successFM('lg', 'border'), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM('md', 'border'), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM("md",  "border", "noIcon"), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM('md', 'bg'), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM('md', 'bg', "noIcon"), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM('sm', 'noIcon'), {
                    text: 'Preview Noty success'
                })
            );
            window.noty(
                $.extend({}, APP.noti.successFM("xs",  "bg", "noIcon"), {
                    text: 'Preview Noty success'
                })
            );
        })
        $('.open-box--noty-alert').click(function () {
            window.noty(
                $.extend({}, APP.noti.alertFM('lg', 'border'), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM('md', 'border'), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM("md",  "border", "noIcon"), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM('md', 'bg'), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM('md', 'bg', "noIcon"), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM('sm', 'noIcon'), {
                    text: 'Preview Noty alert'
                })
            );
            window.noty(
                $.extend({}, APP.noti.alertFM("xs",  "bg", "noIcon"), {
                    text: 'Preview Noty alert'
                })
            );
        })
        $('.open-box--noty-warning').click(function () {
            window.noty(
                $.extend({}, APP.noti.warningFM('lg', 'border'), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM('md', 'border'), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM("md",  "border", "noIcon"), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM('md', 'bg'), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM('md', 'bg', "noIcon"), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM('sm', 'noIcon'), {
                    text: 'Preview Noty warning'
                })
            );
            window.noty(
                $.extend({}, APP.noti.warningFM("xs",  "bg", "noIcon"), {
                    text: 'Preview Noty warning'
                })
            );
        })
        $('.open-box--noty-info').click(function () {
            window.noty(
                $.extend({}, APP.noti.infoFM('lg', 'border'), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM('md', 'border'), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM("md",  "border", "noIcon"), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM('md', 'bg'), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM('md', 'bg', "noIcon"), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM('sm', 'noIcon'), {
                    text: 'Preview Noty info'
                })
            );
            window.noty(
                $.extend({}, APP.noti.infoFM("xs",  "bg", "noIcon"), {
                    text: 'Preview Noty info'
                })
            );
        })
    },
    notiOpenSweetAlert(){
        $('.open-box--sweet-alert-theme1').click(function () {
            APP.swal.init('skin1', 'typeError', {
                title: 'Sweet Alert Preview Title',
                text: 'Sweet Alert Preview Text'
            });
        })
        $('.open-box--sweet-alert-theme2').click(function () {
            APP.swal.init('skin2', 'typeError', {
                title: 'Sweet Alert Preview Title',
                text: 'Sweet Alert Preview Text'
            });
        })
    }


};

$(() => {
    AntaresNotificationsPreview.init();
});


window.AntaresNotificationsPreview = AntaresNotificationsPreview;
