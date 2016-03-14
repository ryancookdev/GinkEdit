var GINK = GINK || {};

GINK.ToolBox = function ($) {
    var currentTool;

    this.init = function (tools) {
        var i, j;

        tools = (tools ? tools : getAllTools());

        for (i = 0; i < tools.length; i++) {
            tools[i].onclick = function (e) {
                currentTool = e.target.id;
                for (j = 0; j < tools.length; j++) {
                    tools[j].className = '';
                    e.target.className = 'active';
                }
            }
        };

    };

    var getAllTools = function () {
        return document.querySelectorAll('#toolbox > li');
    };

    this.getCurrentTool = function () {
        return currentTool;
    };
};
