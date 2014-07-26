var assert = require('assert');
var parser = require('../../lib/parserw');
var kinds = require('../../lib/kinds');

describe ('Literal', function () {

    it ('should parse a signed integer', function () {
        var ast = parser.parse('1;');
        assert.strictEqual(ast.body[0].expression.type, 'Literal');
        assert.strictEqual(ast.body[0].expression.kind, kinds.SIGNED_INTEGER);
        assert.strictEqual(ast.body[0].expression.value, '1');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.14;');
        assert.strictEqual(ast.body[0].expression.type, 'Literal');
        assert.strictEqual(ast.body[0].expression.kind, kinds.DOUBLE);
        assert.strictEqual(ast.body[0].expression.value, '3.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('.14;');
        assert.strictEqual(ast.body[0].expression.type, 'Literal');
        assert.strictEqual(ast.body[0].expression.kind, kinds.DOUBLE);
        assert.strictEqual(ast.body[0].expression.value, '.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.;');
        assert.strictEqual(ast.body[0].expression.type, 'Literal');
        assert.strictEqual(ast.body[0].expression.kind, kinds.DOUBLE);
        assert.strictEqual(ast.body[0].expression.value, '3.');
    });
});
