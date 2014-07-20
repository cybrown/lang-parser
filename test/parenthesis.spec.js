var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Parenthesis', function () {

    it ('should parse expression', function () {
        var ast = parser.parse('1 + (2 + 3);');
        assert.strictEqual(ast[0].expression.type, 'CallExpression')
        assert.strictEqual(ast[0].expression.arguments[0].value, '1');
        assert.strictEqual(ast[0].expression.arguments[1].arguments[0].value, '2');
        assert.strictEqual(ast[0].expression.arguments[1].arguments[1].value, '3');
    });

    it ('should change precedence 1', function () {
        var ast = parser.parse('1 * (2 + 3);');
        assert.strictEqual(ast[0].expression.type, 'CallExpression')
        assert.strictEqual(ast[0].expression.arguments[0].value, '1');
        assert.strictEqual(ast[0].expression.arguments[1].arguments[0].value, '2');
        assert.strictEqual(ast[0].expression.arguments[1].arguments[1].value, '3');
    });
});
