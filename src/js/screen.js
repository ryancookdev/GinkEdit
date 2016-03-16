var GINK = GINK || {};

GINK.Screen = function ($) {
    var that = this,
        ctx,
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
        if (editObj !== null && editObj !== undefined && editObj.draw !== undefined) {
            editObj.draw(ctx, "#00a9a9");
        }
    };

    this.toolBoxChange = function (obj) {
        currentTool = obj.tool;
        that.draw();
    };

    this.actionBarChange = function (obj) {
        currentAction = obj.action;
        if (currentAction === 'new') {
            if (currentTool === 'platform') {
                editObj = new $.Platform($);
                level.addPlatform(editObj);
            }
        }
        that.draw();
    };

    this.keyEventListener = function () {
        var CTRL = 17,
            LEFT = 37,
            UP = 38,
            RIGHT = 39,
            DOWN = 40,
            DELETE = 46;

        if (isPressed(CTRL) && isPressed(RIGHT) && currentAction === 'edit') {
            editObj.incSize();
            that.draw();
            return;
        }

        if (isPressed(CTRL) && isPressed(LEFT) && currentAction === 'edit') {
            editObj.decSize();
            that.draw();
            return;
        }

        if (isPressed(RIGHT) && currentAction === 'edit') {
            editObj.incX();
            that.draw();
            return;
        }

        if (isPressed(LEFT) && currentAction === 'edit') {
            editObj.decX();
            that.draw();
            return;
        }

        if (isPressed(UP) && currentAction === 'edit') {
            editObj.decY();
            that.draw();
            return;
        }

        if (isPressed(DOWN) && currentAction === 'edit') {
            editObj.incY();
            that.draw();
            return;
        }

        if (isPressed(DELETE) && currentAction === 'edit') {
            $.actionBar.resetAction();
            level.removePlatform(editObj);
            editObj = level.getFirstPlatform();
            that.draw();
            return;
        }

        if (isPressed(RIGHT) && currentAction === 'select') {
            editObj = level.getNextPlatform(editObj);
            that.draw();
            return;
        }

        if (isPressed(LEFT) && currentAction === 'select') {
            editObj = level.getPreviousPlatform(editObj);
            that.draw();
            return;
        }

    };

    var isPressed = function (key) {
        return ($.keypress.indexOf(key) !== -1);
    };

};
