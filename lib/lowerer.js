var entities = require('./entities');
var Program = entities.Program;

var Lowerer = function () {
    this._program = new Program();
    this._curNamespace = this._program.getNamespace('$default');
    this._curClass = this._curNamespace.getClass('$default');
    this._curClass.isInterface = false;
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
    walker.on('node.ClassDeclaration.enter', function (node) {
        _this._curClass = _this._curNamespace.getClass(node.name);
        _this._curClass.isInterface = false;
    });
    walker.on('node.ClassDeclaration.leave', function (node) {
        _this._curClass = _this._curNamespace.getClass('$default');
    });
    walker.on('node.InterfaceDeclaration.enter', function (node) {
        _this._curClass = _this._curNamespace.getClass(node.name);
        _this._curClass.isInterface = true;
    });
    walker.on('node.InterfaceDeclaration.leave', function (node) {
        _this._curClass = _this._curNamespace.getClass('$default');
    });
    walker.on('node.ClassAttribute.enter', function (node) {

    });
    walker.on('node.ClassAttribute.leave', function (node) {
        var attribute = _this._curClass.getAttribute(node.name);
        attribute.type = node.type;
    });

    return this._program;
};

module.exports = Lowerer;
