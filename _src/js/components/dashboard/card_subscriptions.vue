<template>
    <div class="card-container chart--tablet">
        <card-edit-controls></card-edit-controls>
        <div class="card card--chart card-chart--slim" v-bind:class="{'card--compare': compareMode}"
             :data-widget-name="widgetName" data-chart="true">
            <div class="card__left">
                <div class="card__header">
                    <div class="card__header-left">
                        <span>{{title}}</span>
                    </div>
                    <div class="card__header-right">
                        <form action="" method="post">
                            <input data-daterangepicker="true" class="mr24">
                            <input type="checkbox" data-icheck="true" name="check" id="subscript"
                                   class="compare-mode--checkbox">
                            <label class="ml8" v-on:click="compareMode = !compareMode"
                                   for="subscript">{{compareText}}</label>
                        </form>
                    </div>
                </div>
                <div class="card__content card__content--chart">
                    <div :id="chartID" class="chart">
                        <bar-chart :chart-data="chartJSMessage" :options="chartJSOptions"></bar-chart>

                    </div>
                </div>
            </div>
            <div class="card__right">
                <div class="mobile-compare">
                    <input type="checkbox" data-icheck="true" name="check" id="subscript"
                           class="compare-mode--checkbox">
                    <label class="ml8" v-on:click="compareMode = !compareMode" for="subscript">{{compareText}}</label>
                </div>
                <header>
                    <span class="card__title">{{legendTitle}}</span>
                    <span class="card__indicator compare"
                          v-bind:class="{ 'card__indicator--up': statusType === 'grow', 'card__indicator--down': statusType === 'decline' } ">
                        {{ ((value1 / value2) * 100 ).toFixed() }}%
                        <i class="zmdi"
                           v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } "></i>
                    </span>
                    <span class="card__ammount">
                        <strong>{{value1}} </strong>
                        <span class="compare"> / {{value2}}</span>
                    </span>
                </header>
                <ul class="datarow mobile-toogle--target" data-scrollable>
                    <!--SINGLE-->
                    <li v-for="(row, index) in datarows" v-bind:key="index" class="datarow__sgl"
                        v-bind:class="{ 'datarow__sgl--up': row.type === 'grow', 'datarow__sgl--down': row.type === 'decline' } ">
                        <div class="datarow__left">
                            <span class="datarow__status">{{row.text}}</span>
                        </div>
                        <div class="datarow__right">
                            <span class="datarow__data">
                                <strong>{{row.value1}}</strong>
                                <span class="compare">/{{row.value2}}</span>
                            </span>
                            <span class="datarow__percentage compare">
                                <span>{{ ((row.value1 / row.value2) * 100 ).toFixed() }}%</span>
                                <i class="zmdi"
                                   v-bind:class="{ 'zmdi-long-arrow-up': row.type === 'grow', 'zmdi-long-arrow-down': row.type === 'decline' } "></i>
                            </span>
                        </div>
                    </li>
                </ul>
                <div class="mobile-toogle--box">
                    <div class="card__mobile-toggle mdl-js-button mdl-js-ripple-effect"
                         v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } ">
                        <i class="zmdi zmdi-caret-down"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    function dataCalc(data) {
        //calcuations to data
        function add(a, b) {
            return a + b;
        }

        var value1Array = data.datarows.map(function (a) {
            return a.value1
        });
        var value1Sum = value1Array.reduce(add, 0);
        var value2Array = data.datarows.map(function (a) {
            return a.value2
        });
        var value2Sum = value2Array.reduce(add, 0);
        data.value1 = value1Sum;
        data.value2 = value2Sum;
    }
    import cardEditControls from './card_edit_controls.vue';
    import BarChart from './chart_js/bar.js'
    export default {
        name: 'CardSubscriptions',
        components: {
            'card-edit-controls': cardEditControls,
            'bar-chart': BarChart
        },
        data: function () {
            return {
                cardClass: 'card--chart',
                widgetName: 'card--chart',
                title: 'Subscriptions',
                legendTitle: 'New Subsribtions',
                value1: 0,
                value2: 0,
                type: 'chart_subscriptions',
                statusType: 'decline',
                compareMode: false,
                compareText: 'Compare',
                chartID: 'chart--two',
                datarows: [{
                    text: 'Cancelled',
                    value1: 412,
                    value2: 552,
                    type: 'grow',
                }, {
                    text: 'Pending',
                    value1: 921,
                    value2: 2921,
                    type: 'decline',
                }, {
                    text: 'Accepted',
                    value1: 333,
                    value2: 1412,
                    type: 'decline',
                }, {
                    text: 'Accepted',
                    value1: 111,
                    value2: 822,
                    type: 'grow',
                }, {
                    text: 'Pending',
                    value1: 512,
                    value2: 921,
                    type: 'decline',
                }],
                chartJSMessage: {},
                chartJSOptions: {}
            }
        },


        mounted: function () {
            var self = this;
            dataCalc(this);
            var domElem = $(self.$el);
            domElem.find('[data-icheck]').on('ifChanged', function (event) {
                self.compareMode = !self.compareMode;
            });

            setTimeout(function () {
                self.setDate();
            }, 1500);
            self.updateChartJSSubs()
            domElem.find('.compare-mode--checkbox').on('ifToggled', function () {
                self.updateChartJSSubs()
            })

//            setInterval(() => {
//                self.updateChartJSSubs()
//            }, 100)
        },
        methods: {

            updateChartJSSubs () {
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
                               backgroundColor: "#ffa726",
                               data: quantityRandom,
                               hoverBackgroundColor: "#ef9c23"
                             },
                             {
                               backgroundColor: "#e1e3e6",
                               data: quantityRandom2,
                               hoverBackgroundColor: "#d4d6d8"
                             }
                           ]
                }
                this.chartJSOptions = {
                    //options start
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: false,
                    scales: {
                        yAxes: [
                            {
                                display: false
                            }
                        ],
                        xAxes: [
                            {
                                display: false,
                                barPercentage: 1 //width bar
                            }
                        ]
                    }
                }
            },

            setDate() {

                var self = this;

                function randomNumber(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                }

                var date = moment().subtract(randomNumber(1, 10), 'days').startOf('day').toDate();

                enquire.register("screen and (min-width:768px)", {
                    match: function () {
                        $(self.$el).find('[data-daterangepicker]').daterangepicker("setRange", {start: date});
                    }
                });
            },

        }
    }
</script>
<style>

</style>
