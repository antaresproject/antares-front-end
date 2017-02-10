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

//
// Search Auto Complete Component 
//

// T0D0 :
// Item count - check!
// Highlight term - check!
// Categoriez - check! 
// Load More - check!
// data-protection - WIP!
// Integration with old V - WIP!

AntaresAC = function() {};

AntaresAC.prototype.init = function() {

    var self = this;

    if ($("#main-search").length === 0) {
        return false;
    }

    self.helpers.updateDOM();
    self.logic();

}

AntaresAC.prototype.data = {

    // TYPE: CLEAN
    clean: [
        { type: 'clean', label: "anders", category: "" },
        { type: 'clean', label: 'asssad', category: "" },
        { type: 'clean', label: "antal", category: "" },
        { type: 'clean', label: "annhhx10", category: "Products" },
        { type: 'clean', label: "annk K12", category: "Products" },
        { type: 'clean', label: "annttop C13", category: "People" },
        { type: 'clean', label: "anders andersson", category: "People" },
        { type: 'clean', label: "andreas andersson", category: "People" },
        { type: 'clean', label: "andreas johnson", category: "People" },
        { type: 'clean', label: "some site", category: "Website" },
        { type: 'clean', label: "some microsoft", category: "Website" },
        { type: 'clean', label: "some nokia", category: "Website" },
        { type: 'clean', label: "andreas verge", category: "Website" },
        { type: 'clean', label: "some author", category: "Website" },
        { type: 'clean', label: "some objects", category: "Website" },
        { type: 'clean', label: "some not_any_more", category: "Website" }
    ],

    // TYPE: Datarow
    datarow: [
        { type: 'datarow', label: "anders", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "andreas", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "antal", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "annhhx10", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "annk K12", category: "Datarow" },
        { type: 'datarow', label: "annttop C13", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "anders andersson", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "andreas andersson", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "andreas johnson", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some site", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some microsoft", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some nokia", category: "Datarow" },
        { type: 'datarow', label: "andreas verge", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some author", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some objects", category: "Datarow", email: 'some@adress.com' },
        { type: 'datarow', label: "some not_any_more", category: "Datarow", email: 'some@adress.com' }
    ],

    // TYPE: label
    label: [
        { type: 'label', id: '1', label: "pending", category: "Label", labelType: 'pending', labelText: 'Pending' },
        { type: 'label', id: '1', label: "andreas", category: "Label", labelType: 'pending', labelText: 'Pending' },
        { type: 'label', id: '1', label: "pending", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "annhhx10", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "annk K12", category: "Label", labelType: 'danger', labelText: 'Pending' },
        { type: 'label', id: '1', label: "pending", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "anders andersson", category: "Label", labelType: 'pending', labelText: 'Pending' },
        { type: 'label', id: '1', label: "andreas andersson", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "andreas johnson", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "some site", category: "Label", labelType: 'pending', labelText: 'Pending' },
        { type: 'label', id: '1', label: "some microsoft", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "some nokia", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "andreas verge", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "some author", category: "Label", labelType: 'danger', labelText: 'Pending' },
        { type: 'label', id: '1', label: "some objects", category: "Label", labelType: 'success', labelText: 'Success' },
        { type: 'label', id: '1', label: "some not_any_more", category: "Label", labelType: 'pending', labelText: 'Pending' }
    ],

    // TYPE: avatar
    contacts: [
        { type: 'contact', id: '1', label: "pending", label2: 'some-adress@domain.com', labelType: 'danger', labelText: 'Danger', category: "Contacts", avatarURL: 'img/avatar_sample_2.png' },
        { type: 'contact', id: '1', label: "sucess", label2: 'some-adress@domain.com', labelType: 'success', labelText: 'success', category: "Contacts", avatarURL: 'img/avatar_sample_3.png' },
        { type: 'contact', id: '1', label: "info", label2: 'some-adress@domain.com', labelType: 'info', labelText: 'info', category: "Contacts", avatarURL: 'img/avatar_sample_4.png' },
        { type: 'contact', id: '1', label: "pending", label2: 'some-adress@domain.com', labelType: 'danger', labelText: 'danger', category: "Contacts", avatarURL: 'img/avatar_sample_2.png' },
        { type: 'contact', id: '1', label: "sucess", label2: 'some-adress@domain.com', labelType: 'success', labelText: 'success', category: "Contacts", avatarURL: 'img/avatar_sample_3.png' },
        { type: 'contact', id: '1', label: "info", label2: 'some-adress@domain.com', labelType: 'info', labelText: 'info', category: "Contacts", avatarURL: 'img/avatar_sample_4.png' },
        { type: 'contact', id: '1', label: "pending", label2: 'some-adress@domain.com', labelType: 'danger', labelText: 'Danger', category: "Contacts", avatarURL: 'img/avatar_sample_2.png' },
        { type: 'contact', id: '1', label: "sucess", label2: 'some-adress@domain.com', labelType: 'success', labelText: 'success', category: "Contacts", avatarURL: 'img/avatar_sample_3.png' },
        { type: 'contact', id: '1', label: "info", label2: 'some-adress@domain.com', labelType: 'info', labelText: 'info', category: "Contacts", avatarURL: 'img/avatar_sample_4.png' }

    ],

    // TYPE: file
    files: [
        { type: 'file', id: '1', label: "andreas", category: "Files", iconURL: 'img/file-icons/icon-pdf.png', description: '15th of Dec 2016' },
        { type: 'file', id: '2', label: "antal", category: "Files", iconURL: 'img/file-icons/icon-doc.png', description: '8th of Dec 2016' },
    ],


    mix: [

        { category: 'clean', content: 'aaaaaaa', url: 'http://sadasd.com' },
        // { type: 'clean', label: "anders", category: "" },
        // { type: 'clean', label: 'asssad', category: "" },
        // { type: 'datarow', label: "anders", category: "Datarow", email: 'some@adress.com' },
        // { type: 'datarow', label: "andreas", category: "Datarow", email: 'some@adress.com' },
        // { type: 'datarow', label: "antal", category: "Datarow", email: 'some@adress.com' },
        // { type: 'label', id: '1', label: "pending", category: "Label", labelType: 'pending', labelText: 'Pending' },
        // { type: 'label', id: '1', label: "andreas", category: "Label", labelType: 'pending', labelText: 'Pending' },
        // { type: 'label', id: '1', label: "pending", category: "Label", labelType: 'success', labelText: 'Success' },
        // { type: 'contact', id: '1', label: "pending", label2: 'some-adress@domain.com', labelType: 'danger', labelText: 'Danger', category: "Contacts", avatarURL: 'img/avatar_sample_2.png' },
        // { type: 'contact', id: '1', label: "sucess", label2: 'some-adress@domain.com', labelType: 'success', labelText: 'success', category: "Contacts", avatarURL: 'img/avatar_sample_3.png' },
        // { type: 'contact', id: '1', label: "info", label2: 'some-adress@domain.com', labelType: 'info', labelText: 'info', category: "Contacts", avatarURL: 'img/avatar_sample_4.png' },
        // { type: 'file', id: '1', label: "andreas", category: "Files", iconURL: 'img/file-icons/icon-pdf.png', description: '15th of Dec 2016' },
        // { type: 'file', id: '2', label: "antal", category: "Files", iconURL: 'img/file-icons/icon-doc.png', description: '8th of Dec 2016' },
    ],

    htmlParse: [
    {
        category: 'contact',
        content: '<div class="type--contact flex-block"><div class="avatar avatar--active avatar--xs"><img src="img/avatar_sample_3.png"><div></div></div><div class="flex-block__content"><span class="flex-block__title">sucess</span><div class="flex-block__desc">some-adress@domain.com</div></div><div class="flex-block__badge"><span class="label-basic label-basic--success">success</span></div></div>',
        url: '#',
    }, 

    {
        category: 'contact',
        content: '<div class="type--contact flex-block"><div class="avatar avatar--active avatar--xs"><img src="img/avatar_sample_2.png"><div></div></div><div class="flex-block__content"><span class="flex-block__title">New Version!</span><div class="flex-block__desc">some-adress@domain.com</div></div><div class="flex-block__badge"><span class="label-basic label-basic--success">success</span></div></div>',
        url: '#',
    }, 
    {
        category: 'datarow',
        content: '<div class="type--datarow"><div class="datarow__left"><span>3123 anders</span></div><div class="datarow__right"><span>some@adress.com</span></div></div>',
        url: '#'
    }, 
    {
        category: 'datarow',
        content: '<div class="type--datarow"><div class="datarow__left"><span>3123 anders</span></div><div class="datarow__right"><span>some@adress.com</span></div></div>',
        url: '#'
    }, 
    {
        category: 'datarow',
        content: '<div class="type--datarow"><div class="datarow__left"><span>3123 anders</span></div><div class="datarow__right"><span>some@adress.com</span></div></div>',
        url: '#'
    }, 
    {
        category: 'datarow',
        content: '<div class="type--datarow"><div class="datarow__left"><span>asxaxzxvdvszvcxzcv</span></div><div class="datarow__right"><span>some4123@adress.com</span></div></div>',
        url: '#'
    }, 
    {
        category: 'datarow',
        content: '<div class="type--datarow"><div class="datarow__left"><span>asdacxxzxvczsdvzscvfdsz</span></div><div class="datarow__right"><span>some123@adress.com</span></div></div>',
        url: '#'
    }, 
    {
        category: 'file',
        content: '<div class="type--file flex-block"><div class="avatar avatar--xs"><img src="img/file-icons/icon-pdf.png"><div></div></div><div class="flex-block__content"><span class="flex-block__title">andreas</span><div class="flex-block__desc">Some Description</div></div><div class="flex-block__badge"><span class="description">15th of Dec 2016</span></div></div>',
        url: '#'
    }, 

    {
        category: 'file',
        content: '<div class="type--file flex-block"><div class="avatar avatar--xs"><img src="img/file-icons/icon-doc.png"><div></div></div><div class="flex-block__content"><span class="flex-block__title">Asaasda dasd</span><div class="flex-block__desc">Some Description</div></div><div class="flex-block__badge"><span class="description">15th of Dec 2016</span></div></div>',
        url: '#'
    }, 

    {
        category: 'label',
        content: '<div class="type--label"><div class="datarow__left ff-cw contains-id"><span class="id">#1</span><span>andreas</span></div><div class="datarow__right"><span class="label-basic label-basic--pending">Pending</span></div></div>',
        url: '#'
    }, 
    {
        category: 'label',
        content: '<div class="type--label"><div class="datarow__left ff-cw contains-id"><span class="id">#2</span><span>Aasdasd</span></div><div class="datarow__right"><span class="label-basic label-basic--success">Success</span></div></div>',
        url: '#'
    }, 

    ]
    
}

AntaresAC.prototype.helpers = {

    updateDOM: function() {
        $('body').append("<div class='ac-container'></div>");
    },

    monkeyPatchAutocomplete: function() {

        // don't really need this, but in case I did, I could store it and chain
        var oldFn = $.ui.autocomplete.prototype._renderItem;

        $.ui.autocomplete.prototype._renderItem = function(ul, item) {
            var re = new RegExp("^" + this.term);
            var t = item.label.replace(re, "<span style='font-weight:bold;'>" +
                this.term +
                "</span>");
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(t)
                .appendTo(ul);
        };
    },
    compressArray: function(original) {

        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);

        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {

            var myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i] == copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }

            if (myCount > 0) {
                var a = new Object();
                a.value = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }

        return compressed;
    },

}

