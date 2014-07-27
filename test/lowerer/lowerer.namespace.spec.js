var assert = require('assert');
var nodes = require('../../lib/nodes');
var EventEmitter = require('events').EventEmitter;
var Lowerer = require('../../lib/lowerer');

describe ('Lowerer Namespace', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer();
    });

    it ('should lower a namespace', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.NamespaceDeclaration.enter',
            nodes.NamespaceDeclaration(['com', 'lowerer'], null)
        );
        assert.equal(prgm.getNamespaces().length, 2);
        assert.equal(prgm.getNamespaces()[0].name, '$default');
        assert.equal(prgm.getNamespaces()[1].name, 'com.lowerer');
        done();
    });

    it ('should lower multiple namespaces', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.NamespaceDeclaration.enter',
            nodes.NamespaceDeclaration(['com', 'lowerer'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.leave',
            nodes.NamespaceDeclaration(['com', 'lowerer'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.enter',
            nodes.NamespaceDeclaration(['baz'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.leave',
            nodes.NamespaceDeclaration(['baz'], null)
        );
        assert.equal(prgm.getNamespaces().length, 3);
        assert.equal(prgm.getNamespaces()[0].name, '$default');
        assert.equal(prgm.getNamespaces()[1].name, 'com.lowerer');
        assert.equal(prgm.getNamespaces()[2].name, 'baz');
        done();
    });

    it ('should lower compound namespaces', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.NamespaceDeclaration.enter',
            nodes.NamespaceDeclaration(['com', 'lowerer'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.enter',
            nodes.NamespaceDeclaration(['baz'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.leave',
            nodes.NamespaceDeclaration(['baz'], null)
        );
        walker.emit(
            'node.NamespaceDeclaration.leave',
            nodes.NamespaceDeclaration(['com', 'lowerer'], null)
        );
        assert.equal(prgm.getNamespaces().length, 3);
        assert.equal(prgm.getNamespaces()[0].name, '$default');
        assert.equal(prgm.getNamespaces()[1].name, 'com.lowerer');
        assert.equal(prgm.getNamespaces()[2].name, 'com.lowerer.baz');
        done();
    });
});
