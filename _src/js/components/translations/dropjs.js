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

/* global enquire */

// COMPONENT NAME

export const translationsDropJs = {
    init() {
        this.dropJS();
        this.translationSelect2()
    },

    // methods

    dropJS() {
        const translationPageID = document.querySelector('.page-translations');

        if (translationPageID == null) {
            return false;
        }

        let translationDrop = new Drop({
            target: $('.dropjs-translations--target')[0],
            content: $('.dropjs-translations--content')[0],
            position: 'bottom right',
            openOn: 'click',
            constrainToWindow: true,
            constrainToScrollParent: true,
            classes: 'dropjs-translations',
            hoverOpenDelay: 0,
            hoverCloseDelay: 50,
            focusDelay: 0,
            blurDelay: 50,
            tetherOptions: {}
        });
        translationDrop.open();
        translationDrop.position();
        translationDrop.close();
    },
    translationSelect2(){
        //on init
        $('[data-flag-select-translations]').select2({
            theme: 'translations',
            dropdownAutoWidth: true,
            templateResult: function (data) {
                if (data.element && data.element.attributes['data-country']) {
                    var flagCode = data.element.attributes['data-country'].nodeValue;
                    var $state = $('<span class="flag-icon flag-icon-' + flagCode + '"></span><span>' + data.text + '</span>');
                    return $state;
                } else {
                    return data.text;
                }
            }
        });
        $('select[data-flag-select-translations]').each(function () {
            let thisBtnDrop
            let newFlag
            if ($(this).find('option:selected').length) {
                var flag = $(this).find('option:selected').data('country');
            } else {
                return false;
            }
            $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            if($(this).hasClass('header-translation__translate-select')){
                $($('.dropjs-translations--target').find('.flag-icon')[0]).attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            }
            else if($(this).hasClass('header-translation__compare-select')){
                $($('.dropjs-translations--target').find('.flag-icon')[1]).attr('class', 'flag-icon ' + 'flag-icon-' + flag);
            }



            $(this).select2().on("select2:open",function () {
                thisBtnDrop = $($('.drop-enabled')[0])
            })
            $(this).on('change', function () {
                if ($(this).find('option:selected').length) {
                    newFlag = $(this).find('option:selected').data('country');
                } else {
                    return false;
                }
                $(this).siblings('.input-field__icon').find('.flag-icon').attr('class', 'flag-icon ' + 'flag-icon-' + newFlag);

                if($(this).hasClass('header-translation__translate-select')){
                    $(thisBtnDrop.find('.flag-icon')[0]).attr('class', 'flag-icon ' + 'flag-icon-' + newFlag);
                }
                else if($(this).hasClass('header-translation__compare-select')){
                    $(thisBtnDrop.find('.flag-icon')[1]).attr('class', 'flag-icon ' + 'flag-icon-' + newFlag);
                }

            });

        });
    }
};

window.translationsDropJs = translationsDropJs;

$(() => {
    translationsDropJs.init();
});
