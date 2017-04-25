<template lang="ejs">

    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div class="card card--example" :data-widget-name="widgetName">
            <div class="card__header">
                <div class="card__header-left"><span>{{name}}</span></div>
                <div class="card__header-right"></div>
            </div>
            <div class="card__content" v-html="html"></div>
        </div>
    </div>

</template>
<script>

import cardEditControls from './card_edit_controls.vue';
export default {
    name: 'CardClean',
    data() {
        return {
            widgetName: 'Clean',
            name: 'Card Clean',
            type: 'clean',
            html: 'lorem-ipsumas ada sd as das da'
        }
    },
    components: {
        'card-edit-controls': cardEditControls
    }
}
</script>
<style lang="less">
</style>
