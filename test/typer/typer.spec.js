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
            throw new Error('Not yet implemented');
        });
    });

    describe('Identifier', function () {

        it ('should get type from identifier table', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('AssignmentExpression', function () {

        it ('should check type of both sides', function () {
            throw new Error('Not yet implemented');
        });

        it ('should return the type of both sides', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('CallExpression', function () {

        it ('should put the type from the returnType of the callee', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('BracketExpression', function () {

        it ('should set the type of the expression with the most common type of included elements', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ConditionalExpression', function () {

        it ('should check the type of test', function () {
            throw new Error('Not yet implemented');
        });

        it ('should check the type of consequent and alternate', function () {
            throw new Error('Not yet implemented');
        });

        it ('should return a compatible type between consequent and alternate', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('LambdaExpression', function () {

        it ('should infer type of arguments from current argument type if in a function call', function () {
            throw new Error('Not yet implemented');
        });

        it ('should set the type of expression from return type and arguments type', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('MemberExpression', function () {
        
        it ('should check if object value is an object, and has such a property', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ExpressionStatement', function () {

        it ('should apply the type of the expression to the statement', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ReturnStatement', function () {

        it ('if current function does not have a returnType, it should infer it', function () {
            throw new Error('Not yet implemented');
        });

        it ('should check if it returns a compatible type with current function', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ThrowStatement', function () {

        it ('should check if thrown exception is a throwable', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('TryStatement', function () {

        it ('should check if types in catch clause might not be ignored', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('CatchClause', function () {
        
        it ('should check if the type is throwable', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('VariableDeclaration', function () {

        it ('should add type of symbol from the init expression', function () {
            throw new Error('Not yet implemented');
        });

        it ('should check if it has a type if the init expression is null', function () {
            throw new Error('Not yet implemented');
        });

        it ('should add the type to the identifier table', function  () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ConstantDeclaration', function () {

        it ('should add type of symbol from the init expression', function () {
            throw new Error('Not yet implemented');
        });

        it ('should add the type to the identifier table', function  () {
            throw new Error('Not yet implemented');
        });
    });

    describe('NamespaceDeclaration', function () {

        it ('should check if namespace has a namespace type', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ClassDeclaration', function () {

        it ('should check if the class has a class type', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ClassAttribute', function () {

        it ('should infer type from initial value if not null', function () {
            throw new Error('Not yet implemented');
        });

        it ('should check if the attribute has a correct type', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('ClassMethod', function () {

        it ('should check if the method has a correct type', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('MethodParameter', function () {

        it ('should check if parameters are correct', function () {
            throw new Error('Not yet implemented');
        });
    });

    describe('Program', function () {
        // Nothing
    });
    describe('BlockStatement', function () {
        // Nothing
    });

    describe('UnaryExpression', function () {
        // Nothing to do there, lowering pass removes those nodes
    });

    describe('InterfaceDeclaration', function () {
        // Nothing to do there, lowering pass removes those nodes
    });

    describe('BinaryExpression', function () {
        // Nothing to do there, lowering pass removes those nodes
    });

    describe('SubscriptExpression', function () {
        // Nothing to do there, lowering pass removes those nodes
    });
});
