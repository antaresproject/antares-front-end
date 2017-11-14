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

/*!
	Autosize 3.0.20
	license: MIT
	http://www.jacklmoore.com/autosize
*/
// require('./../../../js/external/modified/context_menu.js'); // css in package
// require('script-loader!datatables');
// require('script-loader!datatables.net-responsive'); // no css
// require('script-loader!datatables.net-scroller'); // no css
// require('script-loader!datatables.net-buttons'); // no css
// APP COMPONENTS:
// require('./../../../js/components/datatables/filters.js');
// require('./../../../js/components/datatables/gs_fit.js');
// OUTED BY SERVERSIDE VERSION:
// require('./../../../js/components/datatables/context_menu.js');
window.autosize = require('./autosize.js');

require('./../../../js/external/modified/context_menu.js'); // css in package
require('script-loader!datatables');
require('script-loader!datatables.net-responsive'); // no css
require('script-loader!datatables.net-scroller'); // no css
require('script-loader!datatables.net-buttons'); // no css
// APP COMPONENTS:
require('./../../../js/components/datatables/filters.js');
require('./../../../js/components/datatables/gs_fit.js');
// OUTED BY SERVERSIDE VERSION:
require('./../../../js/components/datatables/context_menu.js');

(function() {
  var translationsTable = {
    init: function() {
      this.initTable();
      this.initTableSearch();
      this.bindEvents();
      this.addCounter();
      this.mobileRow();
      this.clearInputs();
      this.searchBox();
      this.countryFlags();
      this.autosize();
    },
    bindEvents: function() {
      $('.translation-new-row__icon, .translations-new-row__mobile #translations-new-row__add').on('click', this.addNewRow.bind(this));
      $('.translations-table').on('click', '.table-key__delete-row ', this.deleteRow.bind(this));
    },
    initTable: function() {
      var firstRow = $('.translations-table tbody tr:first').remove()[0];
      var self = this;
      this.translationsTable = $('.translations-table').DataTable({
        dom: 't',
        columnDefs: [
          {
            targets: 'no-sort',
            orderable: false
          }
        ],
        iDisplayLength: 10000,
        aaSorting: [[0]],
        pageLength: 10000,
        initComplete: function(settings, json) {
          self.editCell();
          $('.ps-container').perfectScrollbar('update');
        },
        createdRow: function(row, data, index) {
          $(row).addClass('translation-row');
          $('td', row)
            .eq(0)
            .addClass('translation-row__counter');
          $('td', row)
            .eq(1)
            .addClass('table-key table-key--key table-key--editable"');
          $('td', row)
            .eq(2)
            .addClass('table-key table-key--editable table-key--translate')
            .attr('data-cell-name', 'Translate');
          $('td', row)
            .eq(3)
            .addClass('table-key table-key--compare')
            .attr('data-cell-name', 'compare');
          $('.ps-container').perfectScrollbar('update');
        },
        drawCallback: function() {
          $('.translations-table tbody tr:first').before(firstRow);
          autosize($('.table-key__input , .translation-new-row textarea'));
        }
      });
    },
    initTableSearch: function() {
      var self = this;
      $('.header-translations__search input').on('keyup', function() {
        self.translationsTable.search(this.value).draw();
      });
    },
    clearInputs: function() {
      $('#translations-new-row__cancel').on('click', function() {
        $('.translation-new-row #translation').val('');
        $('.translation-new-row #new-key').val('');
        $('.translation-new-row #translation, .translation-new-row #new-key ').removeClass('error');
      });
    },
    addNewRow: function() {
      $('.translation-new-row #translation, .translation-new-row #new-key ').removeClass('error');
      var key = $('.translation-new-row #new-key').val();
      var keyHtml = [
        '<div class="table-key__mobile-open">',
        '<i class="zmdi zmdi-chevron-down"></i>',
        '</div>',
        '<div class="table-key__inner">',
        '<div class="table-key__text">' + key + '</div>',
        '<textarea name="nowrap" rows="1" name="text" class="table-key__input">',
        key,
        '</textarea>',
        '<div class="table-key__actions">',
        '<div class="table-key__remove"><i class="zmdi zmdi-close"></i></div>',
        '<div class="table-key__add"><i class="zmdi zmdi-check"></i></div>',
        '</div>',
        '<div class="table-key__init-edit">',
        '<i class="zmdi zmdi-edit"></i>',
        '</div>',
        '</div>'
      ].join('\n');

      var translation = $('.translation-new-row #translation').val();

      var translateHtml = [
        '<div class="table-key__inner">',
        '<div class="table-key__text">' + translation + '</div>',
        '<textarea name="nowrap" rows="1" name="text" class="table-key__input">',
        translation,
        '</textarea>',
        '<div class="table-key__actions">',
        '<div class="table-key__remove"><i class="zmdi zmdi-close"></i></div>',
        '<div class="table-key__add"><i class="zmdi zmdi-check"></i></div>',
        '</div>',
        '<div class="table-key__init-edit">',
        '<i class="zmdi zmdi-edit"></i>',
        '</div>',
        '</div>'
      ].join('\n');

      var compareHtml = ['<div class="table-key__inner">' + translation, '<div class="table-key__delete-row">', '<i class="zmdi zmdi-delete"></i>', '</div>', '</div>'].join('\n');

      if (translation.length === 0) {
        $('.translation-new-row #translation').addClass('error');
        AntaresNoty.callNoty('alert', 'Translation line is empty', 'lg', 'border');
      }
      if (key.length === 0) {
        $('.translation-new-row #new-key').addClass('error');
        AntaresNoty.callNoty('alert', 'Key line is empty', 'lg', 'border');
      }
      if (translation.length == 0 || key.length == 0) {
        return;
      }
      var addedRow = this.translationsTable.row.add([' ', keyHtml, translateHtml, compareHtml]).draw();
      this.translationsTable.push('Fini');

      $('.translation-new-row #new-key').val('');
      $('.translation-new-row #translation').val('');

      AntaresNoty.callNoty('success', 'Add translation', 'lg', 'border');
    },
    deleteRow: function(event) {
      this.translationsTable
        .row($(event.currentTarget).closest('tr'))
        .remove()
        .draw();
      $('.ps-container').perfectScrollbar('update');
      AntaresNoty.callNoty('alert', 'Row was deleted', 'lg', 'border');
    },
    addCounter: function() {
      var self = this;
      this.translationsTable
        .on('order.dt search.dt', function() {
          self.translationsTable
            .column(0)
            .nodes()
            .each(function(cell, i) {
              cell.innerHTML = i + 1;
            });
        })
        .draw();
    },
    editCell: function() {
      $('.translations-table').on('click', '.table-key .table-key__init-edit, .table-key .table-key__text', function(event) {
        var $parent = $(this).closest('.table-key');
        $parent.toggleClass('table-key--edit');
        var value = $parent.find('.table-key__text').text();
        $parent.find('.table-key__text');

        $parent
          .find('.table-key__input')
          .val(value)
          .change();
      });

      $('.translations-table').on('click', ' .table-key .table-key__remove', function(event) {
        var $parent = $(this).closest('.table-key');
        $parent
          .find('textarea')
          .prop('type', 'hidden')
          .val('');
        $parent.removeClass('table-key--edit');
      });

      $('.translations-table').on('click', '.table-key .table-key__add', function(event) {
        var $parent = $(this).closest('.table-key');
        var $input = $parent.find('textarea');
        var inputVal = $input.val();

        $parent.find('.table-key__text').text(inputVal);
        $parent.removeClass('table-key--edit');

        AntaresNoty.callNoty('warning', 'Row was changed', 'lg', 'border');
      });
      $('.translations-table').on('change', '.table-key .table-key__input', function(event) {
        autosize.update($(this));
      });
    },
    mobileRow: function() {
      $('.translations-table').on('click', '.table-key__mobile-open', function() {
        $(this).toggleClass('table-key__mobile-open--open');
        $(this)
          .find('i')
          .toggleClass('zmdi-chevron-up zmdi-chevron-down');

        $(this)
          .closest('.translation-row')
          .toggleClass('translation-row__mobile-open');
      });

      $('.translations-table').on('focus', '.translation-new-row__key #new-key', function() {
        $(this)
          .closest('.translation-new-row')
          .addClass('translation-new-row--mobile-active');
      });
    },
    autosize: function() {
      autosize($('.table-key__input ,#translation-new-row #new-key, #translation-new-row #translation'));
      $('.table-key__input , #new-key').keydown(function(e) {
        if (e.keyCode == 13 && !e.shiftKey) {
          e.preventDefault();
        }
      });
      $('.translations-table').on('focus', '.table-key__input', function() {
        autosize.update(this);
      });
    },
    searchBox: function() {
      $('.search-box')
        .find('.search-box__open')
        .on('click', function() {
          $(this)
            .closest('.search-box')
            .addClass('search-box--open');
        });

      $('.search-box')
        .find('.search-box__close')
        .on('click', function() {
          $(this)
            .closest('.search-box')
            .removeClass('search-box--open');
        });
    },
    countryFlags: function() {
      $('[data-flag-select-translations]').on('change', function() {
        var flag = $(this)
          .find('option:selected')
          .data('country');
        if ($(this).hasClass('header-translation__compare-select')) {
          $(this)
            .closest('.header-translation__compare')
            .find('.ddown__init .flag-compare')
            .attr('class', 'flag-icon flag-compare ' + 'flag-icon-' + flag);
        } else if ($(this).hasClass('header-translation__translate-select')) {
          $(this)
            .closest('.header-translation__compare')
            .find('.ddown__init .flag-translate')
            .attr('class', 'flag-icon flag-translate ' + 'flag-icon-' + flag);
        }
      });
    }
  };

  $('#sendTableForm').on('click', function() {
    alert('data sent');
  });

  translationsTable.init();
})(this);
