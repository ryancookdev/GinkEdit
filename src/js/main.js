var GINK = GINK || {};

GINK.bootstrap = function ($) {
    $.SCREEN_WIDTH = 400;
    $.SCREEN_HEIGHT = 240;

    initContext();

    $.currentLevel = new $.Level(1);
    $.editorScreen = new $.EditorScreen($);
    $.editorScreen.setLevel($.currentLevel);
    $.playScreen = new $.PlayScreen($);
    $.playScreen.setLevel($.currentLevel);
    $.screen = $.editorScreen;
    $.screen.draw();

    $.toolBox = new $.ToolBox($);
    $.actionBar = new $.ActionBar($);

    $.actionBar.addSubscriber($.screen.actionBarChange);
    $.toolBox.addSubscriber($.screen.toolBoxChange);
    $.toolBox.addSubscriber($.actionBar.resetAction);
    $.actionBar.addSubscriber($.toolBox.handleActionChange);

    $.toolBox.init();
    $.actionBar.init();

    $.toolBox.setActiveTool(document.getElementById('player'));

    initKeyEventListener();

    function initContext () {
        $.canvasContext = document.getElementById('gink').getContext('2d');
        $.canvasContext.mozImageSmoothingEnabled = false;
        $.canvasContext.msImageSmoothingEnabled = false;
        $.canvasContext.imageSmoothingEnabled = false;
        $.canvasContext.scale(2, 2);
    }

    function initKeyEventListener () {
        $.keypressList = [];

        document.onkeydown = function (e) {
            e = (e ? e : window.event);
            addKeypress(e.keyCode);
            $.screen.keyEventListener();
        };

        document.onkeyup = function (e) {
            e = (e ? e : window.event);
            removeKeypress(e.keyCode);
        };

        function addKeypress (keyCode) {
            if ($.keypressList.indexOf(keyCode) === -1) {
                $.keypressList.push(keyCode);
            }
        }

        function removeKeypress (keyCode) {
            var keyPosition = $.keypressList.indexOf(keyCode);
            if (keyPosition !== -1) {
                $.keypressList.splice(keyPosition, 1);
            }
        };
    };

};

document.addEventListener('DOMContentLoaded', function(event) { 
    GINK.bootstrap(GINK);
});
