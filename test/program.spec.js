var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Program', function () {

    it ('should parse one statement program', function () {
        var l = parser.parse('1+2;');
        assert.strictEqual(Array.isArray(l), true);
        assert.strictEqual(l.length, 1);
    });

    it ('should parse two statements program', function () {
        var l = parser.parse('1+2; 4-5;');
        assert.strictEqual(Array.isArray(l), true);
        assert.strictEqual(l.length, 2);
    });
});
