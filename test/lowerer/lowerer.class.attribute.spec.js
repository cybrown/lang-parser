var assert = require('assert');
var nodes = require('../../lib/nodes');
var types = require('../../lib/types');
var EventEmitter = require('events').EventEmitter;
var Lowerer = require('../../lib/lowerer');

describe ('Lowerer Class Attribute', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer();
    });

    it ('should lower a class attribute', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.ClassDeclaration.enter',
            nodes.ClassDeclaration('Foo', null)
        );
        walker.emit(
            'node.ClassAttribute.enter',
            nodes.ClassAttribute('age', types.PrimitiveType(32, false, false))
        );
        walker.emit(
            'node.ClassAttribute.leave',
            nodes.ClassAttribute('age', types.PrimitiveType(32, false, false))
        );
        walker.emit(
            'node.ClassDeclaration.leave',
            nodes.ClassDeclaration('Foo', null)
        );
        var classes = prgm.getNamespace('$default').getClasses();
        assert.equal(classes[1].name, 'Foo');
        assert.equal(classes[1].value.isInterface, false);
        var Foo = classes[1].value;
        var attributes = Foo.getAttributes();
        assert.equal(attributes.length, 1);
        assert.equal(attributes[0].name, 'age');
        done();
    });
});
