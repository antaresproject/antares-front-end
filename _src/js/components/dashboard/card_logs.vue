<template lang="ejs">
    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div  class="card card--pagination card--logs" :data-widget-name="widgetName">
            <div class="card__header">
                <div class="card__header-left"><span>{{widgetName}} </span>

                </div>
                <div class="card__header-right"><i class="card-maximize zmdi zmdi-window-maximize"></i></div>
            </div>
            <div class="card__content  datarow flex ff-cnw jc-flex-start">

                <!--<div class="card-ctrls">-->
                    <!--<div class="card-ctrls__left">-->
                        <!--<div class="search-box search-box&#45;&#45;dark mr24"><i class="zmdi zmdi-search"></i>-->
                            <!--<form action="#">-->
                                <!--<div class="search-box__mdl-textfield mdl-textfield mdl-js-textfield ">-->
                                    <!--<input v-model="search" class="mdl-textfield__input search-box__search-field"-->
                                           <!--type="text" id="sample2">-->
                                    <!--<label class="mdl-textfield__label" for="sample2">{{searchPlaceholder}}</label>-->
                                <!--</div>-->
                            <!--</form>-->
                        <!--</div>-->
                        <!--<select @change="select($event)" class="card&#45;&#45;logs-filter mb24 select2&#45;&#45;prefix" name="select4"-->
                                <!--data-selectAR&#45;&#45;mdl="true">-->
                            <!--<option v-for="option in optionList" :value="option.value">{{option.value}}</option>-->
                        <!--</select>-->
                    <!--</div>-->
                    <!--<div class="card-ctrls__right"></div>-->
                <!--</div>-->
                <% include ../../../templates/layout/tab_search %>
                <div class="datarow">
                    <div data-scrollable>
                        <ul class="timeline" >
                            <li v-bind:class="{'timeline__entry--ok': log.status === 'ok'}" class="timeline__entry"
                                v-for="log in logList">
                                <div class="timeline__indicator" :data-color="log.color"
                                     :data-tooltip-inline="log.tooltipText"></div>
                                <div class="timeline__padding" v-html="log.html"></div>
                            </li>
                        </ul>
                    </div>
                    <div class="pagination">
                        <div class="pagination-list simple-pagination--list"></div>
                        <div class="pagination-current simple-pagination--current antares-pagination">
                            <ul>
                                <li><a class="current10 active mdl-js-button mdl-js-ripple-effect">10</a></li>
                                <li><a  class="current25 mdl-js-button mdl-js-ripple-effect">25</a></li>
                                <li><a  class="current50 mdl-js-button mdl-js-ripple-effect">50</a></li>
                                <li><a  class="current100 mdl-js-button mdl-js-ripple-effect">100</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>

    import Paginate from 'vuejs-paginate';

    import cardEditControls from './card_edit_controls.vue';

//    require('./../../../js/components/datatables/filters');

    var c1 = '#02a8f3';
    var c2 = '#30343d';
    var c3 = 'rebeccapurple';
    export default {
        name: 'CardLogs',
        components: {
            'paginate': Paginate,
            'card-edit-controls': cardEditControls
        },
        data: function () {
            return {
                // widgetName: 'card--chart',
                widgetName: 'logs',
                cardClass: 'card--logs',
                search: '',
                searchPlaceholder: 'Search',
                optionList: [{
                    value: 'All',
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
                },],
                selectFilter: '',
            }
        },
        mounted: function () {
            this.selectLiveChange();
        },
        methods: {
            clickCallback: function (pageNum) {
                console.log(pageNum)
            },
            selectLiveChange: function (event) {
                var self = this;
                $(document.body).find(self.$el).on("change", ".card--logs-filter", function () {
                    console.log(this.value);
                    self.selectFilter = this.value;
                });
            }
        }
    };
</script>
<style lang="less">
    .card--logs .timeline{
        overflow: hidden;
    }
    .card--logs .timeline__entry {
        padding-right: 8px;
        .timeline__padding {
            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }

    .card--logs .timeline li span:last-child {
        padding-left: 0;
    }

    .pagination {
    }

    .page-item {
    }

    .logs-container {
        .card__edit-icons {
            i {
                color: #fff;
            }
        }
    }
    @media only screen and (min-width: 1200px){
        .mobile-toogle--target{
            display: flex !important;
        }
    }
    @media only screen and (max-width: 767px){
        [data-widget-name="logs"]{
            .card--ctrls__left{
              .selection{
                  .select2-selection__rendered{
                   padding-top: 2px;
                  }
              }
            }
        }
    }

</style>