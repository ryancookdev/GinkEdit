var GINK = GINK || {};

GINK.bootstrap = function ($) {
    $.initGlobals($);

    $.keyReader = new $.KeyReader();
    $.currentLevel = new $.Level(1);
$.currentLevel.addPlatform();

    $.toolBox = new $.ToolBox($);
    $.toolBox.init();

    $.actionBar = new $.ActionBar($);
    $.actionBar.init();

    $.screen = new $.Screen();
    $.screen.setCanvas(document.getElementById('gink'));
    $.screen.setLevel($.currentLevel);

    $.initGameLoop($);
    $.initKeyReader($);
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

GINK.initKeyReader = function ($) {
    document.onkeydown = function (e) {
        e = (e ? e : window.event);
        $.keyReader.read(e);
    };
};

document.addEventListener('DOMContentLoaded', function(event) { 
    GINK.bootstrap(GINK);
});
