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
 * @version    0.9.1
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

// Antares Preloader

const antaresPreloader = {
  data: {
    selector: '[data-preload]'
  },

  init() {
    this.elemHide();
    this.elemShow();
  },

  // methods
  elemHide() {
    const preElements = document.querySelectorAll(this.data.selector);

    for (let i = 0; i < preElements.length; i += 1) {
      preElements[i].style.opacity = 0;
    }
  },

  elemShow() {
    window.addEventListener('load', () => {
      const preElements = document.querySelectorAll(this.data.selector);
      for (let i = 0; i < preElements.length; i += 1) {
        preElements[i].style.opacity = 1;
      }
    });
  }
};

// Fire!
antaresPreloader.init();
window.antaresPreloader = antaresPreloader;
