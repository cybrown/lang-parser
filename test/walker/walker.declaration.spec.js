var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
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
        walker.setDelegate({
            VariableDeclarationEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    ++counter;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.raw, 72);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            VariableDeclarationLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    done();
                } catch (err) {
                    done(err);
                }
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
        walker.setDelegate({
            ConstantDeclarationEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    ++counter;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.raw, 31);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ConstantDeclarationLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk empty ClassDeclaration', function (done) {
        var counter = 0;
        var node = nodes.ClassDeclaration('Foo', []);
        walker.setDelegate({
            ClassDeclarationEnter: function () {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassDeclarationLeave: function () {
                try {
                    assert.equal(counter, 1);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk empty InterfaceDeclaration', function (done) {
        var counter = 0;
        var node = nodes.InterfaceDeclaration('IFoo', []);
        walker.setDelegate({
            InterfaceDeclarationEnter: function () {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            InterfaceDeclarationLeave: function () {
                try {
                    assert.equal(counter, 1);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk MethodParameter', function (done) {
        var counter = 0;
        var node = nodes.MethodParameter('x');
        walker.setDelegate({
            MethodParameterEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MethodParameterLeave: function (node) {
                try {
                    assert.equal(counter, 1);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassMethod', function (done) {
        var counter = 0;
        var node = nodes.ClassMethod(
            'getValue',
            null,
            [nodes.MethodParameter('x', null)],
            nodes.ExpressionStatement(nodes.BinaryExpression('+', null, null))
        );
        walker.setDelegate({
            ClassMethodEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    assert.equal(node.$type, 'ClassMethod');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MethodParameterEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MethodParameterLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementEnter: function (node) {
                try {
                    assert.equal(counter, 3);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function (node) {
                try {
                    assert.equal(counter, 4);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassMethodLeave: function (node) {
                try {
                    assert.equal(counter, 5);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassAttribute', function (done) {
        var counter = 0;
        var node = nodes.ClassAttribute('foo', null);
        walker.setDelegate({
            ClassAttributeEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassAttributeLeave: function (node) {
                try {
                    assert.equal(counter, 1);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk ClassDeclaration', function (done) {
        var counter = 0;
        var node = nodes.ClassDeclaration('Foo', [
            nodes.ClassAttribute('value', null),
            nodes.ClassMethod(
                'getValue',
                null,
                [nodes.MethodParameter('x', null)],
                nodes.ExpressionStatement(nodes.BinaryExpression('+', null, null))
            )
        ]);
        walker.setDelegate({
            ClassDeclarationEnter: function () {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassAttributeEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassAttributeLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassMethodEnter: function (node) {
                try {
                    assert.equal(counter, 3);
                    assert.equal(node.$type, 'ClassMethod');
                    assert.equal(node.name, 'getValue');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MethodParameterEnter: function (node) {
                try {
                    assert.equal(counter, 4);
                    assert.equal(node.name, 'x');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MethodParameterLeave: function (node) {
                try {
                    assert.equal(counter, 5);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementEnter: function (node) {
                try {
                    assert.equal(counter, 6);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function (node) {
                try {
                    assert.equal(counter, 7);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassMethodLeave: function (node) {
                try {
                    assert.equal(counter, 8);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassDeclarationLeave: function () {
                try {
                    assert.equal(counter, 9);
                    done();
                } catch (err) {
                    done(err);
                }
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
        walker.setDelegate({
            NamespaceDeclarationEnter: function (node) {
                try {
                    assert.equal(node.$type, 'NamespaceDeclaration');
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassDeclarationEnter: function (node) {
                try {
                    assert.equal(node.$type, 'ClassDeclaration');
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ClassDeclarationLeave: function (node) {
                try {
                    assert.equal(node.$type, 'ClassDeclaration');
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            NamespaceDeclarationLeave: function (node) {
                try {
                    assert.equal(node.$type, 'NamespaceDeclaration');
                    assert.equal(counter, 3);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });
});
