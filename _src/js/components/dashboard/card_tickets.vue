<template>
    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div class="card card--chart card-chart--slim" v-bind:class="{'card--compare': compareMode}" :data-widget-name="widgetName" data-chart="true">
            <div class="card__left">
                <div class="card__header">
                    <div class="card__header-left">
                        <span>{{title}}</span>
                    </div>
                    <div class="card__header-right">
                        <form action="" method="post">
                            <input data-daterangepicker="true" class="mr24">
                            <input type="checkbox" data-icheck="true" name="check" id="tickets" class="compare-mode--checkbox">
                            <label class="ml8" v-on:click="compareMode = !compareMode" for="tickets">{{compareText}}</label>
                        </form>
                    </div>
                </div>
                <div class="card__content card__content--chart">
                    <div :id="chartID" class="chart">
                        <horizontal-bar :chart-data="chartJSMessage" :options="chartJSOptions"></horizontal-bar>

                    </div>
                </div>
            </div>
            <div class="card__right">
                <div class="mobile-compare">
                    <input type="checkbox" data-icheck="true" name="check" id="tickets" class="compare-mode--checkbox">
                    <label class="ml8" v-on:click="compareMode = !compareMode" for="tickets">{{compareText}}</label>
                </div>
                <header>
                    <span class="card__title">{{legendTitle}}</span>
                    <span class="card__indicator compare" v-bind:class="{ 'card__indicator--up': statusType === 'grow', 'card__indicator--down': statusType === 'decline' } ">{{ ((value1 / value2) * 100 ).toFixed() }}%
                        <i class="zmdi" v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } "></i>
                    </span>
                    <span class="card__ammount">
                        <strong>{{value1}} </strong>
                        <span class="compare"> / {{value2}}</span>
                    </span>
                </header>
                <ul class="datarow mobile-toogle--target" data-scrollable>
                    <!--SINGLE-->
                    <li v-for="(row, index) in datarows" class="datarow__sgl" v-bind:key="index" v-bind:class="{ 'datarow__sgl--up': row.type === 'grow', 'datarow__sgl--down': row.type === 'decline' } ">
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
                                <i class="zmdi" v-bind:class="{ 'zmdi-long-arrow-up': row.type === 'grow', 'zmdi-long-arrow-down': row.type === 'decline' } "></i>
                            </span>
                        </div>
                    </li>
                </ul>
                <div class="mobile-toogle--box">
                    <div class="card__mobile-toggle mdl-js-button mdl-js-ripple-effect" v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } ">
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
    var value1Array = data.datarows.map(function(a) {
        return a.value1
    });
    var value1Sum = value1Array.reduce(add, 0);
    var value2Array = data.datarows.map(function(a) {
        return a.value2
    });
    var value2Sum = value2Array.reduce(add, 0);
    data.value1 = value1Sum;
    data.value2 = value2Sum;
}
import cardEditControls from './card_edit_controls.vue';
import HorizontalBar from './chart_js/horizontalBar.js'
export default {
    name: 'CardTickets',
    components: {
        'card-edit-controls': cardEditControls,
        'horizontal-bar': HorizontalBar
    },
    data: function() {
        return {
            widgetName: 'card--chart',
            title: 'Tickets',
            legendTitle: 'New Tickets',
            value1: 0,
            value2: 0,
            statusType: 'decline',
            type: 'chart_tickets',
            compareMode: false,
            compareText: 'Compare',
            chartID: 'chart--four',
            datarows: [{
                text: 'Pending',
                value1: 22,
                value2: 912,
                type: 'grow',
            }, {
                text: 'Pending',
                value1: 152,
                value2: 512,
                type: 'decline',
            }, {
                text: 'Accepted',
                value1: 215,
                value2: 6322,
                type: 'decline',
            }, {
                text: 'Removed',
                value1: 241,
                value2: 5132,
                type: 'grow',
            }, {
                text: 'Accepted',
                value1: 12,
                value2: 5,
                type: 'grow',
            }],
            chartJSMessage: {},
            chartJSOptions: {}
        }
    },
    mounted: function() {
        var self = this;
        dataCalc(this);
        var domElem = $(self.$el);
        domElem.find('[data-icheck]').on('ifChanged', function(event) {
            self.compareMode = !self.compareMode;
        });

        setTimeout(function() {
            self.setDate();
        }, 1500);
        self.updateChartJSTickets()
        domElem.find('.compare-mode--checkbox').on('ifToggled', function () {
            self.updateChartJSTickets()
        })
//        setInterval(() => {
//            self.updateChartJSTickets()
//        }, 100)
    },
    methods: {
        updateChartJSTickets () {
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
                        backgroundColor: "rgba(0, 145, 234, 0.3)",
                        data: quantityRandom,
                        hoverBackgroundColor: "rgba(0, 145, 234, 0.6)"
                    },
                    {
                        backgroundColor: "rgba(230, 232, 235, 0.4)",
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
                            display: false,
                        },
                    ],
                    xAxes: [
                        {
                            display: false,
                            barPercentage: 1,
                        },
                    ],
                },
            }
        },

    setDate() {

            var self = this;

            function randomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            var date = moment().subtract(randomNumber(1, 10), 'days').startOf('day').toDate();

            enquire.register("screen and (min-width:768px)", {
                match: function() {
                    $(self.$el).find('[data-daterangepicker]').daterangepicker("setRange", { start: date });
                }
            });
        },

    }
}
</script>
<style>

</style>
