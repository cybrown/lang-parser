var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Lambda', function () {

    it ('should parse a lambda without arguments', function () {
        var l = parser.parse('() => x + 1');
        assert.strictEqual(l.type, 'LambdaExpression');
        assert.strictEqual(l.params.length, 0);
        assert.strictEqual(l.body.type, 'CallExpression');
    });

    it ('should parse a lambda with one argument without ()', function () {
        var l = parser.parse('x => x + 1');
        assert.strictEqual(l.type, 'LambdaExpression');
        assert.strictEqual(l.params.length, 1);
        assert.strictEqual(l.params[0].type, 'Identifier');
        assert.strictEqual(l.params[0].name, 'x');
        assert.strictEqual(l.body.type, 'CallExpression');
    });

    it ('should parse a lambda with 1 argument and ()', function () {
        var l = parser.parse('(x) => x + 1');
        assert.strictEqual(l.type, 'LambdaExpression');
        assert.strictEqual(l.params.length, 1);
        assert.strictEqual(l.params[0].type, 'Identifier');
        assert.strictEqual(l.params[0].name, 'x');
        assert.strictEqual(l.body.type, 'CallExpression');
    });

    it ('should parse a lambda with 2 arguments', function () {
        var l = parser.parse('(x, y) => x + 1');
        assert.strictEqual(l.type, 'LambdaExpression');
        assert.strictEqual(l.params.length, 2);
        assert.strictEqual(l.params[0].type, 'Identifier');
        assert.strictEqual(l.params[0].name, 'x');
        assert.strictEqual(l.params[1].type, 'Identifier');
        assert.strictEqual(l.params[1].name, 'y');
        assert.strictEqual(l.body.type, 'CallExpression');
    });
});
