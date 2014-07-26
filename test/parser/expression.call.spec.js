var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Call', function () {

    it ('should parse an empty call', function () {
        var ast = parser.parse('foo();');
        assert.strictEqual(ast.body[0].expression.$type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.$type, 'Identifier');
        assert.strictEqual(ast.body[0].expression.callee.name, 'foo');
        assert.strictEqual(ast.body[0].expression.arguments.length, 0);
    });

    it ('should parse an empty call from expression', function () {
        var ast = parser.parse('(1+5)();');
        assert.strictEqual(ast.body[0].expression.$type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.callee.operator, '+');
        assert.strictEqual(ast.body[0].expression.arguments.length, 0);
    });

    it ('should parse an immediatly called lambda', function () {
        var ast = parser.parse('(x => x + 1)(1);');
        assert.strictEqual(ast.body[0].expression.$type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.$type, 'LambdaExpression');
        assert.strictEqual(ast.body[0].expression.arguments.length, 1);
    });

    it ('should parse a call with an argument', function () {
        var ast = parser.parse('foo(4);');
        assert.strictEqual(ast.body[0].expression.$type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.$type, 'Identifier');
        assert.strictEqual(ast.body[0].expression.callee.name, 'foo');
        assert.strictEqual(ast.body[0].expression.arguments.length, 1);
    });

    it ('should parse a call with 3 arguments', function () {
        var ast = parser.parse('foo(1, 2, 3);');
        assert.strictEqual(ast.body[0].expression.$type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.$type, 'Identifier');
        assert.strictEqual(ast.body[0].expression.callee.name, 'foo');
        assert.strictEqual(ast.body[0].expression.arguments.length, 3);
    });
});
