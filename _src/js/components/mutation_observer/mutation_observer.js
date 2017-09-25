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

(function(window, document, undefined) {
  'use strict';
  var listeners = [],
    doc = window.document,
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
    observer;

  function ready(selector, fn) {
    // Store the selector and callback to be monitored
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      // Watch for changes in the document
      observer = new MutationObserver(check);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
    // Check if the element is currently in the DOM
    check();
  }

  function check() {
    // Check the DOM for elements matching a stored selector
    for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
      listener = listeners[i];
      // Query for elements matching the specified selector
      elements = document.querySelectorAll(listener.selector);
      for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
        element = elements[j];
        // Make sure the callback isn't invoked with the
        // same element more than once
        if (!element.ready) {
          element.ready = true;
          // Invoke the callback with the element
          listener.fn.call(element, element);
        }
      }
    }
  }

  // Expose `ready`
  window.ready = ready;
})(window, document);

// separate usecases

/* global enquire */

// COMPONENT NAME

const antaresMutationObserver = {
  init() {
    // nothing to init here
  },

  // methods

  whenAdded(className) {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let antaresObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        console.log(mutation);
      });
    });

    // const target = $(className)[0];

    // console.log(target);

    const config = {
      attributes: true,
      childList: true,
      characterData: true
    };

    window.currentObserver = antaresObserver;
    antaresObserver.observe(className, config);
  },

  disconnect() {
    window.currentObserver.disconnect();

    return 'mutation observer no touch base no more.';
  }
};

$(() => {
  antaresMutationObserver.init();
});

window.antaresMutationObserver = antaresMutationObserver;
