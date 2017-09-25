<template>
    <div class="card-container card-container--news">
        <card-edit-controls></card-edit-controls>
        <div class="card card--news " :data-widget-name="widgetName">
            <div class="card__overlay">
                <div class="card__header">
                    <div class="card__header-left">
                        <span>News</span>
                    </div>
                    <div class="card__header-right">
                        <div @click="prev" class="card__control card__control--left btn btn--news  mdl-js-button mdl-js-ripple-effect">
                            <i class="icon icon--chev-left"></i>
                        </div>
                        <div @click="next" class="card__control card__control--right btn btn--news ml8 mdl-js-button mdl-js-ripple-effect">
                            <i class="icon icon--chev-right"></i>
                        </div>
                    </div>
                </div>
                <span class="blue-header-background"></span>
                <slick class="card__slider" ref="slick" @init="slickUpdate" :options="slickOptions">
                    <div>
                        <div class="card__info">
                            <span class="card__title">Phasellus fermentum in, dolor. otel in, dolor. </span>
                            <span class="card__date">
                                <i class="zmdi zmdi-calendar-alt"></i> Jan 9, 2015</span>
                            <span class="card__author">
                                <i class="zmdi zmdi-account"></i> Added by Konrad Keck</span>
                        </div>
                        <div class="card__content">
                            <span>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna...</span>
                        </div>
                        <div class="card__footer">

                            <button class="btn btn--link btn--md btn--primary mdl-button mdl-js-button mdl-js-ripple-effect">
                                READ MORE
                            </button>

                        </div>
                    </div>
                    <div>
                        <div class="card__info">
                            <span class="card__title">Lorem Epsum Doloris Malis. </span>
                            <span class="card__date">
                                <i class="zmdi zmdi-calendar-alt"></i>Dec 10, 2015</span>
                            <span class="card__author">
                                <i class="zmdi zmdi-account"></i> Added by Łukasz Cirut</span>
                        </div>
                        <div class="card__content">
                            <span> Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna aloret...</span>
                        </div>
                        <div class="card__footer">
                            <a class="btn btn--link btn--md btn--primary mdl-button mdl-js-button mdl-js-ripple-effect">READ MORE</a>
                        </div>
                    </div>
                </slick>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import Slick from 'vue-slick';
import cardEditControls from './card_edit_controls.vue';
export default {
    name: 'CardNews',
    components: {
        'card-edit-controls': cardEditControls,
        Slick,
    },

    data: function() {
        return {
            widgetName: 'news',
            cardClass: 'card--news',
            slickOptions: {
                slidesToShow: 1,
                arrows: false,
                autoplay: false,
                dots: false,
                speed: 350,
                accessibility: false
            }
        }
    },
    activated: function() {
        // var self = this;
        // self.$nextTick(function() {
        //     self.slickUpdate();
        // });
    },
    created: function() {

    },
    mounted: function() {
        var self = this;
        $(this.$el).closest('.grid-stack-item').addClass('card-news--gsi');
        this.mockDate();
        self.slickUpdate();
    },
    methods: {
        mockDate() {
            let date = moment().format("MMM Do YYYY");
            $(this.$el).find('.card__date').text(date)
        },
        slickUpdate: function() {
            var self = this;
            self.$nextTick(function() {
                setTimeout(function() {
                    var slickCurrent = $(self.$el).find('.slick-slider').slickCurrentSlide;
                    $(self.$el).find('.slick-slider').slick('slickGoTo', slickCurrent)
                }, 100)
            });

        },
        slickResize: function() {
            var self = this;
            var grid = $('.grid-stack').data('gridstack');
            $('.grid-stack').on('change', function(event) {
                if ($(event.target).find('.card--news').length) {
                    self.slickUpdate();
                }
            });
        },
        next: function() {
            this.$refs.slick.next();
        },
        prev: function() {
            this.$refs.slick.prev();
        },
    }
};
</script>

<style lang="less">
#app-wrapper .card .card__header .card__header-right .card__control.btn.btn--news {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: 0;
    box-shadow: none;

    .mdl-button__ripple-container {
        border-radius: 50%;
    }
}

.card-news--gsi.ui-resizable-resizing .card__slider,
.card-news--gsi.ui-draggable-dragging .card__slider {
    opacity: 0;
    transition: 0ms;
}

.card-news--gsi .card__slider {
    opacity: 1;
    transition: 2s;
}

.card--news .card__footer .btn.btn--link {
    // margin-bottom: 16px;
    &:hover {
        background-color: transparent;
    }
}

.slick-list {
    height: ~'calc(100% - 52px)';
}

.slick-track {
    height: 100%;
}



.card__info {
    max-height: 94px;
    .card__title {
        height: 50px;
    }
}

.card__edit-view {

    i {
        transition: 300ms;
    }
}



.slick-list {
    height: 100%;
}

#app-wrapper .app-content--widgets-movable .mdl-tabs .card-container--news .card__edit-view {
    background: #fff !important;
}



.card-container--news .slick-initialized .slick-slide {
    background: white;
    z-index: 5;
    .card__content {
        z-index: 10;
        background: white;
    }
}

#app-wrapper .card.card--news .card__footer {
    z-index: 12;
}

.card-container--news .slick-initialized .slick-slide {
    background: transparent;
}

.blue-header-background {
    position: absolute;
    width: 100%;
    display: block;
    height: 27%;
    top: 50px;
    max-height: 94px;
    /*@media only screen and (max-width: 1199px) {*/
    /*height: 35%;*/
    /*}*/
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background: #02A8F3;
        width: 100%;
        height: 100%;
    }
}

.card__title {
    position: relative;
}
</style>
