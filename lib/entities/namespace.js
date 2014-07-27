var Class = require('./Class');
var Container = require('./Container');

var Namespace = function () {
    this._classContainer = new Container(Class);
};

Namespace.prototype.getClass = function (name) {
    return this._classContainer .get(name);
};

Namespace.prototype.getClasses = function () {
    return this._classContainer.getAll();
};

module.exports = Namespace;
