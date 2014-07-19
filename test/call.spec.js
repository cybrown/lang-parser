var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Call', function () {

    it ('should parse an empty call', function () {
        var l = parser.parse('foo();');
        assert.strictEqual(l[0].type, 'CallExpression');
        assert.strictEqual(l[0].callee.type, 'Identifier');
        assert.strictEqual(l[0].callee.name, 'foo');
        assert.strictEqual(l[0].arguments.length, 0);
    });

    it ('should parse a call with an argument', function () {
        var l = parser.parse('foo(4);');
        assert.strictEqual(l[0].type, 'CallExpression');
        assert.strictEqual(l[0].callee.type, 'Identifier');
        assert.strictEqual(l[0].callee.name, 'foo');
        assert.strictEqual(l[0].arguments.length, 1);
    });

    it ('should parse a call with 3 arguments', function () {
        var l = parser.parse('foo(1, 2, 3);');
        assert.strictEqual(l[0].type, 'CallExpression');
        assert.strictEqual(l[0].callee.type, 'Identifier');
        assert.strictEqual(l[0].callee.name, 'foo');
        assert.strictEqual(l[0].arguments.length, 3);
    });
});
