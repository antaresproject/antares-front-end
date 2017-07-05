<template>
    <!--App sidebar-->
    <ul class="menu-aside">
        <li  v-for="item in mm.primaryMenu.items" v-bind:class="{'is-active': item.isActive}">
                <a :href="item.url" class="mdl-js-button mdl-js-ripple-effect">
                    <i class="zmdi" v-bind:class="item.icon"></i>
                    <span>{{item.name}}</span>
                </a>
            <ul v-if="item.submenu" class="menu-aside__submenu">
                <li v-for="forSubmenu in item.submenu" >
                    <a :href="forSubmenu.url" class="mdl-js-button mdl-js-ripple-effect">
                        {{forSubmenu.name}}
                    </a>
                </li>
            </ul>
        </li>
    </ul>

</template>

<script>
    export default {
        name: 'main-aside',
        data: function () {
            return {
                "loaded": false,
                "mm": {},
                "dataUrl": '', //default value - debug
            }
        },
        created() {
            var self = this;
            self.dataUrl = $('aside.menu-aside-container').attr('data-url');
            this.fetchData();
        },
        methods: {
            fetchData() {
                let self = this;
                this.$http.get(self.dataUrl).then(response => {
                    self.mm = response.body;
                    self.loaded = true;
                }, response => {
                    console.log('menu ajax error');

                });
            },
        }
    }
</script>
<style lang="less">
</style>