var Scope = function (parent) {
	this._scope = {};
	this._parent = parent;
};

Scope.prototype.has = function (name) {
	if (this._scope.hasOwnProperty(name)) {
		return true;
	} else if (this._parent) {
		return this._parent.has(name);
	} else {
		return false;
	}
};

Scope.prototype.get = function (name) {
	if (this._scope.hasOwnProperty(name)) {
		return this._scope[name];
	} else if (this._parent) {
		return this._parent.get(name);
	} else {
		this._notFound(name);
	}
};

Scope.prototype.def = function (name, value) {
	if (this._scope.hasOwnProperty(name)) {
		this._alreadyDefined(name);
	}
	this._scope[name] = value;
};

Scope.prototype.del = function (name) {
	if (this._scope.hasOwnProperty(name)) {
		delete this._scope[name];
	} else if (this._parent) {
		return this._parent.del(name);
	} else {
		this._notFound(name);
	}
};

Scope.prototype._alreadyDefined = function (name) {
	throw new Error('Variable already defined: ' + name);
};

Scope.prototype._notFound = function (name) {
	throw new Error('Variable not found in scope: ' + name);
};

module.exports = Scope;
