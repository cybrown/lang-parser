var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Lambda', function () {

    it ('should parse a lambda without arguments', function () {
        var l = parser.parse('() => (x + 1);');
        assert.strictEqual(l[0].type, 'LambdaExpression');
        assert.strictEqual(l[0].params.length, 0);
        assert.strictEqual(l[0].body.type, 'CallExpression');
    });

    it ('should parse a lambda with 1 argument without ()', function () {
        var l = parser.parse('x => (x + 1);');
        assert.strictEqual(l[0].type, 'LambdaExpression');
        assert.strictEqual(l[0].params.length, 1);
        assert.strictEqual(l[0].params[0].type, 'Identifier');
        assert.strictEqual(l[0].params[0].name, 'x');
        assert.strictEqual(l[0].body.type, 'CallExpression');
    });

    it ('should parse a lambda with 1 argument and ()', function () {
        var l = parser.parse('(x) => (x + 1);');
        assert.strictEqual(l[0].type, 'LambdaExpression');
        assert.strictEqual(l[0].params.length, 1);
        assert.strictEqual(l[0].params[0].type, 'Identifier');
        assert.strictEqual(l[0].params[0].name, 'x');
        assert.strictEqual(l[0].body.type, 'CallExpression');
    });

    it ('should not parse a lambda with 1 argument non identifier and ()', function () {
        assert.throws(function () {
            var l = parser.parse('(x + 1) => (x + 1);');
        },
        /Lambda arguments/);
    });

    it ('should parse a lambda with 2 arguments', function () {
        var l = parser.parse('(x, y) => (x + 1);');
        assert.strictEqual(l[0].type, 'LambdaExpression');
        assert.strictEqual(l[0].params.length, 2);
        assert.strictEqual(l[0].params[0].type, 'Identifier');
        assert.strictEqual(l[0].params[0].name, 'x');
        assert.strictEqual(l[0].params[1].type, 'Identifier');
        assert.strictEqual(l[0].params[1].name, 'y');
        assert.strictEqual(l[0].body.type, 'CallExpression');
    });
});
