import { Antares } from './antares_mechanics';

Antares.prototype.swal = {
  //example of use:
  // APP.swal.init('skin1', 'typeError', {title: 'Some Title, RIGHT?!', text: 'Up We go...'});

  init: function(theme, type, custom, confirmFunction) {
    $('.sweet-alert').attr('class', 'sweet-alert');

    //if exist
    if (typeof APP.swal[theme] !== 'undefined' && typeof APP.swal[type] !== 'undefined') {
      var medley = $.extend({}, APP.swal.base, APP.swal[theme], APP.swal[type], custom);
      //load!
      if (confirmFunction && typeof confirmFunction === 'function') {
        window.swal(medley, function() {
          return confirmFunction();
        });
      } else {
        window.swal(medley);
      }

      //update mdl
      componentHandler.upgradeAllRegistered();
    } else {
      // console.log('wrong parameter.');
      return false;
    }
  },

  close: function() {
    window.swal.closeModal();
  },
  base: {
    allowEscapeKey: true,
    showLoaderOnConfirm: true,
    buttonsStyling: false,
    showCancelButton: true,
    type: 'success',
    title: 'Warning Confirmation Modal',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie mi erat, Pellegestas. ',
    animation: false
    // html: 'You can use <b>bold text</b>, ' +
    // '<a href="//github.com">links</a> ' +
    // 'and other HTML tags',
  },

  //skins are revered
  skin2: {
    customClass: 'CB CB--type1'
  },

  skin1: {
    customClass: 'CB CB--type2'
  },

  //types
  typeWarning: {
    type: 'warning'
  },

  typeError: {
    type: 'error'
  },

  typeSucces: {
    type: 'success'
  },
  typeInfo: {
    type: 'info'
  },
  cb1Warning: function() {
    return $.extend({}, this.base, this.skin1, this.typeWarning);
  },
  cb1Error: function() {
    return $.extend({}, this.base, this.skin1, this.typeError);
  },
  cb1Success: function() {
    return $.extend({}, this.base, this.skin1, this.typeSucces);
  },
  cb1Info: function() {
    return $.extend({}, this.base, this.skin1, this.typeInfo);
  },

  cb2Warning: function() {
    return $.extend({}, this.base, this.skin2, this.typeWarning);
  },
  cb2Error: function() {
    return $.extend({}, this.base, this.skin2, this.typeError);
  },
  cb2Success: function() {
    return $.extend({}, this.base, this.skin2, this.typeSucces);
  },
  cb2Info: function() {
    return $.extend({}, this.base, this.skin2, this.typeInfo);
  }
};

Antares.prototype.noti = {
  base: {
    // layout: 'centerFull',
    layout: 'topRight',
    type: 'warning',
    text: '',
    animation: {
      open: 'animated slideInRight', // Animate.css class names
      close: 'animated slideOutRight' // Animate.css class names
      // easing: 'ease-in-out', // unavailable - no need
      // speed: 150 // unavailable - no need
    },
    template: '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>',
    maxVisible: 5,
    // 14000
    timeout: 2500
  },
  generateTheme: function() {
    //cleanup
    var contentArr = [];
    APP.noti.className = '';
    //default theme
    contentArr.push(APP.noti.theme);
    //argument for each
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function(arg) {
      //if set
      if (typeof APP.noti[arg] != 'undefined') {
        contentArr.push(APP.noti[arg]);
      } else {
        // if no match
        console.log('bad argument');
      }
    });

    //join and create classname
    APP.noti.className = contentArr.join(' ');
    // console.log(APP.noti.className);
  },

  ///
  // usage
  // noty($.extend( {}, APP.noti.alertFM("lg", "full"), {text: "abracadarba, epsium!"}));
  // noty($.extend( {}, APP.noti.successFM("lg", "full"), {text: "abracadarba, epsium!"}));
  ///

  alertFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeAlert, {
      theme: APP.noti.className
    });
    return notyConfig;
  },

  successFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeSuccess, {
      theme: APP.noti.className
    });
    return notyConfig;
  },
  errorFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeError, {
      theme: APP.noti.className
    });
    return notyConfig;
  },
  warningFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeWarning, {
      theme: APP.noti.className
    });
    return notyConfig;
  },
  infoFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeInfo, {
      theme: APP.noti.className
    });
    return notyConfig;
  },
  confirmFM: function(size, glow, icon, bg) {
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.base, this.typeConfirm, {
      theme: APP.noti.className
    });
    return notyConfig;
  },

  //Base
  theme: 'FM',
  //Sizes
  lg: 'FM--lg',
  md: 'FM--md',
  sm: 'FM--sm',
  xs: 'FM--xs',
  glow: 'FM--glow',
  noIcon: 'FM--noicon',
  bg: 'FM--bg',
  border: 'FM--border',
  outline: 'FM--outline',
  full: 'FM--glow FM--border FM--bg FM--border',
  // close: 'FM--close',

  //close button
  closeButton: {
    closeWith: ['button']
  },
  //types
  typeAlert: {
    type: 'alert',
    template: '<div class="noty_message"><i class="zmdi zmdi-alert-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeSuccess: {
    type: 'success',
    template: '<div class="noty_message"><i class="zmdi zmdi-check-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeError: {
    type: 'error',
    template: '<div class="noty_message"><i class="zmdi zmdi-alert-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeWarning: {
    type: 'warning',
    template: '<div class="noty_message"><i class="zmdi zmdi-alert-triangle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeInfo: {
    type: 'information',
    template: '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeConfirm: {
    type: 'confirm',
    template: '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  }
};

