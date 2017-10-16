// BUNDLE STARTING POINT

// IE
import 'babel-polyfill';

// // passive scroll
// const onClick = e => e.preventDefault();
// document.addEventListener('scroll', onClick, { passive: false });

var stylesBlack = ['background: #fff', 'color: #000', 'display: block', 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)', 'text-align: center', 'font-weight: bold'].join(';');

// if ( !PRODUCTION ) {
// 	console.log("Antares-Front-end, v." + VERSION + ' initializing...');
// 	console.log('%cenv: ' + ENV, stylesBlack);
// }

import { antaresCfg } from './../../../config/antares_cfg';
window.antaresCfgLocal = antaresCfg;

// if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");

// WEBPACK PARTIALS:
// require('offline-plugin/runtime').install();

require('./essentials.js');
require('./core.js');
require('./vue_loader.js');
require('./css.js');
