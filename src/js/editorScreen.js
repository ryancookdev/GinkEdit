var GINK = GINK || {};

GINK.EditorScreen = function ($) {
    var that = this,
        level,
        currentTool,
        currentAction,
        editObj,
        ctx = $.canvasContext;

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
        if (currentTool === 'player') {
            editObj = level.getPlayer();
        } else if (currentTool === 'platform') {
            editObj = level.getNextPlatform();
        }
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
            level.removePlatform(editObj);
            editObj = level.getFirstPlatform();
            that.draw();
            $.actionBar.resetAction();
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
        return ($.keypressList.indexOf(key) !== -1);
    };

};
