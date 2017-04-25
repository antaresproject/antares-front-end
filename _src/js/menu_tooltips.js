$('.main-menu > li .submenu').find('.submenu__content li').each(function(index, el) {

	var data = $(el).attr('data-name');

	if ( data !== undefined ) {

		$(el).on('mouseover', function() {

			 $(el).closest('.submenu').find('[data-menu-item='+data+']').velocity({

			 	opacity:1,

			 }, {
			 	duration: 150,
			 	display: "block"
			 });

		});

		$(el).on('mouseout', function() {

			// setTimeout(function() {

			 $(el).closest('.submenu').find('[data-menu-item='+data+']').velocity({

			 	opacity:0,

			 }, {
			 	duration: 150,
			 	display: "none"
			 });

			// }, 200);
		});

		
	}	

});