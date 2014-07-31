var entities = require('./entities');
var Program = entities.Program;

var Lowerer = function () {
    this._program = new Program();
    this._curNamespace = this._program.getNamespace('$default');
    this._curClass = this._curNamespace.getClass('$default');
    this._curClass.isInterface = false;
    this._curMethod = null;
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
    walker.on('node.ClassMethod.enter', function (node) {
        _this._curMethod = _this._curClass.getMethod(node.name);
    });
    walker.on('node.MethodParameter.enter', function (node) {

    });
    walker.on('node.MethodParameter.leave', function (node) {
        var parameter = new entities.Parameter();
        parameter.name = node.name;
        parameter.type = node.type;
        _this._curMethod.parameters.push(parameter);
    });
    walker.on('node.ClassMethod.leave', function (node) {
        _this._curMethod.returnType = node.returnType;
        _this._curMethod.body = node.body;
        _this._curMethod = null;
    });

    walker.on('node.BinaryExpression.enter', function (node) {

    });
    walker.on('node.BinaryExpression.leave', function (node) {

    });

    return this._program;
};

module.exports = Lowerer;
