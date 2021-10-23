$(window).on('load', function() {
	const images = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

	const tabs = $('.mobile__tabs-item'),
				pic = $('.mobile__screen-content img');

	tabs.on('click', function () {
		let that = $(this),
				newPath = pic.attr('src').replace(pic.attr('src'), './images/portfolio/phone/' + images[that.index()] + '.jpg');

		tabs.removeClass('mobile__tabs-item--active');
		that.addClass('mobile__tabs-item--active');

		pic.fadeOut(100);
		setTimeout(function () {
			pic.attr('src', newPath).fadeIn(300);
		}, 150);
	});
})