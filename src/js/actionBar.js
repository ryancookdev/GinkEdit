var GINK = GINK || {};

GINK.ActionBar = function ($) {
    var currentAction,
        currentTool,
        subscribers = [],
        toolActions = {
            player : ['edit', 'play'],
            platform : ['select', 'edit', 'new', 'play']
        };

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
            lockAllExceptActive();
            return;
        }

        if (currentAction === 'play' && $.screen === $.playScreen) {
            $.screen = $.editorScreen;
            $.screen.draw();
            setActiveAction(document.getElementById(toolActions[currentTool][0]));
            unlock();
            return;
        }
    };

    var inactivateAll = function () {
        var i,
            actions;

        actions = getAllActions();
        for (i = 0; i < actions.length; i++) {
            if (actions[i].className === 'active') {
                actions[i].className = '';
            }
        }

    };

    var activateCurrentAction = function (action) {
        action.className = 'active';
        currentAction = action.id;
        notifyAll(currentAction);
    };

    var lockAllExceptActive = function () {
        var elements = document.querySelectorAll('#action > li');
        for (var i = elements.length - 1; i >= 0; --i)
        {
            if (elements[i].className !== 'active') {
                elements[i].className = 'locked';
            }
        }
    };

    var lockAll = function () {
        var elements = document.querySelectorAll('#action > li');
        for (var i = elements.length - 1; i >= 0; --i)
        {
            elements[i].className = 'locked';
        }
    };

    var unlock = function () {
        var elements = document.querySelectorAll('#action > li');
        for (var i = elements.length - 1; i >= 0; --i)
        {
            if (toolActions[currentTool].indexOf(elements[i].id) === -1) {
                continue;
            }

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
        currentTool = obj.tool;
        lockAll();
        unlock();
        setActiveAction(document.getElementById(toolActions[currentTool][0]));
    };
};
