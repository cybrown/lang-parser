var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Identifier', function () {

    it ('should parse a symbol', function () {
        var ast = parser.parse('foobar;');
        assert.strictEqual(ast[0].expression.type, 'Identifier');
        assert.strictEqual(ast[0].expression.name, 'foobar');
    });
});
