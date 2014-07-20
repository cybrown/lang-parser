var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    // Member

    it ('should parse operator .', function () {
        var ast = parser.parse('1 . baz;');
        assert.strictEqual(ast.body[0].expression.type, 'MemberExpression');
        assert.strictEqual(ast.body[0].expression.property.type, 'Identifier');
    });

    it ('should parse operator []', function () {
        var ast = parser.parse('1 [baz];');
        assert.strictEqual(ast.body[0].expression.type, 'MemberExpression');
        assert.strictEqual(ast.body[0].expression.property.type, 'Identifier');
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
