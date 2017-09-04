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

export const sampleAntaresComponent = {
  init() {
    this.test();
  },

  // methods

  test() {
    alert('thats a test antares component!');
  },

  whenWindowLoadIsNeeded() {
    console.log('that fires on window Load');
  }
};

$(() => {
  sampleAntaresComponent.init();
});

$(window).on('load', () => {
  sampleAntaresComponent.whenWindowLoadIsNeeded();
});

window.sampleAntaresComponent = sampleAntaresComponent;
