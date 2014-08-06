var assert = require('assert');
var parser = require('../../lib/parserw');

describe ('Type', function () {

    describe ('Named', function () {

        it ('should parse a named type', function () {
            var ast = parser.parse('var foo :Foo;');
            assert.strictEqual(ast.body[0].type.$type, 'NamedType');
            assert.strictEqual(ast.body[0].type.name, 'Foo');
        });
    });
    
    describe ('Function', function () {

        it ('should parse a function type', function () {
            var ast = parser.parse('var foo :{Foo, Bar => Baz};');
            assert.strictEqual(ast.body[0].type.$type, 'FunctionType');
            assert.strictEqual(ast.body[0].type.returnType.$type, 'NamedType');
            assert.strictEqual(ast.body[0].type.returnType.name, 'Baz');
        });
    });

    describe ('Tuple', function () {


    });
    
    describe ('Array', function () {
    
        
    });

    describe ('Generic', function () {


    });

    describe ('Array of Generic', function () {


    });
});
