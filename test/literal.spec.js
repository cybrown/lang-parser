var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Literal', function () {

    it ('should parse a number', function () {
        var l = parser.parse('1;');
        assert.strictEqual(l[0].type, 'Literal');
        assert.strictEqual(l[0].value, '1');
    });
});
