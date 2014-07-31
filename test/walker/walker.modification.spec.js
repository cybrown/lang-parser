var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var types = require('../../lib/types');
var assert = require('assert');

describe ('Walker Modification', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk Program', function () {
        var counter = 0;
        var node = nodes.Program(
            [nodes.BinaryExpression(
                '+',
                nodes.Literal(2, types.PrimitiveType(32, false, false)),
                nodes.Literal(3, types.PrimitiveType(32, false, false))
            )]
        );
        walker.setDelegate({
            BinaryExpressionLeave: function (node) {
                return nodes.CallExpression(
                    nodes.Identifier('%add'),
                    [node.left, node.right]
                );
            },
            LiteralLeave: function (node) {
                return nodes.Literal(node.value + 1, node.type)
            }
        });
        walker.walk(node);
        assert.equal(node.body[0].$type, 'CallExpression');
        assert.equal(node.body[0].callee.name, '%add');
        assert.equal(node.body[0].arguments[0].$type, 'Literal');
        assert.equal(node.body[0].arguments[0].value, 3);
        assert.equal(node.body[0].arguments[1].$type, 'Literal');
        assert.equal(node.body[0].arguments[1].value, 4);
    });
});
