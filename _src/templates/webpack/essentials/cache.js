// BUNDLE STARTING POINT

// IE
require('es6-promise').polyfill();

var stylesBlack = [
    'background: #fff'
    , 'color: #000'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'text-align: center'
    , 'font-weight: bold'
].join(';');

window.onload = function() {
 console.log('Antares Initialized.');
};

require('./essentials.js');
require('./core.js');
require('./vue_loader.js');
