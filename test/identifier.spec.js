var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Identifier', function () {

    it ('should parse a symbol', function () {
        var l = parser.parse('foobar');
        assert.strictEqual(l.type, 'Identifier');
        assert.strictEqual(l.name, 'foobar');
    });
});
