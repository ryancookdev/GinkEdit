var GINK = GINK || {};

GINK.Platform = function ($) {
    var x = parseInt($.SCREEN_WIDTH / 2) - 10,
        y = parseInt($.SCREEN_HEIGHT / 2),
        length = 20;

    y -= y % 14; // Make sure it is a multiple of 14

    this.draw = function (ctx, color) {
        color = (color ? color : "#9b0000");
        ctx.fillStyle = color;
        ctx.fillRect(x, y, length, 3);
    };

    this.getX = function () {
        return x;
    };

    this.getY = function () {
        return y;
    };

    this.incX = function () {
        if (x + length < $.SCREEN_WIDTH) {
            x += 4;
        }
    };

    this.decX = function () {
        if (x > 0) {
            x -= 4;
        }
    };

    this.incY = function () {
        if (y + 2 < $.SCREEN_HEIGHT) {
            y += 14;
        }
    };

    this.decY = function () {
        if (y > 0) {
            y -= 14;
        }
    };

    this.incSize = function () {
        if (x + length < $.SCREEN_WIDTH) {
            length += 2;
        }
    };

    this.decSize = function () {
        if (length > 20) {
            length -= 2;
        }
    };
};
