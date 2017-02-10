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
 * @package    Antares Front-end
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/


var Vuex = require('vuex')

function randomDateGenerate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

window.randomDate = function() {
    return moment(randomDateGenerate(new Date(2012, 0, 1), new Date())).format('YYYY.MM.DD');
}

window.generateRandomNumber = function() {
    var min = 0.30,
        max = 545.10,
        highlightedNumber = (Math.random() * (max - min) + min).toFixed(2);
        
    return highlightedNumber;
};

