var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Class', function () {

    it ('should parse an empty class', function () {
        var ast = parser.parse('class Foo { }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
    });
});
