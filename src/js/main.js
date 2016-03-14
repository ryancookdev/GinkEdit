var GINK = GINK || {};

GINK.bootstrap = function ($) {
    $.keyReader = new $.KeyReader();
    $.currentLevel = new $.Level(1);
    $.initGlobals($);
    $.initActionBar($);
    $.initToolBox($);
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

GINK.initToolBox = function ($) {
    var i,
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

GINK.initActionBar = function ($) {
    var i,
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
