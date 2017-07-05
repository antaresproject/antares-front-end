<template>
    <div class="card-container">
        <card-edit-controls></card-edit-controls>
        <div class="card card--tabs" :data-widget-name="widgetName" :data-tabbable="tabbable">
            <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                <div class="mdl-tabs__tab-bar">
                    <div class="tab-scroll">
                        <draggable @start="onStartTabMove" @end="onEndTabMove" @sort="onTabSort" v-model="tabsDraggable" :list="tabs" :options="{group:'tabs', clone: false}">
                            <transition-group name="tabs">
                                <a v-for="tab in tabs" @click="setActiveTab($event)" :href="'#'+tab.tabName" class="mdl-tabs__tab" v-bind:class="{'is-active': tab.isActive}" :key="tab.tabName">{{tab.tabName}}</a>
                            </transition-group>
                        </draggable>
                    </div> 
                </div>
                <div v-for="tab in tabs" class="mdl-tabs__panel" v-bind:class="{'is-active': tab.isActive}" :id="tab.tabName">
                    <card-tabs v-if="tab.type === 'tabs'"></card-tabs>
                    <card-chart-billing v-if="tab.type === 'chart_billing'"></card-chart-billing>
                    <card-chart-subscriptions v-if="tab.type === 'chart_subscriptions'"></card-chart-subscriptions>
                    <card-chart-orders v-if="tab.type === 'chart_orders'"></card-chart-orders>
                    <card-chart-tickets v-if="tab.type === 'chart_tickets'"></card-chart-tickets>
                    <card-info v-if="tab.type === 'info'"></card-info>
                    <card-news v-if="tab.type === 'news'"></card-news>
                    <card-logs v-if="tab.type === 'logs'"></card-logs>
                    <card-clean v-if="tab.type === 'clean'"></card-clean>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
