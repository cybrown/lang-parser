var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Literal', function () {

    it ('should parse a number', function () {
        var ast = parser.parse('1;');
        assert.strictEqual(ast[0].expression.type, 'Literal');
        assert.strictEqual(ast[0].expression.value, '1');
    });
});
