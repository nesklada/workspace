"use strict";

jQuery.validator.setDefaults({
  errorElement: 'label',
  errorClass: 'error',
  focusInvalid: false,
  errorPlacement: function errorPlacement(error, element) {
    $(element).closest('.form-group').append(error);
  },
  highlight: function highlight(element, errorClass, validClass) {
    var fieldWrap = $(element).closest('.form-group');
    fieldWrap.addClass('has-error').removeClass('has-valid');
    $(element).addClass('error');
  },
  unhighlight: function unhighlight(element, errorClass, validClass) {
    var fieldWrap = $(element).closest('.form-group');
    fieldWrap.removeClass('has-error').addClass('has-valid');
    $(element).removeClass('error');
  }
});

(function ($, window, document) {
  var $formContact = $('#js_form-contact');
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
    }
  });
  $formContact.submit(function (e) {
    e.preventDefault();

    if (!$formContact.valid()) {
      return;
    }

    var $control = $formContact.find('.btn');
    $control.addClass('btn--loading').attr('disabled', true);
    setTimeout(function () {
      alert('Your message was successfully sent.');
      $formContact.find('input').val('');
      $formContact.find('.form-group').removeClass('has-valid');
      $control.removeClass('btn--loading').attr('disabled', false);
    }, 2410);
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  var $formUnsubscribe = $('#js_form-unsubscribe');
  $formUnsubscribe.validate({
    rules: {
      unsubscribe_email: {
        required: true,
        email: true
      }
    }
  });
  $formUnsubscribe.submit(function (e) {
    e.preventDefault();

    if (!$formUnsubscribe.valid()) {
      return;
    }

    var $control = $formUnsubscribe.find('.btn');
    $control.addClass('btn--loading').attr('disabled', true);
    setTimeout(function () {
      alert('If your email was found in our database - you have been unsubscribed.');
      $formUnsubscribe.find('input').val('');
      $formUnsubscribe.find('.form-group').removeClass('has-valid');
      $control.removeClass('btn--loading').attr('disabled', false);
      ;
    }, 2500);
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  function formatWindowSearch() {
    var pairs = window.location.search.substring(1).split("&"),
        obj = {},
        pair,
        i;

    for (i in pairs) {
      if (pairs[i] === "") continue;
      pair = pairs[i].split("=");
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    delete obj.htmlpage;
    var utmString = "?";

    for (var item in obj) {
      utmString += "".concat(item, "=").concat(obj[item], "&");
    }

    return utmString.substring(0, utmString.length - 1);
  }

  function UTMlinks(obj) {
    if (!obj) {
      var obj = {};
    }

    var selector = obj.selector || '.js_utm-link';
    var links = document.querySelectorAll(selector);
    var utm = formatWindowSearch();

    for (var i = 0; i < links.length; i++) {
      var link = links[i],
          href = link.getAttribute('href');

      if (!href) {
        continue;
      }

      var hrefArr = href.split('?');
      var newHref = href + utm;

      if (hrefArr.length >= 2) {
        newHref = href + utm.replace("?", "&");
      }

      if (!link.hasAttribute('href') || href.length <= 0) {
        continue;
      }

      link.setAttribute('href', newHref);
    }
  }

  $(function () {
    UTMlinks();
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  function videoPlayerInit() {
    var players = document.querySelectorAll(".js-player");

    if (!players.length) {
      return;
    }

    for (var i = 0; i < players.length; i++) {
      new Plyr(players[i]);
    }
  }

  $(function () {
    $("body").css("opacity", 1);
    videoPlayerInit();
    $(".lazy").Lazy({
      threshold: 1000
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $('body').css('opacity', 1);
  });
})(window.jQuery, window, document);
//# sourceMappingURL=custom.js.map
