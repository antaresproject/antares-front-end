<template lang="ejs">

    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div class="card card--example" :data-widget-name="widgetName">
            <div class="card__header">
                <div class="card__header-left"><span>{{name}}</span></div>
                <div class="card__header-right"></div>
            </div>
            <div class="card__content">
                
                <div class="zd-container">

                    <div class="zd zd--default">
                        <div class="zd__header">
                            <i class="zmdi zmdi-email"></i>
                        </div>
                        <div class="zd__content">
                            <div class="zd__title">No transactions to display.</div>
                            <div class="zd__description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum magna ac efficitur.
                            </div>
                        </div>
                        <div class="zd__footer">
                            <a   class="btn btn--primary btn--zd mdl-js-button mdl-js-ripple-effect">OPEN NEW TICKET</a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>
<script>
import cardEditControls from './card_edit_controls.vue';
export default {
  name: 'CardClean',
  data: function() {
    return {
      widgetName: 'Clean',
      name: 'Card Clean',
      type: 'clean',
      html: 'lorem-ipsumas ada sd as das da'
    };
  },
  components: {
    'card-edit-controls': cardEditControls
  }
};
</script>
<style lang="less">

</style>
