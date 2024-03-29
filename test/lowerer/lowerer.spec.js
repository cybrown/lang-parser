var assert = require('assert');
var Lowerer = require('../../lib/lowerer');
var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');

describe ('Lowerer', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer(new Walker());
    });

    describe ('Namespace', function () {

        describe ('Indexing', function () {

            it ('should index namespaces in program', function (done) {
                var namespaceNode = nodes.NamespaceDeclaration(['com', 'org'], []);
                var node = nodes.Program([namespaceNode]);
                lowerer.process(node);
                assert.equal(node.namespaces.hasOwnProperty('com'), true);
                assert.equal(node.namespaces.com, namespaceNode);
                done();
            });

            it ('should index namespaces in another namespace', function (done) {
                var namespaceNode2 = nodes.NamespaceDeclaration(['org'], []);
                var namespaceNode1 = nodes.NamespaceDeclaration(['com'], [namespaceNode2]);
                var node = nodes.Program([namespaceNode1]);
                lowerer.process(node);
                assert.equal(namespaceNode1.namespaces.hasOwnProperty('org'), true);
                assert.equal(namespaceNode1.namespaces.org, namespaceNode2);
                done();
            });
        });

        describe ('Compound', function () {

            it ('should put a name on a namespace', function (done) {
                var namespaceBody = nodes.ClassDeclaration('class', 'Foo', []);
                var node = nodes.Program(
                    [
                        nodes.NamespaceDeclaration(
                            ['com'],
                            [namespaceBody]
                        )
                    ]
                );
                lowerer.process(node);
                assert.equal(node.body[0].name, 'com');
                done();
            });

            it ('should make multiple namespaces from one compound namespace', function (done) {
                var namespaceBody = nodes.ClassDeclaration('class', 'Foo', []);
                var node = nodes.Program(
                    [
                        nodes.NamespaceDeclaration(
                            ['com', 'org'],
                            [namespaceBody]
                        )
                    ]
                );
                lowerer.process(node);
                assert.equal(node.body[0].name, 'com');
                assert.equal(node.body[0].body[0].name, 'org');
                assert.equal(node.body[0].body[0].body[0], namespaceBody);
                done();
            });
        });
    });

    describe ('Class', function () {

        describe ('Indexing in namespace', function () {

            it ('should index classes in namespaces', function (done) {
                var classNode = nodes.ClassDeclaration('class', 'Foo', []);
                var namespaceNode = nodes.NamespaceDeclaration(['ns'], [classNode]);
                var node = nodes.Program([namespaceNode]);
                lowerer.process(node);
                assert.equal(namespaceNode.classes.Foo, classNode);
                done();
            });
        });
    });

    describe ('Attributes', function () {

        describe ('Indexing', function () {

            it ('should index the class attributes in current class', function (done) {
                var attributeNode = nodes.MemberDeclaration('attribute', 'attr', null);
                var classNode = nodes.ClassDeclaration('class', 'foo', [attributeNode]);
                var node = nodes.Program([
                    nodes.NamespaceDeclaration(['foo'], [classNode])
                ]);
                lowerer.process(node);
                assert.equal(classNode.membersByName['attr'], attributeNode);
                done();
            });
        });
    });

    describe ('Method', function () {

        describe ('Indexing', function () {

            it ('should index methods in current class', function (done) {
                var methodNode = nodes.MemberDeclaration('method', 'myMethod', null, [], []);
                var classNode = nodes.ClassDeclaration('class', 'foo', [methodNode]);
                var node = nodes.Program([
                    nodes.NamespaceDeclaration(['foo'], [classNode])
                ]);
                lowerer.process(node);
                assert.equal(classNode.membersByName['myMethod'], methodNode);
                done();
            });
        });

        describe ('Reference to class', function () {

            it ('should add a reference to the class in the method', function (done) {
                var methodNode = nodes.MemberDeclaration('method', 'myMethod', null, [], []);
                var classNode = nodes.ClassDeclaration('class', 'foo', [methodNode]);
                var node = nodes.Program([
                    nodes.NamespaceDeclaration(['foo'], [classNode])
                ]);
                lowerer.process(node);
                assert.equal(methodNode.$$class, classNode);
                done();
            });
        });
    });

    describe ('UnaryExpression', function () {

        it ('should convert unary expresison to function calls (!)', function (done) {
            var value = nodes.Literal(42, null);
            var exprNode = nodes.UnaryExpression(
                '!',
                value
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'CallExpression');
            assert.equal(node.expression.callee.property, '__not__');
            assert.equal(node.expression.callee.object, value);
            assert.equal(node.expression.arguments.length, 0);
            done();
        });

        it ('should convert unary expresison to function calls (-)', function () {
            var exprNode = nodes.UnaryExpression(
                '-',
                nodes.Literal(42, null)
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.callee.property, '__neg__');
        });

        it ('should convert unary expresison to function calls (+)', function () {
            var exprNode = nodes.UnaryExpression(
                '+',
                nodes.Literal(42, null)
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.callee.property, '__pos__');
        });

        it ('should convert unary expresison to function calls (~)', function () {
            var exprNode = nodes.UnaryExpression(
                '~',
                nodes.Literal(42, null)
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.callee.property, '__inv__');
        });

        it ('should convert prefix ++ to assignment expression and return value', function (done) {
            var value = nodes.Identifier('c');
            var exprNode = nodes.UnaryExpression('++', value, true);
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'AssignmentExpression');
            assert.equal(node.expression.left, value);
            assert.equal(node.expression.right.$type, 'CallExpression');
            assert.equal(node.expression.right.callee.property, '__add__');
            assert.equal(node.expression.right.callee.object, value);
            assert.equal(node.expression.right.arguments.length, 1);
            assert.equal(node.expression.right.arguments[0].raw, '1');
            done();
        });

        it ('should convert prefix -- to assignment expression and return value', function (done) {
            var value = nodes.Identifier('c');
            var exprNode = nodes.UnaryExpression('--', value, true);
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'AssignmentExpression');
            assert.equal(node.expression.left, value);
            assert.equal(node.expression.right.$type, 'CallExpression');
            assert.equal(node.expression.right.callee.property, '__sub__');
            assert.equal(node.expression.right.callee.object, value);
            assert.equal(node.expression.right.arguments.length, 1);
            assert.equal(node.expression.right.arguments[0].raw, '1');
            done();
        });
    });

    describe ('AssignmentExpression', function () {

        it ('should lower operator and assignment expressions', function (done) {
            var left = nodes.Identifier('foo');
            var right = nodes.Literal(42, null);
            var asgn = nodes.AssignmentExpression('+=', left, right);
            lowerer.process(asgn);
            assert.equal(asgn.operator, '=');
            assert.equal(asgn.right.$type, 'CallExpression');
            assert.equal(asgn.right.callee.property, '__add__');
            assert.equal(asgn.left, left);
            assert.equal(asgn.right.callee.object, left);
            assert.equal(asgn.right.arguments[0], right);
            done();
        });
    });

    describe ('SubscriptExpression', function () {
        
        it ('should convert SubscriptExpression to CallExpression', function (done) {
            var exprNode = nodes.SubscriptExpression(
                nodes.Identifier('test'),
                nodes.Literal(10)
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'CallExpression');
            assert.equal(node.expression.callee.$type, 'MemberExpression');
            assert.equal(node.expression.callee.object.name, 'test');
            assert.equal(node.expression.callee.property, '__index__');
            assert.equal(node.expression.arguments.length, 1);
            assert.equal(node.expression.arguments[0].raw, 10);
            done();
        });
    });

    describe ('BinaryExpression', function () {

        it ('should convert binary expression to function calls', function (done) {
            var exprNode = nodes.BinaryExpression(
                '-',
                nodes.Literal(42, null),
                nodes.Literal(10)
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'CallExpression');
            assert.equal(node.expression.callee.$type, 'MemberExpression');
            assert.equal(node.expression.callee.object.raw, 42);
            assert.equal(node.expression.callee.property, '__sub__');
            assert.equal(node.expression.arguments.length, 1);
            assert.equal(node.expression.arguments[0].raw, 10);
            done();
        });

        it ('should convert && to ConditionnalExpression', function (done) {
            var leftNode = nodes.Literal(42, null);
            var rightNode = nodes.Literal(10);
            var exprNode = nodes.BinaryExpression(
                '&&',
                leftNode,
                rightNode
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'ConditionalExpression');
            assert.equal(node.expression.test, leftNode);
            assert.equal(node.expression.consequent, leftNode);
            assert.equal(node.expression.alternate, rightNode);
            done();
        });

        it ('should convert || to ConditionnalExpression', function (done) {
            var leftNode = nodes.Literal(42, null);
            var rightNode = nodes.Literal(10);
            var exprNode = nodes.BinaryExpression(
                '||',
                leftNode,
                rightNode
            );
            var node = nodes.ExpressionStatement(exprNode);
            lowerer.process(node);
            assert.equal(node.expression.$type, 'ConditionalExpression');
            assert.equal(node.expression.test, leftNode);
            assert.equal(node.expression.consequent, rightNode);
            assert.equal(node.expression.alternate, leftNode);
            done();
        });
    });
});
