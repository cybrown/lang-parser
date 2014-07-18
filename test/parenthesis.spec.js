var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Parenthesis', function () {

    it ('should parse expression', function () {
        var l = parser.parse('1 + (2 + 3)');
        assert.strictEqual(l.type, 'CallExpression')
        assert.strictEqual(l.arguments[0].value, '1');
        assert.strictEqual(l.arguments[1].arguments[0].value, '2');
        assert.strictEqual(l.arguments[1].arguments[1].value, '3');
    });

    it ('should change precedence 1', function () {
        var l = parser.parse('1 * (2 + 3)');
        assert.strictEqual(l.type, 'CallExpression')
        assert.strictEqual(l.arguments[0].value, '1');
        assert.strictEqual(l.arguments[1].arguments[0].value, '2');
        assert.strictEqual(l.arguments[1].arguments[1].value, '3');
    });
});
