var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Block', function () {

    it ('should parse an empty block', function () {
        var l = parser.parse('{}');
        assert.strictEqual(l.type, 'BlockExpression')
        assert.strictEqual(l.body.length, 0);
    });

    it ('should parse a block with one expression', function () {
        var l = parser.parse('{ 1 + 3 }');
        assert.strictEqual(l.type, 'BlockExpression')
        assert.strictEqual(l.body.length, 1);
        assert.strictEqual(l.body[0].type, 'CallExpression');
    });
});
