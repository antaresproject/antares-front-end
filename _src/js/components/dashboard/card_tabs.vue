<template>
    <div class="card card--tabs">
        <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            <div class="mdl-tabs__tab-bar">
                <a v-for="tab in tabs" :href="'#'+tab.tabName" class="mdl-tabs__tab" v-bind:class="{'is-active': tab.isActive}">{{tab.tabName}}</a>
            </div>
            <div v-for="tab in tabs" class="mdl-tabs__panel" v-bind:class="{'is-active': tab.isActive}" :id="tab.tabName">
                <div data-tabbable data-widget-name="card--example" class="card card--example">
                    <div class="card__header">
                        <div class="card__header-left">{{tab.tabName}}</div>
                    </div>
                    <div class="card__content" v-html="tab.content"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    data: function() {


        return {
            name: 'Chart-Tabs',
            tabs: [{

                tabName: 'Group1',
                content: '<b>Group 4- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>',
                isActive: true,

            }, {

                tabName: 'Group2',
                content: '<i>Group 4- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</i>',
                isActive: false,

            }, {

                tabName: 'Group13',
                content: '<u>Group 4- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</u>',
                isActive: false,

            }, {

                tabName: 'Group44',
                content: '<b>Group 44- Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</b>',
                isActive: false,

            }, ]

        }


    },
    mounted: function() {


    },

    methods: {


    }


}
</script>
<style>
</style>
