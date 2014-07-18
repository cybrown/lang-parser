var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    it ('should parse operator +', function () {
        var l = parser.parse('1 + baz');
        assert.strictEqual(l.type, 'CallExpression');
        assert.strictEqual(l.callee.type, 'Identifier');
        assert.strictEqual(l.callee.name, '+');
        assert.strictEqual(l.arguments.length, 2);
        assert.strictEqual(l.arguments[0].type, 'Literal');
        assert.strictEqual(l.arguments[0].value, '1');
        assert.strictEqual(l.arguments[1].type, 'Identifier');
        assert.strictEqual(l.arguments[1].name, 'baz');
    });

    it ('should parse operator -', function () {
        var l = parser.parse('1 - baz');
        assert.strictEqual(l.callee.name, '-');
    });

    it ('should parse operator *', function () {
        var l = parser.parse('1 * baz');
        assert.strictEqual(l.callee.name, '*');
    });

    it ('should parse operator /', function () {
        var l = parser.parse('1 / baz');
        assert.strictEqual(l.callee.name, '/');
    });

    it ('should parse operator %', function () {
        var l = parser.parse('1 % baz');
        assert.strictEqual(l.callee.name, '%');
    });

    it ('should parse operator =', function () {
        var l = parser.parse('1 = baz');
        assert.strictEqual(l.callee.name, '=');
    });

    it ('should parse operator <', function () {
        var l = parser.parse('1 < baz');
        assert.strictEqual(l.callee.name, '<');
    });

    it ('should parse operator >', function () {
        var l = parser.parse('1 > baz');
        assert.strictEqual(l.callee.name, '>');
    });
});
