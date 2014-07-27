var Attribute = require('./attribute');
var Container = require('./container');

var Class = function () {
    this._attributeContainer = new Container(Attribute);
};

Class.prototype.getAttribute = function (name) {
    return this._attributeContainer .get(name);
};

Class.prototype.getAttributes = function () {
    return this._attributeContainer.getAll();
};

module.exports = Class;
