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
});
