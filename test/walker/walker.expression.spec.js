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
        walker.on('node.UnaryExpression.enter', function (node) {
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
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.UnaryExpression.leave', function (node) {
            try {
                assert.equal(counter, 2);
                done();
            } catch (err) {
                done(err);
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

    it ('should walk AssignmentExpression', function (done) {
        var counter = 0;
        var node = nodes.AssignmentExpression(
            '+=',
            nodes.Identifier('variable'),
            nodes.Literal(2)
        );
        walker.on('node.AssignmentExpression.enter', function (node) {
            try {
                assert.equal(node.operator, '+=');
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            try {
                assert.equal(node.name, 'variable');
                assert.equal(counter, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(node.value, 2);
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.AssignmentExpression.leave', function (node) {
            try {
                assert.equal(node.operator, '+=');
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.CallExpression.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            if (counter !== 1) return;
            try {
                assert.equal(counter, 1);
                assert.equal(node.name, 'func');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.value, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            if (counter !== 3) return;
            try {
                assert.equal(counter, 3);
                assert.equal(node.name, 'ok');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.CallExpression.leave', function (node) {
            try {
                assert.equal(counter, 4);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.BracketExpression.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.name, 'ok');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.BracketExpression.leave', function (node) {
            try {
                assert.equal(counter, 3);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.ConditionalExpression.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            if (counter !== 1) return;
            try {
                assert.equal(counter, 1);
                assert.equal(node.value, 1);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            try {
                assert.equal(counter, 2);
                assert.equal(node.name, 'ok');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Literal', function (node) {
            if (counter !== 3) return;
            try {
                assert.equal(counter, 3);
                assert.equal(node.value, 42);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.ConditionalExpression.leave', function (node) {
            try {
                assert.equal(counter, 4);
                done();
            } catch (err) {
                done(err);
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
        walker.on('node.LambdaExpression.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
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
        walker.on('node.Literal', function (node) {
            try {
                assert.equal(counter, 2);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            try {
                assert.equal(counter, 3);
                assert.equal(node.name, 'x');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.LambdaExpression.leave', function (node) {
            try {
                assert.equal(counter, 4);
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });

    it ('should walk MemberExpression', function (done) {
        var counter = 0;
        var node = nodes.MemberExpression(
            nodes.Identifier('bar'),
            nodes.Identifier('foo')
        );
        walker.on('node.MemberExpression.enter', function (node) {
            try {
                assert.equal(counter, 0);
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.Identifier', function (node) {
            if (counter !== 1) return;
            try {
                assert.equal(counter, 1);
                assert.equal(node.name, 'bar');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        var first = true;
        walker.on('node.Identifier', function (node) {
            if (first) {
                first = false;
                return;
            }
            if (counter !== 2) return;
            try {
                assert.equal(counter, 2);
                assert.equal(node.name, 'foo');
                counter++;
            } catch (err) {
                done(err);
            }
        });
        walker.on('node.MemberExpression.leave', function (node) {
            try {
                assert.equal(counter, 3);
                counter++;
                done();
            } catch (err) {
                done(err);
            }
        });
        walker.walk(node);
    });
});
