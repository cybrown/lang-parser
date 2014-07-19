var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Identifier', function () {

    it ('should parse a symbol', function () {
        var l = parser.parse('foobar;');
        assert.strictEqual(l[0].type, 'Identifier');
        assert.strictEqual(l[0].name, 'foobar');
    });
});
