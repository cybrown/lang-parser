var assert = require('assert');
var parser = require('../../lib/parserw');
var types = require('../../lib/types');

describe ('Literal', function () {

    it ('should parse a signed integer', function () {
        var ast = parser.parse('1;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.type.$type, 'PrimitiveType');
        assert.strictEqual(ast.body[0].expression.type.size, 32);
        assert.strictEqual(ast.body[0].expression.type.float, false);
        assert.strictEqual(ast.body[0].expression.type.unsigned, false);
        assert.strictEqual(ast.body[0].expression.value, '1');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.14;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.type.$type, 'PrimitiveType');
        assert.strictEqual(ast.body[0].expression.type.size, 64);
        assert.strictEqual(ast.body[0].expression.type.float, true);
        assert.strictEqual(ast.body[0].expression.type.unsigned, false);
        assert.strictEqual(ast.body[0].expression.value, '3.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('.14;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.type.$type, 'PrimitiveType');
        assert.strictEqual(ast.body[0].expression.type.size, 64);
        assert.strictEqual(ast.body[0].expression.type.float, true);
        assert.strictEqual(ast.body[0].expression.type.unsigned, false);
        assert.strictEqual(ast.body[0].expression.value, '.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.type.$type, 'PrimitiveType');
        assert.strictEqual(ast.body[0].expression.type.size, 64);
        assert.strictEqual(ast.body[0].expression.type.float, true);
        assert.strictEqual(ast.body[0].expression.type.unsigned, false);
        assert.strictEqual(ast.body[0].expression.value, '3.');
    });
});
