(function ($, window, document) {
	const $formContact = $('#js_form-contact');

	$formContact.validate({
		rules: {
			contact_email: {
				required: true,
				email: true
			},
			contact_message: {
				required: true,
				minlength: 10
			}
		},
	});

	$formContact.submit(function(e){
		e.preventDefault();

		if(!$formContact.valid()) {
			return;
		}
		
		const $control = $formContact.find('.btn');

		$control.addClass('btn--loading').attr('disabled', true);

		setTimeout(() => {
			alert('Your message was successfully sent.');
			$formContact.find('input').val('');
			$formContact.find('.form-group').removeClass('has-valid');
			$control.removeClass('btn--loading').attr('disabled', false);
		}, 2410);
	});
}(window.jQuery, window, document));