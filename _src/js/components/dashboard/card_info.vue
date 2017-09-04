<template lang="ejs">
    <div class="card-container">
    <card-edit-controls></card-edit-controls>
    <div class="card" :class="widgetClass" :data-widget-name="widgetName">
    <div class="card__header">
    <div class="card__header-left"><span>{{title}}</span></div>
    <div class="card__header-right">
    <i class="card-maximize zmdi zmdi-window-maximize mdl-js-button mdl-js-ripple-effect"></i>

    <!-- <% include ../../../templates/layout/card_more_btn %> -->

    <!--<div class="ddown ddown&#45;&#45;view-more">-->
    <!--<div class="ddown__init ddown__init&#45;&#45;clean"><a   class="btn btn&#45;&#45;link btn&#45;&#45;md btn&#45;&#45;default mdl-button mdl-js-button mdl-js-ripple-effect card__link">{{headerButtonText}}</a>-->

    <!--</div>-->
    <!--<div class="ddown__content">-->
    <!--<div class="ddown__arrow"></div>-->
    <!--<ul class="ddown__menu">-->
    <!--<li class="ddown__header mdl-js-button mdl-js-ripple-effect"><a  ><i-->
    <!--class="zmdi zmdi-account-add"></i><span>Add New Client</span></a></li>-->
    <!--<li><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-file-plus"></i><span>Create Invoice</span></a></li>-->
    <!--<li><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-email"></i><span>Send Email</span></a></li>-->
    <!--<li><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-ticket-star"></i><span>Open New Ticket</span></a></li>-->
    <!--<li><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-accounts-list"></i><span>Add Contact</span></a></li>-->
    <!--<li><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>-->
    <!--<li class="ddown__sgl&#45;&#45;footer"><a class="mdl-js-button mdl-js-ripple-effect"  ><i-->
    <!--class="zmdi zmdi-money-box"></i><span>More</span></a></li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    </div>
    </div>
    <div class="card__content card__content--flex-column">
    <div>
    <span class="card__title">Version</span>
    <span class="card__indicator card__indicator--down compare">{{currentVersion}}
    <i class="zmdi zmdi-info-outline"></i><span
    v-if="updateAvailable">An Update is available!</span></span>
    <div class="single-row">
    <a v-if="updateAvailable" :href="upgradeLink" class="btn btn--md  btn--red mdl-button mdl-js-button mdl-js-ripple-effect">UPGRADE</a>
    <a v-if="updateAvailable" :href="changelogLink"
    class="btn btn--link btn--md btn--default mdl-button mdl-js-button mdl-js-ripple-effect">CHANGE LOG</a>
    <div class="mobile-toogle--box">
    <div class="card__mobile-toggle mdl-js-button mdl-js-ripple-effect"><i
    class="zmdi zmdi-caret-down"></i></div>
    </div>
    </div>
    </div>
    <ul class="datarow mobile-toogle--target" data-scrollable>
    <!--SINGLE-->
    <li v-for="row in datarows" class="datarow__sgl">
    <div class="datarow__left"><span class="datarow__status">{{row.left}}</span></div>
    <div class="datarow__right"><span class="datarow__data"><strong>{{row.right}}</strong></span></div>

    </li>
    </ul>

    </div>
    </div>
    </div>
</template>
<script>
    import cardEditControls from './card_edit_controls.vue';
    export default {
        name: 'CardInfo',
        components: {
            'card-edit-controls': cardEditControls
        },
        data: function () {
            return {
                title: 'System Info',
                widgetName: 'card--info',
                widgetClass: 'card--info',
                headerButtonText: 'View More',
                currentVersion: '0.9.1',
                updateAvailable: true,
                upgradeLink: 'http://modulesgarden.com',
                changelogLink: 'http://modulesgarden.com',
                datarows: [{
                    left: 'Licence',
                    right: 'Cancelled',
                }, {
                    left: 'Installed Modules',
                    right: '15',
                }, {
                    left: 'Outdated Modules',
                    right: '2',
                }, {
                    left: 'Free Modules Available',
                    right: '51',
                }, {
                    left: 'Licence',
                    right: 'Pending',
                }, {
                    left: 'Licence',
                    right: 'Confirmed',
                }, {
                    left: 'Installed Modules',
                    right: '15',
                }, {
                    left: 'Outdated Modules',
                    right: '2',
                }, {
                    left: 'Free Modules Available',
                    right: '51',
                }, {
                    left: 'Licence',
                    right: 'Pending',
                }, {
                    left: 'Licence',
                    right: 'Confirmed',
                }]
            }
        },
        mounted: function () {
            // var self = this;
            // dataCalc(this);
            // var domElem = $(self.$el);
            // domElem.find('[data-icheck]').on('ifChanged', function(event) {
            //     self.compareMode = !self.compareMode;
            // });
        },
        methods: {}
    };
</script>
<style lang="less" scoped>
    .card-maximize {
        margin-right: -8px;
    }

    .card--info {
        .single-row {
            .btn--link {
                padding: 0 8px;
                margin-right: 0;
            }
            .mobile-toogle--box {
                margin-top: 0;
            }
        }
    }
</style>
