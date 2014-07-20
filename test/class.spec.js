var assert = require('assert');
var parser = require('../lib/parserw');

describe ('Class', function () {

    it ('should parse an empty class', function () {
        var ast = parser.parse('class Foo { }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 0);
    });

    it ('should parse a class with one attribute', function () {
        var ast = parser.parse('class Foo { int age; }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassAttribute');
        assert.strictEqual(ast.body[0].members[0].kind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'age');
    });

    it ('should parse a class with one method', function () {
        var ast = parser.parse('class Foo { int getAge() {1+1;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 1);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 0);
    });

    it ('should parse a class with two methods', function () {
        var ast = parser.parse('class Foo { int getAge() {1+1;} string getName() {4;} }');
        assert.strictEqual(ast.body[0].type, 'ClassDeclaration');
        assert.strictEqual(ast.body[0].name, 'Foo');
        assert.strictEqual(ast.body[0].members.length, 2);
        assert.strictEqual(ast.body[0].members[0].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[0].returnKind.name, 'int');
        assert.strictEqual(ast.body[0].members[0].name, 'getAge');
        assert.strictEqual(ast.body[0].members[0].parameters.length, 0);
        assert.strictEqual(ast.body[0].members[1].type, 'ClassMethod');
        assert.strictEqual(ast.body[0].members[1].returnKind.name, 'string');
        assert.strictEqual(ast.body[0].members[1].name, 'getName');
        assert.strictEqual(ast.body[0].members[1].parameters.length, 0);
    });
});
