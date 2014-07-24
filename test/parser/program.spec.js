var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Program', function () {

    it ('should parse one statement program', function () {
        var ast = parser.parse('1+2;');
        assert.strictEqual(ast.type, 'Program');
        assert.strictEqual(Array.isArray(ast.body), true);
        assert.strictEqual(ast.body.length, 1);
    });

    it ('should parse two statements program', function () {
        var ast = parser.parse('1+2; 4-5;');
        assert.strictEqual(ast.type, 'Program');
        assert.strictEqual(Array.isArray(ast.body), true);
        assert.strictEqual(ast.body.length, 2);
    });
});
