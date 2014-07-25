var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker Expressions', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk ExpressionStatement', function (done) {
        var counter = 0;
        var node = nodes.ExpressionStatement(
            nodes.BinaryExpression('+', nodes.Literal(1), nodes.Literal(2))
        );
        walker.on('node.ExpressionStatement.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BinaryExpression.enter', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.operator, '+');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BinaryExpression.leave', function (node) {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function (node) {
            try {
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.BlockStatement.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.enter', function (node) {
            try {
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BinaryExpression.enter', function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.operator, '+');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function (node) {
            try {
                assert.equal(counter, 3);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BlockStatement.leave', function (node) {
            try {
                assert.equal(counter, 4);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ReturnStatement', function (done) {
        var counter = 0;
        var node = nodes.ReturnStatement(
            nodes.Literal(2)
        );
        walker.on('node.ReturnStatement.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ReturnStatement.leave', function (node) {
            try {
                assert.equal(counter, 2);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk ThrowStatement', function (done) {
        var counter = 0;
        var node = nodes.ThrowStatement(
            nodes.Literal(2)
        );
        walker.on('node.ThrowStatement.enter', function (node) {
            try {
                assert.equal(counter, 0);
                ++counter;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ThrowStatement.leave', function (node) {
            try {
                assert.equal(counter, 2);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.TryStatement.enter', function () {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ThrowStatement.enter', function () {
            try {
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ThrowStatement.leave', function () {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.CatchClause.enter', function () {
            try {
                assert.equal(counter, 3);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.CatchClause.leave', function () {
            try {
                assert.equal(counter, 6);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.enter', function () {
            try {
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function () {
            try {
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.TryStatement.leave', function () {
            try {
                assert.equal(counter, 9);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.CatchClause.enter', function () {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.enter', function () {
            try {
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ExpressionStatement.leave', function () {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.CatchClause.leave', function () {
            try {
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });
});
