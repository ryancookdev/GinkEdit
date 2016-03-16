var GINK = GINK || {};

GINK.bootstrap = function ($) {
    $.initGlobals($);

    $.currentLevel = new $.Level(1);

    $.toolBox = new $.ToolBox($);
    $.toolBox.init();

    $.actionBar = new $.ActionBar($);
    $.actionBar.init();

    $.screen = new $.Screen($);
    $.screen.setCanvas(document.getElementById('gink'));
    $.screen.setLevel($.currentLevel);
    $.screen.draw();

    $.actionBar.addSubscriber($.screen.actionBarChange);
    $.toolBox.addSubscriber($.screen.toolBoxChange);
    $.toolBox.addSubscriber($.actionBar.toolBoxChange);

    $.initKeyEventListener($);
}

GINK.initGlobals = function ($) {
    $.FRAME_RATE = 40;
    $.INTERVAL_TIME = 1000 / GINK.FRAME_RATE;
    $.SCREEN_WIDTH = 400;
    $.SCREEN_HEIGHT = 240;
    $.keypress = [];
};

GINK.initKeyEventListener = function ($) {
    document.onkeydown = function (e) {
        e = (e ? e : window.event);
        if ($.keypress.indexOf(e.keyCode) === -1) {
            $.keypress.push(e.keyCode);
        }
        $.screen.keyEventListener();
    };

    document.onkeyup = function (e) {
        var keyPosition = $.keypress.indexOf(e.keyCode);
        if (keyPosition !== -1) {
            $.keypress.splice(keyPosition, 1);
        }
    };
};

document.addEventListener('DOMContentLoaded', function(event) { 
    GINK.bootstrap(GINK);
});
