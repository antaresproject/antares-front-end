<template lang="ejs">
    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div  class="card card--pagination card--logs card--unadjustable" :data-widget-name="widgetName">
            <div class="card__header">
                <div class="card__header-left"><span>{{widgetName}} </span>

                </div>
                <div class="card__header-right"><i class="card-maximize zmdi zmdi-window-maximize mdl-js-button mdl-js-ripple-effect"></i></div>
            </div>
            <div class="card__content  datarow flex ff-cnw jc-flex-start">






                <!--<div class="card-ctrls">-->
                    <!--<div class="card-ctrls__left">-->
                        <!--<div class="search-box search-box&#45;&#45;dark mr24"><i class="zmdi zmdi-search"></i>-->
                            <!--<form action="">-->
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
                <% include ../../../templates/layout/card_ctrls %>
                <div class="datarow">
                    <div  class="dataTablesLogs">
                        <ul class="timeline" >
                            <li v-bind:class="{'timeline__entry--ok': log.status === 'ok'}" class="timeline__entry"
                                v-for="log in logList" >
                                <div class="timeline__indicator" :data-color="log.color"
                                     :data-tooltip-inline="log.tooltipText" :data-logs-type="log.category"></div>
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
var c2 = 'orange';
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
                html: '<div>Brand <a>Brand 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 1 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 2 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            }, {
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 3 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 4 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            }, {
                color: c2,
                status: 'warning',
                html: '<div> Login <a>Login 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>21</a> and colors identifier <a>23</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">4 days ago</span></div>',
                category: 'Login',
                tooltipText: 'Login'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 5 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 6 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            },{
                color: c1,
                status: 'ok',
                html: '<div>Brand <a>Brand 7 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>12</a> and colors identifier <a>9</a> <span data-tooltip-inline="2016-01-12 11:31:45" id="date-format-WLs0W">12 days ago</span></div>',
                category: 'Brand',
                tooltipText: 'Brand'
            },{
                color: c3,
                status: 'latest',
                html: '<div>Email <a>Email 7 Standard</a> has been updated by <a>Admin Demo</a> with options identifier <a>46</a> and colors identifier <a>76</a> <span data-tooltip-inline="2016-01-12 16:11:42" id="date-format-WLs0W">23 days ago</span></div>',
                category: 'Email',
                tooltipText: 'Email'
            }],
            selectFilter: '',
        }
    },
    mounted: function() {
        this.selectLiveChange();
    },
    methods: {
        clickCallback: function(pageNum) {
            console.log(pageNum)
        },
        selectLiveChange: function(event) {
            //            var self = this;
            //            $(document.body).find(self.$el).on("change", ".card--logs-filter", function () {
            //                console.log(this.value);
            //                self.selectFilter = this.value;
            //            });
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
    .card__edit-icons {
        i {
            color: #fff;
        }
    }
}

@media only screen and (min-width: 1200px) {
    .mobile-toogle--target {
        display: flex !important;
    }
}

@media only screen and (max-width: 767px) {
    [data-widget-name="logs"] {
        .card--ctrls__left {
            .selection {
                .select2-selection__rendered {
                    padding-top: 2px;
                }
            }
        }
    }
}
</style>
