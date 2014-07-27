var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');
var assert = require('assert');

describe ('Walker Values', function () {

    var walker;

    beforeEach(function () {
        walker = new Walker();
    });

    it ('should walk Literal', function (done) {
        var node = nodes.Literal(42);
        walker.on('node.Literal.enter', function (node) {
            try {
                assert.equal(node.value, 42);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk Identifier', function (done) {
        var node = nodes.Identifier('a');
        walker.on('node.Identifier.enter', function (node) {
            try {
                assert.equal(node.name, 'a');
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });
});
