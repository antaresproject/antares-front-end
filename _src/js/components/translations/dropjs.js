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
  }
};

window.translationsDropJs = translationsDropJs;

$(() => {
  translationsDropJs.init();
});
