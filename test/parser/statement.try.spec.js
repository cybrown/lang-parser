var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Try', function () {

    it ('should parse a try catch statement', function () {
        var ast = parser.parse('try { 1+1;} catch (e: Exception) {1 + 5;}');
        // try
        assert.strictEqual(ast.body[0].$type, 'TryStatement');
        assert.strictEqual(ast.body[0].block.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].block.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].block.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].handlers.length, 1);
        // catch
        assert.strictEqual(ast.body[0].handlers[0].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[0].param.type.name, 'Exception');
        assert.strictEqual(ast.body[0].handlers[0].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[0].param.name, 'e');
        assert.strictEqual(ast.body[0].handlers[0].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].expression.$type, 'BinaryExpression');
        // finally
        assert.strictEqual(ast.body[0].finalizer, null);
    });

    it ('should parse a try catch statement with finally', function () {
        var ast = parser.parse('try { 1+1;} catch (e: Exception) {1 + 5;} finally {1+5;}');
        // try
        assert.strictEqual(ast.body[0].$type, 'TryStatement');
        assert.strictEqual(ast.body[0].block.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].block.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].block.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].handlers.length, 1);
        // catch
        assert.strictEqual(ast.body[0].handlers[0].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[0].param.type.name, 'Exception');
        assert.strictEqual(ast.body[0].handlers[0].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[0].param.name, 'e');
        assert.strictEqual(ast.body[0].handlers[0].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].expression.$type, 'BinaryExpression');
        // finally
        assert.strictEqual(ast.body[0].finalizer.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].finalizer.body.length, 1);
        assert.strictEqual(ast.body[0].finalizer.body[0].$type, 'ExpressionStatement');
    });

    it ('should parse a try catch statement with two catch and finally', function () {
        var ast = parser.parse('try { 1+1;} catch (e1: SpecificException) {1 + 5;} catch (e2: Exception) {1 + 5;} finally {1+5;}');
        // try
        assert.strictEqual(ast.body[0].$type, 'TryStatement');
        assert.strictEqual(ast.body[0].block.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].block.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].block.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].handlers.length, 2);
        // catch 1
        assert.strictEqual(ast.body[0].handlers[0].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[0].param.type.name, 'SpecificException');
        assert.strictEqual(ast.body[0].handlers[0].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[0].param.name, 'e1');
        assert.strictEqual(ast.body[0].handlers[0].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].expression.$type, 'BinaryExpression');
        // catch 2
        assert.strictEqual(ast.body[0].handlers[1].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[1].param.type.name, 'Exception');
        assert.strictEqual(ast.body[0].handlers[1].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[1].param.name, 'e2');
        assert.strictEqual(ast.body[0].handlers[1].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[1].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[1].body.body[0].expression.$type, 'BinaryExpression');
        // finally
        assert.strictEqual(ast.body[0].finalizer.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].finalizer.body.length, 1);
        assert.strictEqual(ast.body[0].finalizer.body[0].$type, 'ExpressionStatement');
    });

    it ('should parse a try catch statement with 3 catch and finally', function () {
        var ast = parser.parse('try { 1+1;} catch (e1: SpecificException) {1 + 5;} catch (e2: LessException) {1 + 5;}  catch (e3: Exception) {++i;} finally {1+5;}');
        // try
        assert.strictEqual(ast.body[0].$type, 'TryStatement');
        assert.strictEqual(ast.body[0].block.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].block.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].block.body[0].expression.$type, 'BinaryExpression');
        assert.strictEqual(ast.body[0].handlers.length, 3);
        // catch 1
        assert.strictEqual(ast.body[0].handlers[0].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[0].param.type.name, 'SpecificException');
        assert.strictEqual(ast.body[0].handlers[0].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[0].param.name, 'e1');
        assert.strictEqual(ast.body[0].handlers[0].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[0].body.body[0].expression.$type, 'BinaryExpression');
        // catch 2
        assert.strictEqual(ast.body[0].handlers[1].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[1].param.type.name, 'LessException');
        assert.strictEqual(ast.body[0].handlers[1].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[1].param.name, 'e2');
        assert.strictEqual(ast.body[0].handlers[1].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[1].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[1].body.body[0].expression.$type, 'BinaryExpression');
        // catch 3
        assert.strictEqual(ast.body[0].handlers[2].$type, 'CatchClause');
        assert.strictEqual(ast.body[0].handlers[2].param.type.name, 'Exception');
        assert.strictEqual(ast.body[0].handlers[2].param.$type, 'Identifier');
        assert.strictEqual(ast.body[0].handlers[2].param.name, 'e3');
        assert.strictEqual(ast.body[0].handlers[2].body.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].handlers[2].body.body[0].$type, 'ExpressionStatement');
        assert.strictEqual(ast.body[0].handlers[2].body.body[0].expression.$type, 'UnaryExpression');
        // finally
        assert.strictEqual(ast.body[0].finalizer.$type, 'BlockStatement');
        assert.strictEqual(ast.body[0].finalizer.body.length, 1);
        assert.strictEqual(ast.body[0].finalizer.body[0].$type, 'ExpressionStatement');
    });

    it ('should parse a throw statement', function () {
        var ast = parser.parse('throw !!5;');
        assert.strictEqual(ast.body[0].$type, 'ThrowStatement');
        assert.strictEqual(ast.body[0].argument.$type, 'UnaryExpression');
        assert.strictEqual(ast.body[0].argument.argument.$type, 'UnaryExpression');
        assert.strictEqual(ast.body[0].argument.argument.argument.$type, 'Literal');
    });
});
