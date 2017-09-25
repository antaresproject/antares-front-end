// var path = './../../../';

// EXTERNAL DEPS:
require('script-loader!gridstack');
// require('script-loader!slick-carousel'); // not needed, i guess
// APP COMPONENTS:
// DYNAMIC IMPORT!
// import('./../../../js/external/modified/pace.js')
//   .then(function(pace) {
//     window.Pace = pace;
//     console.log('pace loaded');
//   })
//   .catch(function(err) {
//     console.log('Failed to load pace', err);
//   });

var List = require('list.js');
window.List = List;

require('./../../../js/antares_gridstack.js');

import zeroData from './../../../js/components/zero_data/zero_data';
import widgetControl from './../../../js/components/widget_control/widget_control';
import gridstackRWD from './../../../js/components/gridstack_rwd/gridstack_rwd';

$(() => {
  zeroData.gridstack();
  widgetControl.init();
  gridstackRWD.init();
});

// assign
window.widgetControl = widgetControl;
window.gridstackRWD = gridstackRWD;
