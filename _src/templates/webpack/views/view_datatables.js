var path = './../../../';

// EXTERNAL DEPS:
require('./../../../js/external/modified/context_menu.js'); // css in package
require('script-loader!datatables/media/js/jquery.dataTables.min');
require('script-loader!datatables.net-responsive/js/dataTables.responsive.min'); // no css
require('script-loader!datatables.net-scroller/js/dataTables.scroller.min'); // no css
require('script-loader!datatables.net-buttons/js/dataTables.buttons.min'); // no css
require('script-loader!datatables.net-buttons/js/buttons.colVis.js');
require('script-loader!datatables.net-rowreorder/js/dataTables.rowReorder.min'); // no css
require('script-loader!datatables.net-select/js/dataTables.select.min');
// require('script-loader!drmonty-datatables-colvis'); // no css
// require( 'datatables.net-rowreorder' )( window, $ );
// APP COMPONENTS:
require('./../../../js/components/datatables/filters.js');
require('./../../../js/components/datatables/gs_fit.js');
// OUTED BY SERVERSIDE VERSION:
require('./../../../js/antares_datatables.js');
require('./../../../js/components/datatables/context_menu.js');

import edgeHelpers from './../../../js/components/browser_hooks/edge';

$(window).on('load', () => {
  edgeHelpers.datatables();
});

// require('jquery');
// require("./example.js");
// require('imports-loader?$=jquery!./../../js/external/modified/context_menu.js');
// require("imports?$=jquery!./../../node_modules/list.js/dist/list.js");
// require('datatables/media/css/jquery.dataTables.css');
