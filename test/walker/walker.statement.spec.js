var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker Statements', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk ExpressionStatement', function (done) {
        var counter = 0;
        var node = nodes.ExpressionStatement(
            nodes.BinaryExpression('+', nodes.Literal(1), nodes.Literal(2))
        );
        walker.setDelegate({
            ExpressionStatementEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    ++counter;
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
            BinaryExpressionLeave: function (node) {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function (node) {
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

    it ('should walk BlockStatement', function (done) {
        var counter = 0;
        var node = nodes.BlockStatement(
            nodes.ExpressionStatement(
                nodes.BinaryExpression(
                    '+',
                    nodes.Literal(1),
                    nodes.Literal(2)
                )
            )
        );
        walker.setDelegate({
            BlockStatementEnter: function (node) {
                try {
                    assert.equal(counter, 0);
                    ++counter;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementEnter: function (node) {
                try {
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            BinaryExpressionEnter: function (node) {
                try {
                    assert.equal(counter, 2);
                    assert.equal(node.operator, '+');
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function (node) {
                try {
                    assert.equal(counter, 3);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            BlockStatementLeave: function (node) {
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

    it ('should walk ReturnStatement', function (done) {
        var counter = 0;
        var node = nodes.ReturnStatement(
            nodes.Literal(2)
        );
        walker.setDelegate({
            ReturnStatementEnter: function (node) {
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
                    assert.equal(node.raw, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ReturnStatementLeave: function (node) {
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

    it ('should walk ThrowStatement', function (done) {
        var counter = 0;
        var node = nodes.ThrowStatement(
            nodes.Literal(2)
        );
        walker.setDelegate({
            ThrowStatementEnter: function (node) {
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
                    assert.equal(node.raw, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ThrowStatementLeave: function (node) {
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

    it ('should walk TryStatement', function (done) {
        var counter = 0;
        var node = nodes.TryStatement(
            nodes.ThrowStatement(
                nodes.Literal(42)
            ),
            [nodes.CatchClause('a', null,
                nodes.ExpressionStatement(
                    nodes.Literal(42)
                )
            )],
            nodes.ExpressionStatement(
                nodes.Literal(42)
            )
        );
        walker.setDelegate({
            TryStatementEnter: function () {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ThrowStatementEnter: function () {
                try {
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ThrowStatementLeave: function () {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            CatchClauseEnter: function () {
                try {
                    assert.equal(counter, 3);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            CatchClauseLeave: function () {
                try {
                    assert.equal(counter, 6);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementEnter: function () {
                try {
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function () {
                try {
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            TryStatementLeave: function () {
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

    it ('should walk CatchClause', function (done) {
        var counter = 0;
        var node = nodes.CatchClause('a', null,
            nodes.ExpressionStatement(
                nodes.Literal(42)
            )
        );
        walker.setDelegate({
            CatchClauseEnter: function () {
                try {
                    assert.equal(counter, 0);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementEnter: function () {
                try {
                    assert.equal(counter, 1);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            ExpressionStatementLeave: function () {
                try {
                    assert.equal(counter, 2);
                    counter++;
                } catch (err) {
                    done(err);
                }
            },
            CatchClauseLeave: function () {
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
});
