var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    it ('should parse operator +', function () {
        var l = parser.parse('1 + baz;');
        assert.strictEqual(l[0].type, 'CallExpression');
        assert.strictEqual(l[0].callee.type, 'Identifier');
        assert.strictEqual(l[0].callee.name, '+');
        assert.strictEqual(l[0].arguments.length, 2);
        assert.strictEqual(l[0].arguments[0].type, 'Literal');
        assert.strictEqual(l[0].arguments[0].value, '1');
        assert.strictEqual(l[0].arguments[1].type, 'Identifier');
        assert.strictEqual(l[0].arguments[1].name, 'baz');
    });

    it ('should parse operator -', function () {
        var l = parser.parse('1 - baz;');
        assert.strictEqual(l[0].callee.name, '-');
    });

    it ('should parse unary operator -', function () {
        var l = parser.parse('- baz;');
        assert.strictEqual(l[0].callee.name, '-');
    });

    it ('should parse operator *', function () {
        var l = parser.parse('1 * baz;');
        assert.strictEqual(l[0].callee.name, '*');
    });

    it ('should parse operator /', function () {
        var l = parser.parse('1 / baz;');
        assert.strictEqual(l[0].callee.name, '/');
    });

    it ('should parse operator %', function () {
        var l = parser.parse('1 % baz;');
        assert.strictEqual(l[0].callee.name, '%');
    });

    it ('should parse operator =', function () {
        var l = parser.parse('1 = baz;');
        assert.strictEqual(l[0].callee.name, '=');
    });

    it ('should parse operator <', function () {
        var l = parser.parse('1 < baz;');
        assert.strictEqual(l[0].callee.name, '<');
    });

    it ('should parse operator >', function () {
        var l = parser.parse('1 > baz;');
        assert.strictEqual(l[0].callee.name, '>');
    });
});
