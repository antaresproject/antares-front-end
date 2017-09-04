// var store = new Vuex.Store({

// });

import Vue from 'vue';

let loadPossible = false;

let aclContainer = document.getElementById('acl');

if (aclContainer != null) {
  loadPossible = true;
}

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
        tree: {
          name: 'Tree Root',
          open: true,
          checked: false,
          children: [
            {
              saveName: 'custom-fields3434',
              name: 'Custom Fields',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
              indeterminate: false,
              checked: false
            },
            {
              saveName: 'billing',
              name: 'Billing',
              indeterminate: false,
              checked: false,
              open: true,
              children: [
                {
                  saveName: 'create',
                  name: 'Create',
                  indeterminate: false,
                  checked: false
                },
                {
                  saveName: 'edit',
                  name: 'Edit',
                  indeterminate: false,
                  checked: false
                },
                {
                  saveName: 'detele',
                  name: 'Delete',
                  indeterminate: false,
                  checked: false
                }
              ]
            },
            {
              saveName: 'configurasdfsdftion22',
              name: 'Configuration',
              indeterminate: false,
              checked: false,
              open: true,
              children: [
                {
                  saveName: 'configdsfsdfuration5',
                  name: 'LVL2',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                  indeterminate: false,
                  checked: false
                },
                {
                  saveName: 'customsdf-fsdfsdfields6',
                  name: 'Custom Fields',
                  description: '2222 ipsum dolor sit amet, consectetur',
                  indeterminate: false,
                  checked: false,
                  open: false
                },
                {
                  saveName: 'staff-msdfsdfanagmenfd23423t2',
                  name: 'Staff Management',
                  description: '2222 ipsum dolor sit amet, consectetur',
                  indeterminate: false,
                  checked: false,
                  open: true,
                  children: [
                    {
                      saveName: 'configura2sdfsdftion2',
                      name: 'LVL3',
                      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                      indeterminate: false,
                      checked: false
                    },
                    {
                      saveName: 'staff-sdfdasf-fields3',
                      name: 'Custom Fields',
                      description: '2222 ipsum dolor sit amet, consectetur',
                      indeterminate: false,
                      checked: false,
                      open: false
                    },
                    {
                      saveName: 'dfsdfsdfsdfsdf-managment65',
                      name: 'Staff Management',
                      description: '2222 ipsum dolor sit amet, consectetur',
                      indeterminate: false,
                      checked: false,
                      open: true,
                      children: [
                        {
                          saveName: 'configuration5',
                          name: 'LVL4',
                          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          indeterminate: false,
                          checked: false
                        },
                        {
                          saveName: 'custohhfdgdsdfsdfsfgm-fields6',
                          name: 'Custom Fields',
                          description: '2222 ipsum dolor sit amet, consectetur',
                          indeterminate: false,
                          checked: false,
                          open: false
                        },
                        {
                          saveName: 'sta4567jkhjkhff-sdfdasf',
                          name: 'Staff Management',
                          description: '2222 ipsum dolor sit amet, consectetur',
                          indeterminate: false,
                          checked: false,
                          open: true,
                          children: [
                            {
                              saveName: 'ashhhdfasdfasdf',
                              name: 'Configuration',
                              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                              indeterminate: false,
                              checked: true
                            },
                            {
                              saveName: 'cushhtom-fields2133',
                              name: 'Custom Fields',
                              description: '2222 ipsum dolor sit amet, consectetur',
                              indeterminate: false,
                              checked: false,
                              open: false
                            },
                            {
                              saveName: 'staff-sadfasdfsadf',
                              name: 'Staff Management',
                              description: '2222 ipsum dolor sit amet, consectetur',
                              indeterminate: false,
                              checked: true,
                              open: true
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              saveName: '213casonfigurasdfsdftion12322',
              name: 'U123ser Administration123123213',
              indeterminate: true,
              checked: false,
              open: true,
              children: [
                {
                  saveName: '1231co4124214nfigdsfsdfuration5',
                  name: 'C123213on7457 456figurati123on',
                  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                  indeterminate: false,
                  checked: false
                },
                {
                  saveName: 'sta657 ff-msdfsdfanagment2',
                  name: 'Sta6 754f Mana567 4567gement',
                  description: '2222 ipsum dolor sit am567 4567et, consectetur',
                  indeterminate: false,
                  checked: true,
                  open: true
                }
              ]
            }
          ]
        }
      };
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
    swal(
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
      $(this).closest('form').submit();
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
