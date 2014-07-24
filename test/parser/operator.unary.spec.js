var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Operator Unary', function () {

    it ('should be right associative', function () {
        var ast = parser.parse('+-baz;');
        assert.strictEqual(ast.body[0].expression.operator, '+');
        assert.strictEqual(ast.body[0].expression.argument.operator, '-');
        assert.strictEqual(ast.body[0].expression.argument.argument.name, 'baz');
    });

    it ('should parse unary operator +', function () {
        var ast = parser.parse('+baz;');
        assert.strictEqual(ast.body[0].expression.operator, '+');
        assert.strictEqual(ast.body[0].expression.argument.name, 'baz');
    });

    it ('should parse unary operator -', function () {
        var ast = parser.parse('- baz;');
        assert.strictEqual(ast.body[0].expression.operator, '-');
    });

    it ('should parse unary operator !', function () {
        var ast = parser.parse('! baz;');
        assert.strictEqual(ast.body[0].expression.operator, '!');
    });

    it ('should parse unary operator ~', function () {
        var ast = parser.parse('~ baz;');
        assert.strictEqual(ast.body[0].expression.operator, '~');
    });

    it ('should parse unary operator ++', function () {
        var ast = parser.parse('++baz;');
        assert.strictEqual(ast.body[0].expression.operator, '++');
    });

    it ('should parse unary operator --', function () {
        var ast = parser.parse('--baz;');
        assert.strictEqual(ast.body[0].expression.operator, '--');
    });

    it ('should parse unary operator ++', function () {
        var ast = parser.parse('baz++;');
        assert.strictEqual(ast.body[0].expression.operator, '++');
    });

    it ('should parse unary operator --', function () {
        var ast = parser.parse('baz--;');
        assert.strictEqual(ast.body[0].expression.operator, '--');
    });

    it ('should parse unary operator --', function () {
        var ast = parser.parse('--baz++;');
        assert.strictEqual(ast.body[0].expression.operator, '--');
        assert.strictEqual(ast.body[0].expression.argument.operator, '++');
        assert.strictEqual(ast.body[0].expression.argument.argument.name, 'baz');
    });
});
