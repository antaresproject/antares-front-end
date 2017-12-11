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

export const AntaresMobileSelectMode = {
  init() {
    this.selectRowsDataTables();
      this.selectModeMarked();
  },

  selectRowsDataTables() {
    if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
      const Hammer = require('hammerjs');
      require('jquery-hammerjs');

      function disableSelectMode() {
        $('.antares-table tbody tr').removeClass('is-selected');
        $('.tbl-c').removeClass('selected-mode--touch-active');
        $('#table-ma')
          .attr('disabled', true)
          .removeClass('display-flex');
        $('.antares-table tbody tr').off('click');
        $('#table-ma span').html('0 Items Selected');
      }

      function quickSelectRowDataTable($self) {
        if ($('.tbl-c').hasClass('selected-mode--touch-active')) {
          $('.antares-table tbody tr').on('click', function() {
            if ($(this).hasClass('is-selected')) {
              $(this).removeClass('is-selected');
              $self
                .closest('.tbl-c')
                .find('#table-ma')
                .attr('disabled', false)
                .addClass('display-flex')
                .html($self.closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
              if ($('.antares-table tbody tr.is-selected').length === 0) {
                disableSelectMode();
              }
            } else {
              $(this).addClass('is-selected');
              $self
                .closest('.tbl-c')
                .find('#table-ma')
                .attr('disabled', false)
                .addClass('display-flex')
                .html($self.closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
            }
          });
        }

        $(document).mouseup(function(e) {
          var container = $('.tbl-c');
          if (container.has(e.target).length === 0) {
            disableSelectMode();
          }
        });
        function updatePaginationSelectMode() {
          setTimeout(function() {
            $('.dataTables_paginate span').off('click');
            $('.dataTables_paginate span').on('click', function() {
              disableSelectMode();
            });
            updatePaginationSelectMode();
          }, 1000);
        }
        updatePaginationSelectMode();
      }

      $('.antares-table tbody tr').each(function() {
        let hammertime = new Hammer($(this)[0], {});
        var statusHammer = false;
        // hammertime.on("panleft panright tap press pressup", function (ev) {
        //     console.log(ev.type);
        // });
        hammertime.on('press', function(ev) {
          if ($('.tbl-c').hasClass('selected-mode--touch-active')) {
            statusHammer = false;
          } else {
            var thisTR = $(ev.target);
            thisTR.closest('.tbl-c').addClass('selected-mode--touch-active');
            let $self = thisTR;
            $self.closest('tr').addClass('is-selected');
            $self
              .closest('.tbl-c')
              .find('#table-ma')
              .attr('disabled', false)
              .addClass('display-flex')
              .html($self.closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
            statusHammer = true;
            $('.dataTables_wrapper tr.parent td:first-of-type').click();
            $('.selected-mode--touch-active').adjustCardHeight();
          }
        });
        hammertime.on('pressup', function(ev) {
          if (statusHammer === true) {
            var thisTR = $(ev.target);
            let $self = thisTR;
            window.requestAnimationFrame(() => {
              quickSelectRowDataTable($self);
            });
            statusHammer = false;
          }
        });
      });
    }
    else {
      setTimeout(function() {
        function updatePaginationSelectMode() {
          setTimeout(function() {
            $('.dataTables_paginate span').off('click');
            $('.dataTables_paginate span').on('click', function() {
              $('.tbl-c').removeClass('selected-mode--touch-active');
              $('table tbody tr').removeClass('is-selected');
              $('#table-ma span').html('0 Items Selected');
              $('.tbl-c').removeClass('selected-mode--active');
            });


          }, 1000);
        }
        updatePaginationSelectMode();
      }, 2000);
    }
  },
    selectModeMarked(){
        $('.selected-all--marked').on('click touchstart', function () {
            $(this).closest('.tbl-c').find('table tbody tr').addClass('is-selected')
            $(this).closest('.filters').find('#table-ma span').html($(this).closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
            console.log($(this).closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
            oTable.rows('.is-selected').select();
        })
        $('.selected-all--unmarked').on('click touchstart', function () {
            $(this).closest('.tbl-c').find('table tbody tr').removeClass('is-selected')
            var self = $(this)
            window.requestAnimationFrame(() => {
                self.closest('.btn-selected').removeClass('ddown--open ddown--open-bottom')
                self.closest('.btn-selected').find('.btn-with-selected').removeClass('display-flex')
                self.closest('.tbl-c').removeClass('selected-mode--touch-active')
                self.closest('.tbl-c').find('.antares-table tbody tr').off("click")
                $(this).closest('.filters').find('#table-ma span').html($(this).closest('.tbl-c').find('tr.is-selected').length + ' items Selected');
                // self.closest('.tbl-c').find('#table-ma').html('0 Items Selected');
                let parentTblc = self.closest('.tbl-c')
                parentTblc.find('tr').removeClass('is-selected');
                parentTblc.find('#table-ma').attr('disabled', true);
                parentTblc.find('#table-ma span').html('0 Items Selected');
                parentTblc.removeClass('selected-mode--active');
                parentTblc.removeClass('selected-mode--touch-active');
                parentTblc.find('table tbody tr td').removeClass('no-arrow');
                parentTblc.find('.btn-with-selected').removeClass('display-flex');
                oTable.rows('.is-selected').deselect();
            })
        })


        enquire.register(bpMobMax767, {
            match: function () {
                if ($('table tbody tr').hasClass('is-selected')) {
                    $('.tbl-c').addClass('selected-mode--touch-active')
                }
            },
            unmatch: function () {
                $('.tbl-c').removeClass('selected-mode--touch-active')
            }
        });
    }
};

$(() => {
  window.AntaresMobileSelectMode = AntaresMobileSelectMode;
  AntaresMobileSelectMode.init();
});
