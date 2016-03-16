var GINK = GINK || {};

GINK.ActionBar = function ($) {
    var currentAction,
        subscribers = [];

    this.init = function (actions) {
        var i;

        actions = (actions ? actions : getAllActions());

        for (i = 0; i < actions.length; i++) {
            actions[i].onclick = function (e) {
                setActiveAction(e.target);
            }
        };
    };

    var setActiveAction = function (action) {
        var i,
            actions;

        actions = getAllActions();
        for (i = 0; i < actions.length; i++) {
            actions[i].className = '';
        }
        action.className = 'active';
        currentAction = action.id;
        notifyAll(currentAction);

        if (currentAction === 'new') {
            setActiveAction(document.getElementById('edit'));
        }
    };


    var getAllActions = function () {
        return document.querySelectorAll('#action > li');
    };

    this.getCurrentAction = function () {
        return currentAction;
    };

    this.addSubscriber = function (subscriber) {
        subscribers.push(subscriber);
    };

    var notifyAll = function (currentAction) {
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i]({action: currentAction});
        }
    };

    this.resetAction = function (obj) {
        setActiveAction(document.getElementById('select'));
    };
};
