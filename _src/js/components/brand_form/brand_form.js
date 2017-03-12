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
 * @package    Files
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 * 

*/

// require(["../external/codemirror/lib/codemirror", "../external/codemirror/mode/css/css", "../external/codemirror/mode/xml/xml", "../external/codemirror/addon/selection/active-line", "../external/codemirror/addon/edit/closebrackets", "../external/codemirror/addon/edit/matchbrackets", "../external/codemirror/addon/hint/css-hint", "../external/codemirror/addon/hint/html-hint", "../external/codemirror/addon/scroll/simplescrollbars" ], function(CodeMirror) {

(function() {

    var Form;
    Form = {};
    /* Init  */
    Form.init = function() {
        Form.checkbox = $('input:checkbox.brand-selector');
        Form.container = $('div.brands-select-container');
        Form.changeState = function(checkbox) {
                if (checkbox.checked) {
                    Form.container.removeClass('hidden');
                } else {
                    Form.container.addClass('hidden');
                }
            },
            Form.syntaxHighlight = function() {
                if (!$('.app-content.page-email-settings').length) {
                    return false;
                }

                var emailHeaderHtml = document.getElementById('email-header-html');
                var emailStyles = document.getElementById('email-styles');
                var emailFooterHtml = document.getElementById('email-footer-html');

                var CM_cfg = {
                    theme: 'ambiance',
                    lineNumbers: true,
                    lineWrapping: true,
                    styleActiveLine: true,
                    matchBrackets: true,
                    scrollbarStyle: "overlay",
                    readOnly: false,
                    matchTags: {bothTags: true}
                } 

                // INTI!
                var myCodeMirrorEmailHeaderHtml = CodeMirror.fromTextArea(emailHeaderHtml, $.extend({}, CM_cfg, { mode: "xml", htmlMode: true, }));
                var myCodeMirrorEmailStyles = CodeMirror.fromTextArea(emailStyles, $.extend({}, CM_cfg, { mode: "css", htmlMode: false, }));
                var myCodeMirrorEmailFooterHtml = CodeMirror.fromTextArea(emailFooterHtml, $.extend({}, CM_cfg, { mode: "xml", htmlMode: true, }));



                // REFRESH
                $('.page-email-settings .mdl-tabs').find('.mdl-tabs__tab').on('click', function() {

                	setTimeout(function() {

					    myCodeMirrorEmailFooterHtml.refresh();
					    myCodeMirrorEmailStyles.refresh();
					    myCodeMirrorEmailFooterHtml.refresh();
                		
                	}, 1);
                });



                var totalLines1 = myCodeMirrorEmailHeaderHtml.lineCount();
                myCodeMirrorEmailHeaderHtml.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines1 });

                var totalLines2 = myCodeMirrorEmailStyles.lineCount();
                myCodeMirrorEmailStyles.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines2 });

                var totalLines3 = myCodeMirrorEmailFooterHtml.lineCount();
                myCodeMirrorEmailFooterHtml.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines3 });


                var delay;

                myCodeMirrorEmailHeaderHtml.on("change", function() {
                    clearTimeout(delay);
                    delay = setTimeout(updatePreview, 300);
                });

                myCodeMirrorEmailStyles.on("change", function() {
                    clearTimeout(delay);
                    delay = setTimeout(updatePreview, 300);
                });

                myCodeMirrorEmailFooterHtml.on("change", function() {
                    clearTimeout(delay);
                    delay = setTimeout(updatePreview, 300);
                });


                function updatePreview() {
                    var previewFrame = document.getElementById('preview');
                    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    preview.open();
                    // $(preview).find('html').perfectScrollbar();
                    preview.write(myCodeMirrorEmailHeaderHtml.getValue() + myCodeMirrorEmailFooterHtml.getValue());
                    preview.close();
                    loadCSS();
                }


                setTimeout(updatePreview, 300);

                function loadCSS() {
                	var $head = $("#preview").contents().find("head");
					// var scriptTag = "<script src='js/webpack.app_cache.js'><";scriptTag +=  "/script>";
					// var scriptTag2 = "<script src='js/webpack.CV_brand_settings.js'><";scriptTag2 +=  "/script>";
					// $head.append(scriptTag);
					// $head.append(scriptTag2);
                    $head.append("<style>" + myCodeMirrorEmailStyles.getValue() + "</style>");
                }
            },
            Form.updateCodeMirror = function(data) {

                var cm = $('.mdl-tabs__panel.is-active .CodeMirror')[0].CodeMirror;
                var doc = cm.getDoc();
                var cursor = doc.getCursor();
                var line = doc.getLine(cursor.line);
                var pos = {
                    line: cursor.line,
                    ch: line.length - 1
                }
                doc.replaceRange('\n' + data + '\n', pos);
            },
            Form.insertVariable = function(handler) {
                this.updateCodeMirror('[[ ' + handler.attr('title') + ' ]]');
                return false;
            },
            Form.insertInstruction = function(handler) {
                this.updateCodeMirror(handler.attr('title'));
                return false;
            }

    };

    /* checkable import checkbox */
    $('input:checkbox.brand-selector').on('ifChanged', function(e) {
        e.preventDefault();
        Form.changeState(this);
        return true;
    });

    $(function() {

        Form.init();
        Form.syntaxHighlight();

        $('a.insert-variable').click(function(e) {
            Form.insertVariable($(this));
        });
        $('a.insert-instruction').click(function(e) {
            Form.insertInstruction($(this));
        });


        // console.log(iframeHTML);
        // console.log(iframeHTML.find('html'));
        // iframeHTML.find('html').perfectScrollbar();
        // // console.log($(frameHTML));
        // // $(frame).find('html')


    });

        var iframe = $('#preview');
        

        iframe.on('load', function(){

			// var scriptTag = "<script src='js/webpack.app_cache.js'><";
			// scriptTag +=  "/script>";
			// var scriptTag2 = "<script src='js/webpack.CV_brand_settings.js'><";
			// scriptTag2 +=  "/script>";
			// // console.log(scriptTag);
			// $("#preview").contents().find("head").append(scriptTag);
			// $("#preview").contents().find("head").append(scriptTag2);

   //      	var iframeContent = $(iframe.contents());
   //      	var iframeHTML = iframeContent.find('html')
   //      	// console.log( iframeHTML );
   //      	$(iframeHTML).perfectScrollbar();

		      // var iframe = document.querySelector('#preview');
		      // iframe.onload = function () {
		      //   Ps.initialize(iframe.contentDocument.outerHTML)
		      // };



        });


}).call(this);

// componentHandler.upgradeAllRegistered();
