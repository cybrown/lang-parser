var nodes = require('./nodes');

var Typer = function (walker) {
    this._walker = walker;
};

Typer.prototype.process = function (node) {
    this._walker.setDelegate(this);
    this._walker.walk(node);
};

module.exports = Typer;
