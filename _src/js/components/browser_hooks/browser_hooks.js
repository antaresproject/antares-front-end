// BROWSER HOOKS
// in accompaniment with less/base/disabled_browsers.less

const browserHooks = {

    init() {

        this.detection();
        this.edge();

    },

    // methods

    detection() {

        var bowser = require('script-loader!bowser');

        let $container = $('html');

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

        //safari
        if (bowser.mac && bowser.safari) {
            $('body').addClass('is-safari');
        }

    },

    edge() {

        // For microsoft edge
        $('input[type=\'number\']').keypress(function (event) {

            // If this key is not a number...
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
                return false;
            }
        });

    },


};

$(function () {
    window.browserHooks = browserHooks;
    browserHooks.init();
});



