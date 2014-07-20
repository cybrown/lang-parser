var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    // Arithmetic

    it ('should parse operator +', function () {
        var ast = parser.parse('1 + baz;');
        assert.strictEqual(ast.body[0].expression.operator, '+');
    });

    it ('should parse operator -', function () {
        var ast = parser.parse('1 - baz;');
        assert.strictEqual(ast.body[0].expression.operator, '-');
    });

    it ('should parse operator *', function () {
        var ast = parser.parse('1 * baz;');
        assert.strictEqual(ast.body[0].expression.operator, '*');
    });

    it ('should parse operator /', function () {
        var ast = parser.parse('1 / baz;');
        assert.strictEqual(ast.body[0].expression.operator, '/');
    });

    it ('should parse operator %', function () {
        var ast = parser.parse('1 % baz;');
        assert.strictEqual(ast.body[0].expression.operator, '%');
    });

    // Logical

    // Bitwise

    it ('should parse operator &', function () {
        var ast = parser.parse('1 & baz;');
        assert.strictEqual(ast.body[0].expression.operator, '&');
    });

    it ('should parse operator |', function () {
        var ast = parser.parse('1 | baz;');
        assert.strictEqual(ast.body[0].expression.operator, '|');
    });

    it ('should parse operator ^', function () {
        var ast = parser.parse('1 ^ baz;');
        assert.strictEqual(ast.body[0].expression.operator, '^');
    });

    it ('should parse operator <<', function () {
        var ast = parser.parse('1 << baz;');
        assert.strictEqual(ast.body[0].expression.operator, '<<');
    });

    it ('should parse operator >>', function () {
        var ast = parser.parse('1 >> baz;');
        assert.strictEqual(ast.body[0].expression.operator, '>>');
    });

    // Comparison

    it ('should parse operator ==', function () {
        var ast = parser.parse('1 == baz;');
        assert.strictEqual(ast.body[0].expression.operator, '==');
    });

    it ('should parse operator !=', function () {
        var ast = parser.parse('1 != baz;');
        assert.strictEqual(ast.body[0].expression.operator, '!=');
    });

    it ('should parse operator <', function () {
        var ast = parser.parse('1 < baz;');
        assert.strictEqual(ast.body[0].expression.operator, '<');
    });

    it ('should parse operator >', function () {
        var ast = parser.parse('1 > baz;');
        assert.strictEqual(ast.body[0].expression.operator, '>');
    });

    it ('should parse operator <=', function () {
        var ast = parser.parse('1 <= baz;');
        assert.strictEqual(ast.body[0].expression.operator, '<=');
    });

    it ('should parse operator >=', function () {
        var ast = parser.parse('1 >= baz;');
        assert.strictEqual(ast.body[0].expression.operator, '>=');
    });
});
