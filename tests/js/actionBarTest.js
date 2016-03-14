var GINK = GINK || {};

QUnit.module('ActionBar');

QUnit.test('Create action bar and set current action', function (assert) {
    var actionBar = new GINK.ActionBar(),
        actions = [{onclick: null}],
        event = {target: {id: 'testaction'}};

    actionBar.init(actions);
    assert.equal(typeof actions[0].onclick, 'function', 'Actions have been assigned a function');

    actions[0].onclick(event);
    assert.equal(actionBar.getCurrentAction(), 'testaction', 'Current action has been set');
});
