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

/*!
 Autosize 3.0.20
 license: MIT
 http://www.jacklmoore.com/autosize
 */


require('./../../../js/external/modified/context_menu.js'); // css in package
require('script-loader!datatables');
require('script-loader!datatables.net-responsive'); // no css
require('script-loader!datatables.net-scroller'); // no css
require('script-loader!datatables.net-buttons'); // no css
// APP COMPONENTS:
require('./../../../js/components/datatables/filters.js');
require('./../../../js/components/datatables/gs_fit.js');
// OUTED BY SERVERSIDE VERSION:
require('./../../../js/components/datatables/context_menu.js');
require('./../../../js/antares_mechanics.js');
require('./../../../js/antares_notifications.js');
window.autosize = require('./autosize.js');