AntaresAC.prototype.keyboard = function() {

    $('#main-search').keypress(function(e) {
        if (e.which == 13) {
            var label = $('#search-form label');
            if ($(this).val().length <= 0) {
                var placeholder = label.data('min-length');
                label.html(placeholder);
                return false;
            } else {
                label.html(label.data('placeholder'));
            }
            return true;
        }
    });

}


AntaresAC.prototype.logic = function() {

    var self = this;

    var searchCache = {};
    var category = null;

    var showAllUrl = '#';

    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function(items) {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },

        _renderMenu: function(ul, items) {

            var itemsCount = 0;

            var that = this;

            currentCategory = "";
            $(ul).addClass('antares-ac');
            var categories = [];
            for (i = 0; i < items.length; i++) {
                if (items[i].category != '') {
                    categories.push(items[i].category);
                }
            }

            var countedCategories = self.helpers.compressArray(categories);

            $.each(items, function(index, item) {

                ++itemsCount;

                var li;

                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }

                li = that._renderItemData(ul, item);

                if (item.category) {
                    li.attr("aria-label", item.category);
                }

                // universal adding
                // console.log(li);
                li.append('<a href="' + item.url + '"></a>');
                li.find('>a').html(item.content);

            });

            // add counters
            $('.antares-ac .ui-autocomplete-category').each(function(index, el) {
                if (countedCategories[index] !== undefined || countedCategories[index] !== null) {
                    $(this).append('<span>(' + countedCategories[index].count + ')</span>');
                }
            });

            $('.antares-ac').removeClass('has-footer');

            //Footer
            if (itemsCount >= 10) {

                if (!$('.ac-container .antares-ac__footer').length) {
                    $('.antares-ac').addClass('has-footer');
                    $('.antares-ac').append("<li class='antares-ac__footer'><div class='mdl-button mdl-js-button mdl-js-ripple-effect'>Load More</div></li>")
                }

            }

        }
    });

    $('#main-search').on('input', function() {
        if (!$(this).val()) {
            $(this).closest('.search-box').find('.mdl-textfield__label').show();
        }
    });



    $("#main-search").catcomplete({
        delay: 0,
        source: self.data.htmlParse,
        appendTo: ".ac-container",
        // search: function(event, ui) {
        //     $('.ac-container ul').empty();
        // },
        // minLength: 0,
        focus: function(event, ui) {
            $(event.toElement).removeClass('ui-state-focus');
            $('.antares-ac__footer').removeClass('ui-menu-item');

        },
        open: function() {
            $('.antares-ac__footer').removeClass('ui-menu-item');
            $('.ui-autocomplete-category').prev('li').addClass('last-in-category');
            $('.ui-autocomplete.antares-ac').perfectScrollbar();
        },
        close: function() {

            var parent = $(this).closest('.search-box');
            var label = parent.find('.mdl-textfield__label');
            var input = parent.find('#main-search');

            if (!input.val()) {
                label.show();
            }
        },
        select: function() {
            var parent = $(this).closest('.search-box');
            var label = parent.find('.mdl-textfield__label');
            label.hide();
        },

    });

}

$(function() {

    window.AntaresAC = new AntaresAC();
    window.AntaresAC.init();
    
});
