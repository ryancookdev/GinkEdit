var GINK = GINK || {};

GINK.ToolBox = function ($) {
    var currentTool;

    this.init = function (tools) {
        var i;

        tools = (tools ? tools : getAllTools());

        for (i = 0; i < tools.length; i++) {
            tools[i].onclick = function (e) {
                setActiveTool(e.target);
            }
        };

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
    };

    var getAllTools = function () {
        return document.querySelectorAll('#toolbox > li');
    };

    this.getCurrentTool = function () {
        return currentTool;
    };
};
