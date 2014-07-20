var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    it ('should parse operator +', function () {
        var ast = parser.parse('1 + baz;');
        assert.strictEqual(ast[0].expression.type, 'CallExpression');
        assert.strictEqual(ast[0].expression.callee.type, 'Identifier');
        assert.strictEqual(ast[0].expression.callee.name, '+');
        assert.strictEqual(ast[0].expression.arguments.length, 2);
        assert.strictEqual(ast[0].expression.arguments[0].type, 'Literal');
        assert.strictEqual(ast[0].expression.arguments[0].value, '1');
        assert.strictEqual(ast[0].expression.arguments[1].type, 'Identifier');
        assert.strictEqual(ast[0].expression.arguments[1].name, 'baz');
    });

    it ('should parse operator -', function () {
        var ast = parser.parse('1 - baz;');
        assert.strictEqual(ast[0].expression.callee.name, '-');
    });

    it ('should parse unary operator -', function () {
        var ast = parser.parse('- baz;');
        assert.strictEqual(ast[0].expression.callee.name, '-');
    });

    it ('should parse operator *', function () {
        var ast = parser.parse('1 * baz;');
        assert.strictEqual(ast[0].expression.callee.name, '*');
    });

    it ('should parse operator /', function () {
        var ast = parser.parse('1 / baz;');
        assert.strictEqual(ast[0].expression.callee.name, '/');
    });

    it ('should parse operator %', function () {
        var ast = parser.parse('1 % baz;');
        assert.strictEqual(ast[0].expression.callee.name, '%');
    });

    it ('should parse operator =', function () {
        var ast = parser.parse('1 = baz;');
        assert.strictEqual(ast[0].expression.callee.name, '=');
    });

    it ('should parse operator <', function () {
        var ast = parser.parse('1 < baz;');
        assert.strictEqual(ast[0].expression.callee.name, '<');
    });

    it ('should parse operator >', function () {
        var ast = parser.parse('1 > baz;');
        assert.strictEqual(ast[0].expression.callee.name, '>');
    });

    it ('should parse operator ? :', function () {
        var ast = parser.parse('1 + 3 ? 4 : 5;');
        assert.strictEqual(ast[0].expression.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].expression.test.type, 'CallExpression');
        assert.strictEqual(ast[0].expression.consequent.type, 'Literal');
        assert.strictEqual(ast[0].expression.alternate.type, 'Literal');
    });

    it ('should parse operator ? : twice 1', function () {
        var ast = parser.parse('a ? b ? d : e : c;');
        assert.strictEqual(ast[0].expression.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].expression.test.type, 'Identifier');
        assert.strictEqual(ast[0].expression.test.name, 'a');
        assert.strictEqual(ast[0].expression.consequent.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].expression.consequent.test.name, 'b');
        assert.strictEqual(ast[0].expression.consequent.consequent.name, 'd');
        assert.strictEqual(ast[0].expression.consequent.alternate.name, 'e');
        assert.strictEqual(ast[0].expression.alternate.type, 'Identifier');
        assert.strictEqual(ast[0].expression.alternate.name, 'c');
    });

    it ('should parse operator ? : twice 2', function () {
        var ast = parser.parse('a ? b : c ? d : e;');
        assert.strictEqual(ast[0].expression.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].expression.test.type, 'Identifier');
        assert.strictEqual(ast[0].expression.test.name, 'a');
        assert.strictEqual(ast[0].expression.consequent.type, 'Identifier');
        assert.strictEqual(ast[0].expression.consequent.name, 'b');
        assert.strictEqual(ast[0].expression.alternate.type, 'ConditionalExpression');
        assert.strictEqual(ast[0].expression.alternate.test.name, 'c');
        assert.strictEqual(ast[0].expression.alternate.consequent.name, 'd');
        assert.strictEqual(ast[0].expression.alternate.alternate.name, 'e');
    });
});
