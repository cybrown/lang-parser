var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Bracket', function () {

    it ('should an empty list 1', function () {
        var l = parser.parse('[];');
        assert.strictEqual(l[0].type, 'BracketExpression')
        assert.strictEqual(l[0].items.length, 0);
    });

    it ('should an empty list 2', function () {
        var l = parser.parse('[ \n  ];');
        assert.strictEqual(l[0].type, 'BracketExpression')
        assert.strictEqual(l[0].items.length, 0);
    });

    it ('should parse an list with 1 element', function () {
        var l = parser.parse('[1];');
        assert.strictEqual(l[0].type, 'BracketExpression')
        assert.strictEqual(l[0].items.length, 1);
        assert.strictEqual(l[0].items[0].type, 'Literal');
        assert.strictEqual(l[0].items[0].value, '1');
    });

    it ('should parse an list with 3 elements', function () {
        var l = parser.parse('[1, 2, foo];');
        assert.strictEqual(l[0].type, 'BracketExpression')
        assert.strictEqual(l[0].items.length, 3);
        assert.strictEqual(l[0].items[0].type, 'Literal');
        assert.strictEqual(l[0].items[0].value, '1');
        assert.strictEqual(l[0].items[1].type, 'Literal');
        assert.strictEqual(l[0].items[1].value, '2');
        assert.strictEqual(l[0].items[2].type, 'Identifier');
        assert.strictEqual(l[0].items[2].name, 'foo');
    });

    it ('should parse an list within an list', function () {
        var l = parser.parse('[1, [4, 5], 3];');
        assert.strictEqual(l[0].type, 'BracketExpression')
        assert.strictEqual(l[0].items.length, 3);
        assert.strictEqual(l[0].items[1].type, 'BracketExpression');
        assert.strictEqual(l[0].items[0].type, 'Literal');
        assert.strictEqual(l[0].items[0].value, '1');
        assert.strictEqual(l[0].items[1].items.length, 2);
        assert.strictEqual(l[0].items[1].items[0].value, '4');
        assert.strictEqual(l[0].items[1].items[1].value, '5');
        assert.strictEqual(l[0].items[2].type, 'Literal');
        assert.strictEqual(l[0].items[2].value, '3');
    });
});
