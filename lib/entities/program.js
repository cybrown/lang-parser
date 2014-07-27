var Namespace = require('./Namespace');
var Container = require('./Container');

var Program = function () {
    this._namespaceContainer = new Container(Namespace);
};

Program.prototype.getNamespace = function (name) {
    return this._namespaceContainer.get(name);
};

Program.prototype.getNamespaces = function () {
    return this._namespaceContainer.getAll();
};

module.exports = Program;