Antares.prototype.dialog = {
  // clean html use - onLoad
  onLoad: function() {
    // Create modal when html is defined
    function dialogModal(showModalButton, dialogElement) {
      // Variables
      var showModalButton = document.querySelector('.show-dialog');
      var dialog = document.querySelector('dialog');
      window.dialog = dialog;

      // Restrict
      if (!dialog || !showModalButton) {
        // console.log('aborting - no dialogModal HTML found'); //we need dialog and .show-modal class
        return false;
      }

      // Polyfill when needed
      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }

      if (showModalButton && dialog) {
        //my custom
        //add class if non existent
        dialog.classList.add('ar-dialog');
        //mechanics if mutiple
        if ($('dialog').length > 1) {
          $('.show-dialog').each(function(index, el) {
            var data = $(el).data('dialog-id');

            $(el).on('click', function() {
              var $targetDialog = $('dialog[data-dialog-id="' + data + '"');
              var targetDialog = $('dialog[data-dialog-id="' + data + '"')[0];

              //close
              $targetDialog.find('.close').on('click', function() {
                $targetDialog[0].close();
              });

              targetDialog.showModal();
            });
          });
        } else {
          dialog.querySelectorAll('.ar-dialog .close').forEach(function(element, index) {
            element.addEventListener('click', function() {
              dialog.close();
            });
          });
          showModalButton.addEventListener('click', function() {
            dialog.showModal();
          });
        }
      }
    }

    dialogModal();

    // this.clearErrors($('dialog form'));
  },

  //for progrramatic use
  init: function(options) {
    // console.log('dialog init');
    this.cleanUp(options);
    this.addHeader(options);
    this.addContent(options);
    this.addFooter(options);
    this.display(options);
    this.setSize(options);
    this.extend(options);
  },

  close() {
    $('.ar-dialog').removeClass('is-current');
    $('.ar-dialog').removeAttr('open');
  },

  cleanUp: function(options) {
    // remove current class - CLEANUP
    $('.ar-dialog').removeClass('is-current');
    $('.ar-dialog').removeAttr('open');

    //add new Dialog HTML
    var dialogElement = '';
    dialogElement += '<dialog class="mdl-dialog ar-dialog is-current">';
    dialogElement += '<div class="mdl-dialog__canvas">';
    dialogElement += '<div class="mdl-dialog__header">';
    dialogElement += '<span class="mdl-dialog__title">Modal</span>';
    dialogElement += '<a class="mdl-js-button mdl-js-ripple-effect close" href="#"><i class="zmdi zmdi-close"></i></a>';
    dialogElement += '</div>';
    dialogElement += '<div class="mdl-dialog__content" data-scrollable>';
    dialogElement += '<p>';
    dialogElement += '</p>';
    dialogElement += '</div>';
    dialogElement += '<div class="mdl-dialog__actions">';
    dialogElement += '<button type="button" class="btn btn--s-small btn--primary mdl-js-button mdl-js-ripple-effect mr8">Agree</button>';
    dialogElement += '<button type="button" class="btn btn--s-small btn--dark mdl-js-button mdl-js-ripple-effect close">Disagree</button>';
    dialogElement += '</div>';
    dialogElement += '</div>';
    dialogElement += '</dialog>';

    // remove current class
    $('ar-dialog').removeClass('is-current');
    $('body').append(dialogElement);
    var dialog = document.querySelector('dialog.is-current');
    window.dialog = dialog;
  },

  addHeader: function(options) {
    var dialog = document.querySelector('dialog.is-current');

    if (!$.isEmptyObject(options) && 'title' in options) {
        $('body').addClass('dialog-is-open');
      // Dialog Title
      $('dialog.is-current .mdl-dialog__title').text(options.title);
    }

    // Close buttons
    dialog.querySelectorAll('.ar-dialog .close').forEach(function(element, index) {
      element.addEventListener('click', function() {
        dialog.close();
          $('body').removeClass('dialog-is-open')
      });
    });
  },

  addContent: function(options) {
    var dialog = document.querySelector('dialog.is-current');

    dialog.classList.add('is-programmatic');

    if (!$.isEmptyObject(options) && 'ajaxURL' in options) {
      $.get(options.ajaxURL, function(response) {
        $('.ar-dialog.is-current .mdl-dialog__content').html(response);
          $('.ar-dialog.is-current .mdl-dialog__content').perfectScrollbar()
      });
    } else if (!$.isEmptyObject(options) && 'content' in options) {
      //jquery selector or string = hmm?

      if ($(options.content).length) {
        var dialogContent = '',
          dialogContent = $(options.content).clone();

        // Content - copy from body
        $('.ar-dialog.is-current .mdl-dialog__content').html('');
        $('.ar-dialog.is-current .mdl-dialog__content').append(dialogContent);
      } else {
        $('.ar-dialog.is-current .mdl-dialog__content').html(options.content);
      }
    }
  },

  addFooter: function(options) {
    if (!$.isEmptyObject(options) && 'buttons' in options) {
      $('.ar-dialog.is-current .mdl-dialog__actions').html('');

      //for each button
      Object.keys(options.buttons).forEach(function(key) {
        //types
        var btnclass = 'btn btn--s-small btn--primary';

        if (options.buttons[key].type === 'primary') {
          btnclass = 'btn btn--sm btn--primary mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'default') {
          btnclass = 'btn btn--sm btn--default close mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'red') {
          btnclass = 'btn btn--sm btn--red mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'dark') {
          btnclass = 'btn btn--sm btn--dark mdl-js-button mdl-js-ripple-effect';
        } else {
          console.log('modal footer button type unknown');
        }

        //attach button html
        $('.ar-dialog.is-current .mdl-dialog__actions').prepend('<button class="' + btnclass + ' ">' + key + '</button>');

        //button assign action method
        $('.ar-dialog.is-current .mdl-dialog__actions > *:first-child').on('click', function() {
          options.buttons[key].action();
        });
          $('.ar-dialog.is-current .mdl-dialog__actions').on('click',function () {
           $('body').removeClass('dialog-is-open')
          })
      });
    }

    if (!$.isEmptyObject(options) && 'actionPosition' in options && options.actionPosition == 'right') {
      $('.ar-dialog.is-current').addClass('ar-dialog--actions-right');
    }
  },

  display: function(options) {
    var dialog = document.querySelector('.ar-dialog.is-current');

    dialog.showModal();

    //MDL
    componentHandler.upgradeAllRegistered();
    $('.ar-dialog.is-current .mdl-dialog__content').perfectScrollbar();

    //extend
  },
  setSize: function(options) {
    if (!$.isEmptyObject(options) && 'width' in options) {
      // $('.ar-dialog.is-current').css('min-width', 'auto');

      // $('.ar-dialog.is-current').css('width', options.width);
      $('.ar-dialog.is-current').css('width', options.width);
      $('.ar-dialog.is-current').css('min-width', options.width);
    }

    if (!$.isEmptyObject(options) && 'height' in options) {
      // $('.ar-dialog.is-current').css('min-height', 'auto');

      $('.ar-dialog.is-current').css('height', options.height);
      $('.ar-dialog.is-current').css('min-height', options.height);
    }
  },
  validation: function(errors, form) {
    $('dialog form').on('submit', function() {
      $.each(errors, function(key, value) {
        var input = form.find('input[name="' + key + '"], textarea[name="' + key + '"], select[name="' + key + '"]');
        if (input.length) {
          input.addClass('error');
          input.parent().append('<span class="error">' + value + '</span>');
        }
      });
    });
  },
  clearErrors: function(form) {
    $(form).on('submit', function() {
      $.each(form.find('input, textarea, select'), function(e) {
        // $(this).removeClass('error');
        // $(this).parent().find('span.error').remove();
        // alert('validacja');
      });
    });
  },
  extend: function(options) {
    // Variables
    var showModalButton = document.querySelector('.show-dialog');
    var dialog = document.querySelector('dialog');

    if (showModalButton && dialog) {
      //my custom
      //add class if non existent
      dialog.classList.add('ar-dialog');

      showModalButton.addEventListener('click', function() {
        dialog.showModal();
        $('.is-programmatic').removeAttr('open');
      });

      dialog.querySelectorAll('.ar-dialog .close').forEach(function(element, index) {
        element.addEventListener('click', function() {
          dialog.close();
        });
      });

      APP.dialog.init();
      // AntaresGridstack.init();
    }
  }
};

