/* global APP noty swal dialogPolyfill */

const AntaresNotifications = function() {};

/*
usage
noty($.extend( {}, APP.noti.successFM("lg", "full"), {text: "abracadarba, epsium!"}));
*/

AntaresNotifications.prototype.noti = {
  chosenTheme: '',

  notyDefaults: {
    type: 'warning',
    layout: 'topRight',
    theme: 'mint',
    text: 'Sample Noty',
    timeout: 5000,
    progressBar: true,
    closeWith: ['click', 'button'],
    animation: {
      open: 'animated slideInRight', // Animate.css class names
      close: 'animated slideOutRight' // Animate.css class names
    },
    template:
      '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>',
    id: false,
    force: false,
    killer: false,
    queue: 'global',
    container: false,
    buttons: [],
    sounds: {
      sources: [],
      volume: 1,
      conditions: []
    },
    titleCount: {
      conditions: []
    },
    modal: false
  },

  base: {
    layout: 'topRight',
    type: 'warning',
    text: '',
    animation: {
      open: 'animated slideInRight', // Animate.css class names
      close: 'animated slideOutRight' // Animate.css class names
    },
    template:
      '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>',
    maxVisible: 5,
    timeout: 2500
  },

  generateTheme() {
    var self = this;
    const args = Array.prototype.slice.call(arguments);
    const contentArr = [];
    self.chosenTheme = '';
    contentArr.push(APP.noti.theme);

    args.forEach(function(arg) {
      if (typeof APP.noti[arg] !== 'undefined') {
        contentArr.push(APP.noti[arg]);
      } else {
        console.log('bad argument');
      }
    });

    self.chosenTheme = contentArr.join(' ');
  },

  alertFM(size, glow, icon, bg) {
    var self = this;
    var notyConfig = $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.typeAlert,
      {
        theme: self.chosenTheme
      }
    );
    this.generateTheme.apply(this, arguments);
    return notyConfig;
  },

  successFM(size, glow, icon, bg) {
    var self = this;
    var notyConfig = $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.typeSuccess,
      {
        theme: self.chosenTheme
      }
    );
    this.generateTheme.apply(this, arguments);
    return notyConfig;
  },
  errorFM(size, glow, icon, bg) {
    var self = this;
    var notyConfig = $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.typeError,
      {
        theme: self.chosenTheme
      }
    );
    this.generateTheme.apply(this, arguments);
    return notyConfig;
  },
  warningFM(size, glow, icon, bg) {
    var self = this;
    var notyConfig = $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.typeWarning,
      {
        theme: self.chosenTheme
      }
    );
    this.generateTheme.apply(this, arguments);
    return notyConfig;
  },
  infoFM(size, glow, icon, bg) {
    var self = this;
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend({}, this.notyDefaults, this.base, this.typeInfo, {
      theme: self.chosenTheme
    });
    return notyConfig;
  },
  confirmFM(size, glow, icon, bg) {
    var self = this;
    this.generateTheme.apply(this, arguments);
    var notyConfig = $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.typeConfirm,
      {
        theme: self.chosenTheme
      }
    );
    return notyConfig;
  },

  theme: 'FM',

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

  closeButton: {
    closeWith: ['button']
  },

  typeAlert: {
    type: 'alert',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-alert-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeSuccess: {
    type: 'success',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-check-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeError: {
    type: 'error',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-alert-circle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeWarning: {
    type: 'warning',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-alert-triangle noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeInfo: {
    type: 'information',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  },
  typeConfirm: {
    type: 'confirm',
    template:
      '<div class="noty_message"><i class="zmdi zmdi-info noty_icon"></i><span class="noty_text"></span><i class="zmdi zmdi-close noty_close"></i></div>'
  }
};

AntaresNotifications.prototype.swal = {
  init(theme, type, custom, confirmFunction) {
    $('.sweet-alert').attr('class', 'sweet-alert');

    if (
      typeof APP.swal[theme] !== 'undefined' &&
      typeof APP.swal[type] !== 'undefined'
    ) {
      var medley = $.extend(
        {},
        APP.swal.base,
        APP.swal[theme],
        APP.swal[type],
        custom
      );

      if (confirmFunction && typeof confirmFunction === 'function') {
        swal(medley, function() {
          return confirmFunction();
        });
      } else {
        swal(medley);
      }

      componentHandler.upgradeAllRegistered();
    } else {
      return false;
    }
  },

  close() {
    swal.closeModal();
  },
  base: {
    allowEscapeKey: true,
    showLoaderOnConfirm: true,
    buttonsStyling: false,
    showCancelButton: true,
    type: 'success',
    title: 'Warning Confirmation Modal',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie mi erat, Pellegestas. ',
    animation: false
  },

  skin2: {
    customClass: 'CB CB--type1'
  },

  skin1: {
    customClass: 'CB CB--type2'
  },

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
  cb1Warning() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin1,
      this.typeWarning
    );
  },
  cb1Error() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin1,
      this.typeError
    );
  },
  cb1Success() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin1,
      this.typeSucces
    );
  },
  cb1Info() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin1,
      this.typeInfo
    );
  },

  cb2Warning() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin2,
      this.typeWarning
    );
  },
  cb2Error() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin2,
      this.typeError
    );
  },
  cb2Success() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin2,
      this.typeSucces
    );
  },
  cb2Info() {
    return $.extend(
      {},
      this.notyDefaults,
      this.base,
      this.skin2,
      this.typeInfo
    );
  }
};

