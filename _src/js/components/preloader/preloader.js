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
    selector: '[data-preload]',
    timer: 200
  },

  init() {
    this.elemHide();
    this.elemShow();
  },

  element(elem, boolean) {
    if (!$(elem)) {
      return false;
    }
    if (boolean === true || boolean === 'true') {
      $(elem).attr('data-is-loading', true);
    } else {
      $(elem).removeAttr('data-is-loading');
    }
  },
  global(boolean) {
    if (boolean === true || boolean === 'true') {
      let $elem = $('[data-is-preloading]');
      $('#app-wrapper').attr('data-is-preloading', true);
    } else {
      let $elem = $('[data-is-preloading]');
      $elem.removeAttr('data-is-preloading');
    }
  },

  // methods
  elemHide() {
    const preElements = document.querySelectorAll(this.data.selector);

    for (let i = 0; i < preElements.length; i += 1) {
      preElements[i].style.opacity = 0;
    }
  },

  elemShow() {
    const self = this;
    window.addEventListener('load', () => {
      const gs = document.getElementsByClassName('grid-stack');
      const dt = document.getElementsByClassName('tbl-c');
      const preElements = document.querySelectorAll(this.data.selector);
      // GRIDSTACK!
      // document.addEventListener('antares-gridstack-loaded', e => {
      //   for (let i = 0; i < preElements.length; i += 1) {
      //     preElements[i].style.opacity = 1;
      //   }
      // });

      // NOT GRIDSTACK
      for (let i = 0; i < preElements.length; i += 1) {
        setTimeout(() => {
          preElements[i].style.opacity = 1;
        }, self.data.timer);
      }
    });

    // document.addEventListener('antares-datatables-loaded', e => {
    //   // alert('dt ready');
    // });
  }
};

// Fire!
antaresPreloader.init();
window.antaresPreloader = antaresPreloader;
