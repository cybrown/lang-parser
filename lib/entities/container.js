var Container = function (Cls) {
    this._items = {};
    this.Cls = Cls;
};

Container.prototype.get = function (name) {
    if (!this._items.hasOwnProperty(name)) {
        this._items[name] = new this.Cls();
    }
    return this._items[name];
};

Container.prototype.getAll = function () {
    var _this = this;
    return Object.keys(this._items).map(function (key) {
        return {
            name: key,
            value: _this._items[key]
        };
    });
};

module.exports = Container;
