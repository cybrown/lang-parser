var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker Expressions', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk UnaryExpression', function (done) {
        var counter = 0;
        var node = nodes.UnaryExpression('!', nodes.Literal(42));
        walker.setDelegate({
            UnaryExpressionEnter: function (node) {
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
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            UnaryExpressionLeave: function (node) {
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

    it ('should walk BinaryExpression', function (done) {
        var counter = 0;
        var node = nodes.BinaryExpression(
            '+',
            nodes.Literal(1),
            nodes.Literal(2)
        );
        walker.setDelegate({
            BinaryExpressionEnter: function (node) {
                try {
                    assert.equal(node.operator, '+');
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    if (counter == 1) {
                        assert.equal(node.raw, 1);
                        assert.equal(counter, 1);
                    } else if (counter === 2) {
                        assert.equal(node.raw, 2);
                        assert.equal(counter, 2);
                    } else {
                        throw new Error('Illegal counter');
                    }
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            BinaryExpressionLeave: function (node) {
                try {
                    assert.equal(node.operator, '+');
                    assert.equal(counter, 3);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk AssignmentExpression', function (done) {
        var counter = 0;
        var node = nodes.AssignmentExpression(
            '+=',
            nodes.Identifier('variable'),
            nodes.Literal(2)
        );
        walker.setDelegate({
            AssignmentExpressionEnter: function (node) {
                try {
                    assert.equal(node.operator, '+=');
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            IdentifierEnter: function (node) {
                try {
                    assert.equal(node.name, 'variable');
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    assert.equal(node.raw, 2);
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            AssignmentExpressionLeave: function (node) {
                try {
                    assert.equal(node.operator, '+=');
                    assert.equal(counter, 3);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk CallExpression', function (done) {
        var counter = 0;
        var node = nodes.CallExpression(nodes.Identifier('func'), [
            nodes.Literal(1),
            nodes.Identifier('ok')
        ]);
        walker.setDelegate({
            CallExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            IdentifierEnter: function (node) {
                if (counter === 3) {
                    try {
                        assert.equal(counter, 3);
                        assert.equal(node.name, 'func');
                        counter++;
                    } catch (err) {
                        done(err);
                    }
                } else if (counter === 2) {
                    try {
                        assert.equal(counter, 2);
                        assert.equal(node.name, 'ok');
                        counter++;
                    } catch (err) {
                        done(err);
                    }
                }
            },
            LiteralLeave: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.raw, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            CallExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 4);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk BracketExpression', function (done) {
        var counter = 0;
        var node = nodes.BracketExpression([
            nodes.Literal(1),
            nodes.Identifier('ok')
        ]);
        walker.setDelegate({
            BracketExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.raw, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            IdentifierEnter: function (node) {
                try {
                    assert.equal(counter, 2);
                    assert.equal(node.name, 'ok');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            BracketExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 3);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk ConditionalExpression', function (done) {
        var counter = 0;
        var node = nodes.ConditionalExpression(
            nodes.Literal(1),
            nodes.Identifier('ok'),
            nodes.Literal(42)
        );
        walker.setDelegate({
            ConditionalExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                if (counter === 1) {
                    try {
                        assert.equal(counter, 1);
                        assert.equal(node.raw, 1);
                        counter++;
                    } catch (err) {
                        done(err);
                    }
                } else if (counter === 3) {
                    try {
                        assert.equal(counter, 3);
                        assert.equal(node.raw, 42);
                        counter++;
                    } catch (err) {
                        done(err);
                    }
                }
            },
            IdentifierEnter: function (node) {
                try {
                    assert.equal(counter, 2);
                    assert.equal(node.name, 'ok');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ConditionalExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 4);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk LambdaExpresion', function (done) {
        var counter = 0;
        var node = nodes.LambdaExpression(['x'], nodes.BinaryExpression(
            '+',
            nodes.Literal(2),
            nodes.Identifier('x')
        ));
        walker.setDelegate({
            LambdaExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            BinaryExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.operator, '+');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LiteralEnter: function (node) {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            IdentifierEnter: function (node) {
                try {
                    assert.equal(counter, 3);
                    assert.equal(node.name, 'x');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            LambdaExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 4);
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

    it ('should walk MemberExpression', function (done) {
        var counter = 0;
        var node = nodes.MemberExpression(
            nodes.Identifier('bar'),
            'foo'
        );
        var first = true;
        walker.setDelegate({
            MemberExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            IdentifierEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    assert.equal(node.name, 'bar');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            MemberExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    counter++;
                    done();
                } catch (err) {
                    done(err);
                }
            }
        });
        walker.walk(node);
    });

it ('should walk SubscriptExpression', function (done) {
    var counter = 0;
    var node = nodes.SubscriptExpression(
        nodes.Identifier('bar'),
        nodes.Literal(314)
    );
    walker.setDelegate({
        SubscriptExpressionEnter: function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        },
        IdentifierEnter: function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.name, 'bar');
                counter++;
            } catch (err) {
                done(err);
            }
        },
        LiteralEnter: function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.raw, 314);
                counter++;
            } catch (err) {
                done(err);
            }
        },
        SubscriptExpressionLeave: function (node) {
            try {
                assert.equal(counter, 3);
                counter++;
                done();
            } catch (err) {
                done(err);
            }
        }
    });
    walker.walk(node);
});
});
