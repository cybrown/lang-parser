var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Operator', function () {

    it ('should parse operator =', function () {
        var ast = parser.parse('baz = 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '=');
    });

    it ('should parse operator +=', function () {
        var ast = parser.parse('baz += 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '+=');
    });

    it ('should parse operator -=', function () {
        var ast = parser.parse('baz -= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '-=');
    });

    it ('should parse operator *=', function () {
        var ast = parser.parse('baz *= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '*=');
    });

    it ('should parse operator /=', function () {
        var ast = parser.parse('baz /= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '/=');
    });

    it ('should parse operator %=', function () {
        var ast = parser.parse('baz %= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '%=');
    });

    it ('should parse operator <<=', function () {
        var ast = parser.parse('baz <<= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '<<=');
    });

    it ('should parse operator >>=', function () {
        var ast = parser.parse('baz >>= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '>>=');
    });

    it ('should parse operator &=', function () {
        var ast = parser.parse('baz &= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '&=');
    });

    it ('should parse operator ^=', function () {
        var ast = parser.parse('baz ^= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '^=');
    });

    it ('should parse operator |=', function () {
        var ast = parser.parse('baz |= 1;');
        assert.strictEqual(ast.body[0].expression.type, 'AssignmentExpression');
        assert.strictEqual(ast.body[0].expression.operator, '|=');
    });
});
