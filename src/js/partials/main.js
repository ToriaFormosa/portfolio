$(window).on('load', function() {
	var tl = new TimelineMax(),
			bgColor = '#cccccc',
			play = true,
			parents = [$('.about'), $('.reviews')];

	/* Gallery */
	$("[data-fancybox]").fancybox({
		buttons: [
			"zoom",
			"slideShow",
			"close"
		]
	});

	/* Border animation */
	$(window).scroll(function () {
		elemTracking(parents);
	});

	elemTracking(parents);

	function elemTracking(parents) {
		$.each(parents, function () {
			var windowOffset = $(window).scrollTop(),
					windowHeight = $(window).height(),
					elemTop = $(this).offset().top,
					elemHeight = $(this).outerHeight();

			if (windowOffset + windowHeight >= elemTop &&
					windowOffset + windowHeight - elemHeight * 2 <= elemTop + (windowHeight - elemHeight)) {

				if (!$(this).hasClass('active')) {
					$(this).addClass('active');
					borderFilling($(this));
				}
			} else {
				$(this).removeClass('active');
			}
		});
	}

	function borderFilling(parent) {
		tl.fromTo(parent.find('.border-anim__1'), 0.25,
				{
					width: 0,
					background: bgColor,
					immediateRender: false,
					autoRound: false
				},
				{
					width: parent.find('.js-border-container').innerWidth(),
					background: bgColor
				}
		).fromTo(parent.find('.border-anim__2'), 0.25,
				{
					height: 0,
					background: bgColor,
					immediateRender: false,
					autoRound: false
				},
				{
					height: parent.find('.js-border-container').innerHeight(),
					background: bgColor
				}
		).fromTo(parent.find('.border-anim__3'), 0.25,
				{
					width: 0,
					background: bgColor,
					immediateRender: false,
					autoRound: false
				},
				{
					width: parent.find('.js-border-container').innerWidth(),
					background: bgColor
				}
		).fromTo(parent.find('.border-anim__4'), 0.25,
				{
					height: 0,
					background: bgColor,
					immediateRender: false,
					autoRound: false
				},
				{
					height: parent.find('.js-border-container').innerHeight(),
					background: bgColor
				}
		);

		play = false;
	}
})