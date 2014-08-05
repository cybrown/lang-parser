var assert = require('assert');
var Typer = require('../../lib/typer');
var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');

describe ('Typer', function () {

    var typer;

    beforeEach(function () {
        typer = new Typer(new Walker());
    });

    describe('Literal', function () {

        it ('should throw Error if type is null', function () {

        });
    });

    describe('Identifier', function () {

    });

    describe('UnaryExpression', function () {
        // Nothing to do there, lowering pass removes those nodes
    });

    describe('BinaryExpression', function () {
        // Nothing to do there, lowering pass removes those nodes
    });

    describe('AssignmentExpression', function () {

        it ('should check type of both sides', function () {

        });

        it ('should return the type of both sides', function () {

        });
    });

    describe('CallExpression', function () {

        it ('should check the return type', function () {

        });
    });

    describe('BracketExpression', function () {
        // TODO
    });

    describe('ConditionalExpression', function () {

        it ('should check the type of test', function () {

        });

        it ('should check the type of consequent and alternate', function () {

        });

        it ('should return a compatible type between consequent and alternate', function () {

        });
    });

    describe('LambdaExpression', function () {


    });

    describe('SubscriptExpression', function () {
        // Lowering pass remove those nodes
    });

    describe('MemberExpression', function () {
        
        it ('should check if object value is an object, and has such a property', function () {
            
        });
    });

    describe('ExpressionStatement', function () {
        // Nothing
    });

    describe('BlockStatement', function () {
        // Nothing
    });

    describe('ReturnStatement', function () {

        it ('should check if it returns a compatible type with current function', function () {

        });
    });

    describe('ThrowStatement', function () {
        // Nothing, unless checked exceptions are implemented
    });

    describe('TryStatement', function () {
        // Nothing
    });

    describe('CatchClause', function () {
        // Nothing
    });

    describe('VariableDeclaration', function () {
        // TODO
    });

    describe('ConstantDeclaration', function () {
        // TODO
    });

    describe('Program', function () {
        // Nothing
    });

    describe('NamespaceDeclaration', function () {

        it ('should check if namespace has a namespace type', function () {

        });
    });

    describe('ClassDeclaration', function () {

        it ('should check if the class has a class type', function () {

        });
    });

    describe('ClassAttribute', function () {

    });

    describe('ClassMethod', function () {

        it ('should check if the method has a method type', function () {

        });
    });

    describe('MethodParameter', function () {

    });

    describe('InterfaceDeclaration', function () {
        // Nothing, lowering pass converts them to class with
    });
});
