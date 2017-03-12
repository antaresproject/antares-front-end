<template>
    
   <div class="card card--logs" data-scrollable data-widget-name="card--logs">
        <div class="card__header">
            <div class="card__header-left">
                <span>Logs</span>
            </div>
            <div class="card__header-right">
                <i class="card-maximize zmdi zmdi-window-maximize"></i>
            </div>
        </div>
        <div class="card__content flex ff-cnw jc-flex-start">
            <div class="card-ctrls card-ctrls--nopadding mt16">
                <div class="card-ctrls__left">
                    <div class="search-box search-box--dark mr24">
                        <i class="zmdi zmdi-search"></i>
                        <form action="#">
                            <div class="search-box__mdl-textfield mdl-textfield mdl-js-textfield ">
                                <input class="mdl-textfield__input search-box__search-field" type="text" id="sample2">
                                <label class="mdl-textfield__label" for="sample2">Search...</label>
                            </div>
                        </form>
                    </div>
                    <select class="mb24 select2--prefix" name="select4" data-selectAR--mdl="true">
                        <option value="all">All</option>
                        <option value="important">Important</option>
                        <option value="secondary" selected>Secondary</option>
                    </select>
                </div>
                <div class="card-ctrls__right">
                    <div class="ddown mr-24">
                        <div class="ddown__init btn--dropdown btn btn--md btn--default mdl-js-button mdl-js-ripple-effect">Filter</div>
                        <div class="ddown__content">
                            <div class="ddown__arrow"></div>
                            <ul class="ddown__menu">
                                <li class="ddown__header mdl-js-button mdl-js-ripple-effect"><a href=""><i class="zmdi zmdi-account-add"></i><span>Add New Client</span></a></li>
                                <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-file-plus"></i><span>Create Invoice</span></a></li>
                                <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-email"></i><span>Send Email</span></a></li>
                                <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-ticket-star"></i><span>Open New Ticket</span></a></li>
                                <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-accounts-list"></i><span>Add Contact</span></a></li>
                                <li><a class="mdl-js-button mdl-js-ripple-effect" href="#"><i class="zmdi zmdi-money-box"></i><span>Add Founds</span></a></li>
                                <li class="ddown__sgl--footer"><a class="mdl-js-button mdl-js-ripple-effect" href=""><i class="zmdi zmdi-square-right"></i><span>Login As Client</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="timeline" data-scrollable>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2510"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/40/edit">Brand 2</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">12</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">9</a>
                        <span> <span data-tooltip-inline="2016-09-02 08:31:41" id="date-format-WLs0W" tabindex="0" data-hasqtip="2517">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-WLs0W" data-upgraded=",MaterialTooltip">2016-09-02 08:31:41</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2520"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/47/edit">Brand 4</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/47/edit">16</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/47/edit">13</a>
                        <span> <span data-tooltip-inline="2016-09-01 19:45:02" id="date-format-ObfMD" tabindex="0" data-hasqtip="2527">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-ObfMD" data-upgraded=",MaterialTooltip">2016-09-01 19:45:02</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#FF8000" data-tooltip-inline="Tags" style="color: rgb(255, 128, 0);" data-hasqtip="2530"></div>
                    <div class="timeline__padding">
                        Tag Test has been deleted by user <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> in component acl_antares with language <a href="http://demo.antaresproject.io/admin/translations">English</a>
                        <span> <span data-tooltip-inline="2016-09-01 15:25:33" id="date-format-dYb5n" tabindex="0" data-hasqtip="2535">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-dYb5n" data-upgraded=",MaterialTooltip">2016-09-01 15:25:33</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#FF8000" data-tooltip-inline="Tags" style="color: rgb(255, 128, 0);" data-hasqtip="2538"></div>
                    <div class="timeline__padding">
                        Tag Test, has been assigned by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> in module acl_antares with language <a href="http://demo.antaresproject.io/admin/translations">English</a>
                        <span> <span data-tooltip-inline="2016-09-01 15:25:27" id="date-format-ADZGD" tabindex="0" data-hasqtip="2543">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-ADZGD" data-upgraded=",MaterialTooltip">2016-09-01 15:25:27</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2546"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/47/edit">Brand 4</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/47/edit">16</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/47/edit">13</a>
                        <span> <span data-tooltip-inline="2016-09-01 14:37:15" id="date-format-xkdpv" tabindex="0" data-hasqtip="2553">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-xkdpv" data-upgraded=",MaterialTooltip">2016-09-01 14:37:15</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2556"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/40/edit">Brand 2</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">12</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">9</a>
                        <span> <span data-tooltip-inline="2016-09-01 13:36:24" id="date-format-qb3X7" tabindex="0" data-hasqtip="2563">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-qb3X7" data-upgraded=",MaterialTooltip">2016-09-01 13:36:24</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2566"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/1/edit">Brand 1</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/1/edit">11</a>
                        <span> <span data-tooltip-inline="2016-09-01 13:36:17" id="date-format-YtBss" tabindex="0" data-hasqtip="2572">3 days ago</span>
                        <div class="mdl-tooltip" for="date-format-YtBss" data-upgraded=",MaterialTooltip">2016-09-01 13:36:17</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2653"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/40/edit">Brand 2</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">12</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">9</a>
                        <span> <span data-tooltip-inline="2016-09-01 10:38:12" id="date-format-KpQob" tabindex="0" data-hasqtip="2660">4 days ago</span>
                        <div class="mdl-tooltip" for="date-format-KpQob" data-upgraded=",MaterialTooltip">2016-09-01 10:38:12</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#FFCCCC" data-tooltip-inline="Updater" style="color: rgb(255, 204, 204);" data-hasqtip="2663"></div>
                    <div class="timeline__padding">
                        Sandbox <a href="http://demo.antaresproject.io/admin/updater/sandboxes">1.0.0</a> has been created by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a>
                        <span> <span data-tooltip-inline="2016-09-01 09:58:55" id="date-format-myIL4" tabindex="0" data-hasqtip="2668">4 days ago</span>
                        <div class="mdl-tooltip" for="date-format-myIL4" data-upgraded=",MaterialTooltip">2016-09-01 09:58:55</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#0080FF" data-tooltip-inline="Brands" style="color: rgb(0, 128, 255);" data-hasqtip="2671"></div>
                    <div class="timeline__padding">
                        Brand <a href="http://demo.antaresproject.io/admin/brands/40/edit">Brand 2</a> has been updated by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> with options identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">12</a> and colors identifier <a href="http://demo.antaresproject.io/admin/brands/40/edit">9</a>
                        <span> <span data-tooltip-inline="2016-09-01 08:42:42" id="date-format-qHk4X" tabindex="0" data-hasqtip="2678">4 days ago</span>
                        <div class="mdl-tooltip" for="date-format-qHk4X" data-upgraded=",MaterialTooltip">2016-09-01 08:42:42</div>
                        </span>
                    </div>
                </li>
                <li class="timeline__entry--ok">
                    <div class="timeline__indicator" data-color="#004D26" data-tooltip-inline="Logger" style="color: rgb(0, 77, 38);" data-hasqtip="2681"></div>
                    <div class="timeline__padding">
                        Report 11 has been created by <a href="http://demo.antaresproject.io/user/1/edit">Admin Demo</a> in brand Brand 1 and type analyzer
                        <span> <span data-tooltip-inline="2016-09-01 08:40:10" id="date-format-xGDWq" tabindex="0" data-hasqtip="2685">4 days ago</span>
                        <div class="mdl-tooltip" for="date-format-xGDWq" data-upgraded=",MaterialTooltip">2016-09-01 08:40:10</div>
                        </span>
                    </div>
                </li>
            </ul>
            <div class="pagination mb16 mt16">
                <div class="pagination-pages">
                    <div class="pagination-pages__prev">
                        <a href="#" class="mdl-js-button mdl-js-ripple-effect">
                            <i class="zmdi zmdi-chevron-left"></i>
                        </a>
                    </div>
                    <ul class="pagination-pages__list">
                        <li class="pagination-pages__sgl--active"><a class="mdl-js-button mdl-js-ripple-effect" href="#">1</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">2</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">3</a></li>
                        <li><a class="mdl-js-button mdl-js-ripple-effect" href="#">4</a></li>
                    </ul>
                    <div class="pagination-pages__next">
                        <a href="#" class="mdl-js-button mdl-js-ripple-effect">
                            <i class="zmdi zmdi-chevron-right"></i>
                        </a>
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
        </div>
    </div>

</template>

<script>
  
export default {

    name: 'Card-Logs',
    data: function() {
        return {
            
        }
    },
    mounted: function() {

        // var self = this;

        // dataCalc(this);

        // var domElem = $(self.$el);

        // domElem.find('[data-icheck]').on('ifChanged', function(event) {
        //     self.compareMode = !self.compareMode;
        // });


    },

    methods: {


    }
    
};  

</script>


<style>
    

</style>