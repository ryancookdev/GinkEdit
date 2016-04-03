var GINK = GINK || {};

GINK.Player = function ($) {
    var x = 3,
        y = 4;

    this.getX = function () {
        return x;
    };

    this.getY = function () {
        return y;
    };

    this.setX = function (newX) {
        x = newX;
    };

    this.setY = function (newY) {
        y = newY;
    };

    this.incX = function () {
        if (x + 6 < $.SCREEN_WIDTH) {
            x += 1;
        }
    };

    this.decX = function () {
        if (x > 0) {
            x -= 1;
        }
    };

    this.incY = function () {
        if (y + 14 < $.SCREEN_HEIGHT) {
            y += 14;
        }
    };

    this.decY = function () {
        if (y > 4) {
            y -= 14;
        }
    };

    this.draw = function (ctx, color) {
        color = (color ? color : "#009b00");
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 6, 10);
    };
};
