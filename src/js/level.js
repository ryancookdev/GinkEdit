var GINK = GINK || {};

GINK.Level = function (number) {
    var nextLevel,
        previousLevel,
        platforms = [];

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

    this.addPlatform = function () {
        platforms.push(new GINK.Platform(GINK));
    };

    this.getObjects = function () {
        return platforms;
    };
};
