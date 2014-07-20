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
        assert.strictEqual(ast[0].consequent.type, 'Literal');
        assert.strictEqual(ast[0].alternate.type, 'Literal');
    });

    it ('should parse operator ? : twice 1', function () {
        var ast = parser.parse('a ? b ? d : e : c;');
        assert.strictEqual(ast[0].type, 'ConditionalExpression');
        assert.strictEqual(ast[0].test.type, 'Identifier');
        assert.strictEqual(ast[0].test.name, 'a');
        assert.strictEqual(ast[0].consequent.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].consequent.test.name, 'b');
        assert.strictEqual(ast[0].consequent.consequent.name, 'd');
        assert.strictEqual(ast[0].consequent.alternate.name, 'e');
        assert.strictEqual(ast[0].alternate.type, 'Identifier');
        assert.strictEqual(ast[0].alternate.name, 'c');
    });

    it ('should parse operator ? : twice 2', function () {
        var ast = parser.parse('a ? b : c ? d : e;');
        assert.strictEqual(ast[0].type, 'ConditionalExpression');
        assert.strictEqual(ast[0].test.type, 'Identifier');
        assert.strictEqual(ast[0].test.name, 'a');
        assert.strictEqual(ast[0].consequent.type, 'Identifier');
        assert.strictEqual(ast[0].consequent.name, 'b');
        assert.strictEqual(ast[0].alternate.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].alternate.test.name, 'c');
        assert.strictEqual(ast[0].alternate.consequent.name, 'd');
        assert.strictEqual(ast[0].alternate.alternate.name, 'e');
    });
});
