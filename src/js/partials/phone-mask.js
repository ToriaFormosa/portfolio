$(window).on('load', function() {
	const phoneInput = document.querySelector('.contacts__field--phone');

	if (phoneInput && phoneInput.length > 0) {
		window.intlTelInput(document.querySelector('[type="tel"]'), {
			onlyCountries: ['ru', 'ua', 'kz', 'by'],
			utilsScript: '../../build/js/utils.js?1613236686837',
			dropdownContainer: phoneInput,
			customContainer: 'field__phone',
			separateDialCode: true
		});

		initPhoneMask();

		document.querySelector('[type="tel"]').addEventListener('countrychange', function () {
			initPhoneMask();
		})

		function initPhoneMask() {
			let mask1 = document.querySelector('[type="tel"]')
					.getAttribute('placeholder')
					.replace(/[0-9+]/ig, '9');

			document.querySelector('[type="tel"]').setAttribute('placeholder', mask1);

			Inputmask({mask: mask1, keepStatic: true}).mask(document.querySelector('[type="tel"]'));
		}
	}
})