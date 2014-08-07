var assert = require('assert');
var Typer = require('../../lib/typer');
var Walker = require('../../lib/walker');
var nodes = require('../../lib/nodes');

describe ('Typer internals', function () {

    var typer;
    var boolClass;
	var int32Class
	var int64Class;
	var uint32Class;
	var uint64Class;
	var float32Class;
	var float64Class;
	var stringClass;
	var baseClass;
	var subClass;

    beforeEach(function () {
        typer = new Typer(new Walker());

        boolClass = nodes.ClassDeclaration('class', 'bool', []);
        int32Class = nodes.ClassDeclaration('class', 'int', []);
        int64Class = nodes.ClassDeclaration('class', 'long', []);
        uint32Class = nodes.ClassDeclaration('class', 'uint', []);
        uint64Class = nodes.ClassDeclaration('class', 'long', []);
        float32Class = nodes.ClassDeclaration('class', 'long', []);
        float64Class = nodes.ClassDeclaration('class', 'long', []);
        stringClass = nodes.ClassDeclaration('class', 'string', []);

        typer.setType('bool', boolClass);
        typer.setType('int32', int32Class);
        typer.setType('int64', int64Class);
        typer.setType('uint32', uint32Class);
        typer.setType('uint64', uint64Class);
        typer.setType('float32', float32Class);
        typer.setType('float64', float64Class);
        typer.setType('string', stringClass);

        baseClass = nodes.ClassDeclaration('class', 'Base', []);
        subClass = nodes.ClassDeclaration('class', 'Sub', []);
    });

    describe ('Type compatibility', function () {

        it ('should return true with 2 int32', function () {
            assert.equal(typer.isCompatible(int32Class, int32Class), true);
        });

        it ('should return false with int32 and int64', function () {
            assert.equal(typer.isCompatible(int32Class, int64Class), false);
        });

        xit ('should return true with a super class as second argument', function () {

        });

        xit ('should return false with a super class as first argument', function () {

        });

        xit ('should return true with an implemented interface as second argument', function () {

        });

        xit ('should return true with a structural compatible type as second argument', function () {

        });
    });

    describe ('Method finder', function () {

        xit ('should find the most suitable method in a list for a list of types', function () {

        });
    });
});
