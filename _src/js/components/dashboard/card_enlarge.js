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
 * @package    Antares Front-end
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

$(function() {

    $('.card-enlarge').on('click', function() { 

        //close
        if ($(this).closest('.jquery-modal.current').length) { 
            $.modal.close(); 
        } else { 
 
            //open
            var currentCard = $(this).closest('.card').data('widget-name'),
                bigCard = $('.' + currentCard + '.card--enlarged'),
                contentWidth = $(this).closest('.main-content').width(),
                contentHeight = $(window).outerHeight(true),
                sidebarW = $('.main-sidebar').width(),
                scrollingContainer = $(this).closest('.card__content');

            //fire modal with card inside
            bigCard.modal();


            enquire.register("screen and (min-width:1200px)", {

                match: function() {

                    // positioning & size               
                    $('.jquery-modal.current .modal').css({
                        'width': contentWidth,
                        'height': contentHeight - (24 * 2),
                        'margin-left': sidebarW,
                        'margin-top': '24px',
                        'padding': '0',
                    });
                    // positioning & size               
                    $('.jquery-modal.current').css({
                        'padding': '0',
                    });

                },
                unmatch: function() { 
                    // positioning & size               
                    $('.jquery-modal.current .modal').css({
                        'width': contentWidth,
                        'height': contentHeight - (24 * 2),
                        'margin-left': '24px',
                        'margin-right': '24px',
                        'margin-top': '24px',
                        'padding': '0',
                    });
                    // positioning & size               
                    $('.jquery-modal.current').css({
                        'padding': '0',
                    });
                }

            });

        }

    });

});