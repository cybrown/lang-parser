var assert = require('assert');
var Lowerer = require('../../lib/lowerer');
var EventEmitter = require('events').EventEmitter;

describe ('Lowerer', function () {

    var lowerer;

    beforeEach(function () {
        lowerer = new Lowerer();
    });

    it ('should take a walker', function (done) {
        var walker = new EventEmitter();
        lowerer.construct(walker);
        done();
    });
});
