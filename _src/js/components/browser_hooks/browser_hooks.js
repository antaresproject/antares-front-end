// BROWSER HOOKS
// in accompaniment with less/base/disabled_browsers.less

/* global bowser */

export const browserHooks = {
  init() {
    if (window.bowser == null) {
      console.log('warning! browser detection failed!!!');
      return false;
    }

    this.detection();
    this.edge();
  },

  // methods
  detection() {
    const $container = $('html');

    // device
    if (bowser.mobile) {
      $container.addClass('is-mobile');
    }

    if (bowser.tablet) {
      $container.addClass('is-tablet');
    }

    // browsers
    if (bowser.chrome) {
      $container.addClass('is-chrome');
    }

    if (bowser.gecko) {
      $container.addClass('is-firefox');
    }

    if (bowser.msie) {
      $container.addClass('is-ie11');
    }

    if (bowser.msedge) {
      $container.addClass('is-edge');
    }

    // safari
    if (bowser.mac && bowser.safari) {
      $container.addClass('is-safari');
    }
  },

  edge() {
    // For microsoft edge
    $("input[type='number']").keypress(event => {
      // If this key is not a number...
      if (event.which < 48 || event.which > 57) {
        event.preventDefault();
        return false;
      }
    });
  }
};

$(() => {
  window.browserHooks = browserHooks;
  browserHooks.init();
});
