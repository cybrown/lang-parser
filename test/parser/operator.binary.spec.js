var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Operator Binary', function () {

    // Member

    it ('should parse operator .', function () {
        var ast = parser.parse('1 . baz;');
        assert.strictEqual(ast.body[0].expression.$type, 'MemberExpression');
        assert.strictEqual(ast.body[0].expression.property, 'baz');
    });

    it ('should parse operator []', function () {
        var ast = parser.parse('baz [1];');
        assert.strictEqual(ast.body[0].expression.$type, 'SubscriptExpression');
        assert.strictEqual(ast.body[0].expression.index.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.object.$type, 'Identifier');
    });

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

    it ('should parse operator &&', function () {
        var ast = parser.parse('1 && baz;');
        assert.strictEqual(ast.body[0].expression.operator, '&&');
    });

    it ('should parse operator ||', function () {
        var ast = parser.parse('1 || baz;');
        assert.strictEqual(ast.body[0].expression.operator, '||');
    });

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
