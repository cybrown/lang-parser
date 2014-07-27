var Attribute = require('./attribute');
var Method = require('./method');
var Container = require('./container');

var Class = function () {
    this._attributeContainer = new Container(Attribute);
    this._methodContainer = new Container(Method);
};

Class.prototype.getAttribute = function (name) {
    return this._attributeContainer.get(name);
};

Class.prototype.getAttributes = function () {
    return this._attributeContainer.getAll();
};

Class.prototype.getMethod = function (name) {
    return this._methodContainer.get(name);
};

Class.prototype.getMethods = function () {
    return this._methodContainer.getAll();
};

module.exports = Class;
