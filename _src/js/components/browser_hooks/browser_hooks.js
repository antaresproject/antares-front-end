const browserHooks = {
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

    //system
    if (bowser.ios) {
      $container.addClass('is-ios');
    }
    if (bowser.android) {
      $container.addClass('is-android');
    }
    if (bowser.windowsphone) {
      $container.addClass('is-windowsphone');
    }

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
      antaresEvents.emit('is-edge');
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

window.browserHooks = browserHooks;
$(() => {
  browserHooks.init();
});

export default browserHooks;