require('lodash');

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
import {
    antaresStore
} from './../antares_store';
import cardChartBilling from './../dashboard/card_billing.vue';
import cardChartSubscriptions from './../dashboard/card_subscriptions.vue';
import cardChartTickets from './../dashboard/card_tickets.vue';
import cardChartOrders from './../dashboard/card_orders.vue';
import cardInfo from './../dashboard/card_info.vue';
import cardNews from './../dashboard/card_news.vue';
import cardLogs from './../dashboard/card_logs.vue';
import cardTabs from './../dashboard/card_tabs.vue';
import cardClean from './../dashboard/card_clean.vue';
import cardEditControls from './card_edit_controls.vue';
// import { Vue2Dragula } from 'vue2-dragula'
import draggable from 'vuedraggable';
export default {
    name: 'CardTabs',
    components: {
        'card-edit-controls': cardEditControls,
        draggable,
        'card-chart-billing': cardChartBilling,
        'card-chart-subscriptions': cardChartSubscriptions,
        'card-chart-orders': cardChartOrders,
        'card-chart-tickets': cardChartTickets,
        'card-info': cardInfo,
        'card-news': cardNews,
        'card-logs': cardLogs,
        'card-tabs': cardTabs,
        'card-clean': cardClean,
    },
    computed: {
        widgetList: function() {
            return antaresStore.state.tabsWidget1.widgetList;
        },
        draggedTabElem: function() {
            return antaresStore.state.tabsWidget1.draggedTabElem;
        },
        draggedOnTabElem: function() {
            return antaresStore.state.tabsWidget1.draggedOnTabElem;
        },
        draggedElem: function() {
            return antaresStore.state.tabsWidget1.draggedElem;
        },
        draggedOnElem: function() {
            return antaresStore.state.tabsWidget1.draggedOnElem;
        },
        draggedElemGsi: function() {
            return antaresStore.state.tabsWidget1.draggedElemGsi;
        },
        draggedOnElemGsi: function() {
            return antaresStore.state.tabsWidget1.draggedOnElemGsi;
        },
        draggedOnType: function() {
            return antaresStore.state.tabsWidget1.draggedOnType;
        },

    },
    data: function() {
        return {
            widgetName: 'tabs',
            tabbable: true,
            type: 'tabs',
            tabs: [],
            first: [],
            tabsDraggable: [],
            dragging: false,
            minWidth: null,
            minHeight: null,
            activeTabType: null
        }
    },
    created: function() {
        var self = this;
        // DO NOT MANGLE / THESE ARE LISTENERS
        // DRAGGABLE CONTAINERS HAVE TO BE DECLARED IN THE WIDGET_TABS.VUE
        self.eventDropOnTabs();
        self.eventDropOnWidget();
        self.eventClearTabs();
        self.tabScroll();
        // self.dragula();
    },
    watch: {
        tabs: function(old) {
            var self = this;
            // console.log( $(this.$el).find('.mdl') );
            for (var i = 0; i < self.tabs.length; i++) {
                self.tabs[i].isActive = false;
            }
        }
    },
    mounted: function() {
        $(this.$el).closest('.grid-stack-item').addClass('mdl-tabs-container');
        $(this.$el).find('.mdl-tabs__tab').on('click', function() {
            window.AntaresCharts.init()
        });
        this.eventListener();
        
        
        window.AntaresForms.elements.tooltip();
        // this.setTabBarActive();
    },
    methods: {
        eventListener() {

            let self = this;

            this.$root.$on('detachWidget', function(type) {

                // console.log(type);
                self.detatchTab(type);
            
            });
          
        },
        setTabBarActive() {
            var self = this;
            let tabBar = $(this.$el).find('.mdl-tabs__tab-bar');
            tabBar.on('mouseenter', function() {
                setTimeout(function() {
                    if ($('#app-wrapper').hasClass('sortable-active')) {
                        tabBar.css('background-color', '#eee');
                    }
                }, 500);
            }).on('mouseleave', function() {
                $('.mdl-tabs__tab-bar').css('background-color', 'transparent');
            });
        },
        // all actions of sortable drop in this muthatrucka!
        onTabSort: function(evt) {
            // gather info
            // console.log(evt);
            var self = this;
            var draggedItem = $(evt.item);
            var draggedItemGsiId = $(evt.item).closest('.grid-stack-item').attr('data-id');
            var dropEventCurrentId = $(self.$el).closest('.grid-stack-item').attr('data-id');
            var $tabDroppedOn = $(evt.to) // span
            antaresStore.commit('draggedOnTabElem', $tabDroppedOn);
            // console.log('saved: ' + $tabDroppedOn);
            var $tabDragged = $(evt.from); // .mdl-tabs__tab
            antaresStore.commit('draggedTabElem', $tabDragged);
            // console.log('saved: ' + $tabDragged)
            var tabDraggedGsiId = $tabDragged.closest('.grid-stack-item').attr('data-id');
            var tabDroppedOnGsiId = $tabDroppedOn.closest('.grid-stack-item').attr('data-id');
            // operations on dragged card-tabs
            // correct typing
            if (dropEventCurrentId === tabDraggedGsiId) {
                if (!$(evt.target).closest('.mdl-tabs__tab-bar').length) {
                    return false;
                }
                var movedTabName = draggedItem[0].innerText.toLowerCase();
                self.$nextTick(function() {
                    for (var i = 0; i < self.tabs.length; i++) {
                        if (self.tabs[i].tabName == movedTabName) {}
                    }
                });
                if (self.tabs.length === 1) {
                    self.$nextTick(function() {
                        var data = {
                            lastTab: self.tabs[0],
                            currentId: dropEventCurrentId
                        }
                        antaresStore.commit('convertTab', data);
                    });
                }
                return true;
            }
            // operations on doppedOn card-tabs
            //find bith interacted widgets, yet!
            if (dropEventCurrentId === tabDroppedOnGsiId) {
                self.$nextTick(function() {
                    // console.log('adding tab from...tab? Well, than.')
                    var $draggedGsi = $(draggedItem).closest('.grid-stack-item');
                    var $draggedOnGsi = $(self.$el).closest('.grid-stack-item');
                    self.transfer($draggedGsi, $draggedOnGsi)
                    self.addNewTab(movedCardType);
                });
                var movedCardType = draggedItem.text().toLowerCase();
                for (var i = 0; i < self.tabs.length; i++) {
                    if (self.tabs[i].type === movedCardType) {
                        var index = self.tabs.findIndex(x => x.type == movedCardType);
                        self.tabs.splice(index, 1);
                    }
                }
                if (self.tabs.length === 1) {}
                return true;
            }
        },
        onMoveCallback: function(evt, originalEvent) {
            var $tabDroppedOn = $(evt.from); // span
            // console.log(evt);

            $(evt.target).css('border-left', '2px solid #02a8f3')

            if ( $(evt.target).hasClass('card-container') ) {

                $('.card-container').css('border', 'none');
                $(evt.target).css('border-left', '2px solid #02a8f3')
            }
        },
        onStartTabMove(startEvent) {
            var self = this;
            self.dragging = true;
            console.log('start');
            $('#app-wrapper').addClass('sortable-active');
            return true;
        },
        enableGridstack() {
            var grid = $('.grid-stack').data('gridstack');
            grid.enable();
        },
        onEndTabMove(evt) {
            $('#app-wrapper').removeClass('sortable-active');
            var self = this;
            self.$nextTick(function() {
                self.enableGridstack();
            });
            self.dragging = false;
            return true;
        },
        update: function() {
            if ($(this.$el).find('.card--chart').length > 0) {
                setTimeout(function() {
                    window.AntaresCharts.init()
                }, 200);
            }
        },

        detatchTab(cardType) {
            var self = this;

            // console.log(cardType);

            if ( self.tabs.length > 1  ) {

                for (var i = 0, l = self.tabs.length; i < l; i++) {
                    if (self.tabs[i].tabName.toLowerCase() === cardType.toLowerCase()) {
                        var updatedArray = _.remove(self.tabs, function(currentObject) {
                            return currentObject.tabName !== self.tabs[i].tabName;
                        });
                        self.tabs = updatedArray;
                        noty($.extend({}, APP.noti.infoFM("lg", "full"), {
                            text: "Widget has been Reatached."
                        }));
                    }
                }

                antaresStore.commit('addNewWidget', self.activeTabType);



                

            } else {

                alert('last one');

            }

            this.$nextTick(function() {
                self.changeActiveTab(self.tabs.length);
            });
        },
        eventDropOnWidget: function() {
            var self = this;
            self.$root.$on('dropOnWidget', function(dropEventDroppedOnId) {
                var dropEventCurrentId = $(self.$el).closest('.grid-stack-item').attr('data-id');
                if (dropEventDroppedOnId !== dropEventCurrentId) {
                    return false;
                }
                var $draggedGsi = $(self.draggedElemGsi);
                var $draggedOnGsi = $(self.draggedOnElemGsi);
                var draggedId = $draggedGsi.attr('data-id');
                var draggedType = self.widgetList[draggedId].type;
                var draggedOnId = $draggedOnGsi.attr('data-id');
                var draggedOnType = self.widgetList[draggedOnId].type;
                // console.log(draggedOnType)
                // first add ( create from 2 widgets)
                var currentTabsLength = self.tabs.length;
                // DROP ON WIDGET === CREATE 2 TABS
                //remove 
                self.transfer($draggedGsi, $draggedOnGsi)
                $draggedGsi.velocity({
                    opacity: 0
                }, {
                    duration: 700,
                    complete: function() {
                        self.addNewTab(draggedType);
                        setTimeout(function() {
                            self.$nextTick(function() {
                                self.addNewTab(self.draggedOnType);
                                antaresStore.commit('widgetRemove', draggedId);
                            });
                        }, 200);
                    }
                })
            });
        },
        eventDropOnTabs: function() {
            var self = this;
            //add tab from dropped Tab
            // var currentTabsLength = self.tabs.length;
            // console.log(currentTabsLength);
            // DROP ON MDL TABS
            this.$root.$on('dropOnTabs', function(droppedOnId) {
                // interface that detects drop element on widget/card and saves involved DOM elements and pushes to addTab Method
                var $draggedGsi = $(self.draggedElemGsi);
                var $draggedOnGsi = $(self.draggedOnElemGsi);
                var draggedId = $draggedGsi.attr('data-id');
                var draggedType = self.widgetList[draggedId].type;
                var draggedOnId = $draggedOnGsi.attr('data-id');
                var draggedOnType = self.widgetList[draggedOnId].type;
                var currentId = $(self.$el).closest('.grid-stack-item').attr('data-id');
                if (droppedOnId !== currentId || self.widgetList[draggedId].type === 'tabs') {
                    return false;
                }
                // DUPLICATES
                for (var i = 0, l = self.tabs.length; i < l; i++) {
                    if (self.tabs[i].type.toLowerCase() == draggedType.toLowerCase()) {
                        noty($.extend({}, APP.noti.errorFM("lg", "full"), {
                            text: "Widget of the same type is already present."
                        }));
                        return false;
                    }
                }
                self.transfer($draggedGsi, $draggedOnGsi)
                $draggedGsi.velocity({
                    opacity: 0
                }, {
                    duration: 100,
                    complete: function() {
                        setTimeout(function() {
                            self.$nextTick(function() {
                                self.addNewTab(draggedType);
                                antaresStore.commit('widgetRemove', draggedId);
                            });
                        }, 200)
                    }
                })
            });
        },
        // CORRECT!
        eventClearTabs: function() {
            var self = this;
            //clear tabs
            self.$root.$on('clearTabs', function(droppedOnId) {
                var currentId = $(self.$el).closest('.grid-stack-item').attr('data-id');
                self.$nextTick(function() {
                    console.log('clearTabs');
                    // carry on
                    self.tabs = [];
                })
            });
        },
        testAddTab: function() {
            setTimeout(function() {
                self.addNewTab('Title 4', '<div class="card card--example"><div class="card__content">asdasd asd asd </div></div>', 'card--example');
                self.changeActiveTab(2);
            }, 211);
        },
        testRemoveTab: function() {
            setTimeout(function() {
                self.removeTab('group1')
            }, 5000);
        },
        onTabMove: function(evt) {
            // console.log(evt);
            return true;
        },
        changeActiveTab: function(id) {
            var self = this;
            id = id - 1;
            if (self.tabs[id].isActive === undefined) {
                return false;
            }
            for (var i = 0, l = self.tabs.length; i < l; i++) {
                self.tabs[i].isActive = false;
            }
            self.$nextTick(function() {
                self.tabs[id].isActive = true;
                self.activeTabType = self.tabs[id].type;
            });
        },
        setActiveTab(event) {


            var self = this;

            let activeTab = $(event.target),
                activeTabIndex = activeTab.index();

                // console.log(self.tabs[activeTabIndex].type);
                self.activeTabType = self.tabs[activeTabIndex].type;



        },
        transfer: function($draggedGsi, $draggedOnGsi) {
            $draggedGsi.transfer({
                to: $draggedOnGsi,
                duration: 500,
            }, function() {
                // $draggedGsi.velocity({
                //     opacity: 0
                // }, {
                //     duration: 300,
                //     start: function() {},
                //     complete: function() {
                //     }
                // })
            })
        },
        addNewTab: function(type) {
            var self = this;
            if (type === '') {
                console.log('new tab data empty');
                return false;
            }
            self.setSize();
            self.tabs.push({
                tabName: type, // regex remove spaces
                type: type,
                isActive: false
            });
            self.$nextTick(function() {
                self.changeActiveTab(self.tabs.length);
                self.tabScroll();
                self.updateMdlTabs();
                self.enableGridstack();
                // noty($.extend( {}, APP.noti.successFM("lg", "full"), {text: "New Tab has been added."}));
                // console.debug('New Tab Added!');
            });
        },
        setSize: function() {
            var self = this;
            // Vue convert jquery to JS object? Fuck knows. It works though and its 2 AM...
            var $draggedGsi = $(self.draggedElemGsi);
            var $draggedOnGsi = $(self.draggedOnElemGsi);
            // dragged crawl
            var minWidths = [];
            var minHeights = [];
            var draggedMinWidth = $draggedGsi.attr('data-gs-min-width');
            var draggedMinHeight = $draggedGsi.attr('data-gs-min-height');
            var draggedOnMinWidth = $draggedOnGsi.attr('data-gs-min-width');
            var draggedOnMinHeight = $draggedOnGsi.attr('data-gs-min-height');
            minWidths.push(draggedMinWidth, draggedOnMinWidth);
            minHeights.push(draggedMinHeight, draggedOnMinHeight);
            var minWidth = _.max(minWidths);
            var minHeight = _.max(minHeights);
            self.minWidth = minWidth;
            self.minHeight = minHeight;
            self.$nextTick(function() {
                // alert('attempting grid resize!');
                // console.log($draggedOnGsi[0]);
                // console.log(minWidth);
                var grid = $('.grid-stack').data('gridstack');
                grid.minWidth($draggedOnGsi[0], minWidth);
                grid.minHeight($draggedOnGsi[0], minHeight);
                self.rebulidGridStack();
            });
        },
        rebulidGridStack: function() {
            var grid = $('.grid-stack').data('gridstack');
            grid.removeAll(false);
            $('.grid-stack-item').each(function() {
                grid.makeWidget($(this));
            });
        },
        updateMdlTabs: function() {
            this.$nextTick(function() {
                var tabs = document.querySelectorAll('.mdl-tabs');
                var tabs_inside = document.querySelectorAll('.mdl-tabs__tab');
                var panels = document.querySelectorAll('.mdl-tabs__panel');
                var layout = document.querySelector('.mdl-js-tabs');
                var abbar = document.querySelector('.mdl-tabs__tab-bar');
                for (var i = 0, l = tabs.length; i < l; i++) {
                    new MaterialTabs(tabs[i], tabs, panels, layout.MaterialLayout);
                }
                $('.card--tabs').find('.mdl-tabs__ripple-container').remove();
                componentHandler.upgradeDom();
                componentHandler.upgradeAllRegistered();
                setTimeout(function() {
                    $('.mdl-tabs__tab.is-active').trigger('click');
                }, 200)
            });
        },
        removeTab: function(cardType) {
            var self = this;
            alert('removing tab')
            var currentId = $(self.$el).closest('.grid-stack-item').attr('data-id');
            var droppedId = $(self.draggedOnTabElem).closest('.grid-stack-item').attr('data-id');
            // if this tab, not other card-tabs - duuuh = moving with sortable
            if (currentId === droppedId) {
                for (var i = 0, l = self.tabs.length; i < l; i++) {
                    if (self.tabs[i].tabName.toLowerCase() === cardType.toLowerCase()) {
                        var updatedArray = _.remove(self.tabs, function(currentObject) {
                            return currentObject.tabName === self.tabs[i].tabName;
                        });
                        self.tabs = updatedArray;
                        noty($.extend({}, APP.noti.infoFM("lg", "full"), {
                            text: "Widget has been removed."
                        }));
                    }
                }
            }
        },
        rebuildGridstack: function() {
            var grid = $('.grid-stack').data('gridstack');
            grid.removeAll(false);
            $('.grid-stack-item').each(function() {
                grid.makeWidget($(this));
            });
            grid.disable();
            grid.enable();
        },
        autoDestruct: function() {
            var self = this;
            if (self.tabs.length === 0) {
                var selfId = $(self.$el).closest('.grid-stack-item').attr('data-id');
                alert(selfId);
            }
        },
        tabScroll: function() {
            var self = this;
            let cardContainer = $(this.$el);
            let tabBar = cardContainer.find('.mdl-tabs__tab-bar');
            let tabScroll = cardContainer.find('.tab-scroll');
            let tabBarWidth = tabBar.width();
            let allTabsWidth = 0;
            let singleTab = cardContainer.find('.mdl-tabs__tab');
            let transition = 300;
            this.$nextTick(function() {
                tabBar.find('.mdl-tabs__tab').each(function() {
                    allTabsWidth += $(this).outerWidth(true);
                });
                // When NO SPACE LEFT, MAN @!@
                if (allTabsWidth >= (tabBarWidth - 50)) {
                    cardContainer.find('.mdl-tabs').addClass('mdl-tabs--arrows');
                    // LEFT ARROW
                    if (!cardContainer.find('.mdl-tabs__arrow--right').length) {
                        $('<div/>', {
                            class: 'mdl-tabs__arrow mdl-tabs__arrow--right',
                        }).prependTo(tabBar);
                        $('<div/>', {
                            class: 'arrow-inner mdl-js-button mdl-js-ripple-effect',
                        }).prependTo($(self.$el).find('.mdl-tabs__arrow--right'));
                        cardContainer.find('.mdl-tabs__arrow--right .arrow-inner').append('<i class="zmdi zmdi-chevron-right"></i>');
                        let arrowRight = $(this.$el).find('.mdl-tabs__arrow--right');
                        arrowRight.on('click', function() {
                            let currentLeft = Math.abs(parseInt(tabScroll.css('left'), 10));
                            let allTabsSrollBreak = Math.abs(parseInt(allTabsWidth, 10)) - 600;
                            // HOLD YOUR HORSES
                            if (currentLeft > allTabsSrollBreak) {
                                return false
                            }
                            self.$nextTick(function() {
                                tabScroll.velocity({
                                    left: '-=150'
                                }, 50)
                            });
                        });
                    }
                    // RIGHT ARROW
                    if (!cardContainer.find('.mdl-tabs__arrow--left').length) {
                        $('<div/>', {
                            class: 'mdl-tabs__arrow mdl-tabs__arrow--left',
                        }).prependTo(tabBar);
                        $('<div/>', {
                            class: 'arrow-inner mdl-js-button mdl-js-ripple-effect',
                        }).prependTo($(self.$el).find('.mdl-tabs__arrow--left'));
                        cardContainer.find('.mdl-tabs__arrow--left .arrow-inner').append('<i class="zmdi zmdi-chevron-left"></i>');
                        let arrowLeft = $(this.$el).find('.mdl-tabs__arrow--left');
                        arrowLeft.on('click', function() {
                            if (parseInt(tabScroll.css('left'), 10) > -1) {
                                return false
                            }
                            self.$nextTick(function() {
                                tabScroll.velocity({
                                    left: '+=150'
                                }, 50)
                            });
                        });
                    }
                    self.$nextTick(function() {
                        componentHandler.upgradeAllRegistered();
                    });
                }
            });
        },
    }
}
</script>
<style lang="less">
@widget_tabs_transition: 400ms;
.arrow-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#app-wrapper .mdl-tabs .tab-scroll {
    display: block;
    overflow-y: scroll;
    width: auto;
    width: 2000px;
    position: relative;
}

