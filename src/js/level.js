var GINK = GINK || {};

GINK.Level = function (number) {
    var nextLevel,
        previousLevel,
        platforms = [],
        player = new GINK.Player(GINK);

    GINK.assertType(number, 'number');

    this.getNumber = function () {
        return number;
    };

    this.setNextLevel = function (level) {
        GINK.assertClass(level, GINK.Level);
        nextLevel = level;

        if (level.previous() !== this) {
            level.setPreviousLevel(this);
        }
    };

    this.setPreviousLevel = function (level) {
        GINK.assertClass(level, GINK.Level);
        previousLevel = level;

        if (level.next() !== this) {
            level.setNextLevel(this);
        }
    };

    this.next = function () {
        return nextLevel;
    };

    this.previous = function () {
        return previousLevel;
    };

    this.addPlatform = function (platform) {
        platforms.push(platform);
    };

    this.removePlatform = function (platform) {
        var position = platforms.indexOf(platform);
        if (position !== -1) {
            platforms.splice(position, 1);
        }
    };

    this.getFirstPlatform = function () {
        return platforms[0];
    };

    this.getNextPlatform = function (platform) {
        var position = platforms.indexOf(platform);
        if (++position === platforms.length) {
            position = 0;
        }
        return platforms[position];
    };

    this.getPreviousPlatform = function (platform) {
        var position = platforms.indexOf(platform);
        if (--position === -1) {
            position = platforms.length - 1;
        }
        return platforms[position];
    };

    this.getPlayer = function () {
        return player;
    };

    this.getObjects = function () {
        var gameObjects = [];
        for (var i = 0; i < platforms.length; i++) {
            gameObjects.push(platforms[i]);
        }
        gameObjects.push(player);
        return gameObjects;
    };
};
