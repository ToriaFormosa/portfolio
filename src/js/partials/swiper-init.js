$(window).on('load', function() {
	let sliders = document.querySelectorAll('.__js_slider');
	const options1 = {
		speed: 500,
		loop: true,
		slidesPerView: 1,
		spaceBetween: 24,
		navigation: false,
		autoplay: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	}

	if (sliders.length > 0) {
		sliders.forEach(elem => {
			new Swiper(elem, options1);
		});
	}
})