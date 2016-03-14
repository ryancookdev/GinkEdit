var GINK = GINK || {};

QUnit.module('ToolBox');

QUnit.test('Create toolbox and set current tool', function (assert) {
    var toolBox = new GINK.ToolBox(),
        tools = [{onclick: null}],
        event = {target: {id: 'testtool'}};

    toolBox.init(tools);
    assert.equal(typeof tools[0].onclick, 'function', 'Tools have been assigned a function');

    tools[0].onclick(event);
    assert.equal(toolBox.getCurrentTool(), 'testtool', 'Current tool has been set');
});
