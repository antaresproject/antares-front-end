<template>
    <div class="card-container" >
        <card-edit-controls></card-edit-controls>
    <div data-scrollable class="card card--logs" :data-widget-name="widgetName">
        <div class="card__header">
            <div class="card__header-left"><span>{{widgetName}}</span></div>
            <div class="card__header-right"> <i class="card-maximize zmdi zmdi-window-maximize"></i> </div>
        </div>
        <div class="card__content flex ff-cnw jc-flex-start">
            <div class="card-ctrls card-ctrls--nopadding mt16">
                <div class="card-ctrls__left">
                    <div class="search-box search-box--dark mr24"> <i class="zmdi zmdi-search"></i>
                        <form action="#">
                            <div class="search-box__mdl-textfield mdl-textfield mdl-js-textfield ">
                                <input v-model="search" class="mdl-textfield__input search-box__search-field" type="text" id="sample2">
                                <label class="mdl-textfield__label" for="sample2">{{searchPlaceholder}}</label>
                            </div>
                        </form>
                    </div>
                    <select @change="select($event)" class="card--logs-filter mb24 select2--prefix" name="select4" data-selectAR--mdl="true">
                        <option v-for="option in optionList" :value="option.value">{{option.value}}</option>
                    </select>
                </div>
                <div class="card-ctrls__right"></div>
            </div>
            <ul class="timeline" data-scrollable>
                <li v-bind:class="{'timeline__entry--ok': log.status === 'ok'}" class="timeline__entry" v-for="log in logList">
                    <div class="timeline__indicator" :data-color="log.color" :data-tooltip-inline="log.tooltipText"></div>
                    <div class="timeline__padding" v-html="log.html"></div>
                </li>
            </ul>
            <div class="pagination mb16 mt16">
                <div class="pagination-pages">
                    <div class="pagination-pages__prev">
                        <a href="#" class="mdl-js-button mdl-js-ripple-effect"> <i class="zmdi zmdi-chevron-left"></i> </a>
                    </div>
                    <ul class="pagination-pages__list">
                        <li class="pagination-pages__sgl--active"><a class="mdl-js-button mdl-js-ripple-effect" href="#">1</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">2</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">3</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">4</a></li>
                    </ul>
                    <div class="pagination-pages__next">
                        <a href="#" class="mdl-js-button mdl-js-ripple-effect"> <i class="zmdi zmdi-chevron-right"></i> </a>
                    </div>
                </div>
                <div class="pagination-filter">
                    <ul>
                        <li class="pagination-filter__sgl--active"><a class="mdl-js-button mdl-js-ripple-effect" href="#">10</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">25</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">100</a></li>
                    </ul>
                </div>
            </div>
            <!--   <paginate
    :pageCount="20"
    :pageRange="3"
    :marginPages="2"
    :clickHandler="clickCallback"
    :prevText="'Prev'"
    :nextText="'Next'"
    :containerClass="'pagination'"
    :pageClass="'page-item'">
  </paginate> -->
        </div>
    </div>
    </div>
</template>
<script>
import Paginate from 'vuejs-paginate';

import cardEditControls from './card_edit_controls.vue';

var c1 = '#02a8f3';
var c2 = '#30343d';
var c3 = 'rebeccapurple';
export default {
    name: 'CardLogs',
    components: {
        'paginate': Paginate,
        'card-edit-controls': cardEditControls
    },
    data: function() {
        return {
            // widgetName: 'card--chart',
            widgetName: 'logs',
            cardClass: 'card--logs',
            search: '',
            searchPlaceholder: 'Search.....',
            optionList: [{
                value: 'ok',
            }, {
                value: 'warning',
            }, {
                value: 'latest',
            }],
            logList: [{
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, {
                color: c1,
                status: 'ok',
                html: '<div> Brand <a href="#">Brand 5</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">235</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-14-02 22:31:41" id="date-format-WLs0W" >5 days ago</span></span></div>',
                tooltipText: 'Brand 2'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Brand <a href="#">Brand 21</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W" >12 days ago</span></span></div>',
                tooltipText: 'Brands 5'
            }, {
                color: c3,
                status: 'latest',
                html: '<div> Brand <a href="#">Brand 512</a> has been updated by <a href="#">Admin Demo</a> with options identifier <a href="#">12</a> and colors identifier <a href="#">9</a> <span> <span data-tooltip-inline="2017-26-12 02:31:41" id="date-format-WLs0W" >2 days ago</span></span></div>',
                tooltipText: 'Brands 11'
            }, ],
            selectFilter: '',
        }
    },
    mounted: function() {
        this.selectLiveChange();
    },
    methods: {
        clickCallback(pageNum) {
            console.log(pageNum)
        },
        selectLiveChange(event) {
            var self = this;
            $(document.body).find(self.$el).on("change", ".card--logs-filter", function() {
                console.log(this.value);
                self.selectFilter = this.value;
            });
        }
    }
};
</script>
<style lang="less">
.card--logs .timeline__entry {
    padding-right: 8px;
    .timeline__padding {
        >div {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

.card--logs .timeline li span:last-child {
    padding-left: 0;
}

.pagination {}

.page-item {}

.logs-container {
    .card__edit-icons  {
        i {
        color:#fff;
        }
    }
}
</style>