#app-wrapper .mdl-tabs.mdl-tabs--arrows .mdl-tabs__tab-bar {
    padding-left: 42px;
    padding-right: 180px;
    height: 52px;
    max-height: 52px;
    overflow: hidden;
}

#app-wrapper .mdl-tabs.mdl-tabs--arrows .mdl-tabs__tab-bar {
    >div>span {
        padding-left: 42px;
        padding-right: 42px;
    }
}

#app-wrapper .mdl-tabs__tab-bar {
    max-height: 52px;
    width: auto;
}

.tabs-enter-active,
.tabs-leave-active {
    transition: all @widget_tabs_transition;
}

.tabs-enter,
.tabs-leave-to {
    opacity: 0;
    transform: translateY(150px);
}

#app-wrapper .card__edit-view {}

/*#app-wrapper .app-content--widgets-movable .card__edit-view {*/
    /*width: 140px;*/
    /*height: 51px;*/
/*}*/

#app-wrapper .app-content--widgets-movable .mdl-tabs-container .card__edit-view {
    background: #fff;
}

#app-wrapper .grid-stack-item .grid-stack-item-content .card--tabs .card.card--chart .card__content {
    height: 100%
}

#app-wrapper .grid-stack-item .grid-stack-item-content .card--tabs .card.card--chart .card__content svg {
    height: 100% !important;
}

