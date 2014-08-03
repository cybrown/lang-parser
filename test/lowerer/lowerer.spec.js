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
                var namespaceBody = nodes.ClassDeclaration('Foo', []);
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
                var namespaceBody = nodes.ClassDeclaration('Foo', []);
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
                var classNode = nodes.ClassDeclaration('Foo', []);
                var namespaceNode = nodes.NamespaceDeclaration(['ns'], [classNode]);
                var node = nodes.Program([namespaceNode]);
                lowerer.process(node);
                assert.equal(namespaceNode.classes.Foo, classNode);
                done();
            });
        });
    });

    describe ('Method', function () {

        describe ('Indexing', function () {

            it ('should index methods in current class', function (done) {
                var methodNode = nodes.ClassMethod('myMethod', null, [], []);
                var classNode = nodes.ClassDeclaration('foo', [methodNode]);
                var node = nodes.Program([
                    nodes.NamespaceDeclaration(['foo'], [classNode])
                ]);
                lowerer.process(node);
                assert.equal(classNode.methods['myMethod'], methodNode);
                done();
            });
        });

        describe ('Reference to class', function () {

            it ('should add a reference to the class in the method', function (done) {
                var methodNode = nodes.ClassMethod('myMethod', null, [], []);
                var classNode = nodes.ClassDeclaration('foo', [methodNode]);
                var node = nodes.Program([
                    nodes.NamespaceDeclaration(['foo'], [classNode])
                ]);
                lowerer.process(node);
                assert.equal(methodNode.$$class, classNode);
                done();
            });
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
            assert.equal(node.expression.callee.name, '-');
            assert.equal(node.expression.arguments.length, 2);
            assert.equal(node.expression.arguments[0].value, 42);
            assert.equal(node.expression.arguments[1].value, 10);
            done();
        });
    });
});
