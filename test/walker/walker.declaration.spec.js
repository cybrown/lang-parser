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
        walker.on('node.VariableDeclaration.enter', function (node) {
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
        walker.on('node.Literal', function (node) {
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
});