// Sortable placeholder
.sortable-ghost {
    opacity: 0.2;
}

// pickedup element!
.sortable-chosen {
    // border:1px solid
}

.card--tabs {
    &.card--slim {
        .card-filter {
            display: none;
        }
    }
    .mdl-tabs__arrow--left,
    .mdl-tabs__arrow--right {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        text-align: center;
        height: 51px;
        position: absolute;
        z-index: 2;
        cursor: help;
        top: 0;
        transition: 300ms;
        cursor: pointer;
        display: none;
        i {
            color: #02A8F3;
            font-size: 24px;
        }
        &:hover {
            i {
                opacity: 0.8;
            }
        }
        &.mdl-tabs__arrow--disabled {
            opacity: 0.3;
        }
    }
    .mdl-tabs__arrow--left {
        left: 0;
        right: auto;
    }
    .mdl-tabs__arrow--right {
        right: auto;
        left: ~'calc(100% - 180px)';
    }
    .mdl-tabs.mdl-tabs--arrows {
        .mdl-tabs__arrow--right,
        .mdl-tabs__arrow--left {
            display: flex;
        }
    }
    .mdl-tabs__arrow {
        z-index: 999 !important;
        // position: relative;
        background: #fff !important;
    }
    table tr td {
        font-size: 13px;
    }
}

#app-wrapper.sortable-active {
    .mdl-tabs__tab-bar {
        &:hover {
            // background:#000;
        }
    }
}

.mdl-tabs-container.card-news--gsi {
    .card__edit-view {
        z-index: 99990;
    }
}
</style>
