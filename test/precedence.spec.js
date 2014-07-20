var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Precedence', function () {

    it ('* over +', function () {
        var ast = parser.parse('1 * 2 + 3;');
        assert.strictEqual(ast.body[0].expression.type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.left.left.value, '1');
        assert.strictEqual(ast.body[0].expression.left.right.value, '2');
        assert.strictEqual(ast.body[0].expression.right.value, '3');
    });

    it ('+ over =>', function () {
        var ast = parser.parse('x => x + 2;');
        assert.strictEqual(ast.body[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast.body[0].expression.body.type, 'BinaryExpression');
    });

    it ('UMINUS over -', function () {
        var ast = parser.parse('-1 * -2;');
        assert.strictEqual(ast.body[0].expression.type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.operator, '*');
        assert.strictEqual(ast.body[0].expression.left.type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.left.callee.name, '-');
        assert.strictEqual(ast.body[0].expression.right.type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.right.callee.name, '-');
    });
});
