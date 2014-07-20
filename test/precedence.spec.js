var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Precedence', function () {

    it ('* over +', function () {
        var ast = parser.parse('1 * 2 + 3;');
        assert.strictEqual(ast.body[0].expression.type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.arguments[0].arguments[0].value, '1');
        assert.strictEqual(ast.body[0].expression.arguments[0].arguments[1].value, '2');
        assert.strictEqual(ast.body[0].expression.arguments[1].value, '3');
    });

    it ('+ over =>', function () {
        var ast = parser.parse('x => x + 2;');
        assert.strictEqual(ast.body[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast.body[0].expression.body.type, 'CallExpression');
    });

    it ('UMINUS over -', function () {
        var ast = parser.parse('-1 * -2;');
        assert.strictEqual(ast.body[0].expression.type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.name, '*');
        assert.strictEqual(ast.body[0].expression.arguments[0].type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.arguments[0].callee.name, '-');
        assert.strictEqual(ast.body[0].expression.arguments[1].type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.arguments[1].callee.name, '-');
    });
});
