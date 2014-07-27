var assert = require('assert');
var nodes = require('../../lib/nodes');
var types = require('../../lib/types');
var EventEmitter = require('events').EventEmitter;
var Lowerer = require('../../lib/lowerer');

describe ('Lowerer Class Method', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer();
    });

    it ('should lower a class method', function (done) {
        var walker = new EventEmitter();
        var prgm = lowerer.construct(walker);
        walker.emit(
            'node.ClassDeclaration.enter',
            nodes.ClassDeclaration('Foo', null)
        );
        walker.emit(
            'node.ClassMethod.enter',
            nodes.ClassMethod(
                'getAge',
                types.PrimitiveType(32, false, false),
                [
                    nodes.MethodParameter('x', types.PrimitiveType(64, false, false))
                ],
                nodes.ExpressionStatement(null)
            )
        );
        walker.emit(
            'node.MethodParameter.enter',
            nodes.MethodParameter('x', types.PrimitiveType(64, false, false))
        );
        walker.emit(
            'node.MethodParameter.leave',
            nodes.MethodParameter('x', types.PrimitiveType(64, false, false))
        );
        walker.emit(
            'node.ClassMethod.leave',
            nodes.ClassMethod('getAge', types.PrimitiveType(32, false, false))
        );
        walker.emit(
            'node.ClassDeclaration.leave',
            nodes.ClassDeclaration('Foo', null)
        );
        var classes = prgm.getNamespace('$default').getClasses();
        assert.equal(classes[1].name, 'Foo');
        assert.equal(classes[1].value.isInterface, false);
        var Foo = classes[1].value;
        var methods = Foo.getMethods();
        assert.equal(methods.length, 1);
        assert.equal(methods[0].name, 'getAge');
        assert.equal(methods[0].value.returnType.$type, 'PrimitiveType');
        assert.equal(methods[0].value.parameters.length, 1);
        assert.equal(methods[0].value.parameters[0].name, 'x');
        done();
    });
});
