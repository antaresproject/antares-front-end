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


"use strict";
/*jslint browser: true*/
/*global $, jQuery, alert*/

var DropzoneAntares = (function() {
    var defaults = {
        url: "/target-url/",
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        parallelUploads: 20,
        autoQueue: false,
        init: DropzoneAntares.init
    };

    function DropzoneAntares(handler, attributes) {
        attributes = $.extend({}, defaults, attributes);
        if (handler.length) {
            var srcBase = [];
            Dropzone.autoDiscover = false;
            handler.each(function() {
                (new Dropzone($(this).get(0), attributes)).on("addedfile", function(file) {
                    var read = new FileReader();
                    read.readAsDataURL(file);

                    read.onloadend = function() {
                        srcBase.push(read.result);
                    }
                    $.each($('.dz-preview'), function(index, elem) {

                        var image = $(this).find('.dz-image img');
                        image.hide();
                        setTimeout(function() {

                            image.attr('src', srcBase[index]);
                            image.show();

                        }, 100);

                    });
                });
            });
        }
    }
    DropzoneAntares.prototype.replaceBase64 = function(data) {
        var image = $('.dz-preview:last-child .dz-image img');
        image.hide();
        setTimeout(function() {

            image.attr('src', data);
            image.show();

        }, 400);

    },
    DropzoneAntares.prototype.manualUpload = function() {

        //input file manual
        $('.file-upload').each(function(index, el) {

            $(this).find('input.input-upload').on('change', function() {

                var curVal = $(this).val();

                $(this).siblings('.file-path').val(curVal);

            });

        });

    }
    return DropzoneAntares;
}());
$(document).ready(function() {
    var handler = ".dropzone-form";
    var dropzone = new DropzoneAntares($(handler), { url: "dupa" });
    dropzone.manualUpload();
    $('#app-wrapper').on('DOMNodeInserted', handler, function() {
        dropzone.manualUpload();
    });
});
