var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker Misc', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk Program', function (done) {
        var counter = 0;
        var node = nodes.Program([
            nodes.ExpressionStatement(nodes.Literal(42))
        ]);
        walker.on('node.Program.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
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
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.value, 42);
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
        walker.on('node.Program.leave', function (node) {
            try {
                assert.equal(counter, 4);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should not die when a null value is walked', function (done) {
        var node = nodes.VariableDeclaration(
            'a',
            null,
            null
        );
        walker.on('node.VariableDeclaration.leave', function () {
            done();
        });
        walker.walk(node);
    })
});
