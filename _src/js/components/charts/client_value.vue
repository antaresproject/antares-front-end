<template>
    <div>
        <line-chart quantityLines="1" quantityColumns="20" background="#72d3ff" borderLineColor="rgba(0,0,0,0)"></line-chart>
    </div>
</template>


<script>

    import LineChart from '../dashboard/chart_js/line.js'
export default {
    name: 'ClientValue',
    components: {
        'line-chart': LineChart
    },
    data: function () {
        return {


        }
    },
    mounted: function () {

    },

    methods: {


    }

}


</script>


<style lang="less" scoped>

</style>
