var path = './../../../';

// EXTERNAL DEPS:
require('./../../../js/external/modified/context_menu.js'); // css in package
require('script-loader!datatables');
require('script-loader!datatables.net-responsive'); // no css
require('script-loader!datatables.net-scroller'); // no css
require('script-loader!datatables.net-buttons'); // no css
// APP COMPONENTS:
require('./../../../js/components/datatables/filters.js');
require('./../../../js/components/datatables/gs_fit.js');
// OUTED BY SERVERSIDE VERSION:
require('./../../../js/tableView.js');
require('./../../../js/components/datatables/context_menu.js');

// require('jquery');
// require("./example.js");
// require('imports-loader?$=jquery!./../../js/external/modified/context_menu.js');
// require("imports?$=jquery!./../../node_modules/list.js/dist/list.js");
// require('datatables/media/css/jquery.dataTables.css');
// require('script-loader!drmonty-datatables-colvis'); // no css