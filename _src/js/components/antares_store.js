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

import { Antares } from './../antares_mechanics';

import Vue from 'vue'
Vue.use(Vuex);
import Vuex from 'vuex'

Vue.config.devtools = true;
Vue.config.productionTip = false;

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

export const antaresStore = new Vuex.Store({
    modules: {
        // filesWidget1: filesWidget1,
        // tabsWidget1: tabsWidget1
    }
});
