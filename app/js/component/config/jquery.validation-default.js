jQuery.validator.setDefaults({
	errorElement: 'label',
	errorClass: 'error',
	focusInvalid: false,

	errorPlacement: function (error, element) {
		$(element).closest('.form-group').append(error);
	},

	highlight: function (element, errorClass, validClass) {
		let fieldWrap = $(element).closest('.form-group');

		fieldWrap.addClass('has-error').removeClass('has-valid');
		$(element).addClass('error');
	},

	unhighlight: function (element, errorClass, validClass) {
		let fieldWrap = $(element).closest('.form-group');

		fieldWrap.removeClass('has-error').addClass('has-valid');
		$(element).removeClass('error');
	},
});