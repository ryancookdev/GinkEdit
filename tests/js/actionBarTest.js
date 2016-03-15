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

QUnit.test('Add subscriber', function (assert) {
    var actionBar = new GINK.ActionBar(),
        actions = [{onclick: null}],
        event = {target: {id: 'testaction'}};
        subscriberNotified = false,
        newAction = null;

    actionBar.init(actions);
    actionBar.addSubscriber(function (info) {
        subscriberNotified = true;
        newAction = info.action;
    });
    actions[0].onclick(event);
    assert.ok(subscriberNotified, 'Subscriber has been notified of changed action');
    assert.equal(newAction, 'testaction', 'The new action was reported');
});
