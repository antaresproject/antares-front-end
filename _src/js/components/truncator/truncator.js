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

/* global enquire */

// ANTARES TRUNCATOR

export const truncator = {
  init() {
    const self = this;
    this.saveOriginalText();
    setTimeout(() => {
      self.truncateMain();
      self.rwd();
    }, 300);
  },

  saveOriginalText() {
    $('[data-truncate], [data-truncate-desktop], [data-truncate-mobile-landscape], [data-truncate-mobile-portrait], [data-truncate-tablet-landscape], [data-truncate-tablet-portrait]').each((index, elem) => {
      const orgText = $(elem).text();
      $(elem).attr('data-org-text', orgText);
    });
  },

  loadOriginalText() {
    $('[data-truncate], [data-truncate-desktop], [data-truncate-mobile-landscape], [data-truncate-mobile-portrait], [data-truncate-tablet-landscape], [data-truncate-tablet-portrait]').each((index, elem) => {
      const orgText = $(elem).attr('data-org-text');
      $(elem).text(orgText);
    });
  },

  truncateDom(dataAttr) {
    const self = this;
    $('[' + dataAttr + ']').each((index, elem) => {
      const text = $(elem).text();
      const truncateInstructions = $(elem).attr(dataAttr);
      const afterTruncator = self.truncateFunction(text, truncateInstructions);
      $(elem).text(afterTruncator);
    });
  },

  truncateFunction(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  },
  truncateMain() {
    const self = this;
    $(window).on('resize', () => {
      self.allSizes();
    });
    $(() => {
      self.allSizes();
    });
  },
  rwd() {
    const self = this;

    enquire.register('screen and (min-width:1200px)', {
      match() {
        self.desktop();
      }
    });
    enquire.register('screen and (min-width:992px) and (max-width:1199px)', {
      match() {
        self.tabletLandscape();
      }
    });
    enquire.register('screen and (min-width:768px) and (max-width:991px)', {
      match() {
        self.tabletPortrait();
      }
    });
    enquire.register('screen and (min-width:500px) and (max-width:767px)', {
      match() {
        self.mobileLandscape();
      }
    });
    enquire.register('screen and (max-width:499px)', {
      match() {
        self.mobilePortrait();
      }
    });
  },
  allSizes() {
    const self = this;
    // all in one
    const dataAttr = 'data-truncate';
    // self.loadOriginalText();
    this.truncateDom(dataAttr);
  },
  desktop() {
    const self = this;
    // 1200 - ***
    const dataAttr = 'data-truncate-desktop';
    self.loadOriginalText();
    this.truncateDom(dataAttr);
  },
  // methods
  tabletLandscape() {
    const self = this;
    // 992px - 1199px
    const dataAttr = 'data-truncate-tablet-landscape';
    self.loadOriginalText();
    this.truncateDom(dataAttr);
  },
  tabletPortrait() {
    const self = this;
    // 768px - 991px
    const dataAttr = 'data-truncate-tablet-portrait';
    self.loadOriginalText();
    this.truncateDom(dataAttr);
  },
  mobileLandscape() {
    const self = this;
    // 499px - 767px
    const dataAttr = 'data-truncate-mobile-landscape';
    self.loadOriginalText();
    this.truncateDom(dataAttr);
  },
  mobilePortrait() {
    const self = this;
    // *** - 499px
    const dataAttr = 'data-truncate-mobile-portrait';
    self.loadOriginalText();
    this.truncateDom(dataAttr);
  }
};

window.truncator = truncator;

$(() => {
  truncator.init();
});
