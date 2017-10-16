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

/* global enquire antaresEvents */

// Edge Helpers

export default {
  // methods

  gridstack() {
    antaresEvents.on('is-edge', () => {
      setTimeout(() => {
        $('.card--logs .pagination-list ul li')
          .eq(0)
          .trigger('click');
      }, 200);
    });
  },
  datatables() {
    antaresEvents.on('is-edge', () => {
      setTimeout(() => {
        $('.tbl-c .dt-area-bottom .dataTables_length a')
          .eq(1)
          .trigger('click');
        $('.tbl-c .dt-area-bottom .dataTables_length a')
          .eq(0)
          .trigger('click');
      }, 200);
    });
  }
};
