var GINK = GINK || {};

QUnit.module('Level');

QUnit.test('Create new level', function (assert) {
    var number = 1,
        level = new GINK.Level(number);
    assert.equal(number, level.getNumber(), 'Level number is 1');
});

QUnit.test('Connect two levels', function (assert) {
    var level1 = new GINK.Level(1),
        level2 = new GINK.Level(2);
    level1.setNextLevel(level2);
    assert.equal(level1.next(), level2, 'The level after level1 is level2');
    assert.equal(level2.previous(), level1, 'The level before level2 is level1');
});

