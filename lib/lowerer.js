var entities = require('./entities');
var Program = entities.Program;

var Lowerer = function () {
    this._program = new Program();
    this._curNamespace = this._program.getNamespace('$default');
    this._curNamespacePath = [];
};

Lowerer.prototype.construct = function (walker) {
    var _this = this;
    walker.on('node.NamespaceDeclaration.enter', function (node) {
        node.path.forEach(function (name) {
            _this._curNamespacePath.push(name);
        });
        _this._curNamespace = _this._program.getNamespace(_this._curNamespacePath.join('.'));
    });
    walker.on('node.NamespaceDeclaration.leave', function (node) {
        node.path.forEach(function (name) {
            _this._curNamespacePath.pop();
        });
        if (_this._curNamespacePath.length) {
            _this._curNamespace = _this._program.getNamespace(_this._curNamespacePath.join('.'));
        } else {
            _this._curNamespace = null;
        }
    });

    return this._program;
};

module.exports = Lowerer;
