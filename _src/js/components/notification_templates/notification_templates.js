
(function() {	
    var clipboard = require('clipboard');
    window.Clipboard = clipboard;

    CKEDITOR.config.extraPlugins = 'placeholder';

    var notificationTemplates = {
        init: function(){
            this.initCodeMirror();            
            if($(window).width() > 768 ){
                this.initCKEditor();
            }else{
                this.initMobileCKE();
            }
            this.reszie();
            this.clipboard();
            this.variablesPanel();
            this.copyFromHTMLEditor();
            this.refreshCodeMirror();
            this.insertVariable();
        },
        variablesPanel: function(){
            $('.mdl-tabs .mdl-tabs--open-variables-panel').on('click', function(){
                $(this).closest('.mdl-tabs').addClass('mdl-tabs--open-variables-panel');
            });
            $('.mdl-tabs--close-variables-panel, .variables-pane__mobile-button a').on('click', function(){
                $(this).closest('.page-notification-templates').find('.mdl-tabs--open-variables-panel').removeClass('mdl-tabs--open-variables-panel');
            });

            $('.variables-pane .variables-pane__inner').perfectScrollbar({
                wheelPropagation: true
            });    

            $(window).on('reszie', function(){
                $('.variables-pane .variables-pane__inner').perfectScrollbar('update');    
            });
            $('.left-tabs__desktop-links a').on('resize',function(e){
                e.preventDefault();
            });
            
        },
        initCKEditor: function(){

            if(CKEDITOR.instances.wysiwyg){
                CKEDITOR.instances.wysiwyg.destroy();
            }

            CKEDITOR.replace('wysiwyg', {
                height: 600,
                width: '100%',
                fullPage: true,
                allowedContent: true,
                skin: 'antares,skins/antares-theme/'
            });

            CKEDITOR.instances.wysiwyg.setData($("#html-editor").val());

            CKEDITOR.instances.wysiwyg.on('blur', function(event) {
                var data = CKEDITOR.instances.wysiwyg.getData();
                $("#html-editor").html(data).change();
            });
            
            
            CKEDITOR.config.removePlugins = 'resize,autogrow';
            let CKEDitor_loaded = false;

            CKEDITOR.on('instanceReady', function(){ 
                let CKEditor_loaded = true; 
                // $('.variables-pane, #email-footer-html').matchHeight({
                //     target: $('.left-tabs')
                // });
                $('.variables-pane .variables-pane__inner').perfectScrollbar({
                    wheelPropagation: true
                });
            }); 


        },
        initMobileCKE: function(){
            if(CKEDITOR.instances.wysiwyg){
                CKEDITOR.instances.wysiwyg.destroy();
            }     
            CKEDITOR.replace( 'wysiwyg', {
                height: '100%',
                width: '100%',
                fullPage: true,
                allowedContent: true,
                skin: 'antares,skins/antares-theme/',
                toolbar: [
                    [ 'Bold', 'Italic', 'Underline', 'Strike', 'NumberedList', 'BulletedList', 'SpellChecker','Maximize']
                ]
            });   
            CKEDITOR.instances.wysiwyg.setData($("#html-editor").val());       

        },
        initCodeMirror: function(){
            var htmlEditor = document.getElementById('html-editor');
            var phpEditor = document.getElementById('php-editor');
            var CM_cfg = {
                theme: 'ambiance',
                lineNumbers: true,
                lineWrapping: true,
                styleActiveLine: true,
                matchBrackets: true,
                scrollbarStyle: "overlay",
                readOnly: false,
                matchTags: {bothTags: true}
            }; 
            this.mirrorHTMLEditor = CodeMirror.fromTextArea(htmlEditor, $.extend({}, CM_cfg, { mode: "xml", htmlMode: true, }));

            this.morrorPHPEditor = CodeMirror.fromTextArea(phpEditor, $.extend({}, CM_cfg, { mode: "text/x-php"}));   
        },
        copyFromHTMLEditor: function(){
            self = this;
            this.mirrorHTMLEditor.on('blur', function(){
                var data = self.mirrorHTMLEditor.getValue();
                CKEDITOR.instances.wysiwyg.setData(data)
            });
        },
        insertVariable: function(){
            self = this;
            $('.variables-pane .variables-pane__paste').on('click', function(){
                var $dataPre = $(this).closest('.variables-pane__instruction-content').find('pre');
                var content = $dataPre.text();  
                console.log(content);
                if($(".left-tabs a[href='#wyswig-panel']").hasClass("is-active")){
                    $(".page-notification-templates__content .mdl-tabs--open-variables-panel").removeClass('mdl-tabs--open-variables-panel');
                    var id = $dataPre.attr('id');
                    CKEDITOR.instances.wysiwyg.insertHtml(content);
                }else{
                    self.mirrorHTMLEditor.replaceSelection(content.trim()); 

                    var data = self.mirrorHTMLEditor.getValue();
                    CKEDITOR.instances.wysiwyg.setData(data);
                }
            });
        },
        refreshCodeMirror: function(){
            self = this; 
            $("#html-editor").on('change', function(){
                    self.mirrorHTMLEditor.doc.setValue($(this).val());
            });
            $('.left-tabs .mdl-tabs__tab').on('click', function() {
                setTimeout(function() {

                    self.mirrorHTMLEditor.refresh();
                    self.morrorPHPEditor.refresh();

                }, 1);
            });

        },
        clipboard: function(){

            new Clipboard('.variables-pane .variables-pane__copy');

        },
        reszie: function(){
            self = this; 
            enquire.register("screen and (max-width:767px)", {
                match: function() {
                    self.initMobileCKE();
                },
                unmatch: function() {
                    self.initCKEditor();
                }
            });
        }
    }

    $(function() {
        notificationTemplates.init();
    });

    
}).call(this);