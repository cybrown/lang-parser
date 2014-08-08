var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Class', function () {

    it ('should parse an empty class', function () {
        var ast = parser.parse('class Foo { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
    });

    it ('should parse a class with one attribute', function () {
        var ast = parser.parse('class Foo { age: int; }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[0].isAttribute, true);
        assert.strictEqual(ast.body[0].members[0].type.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'age');
    });

    it ('should parse a class with one method', function () {
        var ast = parser.parse('class Foo { getAge() {1+1;} }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].$type, 'MemberDeclaration');
        assert.strictEqual(ast.body[0].members[0].isMethod, true);
        assert.strictEqual(ast.body[0].members[0].returnType, null);
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].params.length, 0);
    });

    it ('should parse a class with two methods', function () {
        var ast = parser.parse('class Foo { getAge() {1+1;} getName(): string {4;} }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
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

    it ('should parse extends qualifier', function () {
        var ast = parser.parse('class Foo extends Baz { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
        assert.strictEqual(ast.body[0].extends.name, 'Baz');
    });

    it ('should parse implements qualifier', function () {
        var ast = parser.parse('class Foo implements IBaz { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
        assert.strictEqual(ast.body[0].implements.length, 1);
        assert.strictEqual(ast.body[0].implements[0].name, 'IBaz');
    });

    it ('should parse implements qualifier with multiple types', function () {
        var ast = parser.parse('class Foo implements IBaz, IFoo { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
        assert.strictEqual(ast.body[0].implements.length, 2);
        assert.strictEqual(ast.body[0].implements[0].name, 'IBaz');
        assert.strictEqual(ast.body[0].implements[1].name, 'IFoo');
    });

    xit ('should parse extends full name qualifier and implements qualifier with multiple types', function () {
        var ast = parser.parse('class Foo extends ns.org.Bar implements IBaz, IFoo { }');
        assert.strictEqual(ast.body[0].$type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
        assert.strictEqual(ast.body[0].extends.name, 'Baz');
        assert.strictEqual(ast.body[0].implements.length, 2);
        assert.strictEqual(ast.body[0].implements[0].name, 'IBaz');
        assert.strictEqual(ast.body[0].implements[1].name, 'IFoo');
    });
});
