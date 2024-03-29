var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Bracket', function () {

    it ('should an empty list 1', function () {
        var ast = parser.parse('[];');
        assert.strictEqual(ast.body[0].expression.$type, 'BracketExpression')
        assert.strictEqual(ast.body[0].expression.items.length, 0);
    });

    it ('should an empty list 2', function () {
        var ast = parser.parse('[ \n  ];');
        assert.strictEqual(ast.body[0].expression.$type, 'BracketExpression')
        assert.strictEqual(ast.body[0].expression.items.length, 0);
    });

    it ('should parse an list with 1 element', function () {
        var ast = parser.parse('[1];');
        assert.strictEqual(ast.body[0].expression.$type, 'BracketExpression')
        assert.strictEqual(ast.body[0].expression.items.length, 1);
        assert.strictEqual(ast.body[0].expression.items[0].$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.items[0].raw, '1');
    });

    it ('should parse an list with 3 elements', function () {
        var ast = parser.parse('[1, 2, foo];');
        assert.strictEqual(ast.body[0].expression.$type, 'BracketExpression')
        assert.strictEqual(ast.body[0].expression.items.length, 3);
        assert.strictEqual(ast.body[0].expression.items[0].$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.items[0].raw, '1');
        assert.strictEqual(ast.body[0].expression.items[1].$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.items[1].raw, '2');
        assert.strictEqual(ast.body[0].expression.items[2].$type, 'Identifier');
        assert.strictEqual(ast.body[0].expression.items[2].name, 'foo');
    });

    it ('should parse an list within an list', function () {
        var ast = parser.parse('[1, [4, 5], 3];');
        assert.strictEqual(ast.body[0].expression.$type, 'BracketExpression')
        assert.strictEqual(ast.body[0].expression.items.length, 3);
        assert.strictEqual(ast.body[0].expression.items[1].$type, 'BracketExpression');
        assert.strictEqual(ast.body[0].expression.items[0].$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.items[0].raw, '1');
        assert.strictEqual(ast.body[0].expression.items[1].items.length, 2);
        assert.strictEqual(ast.body[0].expression.items[1].items[0].raw, '4');
        assert.strictEqual(ast.body[0].expression.items[1].items[1].raw, '5');
        assert.strictEqual(ast.body[0].expression.items[2].$type, 'Literal');
        assert.strictEqual(ast.body[0].expression.items[2].raw, '3');
    });
});
