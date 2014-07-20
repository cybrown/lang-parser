var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Lambda', function () {

    it ('should parse a lambda without arguments', function () {
        var ast = parser.parse('() => (x + 1);');
        assert.strictEqual(ast[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast[0].expression.params.length, 0);
        assert.strictEqual(ast[0].expression.body.type, 'CallExpression');
    });

    it ('should parse a lambda with 1 argument without ()', function () {
        var ast = parser.parse('x => (x + 1);');
        assert.strictEqual(ast[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast[0].expression.params.length, 1);
        assert.strictEqual(ast[0].expression.params[0].type, 'Identifier');
        assert.strictEqual(ast[0].expression.params[0].name, 'x');
        assert.strictEqual(ast[0].expression.body.type, 'CallExpression');
    });

    it ('should parse a lambda with 1 argument and ()', function () {
        var ast = parser.parse('(x) => (x + 1);');
        assert.strictEqual(ast[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast[0].expression.params.length, 1);
        assert.strictEqual(ast[0].expression.params[0].type, 'Identifier');
        assert.strictEqual(ast[0].expression.params[0].name, 'x');
        assert.strictEqual(ast[0].expression.body.type, 'CallExpression');
    });

    it ('should not parse a lambda with 1 argument non identifier and ()', function () {
        assert.throws(function () {
            var ast = parser.parse('(x + 1) => (x + 1);');
        },
        /Lambda arguments/);
    });

    it ('should parse a lambda with 2 arguments', function () {
        var ast = parser.parse('(x, y) => (x + 1);');
        assert.strictEqual(ast[0].expression.type, 'LambdaExpression');
        assert.strictEqual(ast[0].expression.params.length, 2);
        assert.strictEqual(ast[0].expression.params[0].type, 'Identifier');
        assert.strictEqual(ast[0].expression.params[0].name, 'x');
        assert.strictEqual(ast[0].expression.params[1].type, 'Identifier');
        assert.strictEqual(ast[0].expression.params[1].name, 'y');
        assert.strictEqual(ast[0].expression.body.type, 'CallExpression');
    });
});
