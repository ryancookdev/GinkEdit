var GINK = GINK || {};

GINK.Platform = function ($) {
    var x = parseInt($.SCREEN_WIDTH / 2) - 10,
        y = parseInt($.SCREEN_HEIGHT / 2),
        length = 20;

    this.draw = function (ctx) {
        ctx.fillStyle = "#9b0000";
        ctx.fillRect(x, y, length, 3);
    };

};
