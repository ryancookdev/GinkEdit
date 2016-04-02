var GINK = GINK || {};

GINK.ToolBox = function ($) {
    var currentTool,
        subscribers = [];

    this.init = function (tools) {
        var i,
            tools = (tools ? tools : getAllTools());

        for (i = 0; i < tools.length; i++) {
            tools[i].onclick = function (e) {
                if (e.target.className !== 'locked') {
                    setActiveTool(e.target);
                }
            }
        };

    };

    this.handleActionChange = function (obj) {
        if (obj.action === 'play') {
            if ($.screen === $.editorScreen) {
                lock();
            } else {
                unlock();
                currentTool = 'player';
                document.getElementById(currentTool).className = 'active';
            }
        }
    };

    var lock = function () {
        var elements = document.querySelectorAll('#toolbox > li');
        for(var i = elements.length - 1; i >= 0; --i)
        {
            elements[i].className = 'locked';
        }
    };

    var unlock = function () {
        var elements = document.querySelectorAll('#toolbox > li');
        for(var i = elements.length - 1; i >= 0; --i)
        {
            if (elements[i].className === 'locked') {
                elements[i].className = '';
            }
        }
    };

    var setActiveTool = function (tool) {
        var i,
            tools;

        tools = getAllTools();
        for (i = 0; i < tools.length; i++) {
            tools[i].className = '';
        }
        tool.className = 'active';
        currentTool = tool.id;
        notifyAll(currentTool);
    };

    var getAllTools = function () {
        return document.querySelectorAll('#toolbox > li');
    };

    this.getCurrentTool = function () {
        return currentTool;
    };

    this.addSubscriber = function (subscriber) {
        subscribers.push(subscriber);
    };

    var notifyAll = function (currentTool) {
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i]({tool: currentTool});
        }
    };
};
