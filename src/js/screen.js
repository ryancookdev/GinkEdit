var GINK = GINK || {};

GINK.Screen = function () {
    var ctx,
        level;

    this.setCanvas = function (c) {
        ctx = c.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.scale(2, 2);
    };

    this.setLevel = function (l) {
        level = l;
    };

    this.draw = function () {
        var i,
            levelObjects;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, GINK.SCREEN_WIDTH, GINK.SCREEN_HEIGHT);

        levelObjects = level.getObjects();
        for (i = 0; i < levelObjects.length; i++) {
            levelObjects[i].draw(ctx);
        }
    };

};
