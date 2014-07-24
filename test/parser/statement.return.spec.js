var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Return', function () {

    it ('should parse a void return', function () {
        var ast = parser.parse('return ;');
        assert.strictEqual(ast.body[0].type, 'ReturnStatement')
        assert.strictEqual(ast.body[0].argument, null);
    });

    it ('should parse a return with expression', function () {
        var ast = parser.parse('return 1 + 3;');
        assert.strictEqual(ast.body[0].type, 'ReturnStatement')
        assert.strictEqual(ast.body[0].argument.type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].argument.operator, '+');
    });
});