/*
INIT SAMPLE


APP.dialog.init({
    content: 'Lorem',
    title: 'asdasd',
    actionPosition: 'right',
    width:'95%',
    height:'500px',
    buttons: {
        Confirm: {
            type: "primary",
            action() {
                alert("action1");
            }
        },
        Cancel: {
            type: "default",
            action() {
                alert("action2");
            }
        },
        Custom: {
            type: "red",
            action() {
                APP.dialog.init({
                    content: '<button class="btn-link btn--md btn--primary mdl-button mdl-js-button mdl-js-ripple-effect show-dialog">Click</button>',
                    title: 'asdasd',
                    actionPosition: 'rig6ht',
                    buttons: {
                        Confirm: {
                            type: "primary",
                            action() {
                                alert("action1");
                            }
                        },
                        Cancel: {
                            type: "default",
                            action() {
                                alert("action2");
                            }
                        },
                        Abort: {
                            type: "red",
                            action() {
                               alert("action3");
                            }
                        }
                    }
                });
            }
        }
    }
});

*/

AntaresNotifications.prototype.dialog = {
  onLoad() {
    function dialogModal(showModalButton) {
      var showModalButton = document.querySelector('.show-dialog');
      var dialog = document.querySelector('dialog');

      if (!dialog || !showModalButton) {
        return false;
      }

      if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
      }

      if (showModalButton && dialog) {
        dialog.classList.add('ar-dialog');

        if ($('dialog').length > 1) {
          $('.show-dialog').each(function(index, el) {
            var data = $(el).data('dialog-id');

            $(el).on('click', function() {
              var $targetDialog = $('dialog[data-dialog-id="' + data + '"');
              var targetDialog = $('dialog[data-dialog-id="' + data + '"')[0];

              $targetDialog.find('.close').on('click', function() {
                $targetDialog[0].close();
              });

              targetDialog.showModal();
            });
          });
        } else {
          dialog
            .querySelectorAll('.ar-dialog .close')
            .forEach(function(element, index) {
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
  },

  init(options) {
    this.cleanUp(options);
    this.addHeader(options);
    this.addContent(options);
    this.addFooter(options);
    this.display(options);
    this.setSize(options);
    this.extend(options);
  },

  cleanUp(options) {
    $('.ar-dialog').removeClass('is-current');
    $('.ar-dialog').removeAttr('open');

    var dialogElement = '';
    dialogElement += '<dialog class="mdl-dialog ar-dialog is-current">';
    dialogElement += '<div class="mdl-dialog__canvas">';
    dialogElement += '<div class="mdl-dialog__header">';
    dialogElement += '<span class="mdl-dialog__title">Modal</span>';
    dialogElement +=
      '<a class="mdl-js-button mdl-js-ripple-effect close" href="#"><i class="zmdi zmdi-close"></i></a>';
    dialogElement += '</div>';
    dialogElement += '<div class="mdl-dialog__content" data-scrollable>';
    dialogElement += '<p>';
    dialogElement += '</p>';
    dialogElement += '</div>';
    dialogElement += '<div class="mdl-dialog__actions">';
    dialogElement +=
      '<button type="button" class="btn btn--s-small btn--primary mdl-js-button mdl-js-ripple-effect mr8">Agree</button>';
    dialogElement +=
      '<button type="button" class="btn btn--s-small btn--dark mdl-js-button mdl-js-ripple-effect close">Disagree</button>';
    dialogElement += '</div>';
    dialogElement += '</div>';
    dialogElement += '</dialog>';

    $('ar-dialog').removeClass('is-current');
    $('body').append(dialogElement);
    var dialog = document.querySelector('dialog.is-current');
  },

  addHeader(options) {
    var dialog = document.querySelector('dialog.is-current');

    if (!$.isEmptyObject(options) && 'title' in options) {
      console.log(options.title);

      $('dialog.is-current .mdl-dialog__title').text(options.title);
    }

    dialog
      .querySelectorAll('.ar-dialog .close')
      .forEach(function(element, index) {
        element.addEventListener('click', function() {
          dialog.close();
        });
      });
  },

  addContent(options) {
    var dialog = document.querySelector('dialog.is-current');

    dialog.classList.add('is-programmatic');

    if (!$.isEmptyObject(options) && 'ajaxURL' in options) {
      $.get(options.ajaxURL, function(response) {
        $('.ar-dialog.is-current .mdl-dialog__content').html(response);
      });
    } else if (!$.isEmptyObject(options) && 'content' in options) {
      if ($(options.content).length) {
        var dialogContent = '',
          dialogContent = $(options.content).clone();

        $('.ar-dialog.is-current .mdl-dialog__content').html('');
        $('.ar-dialog.is-current .mdl-dialog__content').append(dialogContent);
      } else {
        $('.ar-dialog.is-current .mdl-dialog__content').html(options.content);
      }
    }
  },

  addFooter(options) {
    if (!$.isEmptyObject(options) && 'buttons' in options) {
      $('.ar-dialog.is-current .mdl-dialog__actions').html('');

      Object.keys(options.buttons).forEach(function(key) {
        var btnclass = 'btn btn--s-small btn--primary';

        if (options.buttons[key].type === 'primary') {
          btnclass = 'btn btn--s-small btn--primary';
        } else if (options.buttons[key].type === 'default') {
          btnclass = 'btn btn--s-small btn--default';
        } else if (options.buttons[key].type === 'red') {
          btnclass = 'btn btn--s-small btn--red';
        } else if (options.buttons[key].type === 'dark') {
          btnclass = 'btn btn--s-small btn--dark';
        } else {
          console.log('modal footer button type unknown');
        }

        $('.ar-dialog.is-current .mdl-dialog__actions').prepend(
          '<button class="' + btnclass + ' ">' + key + '</button>'
        );

        $(
          '.ar-dialog.is-current .mdl-dialog__actions > *:first-child'
        ).on('click', function() {
          options.buttons[key].action();
        });
      });
    }

    if (
      !$.isEmptyObject(options) &&
      'actionPosition' in options &&
      options.actionPosition == 'right'
    ) {
      $('.ar-dialog.is-current').addClass('ar-dialog--actions-right');
    }
  },

  display(options) {
    var dialog = document.querySelector('.ar-dialog.is-current');

    dialog.showModal();

    componentHandler.upgradeAllRegistered();
    $('.ar-dialog.is-current .mdl-dialog__content').perfectScrollbar();
  },
  setSize(options) {
    if (!$.isEmptyObject(options) && 'width' in options) {
      $('.ar-dialog.is-current').css('width', options.width);
      $('.ar-dialog.is-current').css('min-width', options.width);
    }

    if (!$.isEmptyObject(options) && 'height' in options) {
      $('.ar-dialog.is-current').css('height', options.height);
      $('.ar-dialog.is-current').css('min-height', options.height);
    }
  },
  validation(errors, form) {
    $('dialog form').on('submit', function() {
      $.each(errors, function(key, value) {
        var input = form.find(
          'input[name="' +
            key +
            '"], textarea[name="' +
            key +
            '"], select[name="' +
            key +
            '"]'
        );
        if (input.length) {
          input.addClass('error');
          input.parent().append('<span class="error">' + value + '</span>');
        }
      });
    });
  },
  clearErrors(form) {
    $(form).on('submit', function() {
      $.each(form.find('input, textarea, select'), function(e) {});
    });
  },
  extend(options) {
    var showModalButton = document.querySelector('.show-dialog');
    var dialog = document.querySelector('dialog');

    if (showModalButton && dialog) {
      dialog.classList.add('ar-dialog');

      showModalButton.addEventListener('click', function() {
        dialog.showModal();
        $('.is-programmatic').removeAttr('open');
      });

      dialog
        .querySelectorAll('.ar-dialog .close')
        .forEach(function(element, index) {
          element.addEventListener('click', function() {
            dialog.close();
          });
        });

      APP.init();
    }
  }
};

/*
usage
APP.modal.init({
    title: 'Test Title',
    buttons: {
        'Confirm': {
            type: 'primary',
            action() {
                alert('action1');
            },
        },
        'Cancel': {
            type: 'default',
            action() {
                $.modal.close();
            },
        }
    }
});

*/

AntaresNotifications.prototype.modal = {
  init(options) {
    this.showModal(options);
    this.addFooter(options);
    this.addHeader(options);
    this.setWidth(options);
  },
  orgOptions: {
    showClose: false
  },
  setWidth(options) {
    if (!$.isEmptyObject(options) && 'width' in options) {
      var dataWidth = options.width;

      $('.jquery-modal.current .modal').css('width', dataWidth);
    }
  },
  showModal(options) {
    if (!$.isEmptyObject(options) && 'element' in options) {
      var target = $(options.element);
      target.modal(this.orgOptions);
    } else {
      $('[data-modal="true"]').modal(this.orgOptions);
    }
  },
  addFooter(options) {
    if (!$.isEmptyObject(options) && 'buttons' in options) {
      $('.jquery-modal.current .modal .modal__footer').remove();

      $('.jquery-modal.current .modal').append(
        '<div class="modal__footer"></div>'
      );

      Object.keys(options.buttons).forEach(function(key) {
        var btnclass = 'btn btn--md btn--primary';

        if (options.buttons[key].type === 'primary') {
          btnclass = 'btn btn--md btn--primary';
        } else if (options.buttons[key].type === 'default') {
          btnclass = 'btn btn--md btn--default';
        } else if (options.buttons[key].type === 'red') {
          btnclass = 'btn btn--md btn--red';
        } else if (options.buttons[key].type === 'dark') {
          btnclass = 'btn btn--md btn--dark';
        } else {
          console.log('modal footer button type unknown');
        }

        $('.jquery-modal.current .modal__footer').prepend(
          '<button class="' + btnclass + ' ">' + key + '</button>'
        );

        $(
          '.jquery-modal.current .modal__footer .btn:first-child'
        ).on('click', function() {
          options.buttons[key].action();
        });
      });
    } else {
      $('.jquery-modal.current .modal').css('padding-bottom', '24px');
    }
  },
  addHeader(options) {
    $('.jquery-modal.current .modal .modal__header').remove();

    $('.jquery-modal.current .modal').prepend(
      '<div class="modal__header"><div class="modal__title">Title</div><a class="modal__close" href="#" rel="modal:close"><i class="zmdi zmdi-close"></i></a></div>'
    );
    if (!$.isEmptyObject(options) && 'title' in options) {
      $('.jquery-modal.current .modal__title').html(options.title);
    }
  }
};

window.APP = new AntaresNotifications();

$(function() {
  //CSS MODAL
  $('[data-armodal] .modal__close').on('click', function(e) {
    var scrollV,
      scrollH,
      loc = window.location;

    scrollV = document.body.scrollTop;
    scrollH = document.body.scrollLeft;

    var url = window.location.href.substr(0, window.location.href.indexOf('#'));

    setTimeout(function() {
      window.history.pushState('page2', 'Title', url);
      console.log('hash removed');
    }, 220);

    document.body.scrollTop = scrollV;
    document.body.scrollLeft = scrollH;
  });

  // Dialog
  $('.mdl-dialog').on('open', function(event) {
    $('#app-wrapper').addClass('dialog-is-open');
  });

  $('.mdl-dialog').on('close', function(event) {
    $('#app-wrapper').removeClass('dialog-is-open');
  });
});
