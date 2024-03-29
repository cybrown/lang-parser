var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Interface', function () {

    it ('should parse an empty interface', function () {
        var ast = parser.parse('interface Foo { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
    });

    it ('should parse a interface with one attribute', function () {
        var ast = parser.parse('interface Foo { age: int; }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].isInterface, true);
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[0].isAttribute, true);
        assert.strictEqual(ast.body[0].members[0].type.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'age');
    });

    it ('should parse a interface with one method', function () {
        var ast = parser.parse('interface Foo { getAge() {1+1;} }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].isInterface, true);
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[0].isMethod, true);
        assert.strictEqual(ast.body[0].members[0].returnType, null);
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].params.length, 0);
    });

    it ('should parse a interface with two methods', function () {
        var ast = parser.parse('interface Foo { getAge() {1+1;} getName(): string {4;} }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].isInterface, true);
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 2);
        assert.strictEqual(ast.body[0].members[0].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[0].isMethod, true);
        assert.strictEqual(ast.body[0].members[0].returnType, null);
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].params.length, 0);
        assert.strictEqual(ast.body[0].members[1].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[1].isMethod, true);
        assert.strictEqual(ast.body[0].members[1].returnType.name, 'string');
        assert.strictEqual(ast.body[0].members[1].name, 'getName');
        assert.strictEqual(ast.body[0].members[1].params.length, 0);
    });
});
