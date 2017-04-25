$('.main-menu > li .submenu').find('.submenu__content li').each(function(index, el) {

    var data = $(el).attr('data-name');

    if (data !== undefined) {

        $(el).on('mouseover', function() {

            $(el).closest('.submenu').find('[data-menu-item=' + data + ']').velocity({

                opacity: 1

            }, {
                duration: 150,
                display: "block"
            });

        });

        $(el).on('mouseout', function() {

            $(".main-sidebar .velocity-animating").velocity("stop", true);

            $(el).closest('.submenu').find('.menu-tooltip').velocity({

                opacity: 0

            }, {
                duration: 120,
                display: "none"
            });

        });

    }

});