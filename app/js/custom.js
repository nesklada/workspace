"use strict";

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
