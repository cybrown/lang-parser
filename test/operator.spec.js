var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    it ('should parse operator +', function () {
        var ast = parser.parse('1 + baz;');
        assert.strictEqual(ast[0].type, 'CallExpression');
        assert.strictEqual(ast[0].callee.type, 'Identifier');
        assert.strictEqual(ast[0].callee.name, '+');
        assert.strictEqual(ast[0].arguments.length, 2);
        assert.strictEqual(ast[0].arguments[0].type, 'Literal');
        assert.strictEqual(ast[0].arguments[0].value, '1');
        assert.strictEqual(ast[0].arguments[1].type, 'Identifier');
        assert.strictEqual(ast[0].arguments[1].name, 'baz');
    });

    it ('should parse operator -', function () {
        var ast = parser.parse('1 - baz;');
        assert.strictEqual(ast[0].callee.name, '-');
    });

    it ('should parse unary operator -', function () {
        var ast = parser.parse('- baz;');
        assert.strictEqual(ast[0].callee.name, '-');
    });

    it ('should parse operator *', function () {
        var ast = parser.parse('1 * baz;');
        assert.strictEqual(ast[0].callee.name, '*');
    });

    it ('should parse operator /', function () {
        var ast = parser.parse('1 / baz;');
        assert.strictEqual(ast[0].callee.name, '/');
    });

    it ('should parse operator %', function () {
        var ast = parser.parse('1 % baz;');
        assert.strictEqual(ast[0].callee.name, '%');
    });

    it ('should parse operator =', function () {
        var ast = parser.parse('1 = baz;');
        assert.strictEqual(ast[0].callee.name, '=');
    });

    it ('should parse operator <', function () {
        var ast = parser.parse('1 < baz;');
        assert.strictEqual(ast[0].callee.name, '<');
    });

    it ('should parse operator >', function () {
        var ast = parser.parse('1 > baz;');
        assert.strictEqual(ast[0].callee.name, '>');
    });

    it ('should parse operator ? :', function () {
        var ast = parser.parse('1 + 3 ? 4 : 5;');
        assert.strictEqual(ast[0].type, 'ConditionalExpression');
        assert.strictEqual(ast[0].test.type, 'CallExpression');
        assert.strictEqual(ast[0].alternate.type, 'Literal');
        assert.strictEqual(ast[0].consequent.type, 'Literal');
    });

    it ('should parse operator ? : twice', function () {
        var ast = parser.parse('1 + 3 ? 4 : 5;');
        assert.strictEqual(ast[0].type, 'ConditionalExpression');
        assert.strictEqual(ast[0].test.type, 'CallExpression');
        assert.strictEqual(ast[0].alternate.type, 'Literal');
        assert.strictEqual(ast[0].consequent.type, 'Literal');
    });
});
