<template>
    <div>
        <line-chart :chart-data="chartJSMessage" :options="chartJSOptions"></line-chart>
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

                chartJSMessage: {},
                chartJSOptions: {}
            }
        },
        mounted: function () {
            this.updateChartJSClientValue()
        },

        methods: {
            updateChartJSClientValue () {
                let quantityColumnsArray = [];
                let quantityRandom = [];
                let quantityRandom2 = [];
                for (let i = 0; i < 10; i++) {
                    quantityColumnsArray.push('Data Stream ' + (i + 1));
                    quantityRandom.push(Math.floor(Math.random() * 100 + 1));
                    quantityRandom2.push(Math.floor(Math.random() * 100 + 1));
                }
                this.chartJSMessage = {
                    labels: quantityColumnsArray,
                    datasets: [
                        {
                            backgroundColor: '#72d3ff',
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 1,
                            data: quantityRandom,
                            pointBackgroundColor: 'transparent',
                            pointBorderColor: 'transparent'
                        }
                    ]
                }
                this.chartJSOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: false,
                    scales: {
                        yAxes: [
                            {
                                display: false,
                                // display:false,    //#76 Artificial error
                                ticks: {
                                    beginAtZero: false,
                                    callback: function (label) {
                                        return label + ' $';
                                    }
                                }
                            }
                        ],
                        xAxes: [
                            {
                                display: false
                            }
                        ]
                    }
                }
            }

        }

    }


</script>


<style lang="less" scoped>

</style>
