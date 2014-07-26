var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Variable Declaration', function () {

    it ('should parse a variable declaration with type', function () {
        var ast = parser.parse('var foobar: int;');
        assert.strictEqual(ast.body[0].$type, 'VariableDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type.name, 'int');
        assert.strictEqual(ast.body[0].init, null);
    });

    it ('should parse a variable declaration with init', function () {
        var ast = parser.parse('var foobar = 0;');
        assert.strictEqual(ast.body[0].$type, 'VariableDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type, null);
        assert.strictEqual(ast.body[0].init.$type, 'Literal');
    });

    it ('should parse a variable declaration with type and init', function () {
        var ast = parser.parse('var foobar: int = 0;');
        assert.strictEqual(ast.body[0].$type, 'VariableDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type.name, 'int');
        assert.strictEqual(ast.body[0].init.$type, 'Literal');
    });

    it ('should parse a constant declaration with type', function () {
        var ast = parser.parse('let foobar: int;');
        assert.strictEqual(ast.body[0].$type, 'ConstantDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type.name, 'int');
        assert.strictEqual(ast.body[0].init, null);
    });

    it ('should parse a constant declaration with init', function () {
        var ast = parser.parse('let foobar = 0;');
        assert.strictEqual(ast.body[0].$type, 'ConstantDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type, null);
        assert.strictEqual(ast.body[0].init.$type, 'Literal');
    });

    it ('should parse a constant declaration with type and init', function () {
        var ast = parser.parse('let foobar: int = 0;');
        assert.strictEqual(ast.body[0].$type, 'ConstantDeclaration');
        assert.strictEqual(ast.body[0].name, 'foobar');
        assert.strictEqual(ast.body[0].type.name, 'int');
        assert.strictEqual(ast.body[0].init.$type, 'Literal');
    });
});
