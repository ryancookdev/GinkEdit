var GINK = GINK || {};

GINK.ActionBar = function ($) {

    this.init = function () {
        var i,
            actions;

        actions = document.querySelectorAll('#action > li');
        for (i = 0; i < actions.length; i++) {
            actions[i].onclick = function (e) {
                $.currentTool = e.target.id;
                for (var j = 0; j < actions.length; j++) {
                    actions[j].className = '';
                    e.target.className = 'active';
                }
                $.canvas.focus();
            }
        };
    };
};
