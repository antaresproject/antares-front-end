// var store = new Vuex.Store({

// });

import Vue from 'vue';

let loadPossible = false;

let aclContainer = document.getElementById('acl');

if (aclContainer != null) {
  loadPossible = true;
}

import VueResource from 'vue-resource';

Vue.use(VueResource);

if (loadPossible) {
  var VueQuery = require('vuequery');
  window.VueQuery = VueQuery;
  Vue.component('tree-item', {
    template: '#tree-item',
    props: ['model', 'parentCheckbox'],
    data: function() {
      return {
        childCounter: 0,
        checkboxValue: this.model.checked,
        emitEvent: true
        // indeterminate: this.model.indeterminate
      };
    },
    methods: {
      toggleOpenNode: function() {
        this.model.open = !this.model.open;

        this.$nextTick(function() {
          $('.ps').perfectScrollbar('update');
        });
      },

      updateChildCounter: function() {
        var childrenLength = this.$children.length,
          childrenChecked = 0;

        this.childCounter = 0;

        for (var i = 0; i < this.$children.length; i++) {
          if (this.$children[i].model.checked == true) {
            childrenChecked++;
            this.childCounter++;
          }
        }

        if (childrenChecked == 0) {
          this.model.checked = false;
          this.model.indeterminate = false;
        } else if (childrenChecked == childrenLength && childrenChecked != 0) {
          for (var l = 0; l < this.$children.length; l++) {
            this.$children[l].model.checked = true;
          }
          this.model.checked = true;
          this.model.indeterminate = false;

          //indeterminate
        } else {
          this.model.indeterminate = true;
        }
      },
      openChildren: function() {
        this.$nextTick(function() {
          $('.ps').perfectScrollbar('update');
        });

        if (this.model.checked == false) {
          this.model.open = true;
        }
      },
      emmitUpdateParent: function() {
        if (this.emitEvent == true) {
          this.$emit('updateParent', this.checkboxValue);
        }
      }
    },

    mounted: function() {
      this.$watch(
        'model',
        function() {
          this.emmitUpdateParent();
          this.checkboxValue = this.model.checked;
        },
        {
          deep: true
        }
      );

      this.$watch(
        'parentCheckbox',
        function() {
          this.model.checked = this.parentCheckbox;
        },
        {
          deep: true
        }
      );
    },
    beforeMount: function() {
      this.emmitUpdateParent();
    }
  });

  let acl = new Vue({
    el: '#acl',
    data: function() {
      return {
        tree: {}
      };
    },
    created: function() {
      this.$http.get('api/acl.json').then(
        response => {
          this.tree = response.body;
        },
        response => {
          console.log('error');
        }
      );
    }
  });

  let loadConfigurationSelect = $('#load-configuration').find('select');

  $('#load-configuration').on('click', function() {
    loadConfigurationSelect.select2('open');
  });

  loadConfigurationSelect.on('select2:open', function() {
    $('#load-configuration').addClass('load-configuration--active');
  });
  loadConfigurationSelect.on('select2:close', function() {
    $('#load-configuration').removeClass('load-configuration--active');
  });
  loadConfigurationSelect.on('select2:selecting', function(e) {
    var selectItemValue = e.params.args.data.element.value;

    e.preventDefault();

    APP.swal.init('skin1', 'typeError', {
      title: 'Czy na pewno chcesz to zrobic?',
      text: 'Jestes tego pewien?'
    });

    $('body').on('click', '.sweet-cancel', function() {});

    $('#load-configuration').on('click', function() {
      loadConfigurationSelect.select2('open');
    });

    $('body').on('click', '.sweet-container', function() {});

    $('body').on('click', '.sweet-confirm ', function() {
      loadConfigurationSelect.val(selectItemValue).trigger('change');
      loadConfigurationSelect.select2('close');
    });
  });

  loadConfigurationSelect.on('select2:selecting', function(e) {
    var selectItemValue = e.params.args.data.element.value;
    e.preventDefault();
    APP.swal(
      $.extend({}, APP.swal.cb1Warning(), {
        title: loadConfigurationSelect.data('title'),
        text: loadConfigurationSelect.data('description'),
        showCancelButton: true,
        closeOnConfirm: false,
        closeOnCancel: true
      }),
      function(isConfirm) {
        if (isConfirm) {
          loadConfigurationSelect.val(selectItemValue).trigger('change');
          loadConfigurationSelect.select2('close');
          APP.swal.close();
          return (window.location.href = loadConfigurationSelect.data('url') + '/' + selectItemValue);
        }
      }
    );
  });

  $(() => {
    $('#sendAclForm').on('click', function() {
      $(this)
        .closest('form')
        .submit();
    });

    $('#acl-form').on('submit', function(event) {
      event.preventDefault();
      alert($(this).serialize());
    });

    $('#sendAclForm').on('click', function() {
      $('#acl-form').submit();
    });
  });
}
