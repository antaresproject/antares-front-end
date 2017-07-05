<template lang="ejs">
    <div class="card__edit-view">
        <div class="card__edit-icons ">
            <i data-tooltip-inline="Remove Widget" class="zmdi zmdi-delete remove-button mdl-js-button mdl-js-ripple-effect"></i>
            <i data-tooltip-inline="Move Widget" class="zmdi zmdi-arrows move-button mdl-js-button mdl-js-ripple-effect"></i>
            <i data-tooltip-inline="Detach Widget" v-on:click="detachCurrent" class="zmdi zmdi-square-right detach-button mdl-js-button mdl-js-ripple-effect"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cardEditControls',
    data: function() {
        return {}
    },
    mounted: function() {
        window.componentHandler.upgradeAllRegistered();
    },
    methods: {
        detachCurrent: function() {
            var type = this.$parent.activeTabType;
            
            // console.log(type);            
            this.$root.$emit('detachWidget', type);
        },
        removeWidget: function(event) {
            var grid = $('.grid-stack').data('gridstack');
            var widget = $(event.target).closest('.grid-stack-item')
            grid.removeWidget(widget);
        },
    }
}
</script>
<style lang="less">

    .card__edit-view {
        z-index:9999;
        cursor:pointer;
    }

    .mdl-tabs__panel .card__edit-view {
        display:none !important;
    }

</style>