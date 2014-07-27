var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var types = require('../../lib/types');
var assert = require('assert');

describe ('Walker Declarations', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk VariableDeclaration', function (done) {
        var counter = 0;
        var node = nodes.VariableDeclaration(
            'foo',
            null,
            nodes.Literal(72)
        );
        walker.on('node.VariableDeclaration.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal.enter', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 72);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.VariableDeclaration.leave', function (node) {
            try {
                assert.equal(counter, 2);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ConstantDeclaration', function (done) {
        var counter = 0;
        var node = nodes.ConstantDeclaration(
            'bar',
            null,
            nodes.Literal(31)
        );
        walker.on('node.ConstantDeclaration.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal.enter', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 31);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ConstantDeclaration.leave', function (node) {
            try {
                assert.equal(counter, 2);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk empty ClassDeclaration', function (done) {
        var counter = 0;
        var node = nodes.ClassDeclaration('Foo', []);
        walker.on('node.ClassDeclaration.enter', function () {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassDeclaration.leave', function () {
            try {
                assert.equal(counter, 1);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk empty InterfaceDeclaration', function (done) {
        var counter = 0;
        var node = nodes.InterfaceDeclaration('IFoo', []);
        walker.on('node.InterfaceDeclaration.enter', function () {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.InterfaceDeclaration.leave', function () {
            try {
                assert.equal(counter, 1);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk MethodParameter', function (done) {
        var counter = 0;
        var node = nodes.MethodParameter('x', types.PrimitiveType(32, false, false));
        walker.on('node.MethodParameter.enter', function (node) {
            try {
                assert.equal(counter, 0);
                assert.equal(node.type.$type, 'PrimitiveType');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MethodParameter.leave', function (node) {
            try {
                assert.equal(counter, 1);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassMethod', function (done) {
        var counter = 0;
        var node = nodes.ClassMethod(
            'getValue',
            types.PrimitiveType(32, false, false),
            [nodes.MethodParameter('x', types.PrimitiveType(32, false, false))],
            nodes.ExpressionStatement(nodes.BinaryExpression('+', null, null))
        );
        walker.on('node.ClassMethod.enter', function (node) {
            try {
                assert.equal(counter, 0);
                assert.equal(node.$type, 'ClassMethod');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MethodParameter.enter', function (node) {
            try {
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MethodParameter.leave', function (node) {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.enter', function (node) {
            try {
                assert.equal(counter, 3);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function (node) {
            try {
                assert.equal(counter, 4);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassMethod.leave', function (node) {
            try {
                assert.equal(counter, 5);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassAttribute', function (done) {
        var counter = 0;
        var node = nodes.ClassAttribute('foo', types.PrimitiveType(32, false, false));
        walker.on('node.ClassAttribute.enter', function (node) {
            try {
                assert.equal(counter, 0);
                assert.equal(node.type.$type, 'PrimitiveType');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassAttribute.enter', function (node) {
            try {
                assert.equal(counter, 1);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassDeclaration', function (done) {
        var counter = 0;
        var node = nodes.ClassDeclaration('Foo', [
            nodes.ClassAttribute('value', types.PrimitiveType(32, false, false)),
            nodes.ClassMethod(
                'getValue',
                types.PrimitiveType(32, false, false),
                [nodes.MethodParameter('x', types.PrimitiveType(32, false, false))],
                nodes.ExpressionStatement(nodes.BinaryExpression('+', null, null))
            )
        ]);
        walker.on('node.ClassDeclaration.enter', function () {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassAttribute.enter', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.type.$type, 'PrimitiveType');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassAttribute.enter', function (node) {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassMethod.enter', function (node) {
            try {
                assert.equal(counter, 3);
                assert.equal(node.$type, 'ClassMethod');
                assert.equal(node.name, 'getValue');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MethodParameter.enter', function (node) {
            try {
                assert.equal(counter, 4);
                assert.equal(node.name, 'x');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MethodParameter.leave', function (node) {
            try {
                assert.equal(counter, 5);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.enter', function (node) {
            try {
                assert.equal(counter, 6);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function (node) {
            try {
                assert.equal(counter, 7);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassMethod.leave', function (node) {
            try {
                assert.equal(counter, 8);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassDeclaration.leave', function () {
            try {
                assert.equal(counter, 9);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk NamespaceDeclaration', function (done) {
        var counter = 0;
        var node = nodes.NamespaceDeclaration(
            ['com', 'namespace'],
            [nodes.ClassDeclaration('Foo', [])]
        );
        walker.on('node.NamespaceDeclaration.enter', function (node) {
            try {
                assert.equal(node.$type, 'NamespaceDeclaration');
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassDeclaration.enter', function (node) {
            try {
                assert.equal(node.$type, 'ClassDeclaration');
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ClassDeclaration.leave', function (node) {
            try {
                assert.equal(node.$type, 'ClassDeclaration');
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.NamespaceDeclaration.leave', function (node) {
            try {
                assert.equal(node.$type, 'NamespaceDeclaration');
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });
});
