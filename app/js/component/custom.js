(function ($, window, document) {
    function videoPlayerInit() {
        const players = document.querySelectorAll(".js-player");

        if (!players.length) {
            return;
        }

        for (let i = 0; i < players.length; i++) {
            new Plyr(players[i]);
        }
    }

    $(() => {
        $("body").css("opacity", 1);

        videoPlayerInit();

        $(".lazy").Lazy({
            threshold: 1000,
        });
    });
})(window.jQuery, window, document);
