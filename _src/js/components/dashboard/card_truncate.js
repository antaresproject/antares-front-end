import Vue from "vue";

export const cardTruncate = {

    install: function(Vue, options) {

        Vue.mixin({
            mounted: function() {
                var self = this;

                function truncateFix() {

                    self.$nextTick(function() {

                        $('.card__header-left').each(function(index, el) {
                            $(this).closest('.card').attr('data-truncated', true);
                            var width = $(this).outerWidth() - 24;
                            $(this).find('>span').css('max-width', width);
                        });

                    });

                }

                truncateFix();

                $(window).resize(function(event) {
                    truncateFix();
                });

                $('.grid-stack').on('change', function(event, ui) {
                    truncateFix();
                });
            }
        })

    }

}