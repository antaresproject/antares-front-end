var path = './../../../';

// EXTERNAL DEPS:
require('script-loader!gridstack');
require('script-loader!slick-carousel'); // not needed, i guess
// APP COMPONENTS:
var List = require('list.js');
window.List = List;

require('./../../../js/gridstackView.js');
// require('./../../../js/components/dashboard/card_enlarge.js');
// require('./../../../js/components/dashboard/card_chart.js');
// require('./../../../js/components/dashboard/card_info.js');