Antares.prototype.modal = {
  init: function(options) {
    this.showModal(options);
    this.addFooter(options);
    this.addHeader(options);
    this.setWidth(options);
  },
  orgOptions: {
    showClose: false
  },
  setWidth: options => {
    if (!$.isEmptyObject(options) && 'width' in options) {
      var dataWidth = options.width;
      $('.jquery-modal.current .modal').css('width', dataWidth);
    }
  },
  showModal: function(options) {
    if (!$.isEmptyObject(options) && 'element' in options) {
      var target = $(options.element);
      target.modal(this.orgOptions);
        $('body').addClass('dialog-is-open')
    } else {
      //start with DOM
      $('[data-modal="true"]').modal(this.orgOptions);
    }
  },
  addFooter: function(options) {
    //if options exist && buttons exist
    if (!$.isEmptyObject(options) && 'buttons' in options) {
      //clear
      $('.jquery-modal.current .modal .modal__footer').remove();

      //create footer when buttons
      $('.jquery-modal.current .modal').append('<div class="modal__footer"></div>');

      //for each button
      Object.keys(options.buttons).forEach(function(key) {
        //types
        var btnclass = 'btn btn--md btn--primary';

        if (options.buttons[key].type === 'primary') {
          btnclass = 'btn btn--md btn--primary mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'default') {
          btnclass = 'btn btn--md btn--default close mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'red') {
          btnclass = 'btn btn--md btn--red mdl-js-button mdl-js-ripple-effect';
        } else if (options.buttons[key].type === 'dark') {
          btnclass = 'btn btn--md btn--dark mdl-js-button mdl-js-ripple-effect';
        } else {
          console.log('modal footer button type unknown');
        }

        //attach button html
        $('.jquery-modal.current .modal__footer').prepend('<button class="' + btnclass + ' ">' + key + '</button>');

        //button assign action method
        $('.jquery-modal.current .modal__footer .btn:first-child').on('click', function() {
          options.buttons[key].action();
            $('body').removeClass('dialog-is-open')

        });
      });
    } else {
      //allign padding
      $('.jquery-modal.current .modal').css('padding-bottom', '24px');
    }
  },
  addHeader: function(options) {
    //clear
    $('.jquery-modal.current .modal .modal__header').remove();
    //create footer when buttons
    $('.jquery-modal.current .modal').prepend('<div class="modal__header"><div class="modal__title">Title</div><a class="modal__close mdl-js-button mdl-js-ripple-effect close" href="#" rel="modal:close"><i class="zmdi zmdi-close "></i></a></div>');
    if (!$.isEmptyObject(options) && 'title' in options) {
      //insert title
      $('.jquery-modal.current .modal__title').html(options.title);
    }
    $('.modal__close').click(function () {
        $('body').removeClass('dialog-is-open')
    })
      componentHandler.upgradeAllRegistered();

  }
};

//CSS MODAL
$(function() {
  $('[data-armodal] .modal__close').on('click', function(e) {
    var scrollV,
      scrollH,
      loc = window.location;
    // if ("pushState" in history) {
    //     // history.pushState("", document.title, loc.pathname + loc.search);
    // } else {

    // }
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop;
    scrollH = document.body.scrollLeft;

    var url = window.location.href.substr(0, window.location.href.indexOf('#'));

    setTimeout(function() {
      window.history.pushState('page2', 'Title', url);
    }, 220);

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV;
    document.body.scrollLeft = scrollH;
  });
});

$(function() {
  window.APP = APP;

  APP.dialog.onLoad();
});
