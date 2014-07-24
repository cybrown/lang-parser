var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk Literal', function (done) {
        var node = nodes.Literal(42);
        walker.on('node.Literal', function (node) {
            try {
                assert(node.value == 42);
                done();
            } catch (err) {
                done(err);
            }
        });

        walker.walk(node);
    });

    it ('should walk UnaryExpression', function () {
        var counter = 0;
        walker.on('node.UnaryExpression.enter', function (node) {
            counter++;
        });
        walker.on('node.UnaryExpression.enter', function (node) {
            done();
        });
    });

    it ('should walk BinaryExpression', function (done) {
        var counter = 0;
        var node = nodes.BinaryExpression(
            '+',
            nodes.Literal(1),
            nodes.Literal(2)
        );
        walker.on('node.BinaryExpression.enter', function (node) {
            try {
                assert.equal(node.operator, '+');
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                if (counter == 1) {
                    assert.equal(node.value, 1);
                    assert.equal(counter, 1);
                } else if (counter === 2) {
                    assert.equal(node.value, 2);
                    assert.equal(counter, 2);
                } else {
                    throw new Error('Illegal counter');
                }
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BinaryExpression.leave', function (node) {
            try {
                assert.equal(node.operator, '+');
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
            }
        });

        walker.walk(node);
    });
});
