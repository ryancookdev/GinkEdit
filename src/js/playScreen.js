var GINK = GINK || {};

GINK.PlayScreen = function ($) {
    var that = this,
        level,
        ctx = $.canvasContext,
        FRAME_RATE = 40,
        INTERVAL_TIME = 1000 / FRAME_RATE;

    this.setLevel = function (l) {
        level = l;
    };

    this.draw = function () {
        var i,
            levelObjects;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);

        levelObjects = level.getObjects();
        for (i = 0; i < levelObjects.length; i++) {
            levelObjects[i].draw(ctx);
        }
    };

    this.keyEventListener = function () {
        var CTRL = 17,
            LEFT = 37,
            UP = 38,
            RIGHT = 39,
            DOWN = 40;

        if (isPressed(RIGHT)) {
            editObj.incX();
            return;
        }

        if (isPressed(LEFT)) {
            editObj.decX();
            return;
        }
    };

    var isPressed = function (key) {
        return ($.keypressList.indexOf(key) !== -1);
    };

};
