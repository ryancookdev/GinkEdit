var GINK = GINK || {};

GINK.ToolBox = function ($) {

    this.init = function () {
        var i,
            tools;

        tools = document.querySelectorAll('#toolbox > li');
        for (i = 0; i < tools.length; i++) {
            tools[i].onclick = function (e) {
                $.currentTool = e.target.id;
                for (var j = 0; j < tools.length; j++) {
                    tools[j].className = '';
                    e.target.className = 'active';
                }
                $.canvas.focus();
            }
        };

    };
};
