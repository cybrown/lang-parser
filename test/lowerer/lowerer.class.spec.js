var assert = require('assert');
var nodes = require('../../lib/nodes');
var EventEmitter = require('events').EventEmitter;
var Lowerer = require('../../lib/lowerer');

describe ('Lowerer Class', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer();
    });

    it ('should lower a class', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.ClassDeclaration.enter',
            nodes.ClassDeclaration('Foo', null)
        );
        walker.emit(
            'node.ClassDeclaration.leave',
            nodes.ClassDeclaration('Foo', null)
        );
        walker.emit(
            'node.InterfaceDeclaration.enter',
            nodes.InterfaceDeclaration('IFoo', null)
        );
        walker.emit(
            'node.InterfaceDeclaration.leave',
            nodes.InterfaceDeclaration('IFoo', null)
        );
        var classes = prgm.getNamespace('$default').getClasses();
        assert.equal(classes.length, 3);
        assert.equal(classes[0].name, '$default');
        assert.equal(classes[1].name, 'Foo');
        assert.equal(classes[1].value.isInterface, false);
        assert.equal(classes[2].name, 'IFoo');
        assert.equal(classes[2].value.isInterface, true);
        done();
    });
});
