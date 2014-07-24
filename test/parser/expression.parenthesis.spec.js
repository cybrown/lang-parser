var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Parenthesis', function () {

    it ('should parse expression', function () {
        var ast = parser.parse('1 + (2 + 3);');
        assert.strictEqual(ast.body[0].expression.type, 'BinaryExpression')
        assert.strictEqual(ast.body[0].expression.left.value, '1');
        assert.strictEqual(ast.body[0].expression.right.left.value, '2');
        assert.strictEqual(ast.body[0].expression.right.right.value, '3');
    });

    it ('should change precedence 1', function () {
        var ast = parser.parse('1 * (2 + 3);');
        assert.strictEqual(ast.body[0].expression.type, 'BinaryExpression')
        assert.strictEqual(ast.body[0].expression.left.value, '1');
        assert.strictEqual(ast.body[0].expression.right.left.value, '2');
        assert.strictEqual(ast.body[0].expression.right.right.value, '3');
    });
});
