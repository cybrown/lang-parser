var nodes = require('./nodes');

var Typer = function (walker) {
    this._walker = walker;
    this._types = {};
};

Typer.prototype.process = function (node) {
    this._walker.setDelegate(this);
    this._walker.walk(node);
};

Typer.prototype.setType = function (name, node) {
    this._types[name] = node;
};

Typer.prototype.LiteralEnter = function (node) {
    if (this.isInt32(node.raw)) {
        node.type = this._types.int32;
    } else if (this.isInt64(node.raw)) {
        node.type = this._types.int64;
    } else if (this.isInt64(node.raw)) {
        node.type = this._types.uint32;
    } else if (this.isInt64(node.raw)) {
        node.type = this._types.uint64;
    } else if (this.isBool(node.raw)) {
        node.type = this._types.bool;
    }
};

Typer.prototype.isBool = function (raw) {
    return raw === 'true' || raw === 'false';
};

Typer.prototype.isInt32 = function (raw) {
    return raw.match(/^[0-9]+$/);
};

Typer.prototype.isInt64 = function (raw) {
    return raw.match(/^[0-9]+l$/);
};

Typer.prototype.isUInt32 = function (raw) {
    return raw.match(/^[0-9]+u$/);
};

Typer.prototype.isUInt64 = function (raw) {
    return raw.match(/^[0-9]+lu$/);
};

Typer.prototype.AssignmentExpressionLeave = function (node) {
    if (!this.isCompatible(node.right.type, node.left.type)) {
        throw new Error('Types not compatible');
    }
    node.type = node.left.type;
};

Typer.prototype.ConditionalExpressionLeave = function (node) {
    if (!this.isCompatible(node.test.type, this._types.bool)) {
        throw new Error('Test condition of conditionnal expression must be a boolean')
    }
};

/**
 * Verify if the second type can have a value of first type
 * @param Type
 * @param Type
 * @returns {boolean}
 */
Typer.prototype.isCompatible = function (type, otherType) {
    return type == otherType;
};

module.exports = Typer;
