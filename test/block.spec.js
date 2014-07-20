var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Block', function () {

    it ('should parse an empty block', function () {
        var ast = parser.parse('{}');
        assert.strictEqual(ast.body[0].type, 'BlockStatement')
        assert.strictEqual(ast.body[0].body.length, 0);
    });

    it ('should parse a block with one expression', function () {
        var ast = parser.parse('{ 1 + 3;}');
        assert.strictEqual(ast.body[0].type, 'BlockStatement')
        assert.strictEqual(ast.body[0].body.length, 1);
        assert.strictEqual(ast.body[0].body[0].type, 'ExpressionStatement');
    });

    it ('should parse a block with two expression;', function () {
        var ast = parser.parse('{ 1 + 3; 4-5;}');
        assert.strictEqual(ast.body[0].type, 'BlockStatement')
        assert.strictEqual(ast.body[0].body.length, 2);
        assert.strictEqual(ast.body[0].body[0].type, 'ExpressionStatement');
    });
});
