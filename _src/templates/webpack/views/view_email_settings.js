var path = './../../../';

// EXTERNAL DEPS:
var CodeMirror = require('codemirror/lib/codemirror.js');
window.CodeMirror = CodeMirror;
require('./../../../js/external/modified/codemirror_autoformat.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/edit/matchtags.js');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/scroll/simplescrollbars.js');
require('codemirror/addon/hint/css-hint.js');
require('codemirror/addon/hint/html-hint.js');
require('codemirror/keymap/sublime.js');
// plugins
require('script!tinycolor2'); //no css
require('./../../../js/external/modified/jquery.minicolors.js');