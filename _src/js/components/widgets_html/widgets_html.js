const widgets_html = {


		init() {

			this.slick();
			this.oldControls();
			this.openMobileToogle();
		},

		slick() {

	        if ( !$('[data-slick="true"]').length ) {
	            return false;
	        }

	        var newsSlider = $('.card--news .card__slider'),
	            cardNewsHeaderH = $('.card--news .card__header').height(),
	            cardH = $('.card--news').height() - (cardNewsHeaderH + 12);

	        var slick_options = {
	            arrows: false,
	            autoplay: false,
	            dots: false,
	            speed: 350
	        };

	        $('[data-slick="true"]').not('.slick-initialized').slick(slick_options);

	        //custom buttons
	        $(document).on('click', '[data-slickPrev="true"]', function(e) {
	            newsSlider.slick('slickPrev');
	        });

	        $(document).on('click', '[data-slickNext="true"]', function(e) {
	            newsSlider.slick('slickNext');
	        });

	        $('.card--news .slick-slide').css('height', cardH);


		},

		oldControls() {

	        //widget edit control
	        (function editWidgets() {

	            $('#widgets-edit').on('click', function(e) {

	                e.preventDefault();
	                var grid = $('.grid-stack').data('gridstack');

	                if ($('.app-content').hasClass('app-content--widgets-movable')) {

	                    grid.disable();

	                    $(this).children('i').removeClass('icon--widgets-edit-alt').addClass('icon--widgets-edit');
	                    $('.app-content').toggleClass('app-content--widgets-movable');
	                    $('.app-content').removeClass('app-content--widgets-editable');

	                } else {

	                    grid.enable();

	                    $(this).children('i').removeClass('icon--widgets-edit').addClass('icon--widgets-edit-alt');
	                    $('.app-content').toggleClass('app-content--widgets-movable');

	                }
	                // $(this).data("enabled", !enabled);
	            });

	            //manual close button
	            $('.card-bar__close').on('click', function(e) {

	                $('.app-content').toggleClass('app-content--widgets-movable');

	            });

	            //widgets editable view
	            $(document).on('click', '.remove-button', function() {

	                var grid = $('.grid-stack').data('gridstack'),
	                    el = $(this).closest('.grid-stack-item');

	                grid.remove_widget(el);

	            });

	            $(document).on('click', '.card__edit-icons *', function() {

	                var el = $(this).closest('.grid-stack-item');
	                el.css('z-index', '7');
	            });

	            $(document).on('click', '.card__edit-view .ddown__menu li', function() {

	                $('.app-content').addClass('app-content--widgets-editable');

	            });


	        })();
		},

        openMobileToogle() {
            let toogleOpen = true;
            $('.card__mobile-toggle').click(function () {
                let locationBlock = $(this).closest('.card').find('.mobile-toogle--target');
				if (toogleOpen === true){
                    locationBlock.css('display','block');
                    locationBlock.closest('.card').addClass("card--mobile-toggled");
                    toogleOpen = false;
				}
				else{
                    locationBlock.css('display','none');
                    locationBlock.closest('.card').removeClass("card--mobile-toggled");
                    toogleOpen = true;
				}
            })

        },



}

$(function() {
	widgets_html.init();
});