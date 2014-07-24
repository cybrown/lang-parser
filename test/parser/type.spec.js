var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Call', function () {

    it ('should parse an empty call', function () {
        var ast = parser.parse('foo();');
        assert.strictEqual(ast.body[0].expression.type, 'CallExpression');
        assert.strictEqual(ast.body[0].expression.callee.type, 'Identifier');
        assert.strictEqual(ast.body[0].expression.callee.name, 'foo');
        assert.strictEqual(ast.body[0].expression.arguments.length, 0);
    });
});
