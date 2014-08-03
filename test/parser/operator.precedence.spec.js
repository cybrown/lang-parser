var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Precedence', function () {

    it ('+ left associativity', function () {
        var ast = parser.parse('1 + 2 + 3;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.left.left.value, '1');
        assert.strictEqual(ast.body[0].expression.left.right.value, '2');
        assert.strictEqual(ast.body[0].expression.right.value, '3');
    });

    it ('. and []', function () {
        var ast = parser.parse('a[b].c;');
        assert.strictEqual(ast.body[0].expression.$type, 'MemberExpression');
        assert.strictEqual(ast.body[0].expression.object.object.name, 'a');
        assert.strictEqual(ast.body[0].expression.object.index.name, 'b');
        assert.strictEqual(ast.body[0].expression.property, 'c');
    });

    it ('* over +', function () {
        var ast = parser.parse('1 * 2 + 3;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.left.left.value, '1');
        assert.strictEqual(ast.body[0].expression.left.right.value, '2');
        assert.strictEqual(ast.body[0].expression.right.value, '3');
    });

    it ('+ over =>', function () {
        var ast = parser.parse('x => x + 2;');
        assert.strictEqual(ast.body[0].expression.$type, 'LambdaExpression');
        assert.strictEqual(ast.body[0].expression.body.$type, 'BinaryExpression');
    });

    it ('& over ^', function () {
        var ast = parser.parse('a ^ b & c;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.right.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.operator, '^');
        assert.strictEqual(ast.body[0].expression.right.operator, '&');
    });

    it ('^ over |', function () {
        var ast = parser.parse('a | b ^ c;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.right.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.operator, '|');
        assert.strictEqual(ast.body[0].expression.right.operator, '^');
    });

    it ('&& over ||', function () {
        var ast = parser.parse('a || b && c;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.right.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.operator, '||');
        assert.strictEqual(ast.body[0].expression.right.operator, '&&');
    });

    it ('UMINUS over -', function () {
        var ast = parser.parse('-1 * -2;');
        assert.strictEqual(ast.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].expression.operator, '*');
        assert.strictEqual(ast.body[0].expression.left.$type, 'UnaryExpression');
        assert.strictEqual(ast.body[0].expression.left.operator, '-');
        assert.strictEqual(ast.body[0].expression.right.$type, 'UnaryExpression');
        assert.strictEqual(ast.body[0].expression.right.operator, '-');
    });
});
