var path = './../../../';

// EXTERNAL DEPS:
require('script-loader!gridstack/dist/gridstack.min');
// require('script-loader!slick-carousel'); // not needed, i guess
// APP COMPONENTS:
var List = require('list.js');
window.List = List;
require('./../../../js/antares_gridstack.js');
import zeroData from './../../../js/components/zero_data/zero_data';
zeroData.gridstack();
require('./../../../js/components/widgets_html/widgets_html.js');

