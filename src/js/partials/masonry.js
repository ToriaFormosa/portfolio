$(window).on('load', function() {
	var portfolioGrid = $('.portfolio__masonry').isotope({
		itemSelector: '.portfolio__item',
		layoutMode: 'packery',
		packery: {
			gutter: 0
		},
	});
})