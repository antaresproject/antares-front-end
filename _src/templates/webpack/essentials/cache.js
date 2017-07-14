// BUNDLE STARTING POINT

// IE
import 'babel-polyfill';

var stylesBlack = [
  'background: #fff',
  'color: #000',
  'display: block',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'text-align: center',
  'font-weight: bold'
].join(';');

// if ( !PRODUCTION ) {
// 	console.log("Antares-Front-end, v." + VERSION + ' initializing...');
// 	console.log('%cenv: ' + ENV, stylesBlack);
// }

window.onload = function() {
  console.log('Antares Initialized.');
};

// if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");

// WEBPACK PARTIALS:
// require('offline-plugin/runtime').install();

require('./essentials.js');
require('./core.js');
require('./vue_loader.js');
