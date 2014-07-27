var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Namespace', function () {

    it ('should parse an empty namespace', function () {
        var ast = parser.parse('namespace foo { }');
        assert.strictEqual(ast.body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].path.length, 1);
        assert.strictEqual(ast.body[0].path[0], 'foo');
        assert.strictEqual(ast.body[0].body.length, 0);
    });

    it ('should parse an empty namespace with 2 path elements', function () {
        var ast = parser.parse('namespace foo.bar { }');
        assert.strictEqual(ast.body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].path.length, 2);
        assert.strictEqual(ast.body[0].path[0], 'foo');
        assert.strictEqual(ast.body[0].path[1], 'bar');
        assert.strictEqual(ast.body[0].body.length, 0);
    });

    it ('should parse an empty namespace with 3 path elements', function () {
        var ast = parser.parse('namespace foo.bar.toto { }');
        assert.strictEqual(ast.body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].path.length, 3);
        assert.strictEqual(ast.body[0].path[0], 'foo');
        assert.strictEqual(ast.body[0].path[1], 'bar');
        assert.strictEqual(ast.body[0].path[2], 'toto');
        assert.strictEqual(ast.body[0].body.length, 0);
    });

    it ('should parse a namespace with statements', function () {
        var ast = parser.parse('namespace foo { class Baz {} class Baz2 {} }');
        assert.strictEqual(ast.body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].path[0], 'foo');
        assert.strictEqual(ast.body[0].body.length, 2);
        assert.strictEqual(ast.body[0].body[0].$type, 'ClassDeclaration');
    });

    it ('should parse compound namespaces with statements', function () {
        var ast = parser.parse('namespace root { namespace foo { class Baz {} }}');
        assert.strictEqual(ast.body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].path[0], 'root');
        assert.strictEqual(ast.body[0].body.length, 1);
        assert.strictEqual(ast.body[0].body[0].$type, 'NamespaceDeclaration');
        assert.strictEqual(ast.body[0].body[0].body.length, 1);
        assert.strictEqual(ast.body[0].body[0].body[0].$type, 'ClassDeclaration');
    });
});
