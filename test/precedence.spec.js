var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Precedence', function () {

    it ('* over +', function () {
        var l = parser.parse('1 * 2 + 3');
        assert.strictEqual(l.type, 'CallExpression');
        assert.strictEqual(l.arguments[0].arguments[0].value, '1');
        assert.strictEqual(l.arguments[0].arguments[1].value, '2');
        assert.strictEqual(l.arguments[1].value, '3');
    });

    it ('+ over => over ,', function () {
        var l = parser.parse('1, x => x + 2, 4');
        assert.strictEqual(Array.isArray(l), true);
        assert.strictEqual(l[0].value, '1');
        assert.strictEqual(l[2].value, '4');
        assert.strictEqual(l[1].type, 'LambdaExpression');
    });

    it ('UMINUS over -', function () {
        var l = parser.parse('-1 * -2');
        assert.strictEqual(l.type, 'CallExpression');
        assert.strictEqual(l.callee.name, '*');
        assert.strictEqual(l.arguments[0].type, 'CallExpression');
        assert.strictEqual(l.arguments[0].callee.name, '-');
        assert.strictEqual(l.arguments[1].type, 'CallExpression');
        assert.strictEqual(l.arguments[1].callee.name, '-');
    });
});
