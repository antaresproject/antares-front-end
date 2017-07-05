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
const AntaresEmailSettings = {

    init() {
        this.syntaxHighlight();
        this.jqueryDOM();
    },

    syntaxHighlight() {

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
            matchTags: {
                bothTags: true
            }
        }

        // refresj
        $('.page-email-settings .mdl-tabs').find('.mdl-tabs__tab').on('click', function() {
            setTimeout(function() {
                myCodeMirrorEmailFooterHtml.refresh();
                myCodeMirrorEmailStyles.refresh();
                myCodeMirrorEmailFooterHtml.refresh();
            }, 1);
        });

        // INTI!
        var myCodeMirrorEmailHeaderHtml = CodeMirror.fromTextArea(emailHeaderHtml, $.extend({}, CM_cfg, {
            mode: "xml",
            htmlMode: true,
        }));
        var myCodeMirrorEmailStyles = CodeMirror.fromTextArea(emailStyles, $.extend({}, CM_cfg, {
            mode: "css",
            htmlMode: false,
        }));
        var myCodeMirrorEmailFooterHtml = CodeMirror.fromTextArea(emailFooterHtml, $.extend({}, CM_cfg, {
            mode: "xml",
            htmlMode: true,
        }));


        var totalLines1 = myCodeMirrorEmailHeaderHtml.lineCount();
        myCodeMirrorEmailHeaderHtml.autoFormatRange({
            line: 0,
            ch: 0
        }, {
            line: totalLines1
        });
        var totalLines2 = myCodeMirrorEmailStyles.lineCount();
        myCodeMirrorEmailStyles.autoFormatRange({
            line: 0,
            ch: 0
        }, {
            line: totalLines2
        });
        var totalLines3 = myCodeMirrorEmailFooterHtml.lineCount();
        myCodeMirrorEmailFooterHtml.autoFormatRange({
            line: 0,
            ch: 0
        }, {
            line: totalLines3
        });


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
            preview.write(myCodeMirrorEmailHeaderHtml.getValue() + myCodeMirrorEmailFooterHtml.getValue());
            preview.close();
            loadCSS();
        }

        setTimeout(updatePreview, 300);

        function loadCSS() {
            var $head = $("#preview").contents().find("head");
            $head.append("<style>" + myCodeMirrorEmailStyles.getValue() + "</style>");
        }
    },

    updateCodeMirror(data) {

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

    insertVariable(handler) {
        this.updateCodeMirror('[[ ' + handler.attr('title') + ' ]]');
        return false;
    },

    insertInstruction(handler) {
        this.updateCodeMirror(handler.attr('title'));
        return false;
    },

    jqueryDOM() {
        var self = this;
        $('a.insert-variable').click(function() {
            self.insertVariable($(this));
        });
        $('a.insert-instruction').click(function() {
            self.insertInstruction($(this));
        });
    }

    // END --------------------------------------------------

};

$(function() {
    window.AntaresEmailSettings = AntaresEmailSettings;
    AntaresEmailSettings.init();
});