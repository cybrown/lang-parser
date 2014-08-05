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

        xit ('should throw Error if type is null', function () {

        });

        xit ('should get the type of a primitive int', function () {

        });
    });

    describe('Identifier', function () {

        xit ('should get type from identifier table', function () {

        });
    });

    describe('AssignmentExpression', function () {

        xit ('should check type of both sides', function () {

        });

        xit ('should return the type of both sides', function () {

        });
    });

    describe('CallExpression', function () {

        xit ('should put the type from the returnType of the callee', function () {

        });
    });

    describe('BracketExpression', function () {

        xit ('should set the type of the expression with the most common type of included elements', function () {

        });
    });

    describe('ConditionalExpression', function () {

        xit ('should check the type of test', function () {

        });

        xit ('should check the type of consequent and alternate', function () {

        });

        xit ('should return a compatible type between consequent and alternate', function () {

        });
    });

    describe('LambdaExpression', function () {

        xit ('should infer type of arguments from current argument type if in a function call', function () {

        });

        xit ('should set the type of expression from return type and arguments type', function () {

        });
    });

    describe('MemberExpression', function () {
        
        xit ('should check if object value is an object, and has such a property', function () {

        });
    });

    describe('ExpressionStatement', function () {

        xit ('should apply the type of the expression to the statement', function () {

        });
    });

    describe('ReturnStatement', function () {

        xit ('if current function does not have a returnType, it should infer it', function () {

        });

        xit ('should check if it returns a compatible type with current function', function () {

        });
    });

    describe('ThrowStatement', function () {

        xit ('should check if thrown exception is a throwable', function () {

        });
    });

    describe('TryStatement', function () {

        xit ('should check if types in catch clause might not be ignored', function () {

        });
    });

    describe('CatchClause', function () {
        
        xit ('should check if the type is throwable', function () {

        });
    });

    describe('VariableDeclaration', function () {

        xit ('should add type of symbol from the init expression', function () {

        });

        xit ('should check if it has a type if the init expression is null', function () {

        });

        xit ('should add the type to the identifier table', function  () {

        });
    });

    describe('ConstantDeclaration', function () {

        xit ('should add type of symbol from the init expression', function () {

        });

        xit ('should add the type to the identifier table', function  () {

        });
    });

    describe('NamespaceDeclaration', function () {

        xit ('should check if namespace has a namespace type', function () {

        });
    });

    describe('ClassDeclaration', function () {

        xit ('should check if the class has a class type', function () {

        });
    });

    describe('ClassAttribute', function () {

        xit ('should infer type from initial value if not null', function () {

        });

        xit ('should check if the attribute has a correct type', function () {

        });
    });

    describe('ClassMethod', function () {

        xit ('should check if the method has a correct type', function () {

        });
    });

    describe('MethodParameter', function () {

        xit ('should check if parameters are correct', function () {

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
