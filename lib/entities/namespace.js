var Class = require('./Class');
var Container = require('./Container');

var Namespace = function () {
    this._classContainer = new Container(Class);
};

Namespace.prototype.getClass = function (name) {
    return this._classContainer .get(name);
};

module.exports = Namespace;
