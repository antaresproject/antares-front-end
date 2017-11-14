// require("script-loader!jquery");
// require("script-loader!jquery-ui-bundle");
// import './../../../js/external/modified/pace';
// import './../../../js/external/modified/globalize';
// import 'enquire.js';
// import 'moment';
// import 'noty';
// import 'dialog-polyfill';
// import 'jquery-modal';
// import 'qtip2';
// import './../../../js/external/modified/swal';
// import 'jquery-match-height';
// import 'hammerjs';
// import 'jquery-hammerjs';
// import 'underscore';
// import 'perfect-scrollbar/jquery';
// import './../../../js/external/mdrnzr';

// EXTERNAL DEPS:
// require('script-loader!default-passive-events');
require('./../../../js/components/event_emmiter/event_emmiter.js');
require('script-loader!jquery/dist/jquery.min');
var pace = require('./../../../js/external/modified/pace.js');
window.Pace = pace;
// require("script-loader!./../../../js/external/jquery.js");
require('./../../../js/external/jquery_migrate_3.js');
require('script-loader!jquery-ui-bundle');
require('jquery.ui.touch');
require('./../../../js/external/modified/globalize.js');
var enquire = require('enquire.js');
window.enquire = enquire;
require('script-loader!moment/min/moment.min'); //no css
require('script-loader!noty/js/noty/packaged/jquery.noty.packaged.min'); //no css
require('script-loader!dialog-polyfill');
require('script-loader!jquery-modal/jquery.modal.min');
require('script-loader!qtip2/dist/jquery.qtip.min');
require('./../../../js/external/modified/swal.js');
require('script-loader!jquery-match-height/dist/jquery.matchHeight-min'); //nocss
require('script-loader!hammerjs'); // no css
require('script-loader!jquery-hammerjs'); // no css
require('script-loader!underscore/underscore-min'); // no css
require('perfect-scrollbar/dist/js/perfect-scrollbar.jquery.min');
require('./../../../js/external/mdrnzr.js');
require('jquery-ui-touch-punch/jquery.ui.touch-punch.min');
require('script-loader!bowser/bowser.min');
require('script-loader!swiper/dist/js/swiper.jquery.min');
require('script-loader!tether/dist/js/tether.min');
var Drop = require('tether-drop/dist/js/drop.min');
window.Drop = Drop;
