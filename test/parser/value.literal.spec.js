var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Literal', function () {

    it ('should parse true', function () {
        var ast = parser.parse('true;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, 'true');
    });

    it ('should parse false', function () {
        var ast = parser.parse('false;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, 'false');
    });

    it ('should parse a signed integer', function () {
        var ast = parser.parse('1;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, '1');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.14;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, '3.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('.14;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, '.14');
    });

    it ('should parse a double', function () {
        var ast = parser.parse('3.;');
        assert.strictEqual(ast.body[0].expression.$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.raw, '3.');
    });
});
