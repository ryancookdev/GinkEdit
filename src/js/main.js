var GINK = GINK || {};

GINK.bootstrap = function ($) {
    $.keyReader = new $.KeyReader();
    $.currentLevel = new $.Level(1);

    $.toolBox = new $.ToolBox($);
    $.toolBox.init();

    $.actionBar = new $.ActionBar($);
    $.actionBar.init();

    $.initGlobals($);
    $.initCanvas($);
    $.initGameLoop($);
    $.initKeyReader($);
}

GINK.initGlobals = function ($) {
    $.FRAME_RATE = 40;
    $.INTERVAL_TIME = 1000 / GINK.FRAME_RATE;
    $.SCREEN_WIDTH = 400;
    $.SCREEN_HEIGHT = 240;
};

GINK.initCanvas = function ($) {
    $.canvas = document.getElementById('gink');
    $.ctx = $.canvas.getContext('2d');
    $.ctx.mozImageSmoothingEnabled = false;
    $.ctx.msImageSmoothingEnabled = false;
    $.ctx.imageSmoothingEnabled = false;
    $.ctx.scale(2, 2);
};

GINK.initGameLoop = function ($) {
    setInterval(function () {
       $.currentLevel.draw();
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
