var GINK = GINK || {};

GINK.ActionBar = function ($) {
    var currentAction,
        subscribers = [];

    this.init = function (actions) {
        var i,
            actions = (actions ? actions : getAllActions());

        for (i = 0; i < actions.length; i++) {
            actions[i].onclick = function (e) {
                if (e.target.className !== 'locked') {
                    setActiveAction(e.target);
                }
            }
        };
    };

    var setActiveAction = function (action) {
        inactivateAll();
        activateCurrentAction(action);

        if (currentAction === 'new') {
            setActiveAction(document.getElementById('edit'));
            return;
        }

        if (currentAction === 'play' && $.screen === $.editorScreen) {
            $.screen = $.playScreen;
            $.screen.draw();
            lock();
            return;
        }

        if (currentAction === 'play' && $.screen === $.playScreen) {
            $.screen = $.editorScreen;
            $.screen.draw();
            setActiveAction(document.getElementById('select'));
            unlock();
            return;
        }
    };

    var inactivateAll = function () {
        var i,
            actions;

        actions = getAllActions();
        for (i = 0; i < actions.length; i++) {
            actions[i].className = '';
        }

    };

    var activateCurrentAction = function (action) {
        action.className = 'active';
        currentAction = action.id;
        notifyAll(currentAction);
    };

    var lock = function () {
        var elements = document.querySelectorAll('#action > li');
        for(var i = elements.length - 1; i >= 0; --i)
        {
            if (elements[i].className !== 'active') {
                elements[i].className = 'locked';
            }
        }
    };

    var unlock = function () {
        var elements = document.querySelectorAll('#action > li');
        for(var i = elements.length - 1; i >= 0; --i)
        {
            if (elements[i].className === 'locked') {
                elements[i].className = '';
            }
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
