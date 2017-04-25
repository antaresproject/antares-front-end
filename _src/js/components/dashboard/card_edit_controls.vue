<template>
    <div class="card__edit-view">
        <div class="card__edit-icons "> 
            <i class="zmdi zmdi-delete remove-button ddown__header mdl-js-button mdl-js-ripple-effect" @click="removeWidget($event)"></i> 
            <i class="zmdi zmdi-arrows move-button ddown__header mdl-js-button mdl-js-ripple-effect"></i>
            <div class="ddown ddown--left">
                <div class="ddown__init ddown__init--clean mdl-js-button mdl-js-button mdl-js-ripple-effect"><i class="zmdi zmdi-settings edit-button"></i></div>
                <ul class="ddown__menu">
                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-file-plus"></i><span>Replace Widget</span></a></li>
                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-email"></i><span>Append Widget</span></a></li>
                    <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-ticket-star"></i><span>Set as default</span></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'cardEditControls',
    data() {
        return {}
    },
    methods: {
        removeWidget: function(event) {
            var grid = $('.grid-stack').data('gridstack');
            var widget = $(event.target).closest('.grid-stack-item')
            grid.removeWidget(widget);
        }
    }
}
</script>
<style lang="less">

    .card__edit-view {
        z-index:9999;
        cursor:pointer;
    }

</style>