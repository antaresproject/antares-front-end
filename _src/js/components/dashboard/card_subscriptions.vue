<template>
    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div class="card card--chart card-chart--slim" v-bind:class="{'card--compare': compareMode}" :data-widget-name="widgetName" data-chart="true">
            <div class="card__left">
                <div class="card__header">
                    <div class="card__header-left"> <span>{{title}}</span> </div>
                    <div class="card__header-right">
                        <div class="ddown ddown--view-more ddown--view-more-options">
                            <div class="ddown__init ddown__init--clean">
                                <a href="#"  class="btn btn--link btn--md btn--default mdl-button mdl-js-button mdl-js-ripple-effect card__link"><i class="zmdi zmdi-more-vert"></i></a>
                            </div>
                            <div class="ddown__content">
                                <form action="" method="post">
                                    <ul class="ddown__menu">
                                        <li>
                                            <input data-daterangepicker="true" class="mr24">
                                        </li>
                                        <li>
                                            <input type="checkbox" data-icheck="true" name="check" id="subscript">
                                            <label class="ml8" v-on:click="compareMode = !compareMode" for="subscript">{{compareText}}</label>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <form action="" method="post">
                            <input data-daterangepicker="true" class="mr24">
                            <input type="checkbox" data-icheck="true" name="check" id="subscript">
                            <label class="ml8" v-on:click="compareMode = !compareMode" for="subscript">{{compareText}}</label>
                        </form>
                    </div>
                </div>
                <div class="card__content card__content--chart">
                    <div :id="chartID" class="chart">
                        <svg class="lineChart--svg"></svg>
                    </div>
                </div>
            </div>
            <div class="card__right">
                <header> <span class="card__title">{{legendTitle}}</span> <span class="card__indicator compare" v-bind:class="{ 'card__indicator--up': statusType === 'grow', 'card__indicator--down': statusType === 'decline' } ">{{ ((value1 / value2) * 100 ).toFixed() }}%<i class="zmdi" v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } "></i></span> <span class="card__ammount"><strong>{{value1}} </strong><span class="compare"> / {{value2}}</span></span>
                </header>
                <ul class="datarow mobile-toogle--target" data-scrollable>
                    <!--SINGLE-->
                    <li v-for="row in datarows" class="datarow__sgl" v-bind:class="{ 'datarow__sgl--up': row.type === 'grow', 'datarow__sgl--down': row.type === 'decline' } ">
                        <div class="datarow__left"> <span class="datarow__status">{{row.text}}</span> </div>
                        <div class="datarow__right"> <span class="datarow__data"><strong>{{row.value1}}</strong><span class="compare">/{{row.value2}}</span></span> <span class="datarow__percentage compare"><span>{{ ((row.value1 / row.value2) * 100 ).toFixed() }}%</span><i class="zmdi" v-bind:class="{ 'zmdi-long-arrow-up': row.type === 'grow', 'zmdi-long-arrow-down': row.type === 'decline' } "></i></span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mobile-toogle--box">
                <div class="card__mobile-toggle mdl-js-button mdl-js-ripple-effect" v-bind:class="{ 'zmdi-long-arrow-up': statusType === 'grow', 'zmdi-long-arrow-down': statusType === 'decline' } ">
                    <i class="zmdi zmdi-caret-down"></i>
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
export default {
    name: 'CardSubscriptions',
    components: {
        'card-edit-controls': cardEditControls,
    },
    data: function() {
        return {
            cardClass: 'card--chart',
            widgetName: 'card--chart',
            title: 'Subscriptions',
            legendTitle: 'New Subsribtions',
            value1: 0,
            value2: 0,
            type:'chart_subscriptions',
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
            }, {
                text: 'Accepted',
                value1: 333,
                value2: 1412,
                type: 'decline',
            }, {
                text: 'Accepted',
                value1: 555,
                value2: 81,
                type: 'grow',
            }, {
                text: 'Pending',
                value1: 512,
                value2: 921,
                type: 'grow',
            }, {
                text: 'Accepted',
                value1: 333,
                value2: 1412,
                type: 'decline',
            }]
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
        }, 500);

    },
    methods: {

        setDate() {

            var self = this;

            function randomNumber(min, max) {
                return Math.floor(Math.random()*(max-min+1)+min);
            }

            var date = moment().subtract(randomNumber(1,10), 'days' ).startOf('day').toDate();

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
