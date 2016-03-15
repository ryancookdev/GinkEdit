var GINK = GINK || {};

GINK.Screen = function ($) {
    var ctx,
        level,
        currentTool,
        currentAction,
        editObj;

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
        ctx.fillRect(0, 0, $.SCREEN_WIDTH, $.SCREEN_HEIGHT);

        levelObjects = level.getObjects();
        for (i = 0; i < levelObjects.length; i++) {
            levelObjects[i].draw(ctx);
        }
        if (editObj !== undefined && editObj.draw !== undefined) {
            editObj.draw(ctx);
        }
    };

    this.toolBoxChange = function (obj) {
        currentTool = obj.tool;
    };

    this.actionBarChange = function (obj) {
        currentAction = obj.action;

        if (currentAction === 'new') {
            if (currentTool === 'platform') {
                editObj = new $.Platform($);
            }
        }
    };

    this.keyEventListener = function (keyEvent) {
        var KEY_ESC = 27,
            KEY_SPACE = 32,
            KEY_LEFT = 37,
            KEY_UP = 38,
            KEY_RIGHT = 39,
            KEY_DOWN = 40,
            KEY_PLUS = 61,
            KEY_A = 65,
            KEY_E = 69,
            KEY_H = 72,
            KEY_P = 80,
            KEY_Q = 81,
            KEY_S = 83,
            KEY_MINUS = 173;
        if (keyEvent.keyCode === KEY_PLUS && currentAction === 'edit') {
            editObj.incSize();
            return;
        }

        if (keyEvent.keyCode === KEY_MINUS && currentAction === 'edit') {
            editObj.decSize();
            return;
        }

        if (keyEvent.keyCode === KEY_RIGHT && currentAction === 'edit') {
            editObj.incX();
            return;
        }

        if (keyEvent.keyCode === KEY_LEFT && currentAction === 'edit') {
            editObj.decX();
            return;
        }

        if (keyEvent.keyCode === KEY_UP && currentAction === 'edit') {
            editObj.decY();
            return;
        }

        if (keyEvent.keyCode === KEY_DOWN && currentAction === 'edit') {
            editObj.incY();
            return;
        }

    };


};
