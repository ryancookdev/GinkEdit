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

    $.actionBar.addSubscriber($.screen.actionBarChange);
    $.toolBox.addSubscriber($.screen.toolBoxChange);
    $.toolBox.addSubscriber($.actionBar.toolBoxChange);

    $.initGameLoop($);
    $.initKeyEventListener($);
}

GINK.initGlobals = function ($) {
    $.FRAME_RATE = 40;
    $.INTERVAL_TIME = 1000 / GINK.FRAME_RATE;
    $.SCREEN_WIDTH = 400;
    $.SCREEN_HEIGHT = 240;
};

GINK.initGameLoop = function ($) {
    setInterval(function () {
       $.screen.draw();
    }, $.INTERVAL_TIME);
};

GINK.initKeyEventListener = function ($) {
    document.onkeydown = function (e) {
        e = (e ? e : window.event);
        $.screen.keyEventListener(e);
    };
};

document.addEventListener('DOMContentLoaded', function(event) { 
    GINK.bootstrap(GINK);
});
