var assert = require('assert');
var Typer = require('../../lib/typer');
var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');

describe ('Typer', function () {

    var typer;

    var boolClass = nodes.ClassDeclaration('bool', []);
    var int32Class = nodes.ClassDeclaration('int', []);
    var int64Class = nodes.ClassDeclaration('long', []);
    var uint32Class = nodes.ClassDeclaration('uint', []);
    var uint64Class = nodes.ClassDeclaration('long', []);
    var float32Class = nodes.ClassDeclaration('long', []);
    var float64Class = nodes.ClassDeclaration('long', []);
    var stringClass = nodes.ClassDeclaration('string', []);

    var baseClass = node.ClassDeclaration('Base', []);
    var subClass = node.ClassDeclaration('Sub', []);

    beforeEach(function () {
        typer = new Typer(new Walker());
    });

    describe ('Typer internals', function () {

        describe ('Type compatibility', function () {

            it ('should return true with 2 int32', function () {
                assert.equal(typer.isCompatible(int32Class, int32Class), true);
            });

            it ('should return false with int32 and int64', function () {
                assert.equal(typer.isCompatible(int32Class, int64Class), false);
            });

            xit ('should return true with a super class as second argument', function () {

            });

            xit ('should return false with a super class as first argument', function () {

            });

            xit ('should return true with an implemented interface as second argument', function () {

            });

            xit ('should return true with a structural compatible type as second argument', function () {

            });
        });

        describe ('Method finder', function () {

            xit ('should find the most suitable method in a list for a list of types', function () {

            });
        });
    });

    describe('Literal', function () {

        it ('should get the type of true', function () {
            var node = nodes.Literal('true');
            typer.setType('bool', boolClass);
            typer.process(node);
            assert.equal(node.type, boolClass);
        });

        it ('should get the type of false', function () {
            var node = nodes.Literal('false');
            typer.setType('bool', boolClass);
            typer.process(node);
            assert.equal(node.type, boolClass);
        });
        
        it ('should get the type of a int32', function () {
            var node = nodes.Literal('1');
            typer.setType('int32', int32Class);
            typer.process(node);
            assert.equal(node.type, int32Class);
        });

        it ('should get the type of a int64', function () {
            var node = nodes.Literal('1l');
            typer.setType('int64', int64Class);
            typer.process(node);
            assert.equal(node.type, int64Class);
        });

        xit ('should get the type of a uint32', function () {
            var node = nodes.Literal('1u');
            typer.setType('uint32', uint32Class);
            typer.process(node);
            assert.equal(node.type, uint32Class);
        });

        xit ('should get the type of a uint64', function () {
            var node = nodes.Literal('1lu');
            typer.setType('uint64', uint64Class);
            typer.process(node);
            assert.equal(node.type, uint64Class);
        });

        xit ('should get the type of a float32', function () {
            var node = nodes.Literal('1.f');
            typer.setType('float32', float32Class);
            typer.process(node);
            assert.equal(node.type, float32Class);
        });

        xit ('should get the type of a float64', function () {
            var node = nodes.Literal('1.0');
            typer.setType('float64', float64Class);
            typer.process(node);
            assert.equal(node.type, float64Class);
        });

        xit ('should get the type of a string', function () {
            var node = nodes.Literal('"hello world"');
            typer.setType('string', stringClass);
            typer.process(node);
            assert.equal(node.type, stringClass);
        });
    });

    describe('Identifier', function () {

        xit ('should get type from identifier table', function () {

        });
    });

    describe('AssignmentExpression', function () {

        it ('should throw if types are not compatible', function () {
            assert.throws(function () {
                var nodeIdentifier = nodes.Identifier('foo');
                nodeIdentifier.type = int32Class;
                var node = nodes.AssignmentExpression(
                    '=',
                    nodeIdentifier,
                    nodes.Literal('42l')
                );
                typer.process(node);
            });
        });

        it ('should set the type of the expression', function () {
            var nodeIdentifier = nodes.Identifier('foo');
            nodeIdentifier.type = int32Class;
            typer.setType('int32', int32Class);
            var node = nodes.AssignmentExpression(
                '=',
                nodeIdentifier,
                nodes.Literal('42')
            );
            typer.process(node);
            assert.equal(node.type, int32Class);
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

        it ('should check the type of test, must be boolean', function () {
            typer.setType('bool', boolClass);
            var node = nodes.ConditionalExpression(
                nodes.Literal('1'),
                nodes.Literal('2'),
                nodes.Literal('3')
            );
            assert.throws(function () {
                typer.process(node);
            });
        });

        xit ('should set a compatible type between consequent and alternate', function () {

        });
    });

    describe('LambdaExpression', function () {

        xit ('should infer type of arguments from current argument type if in a function call', function () {

        });

        xit ('should set the type of expression from return type and arguments type', function () {

        });
    });

    describe('MemberExpression', function () {

        xit ('should set the type of the expression', function () {

        });

        xit ('should object has the property', function () {

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
