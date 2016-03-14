var GINK = GINK || {};

GINK.ActionBar = function ($) {
    var currentAction;

    this.init = function (actions) {
        var i, j;

        actions = (actions ? actions : getAllActions());

        for (i = 0; i < actions.length; i++) {
            actions[i].onclick = function (e) {
                currentAction = e.target.id;
                for (j = 0; j < actions.length; j++) {
                    actions[j].className = '';
                    e.target.className = 'active';
                }
            }
        };
    };

    var getAllActions = function () {
        return document.querySelectorAll('#action > li');
    };

    this.getCurrentAction = function () {
        return currentAction;
    };
};
