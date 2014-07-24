var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Class Method', function () {

    it ('should parse a method without parameters', function () {
        var ast = parser.parse('class Foo { getAge() {1;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind, null);
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 0);
        assert.strictEqual(ast.body[0].members[0].body.type, 'BlockStatement');
    });

    it ('should parse a method without parameters with type', function () {
        var ast = parser.parse('class Foo { getAge(): int {1;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 0);
        assert.strictEqual(ast.body[0].members[0].body.type, 'BlockStatement');
    });

    it ('should parse a method with one parameter', function () {
        var ast = parser.parse('class Foo { getAge(a: int) {1;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind, null);
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 1);
        assert.strictEqual(ast.body[0].members[0].parameters[0].kind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].parameters[0].name, 'a');
        assert.strictEqual(ast.body[0].members[0].body.type, 'BlockStatement');
    });

    it ('should parse a method with one parameter and type', function () {
        var ast = parser.parse('class Foo { getAge(a: int): int {1;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 1);
        assert.strictEqual(ast.body[0].members[0].parameters[0].kind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].parameters[0].name, 'a');
        assert.strictEqual(ast.body[0].members[0].body.type, 'BlockStatement');
    });
});