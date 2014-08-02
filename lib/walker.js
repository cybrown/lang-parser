var EventEmitter = require('events').EventEmitter;

var Walker = function () {
    EventEmitter.call(this);
    this._delegate = null;
};
Walker.prototype = Object.create(EventEmitter.prototype);

Walker.prototype.setDelegate = function (delegate) {
    this._delegate = delegate;
};

Walker.prototype.walk = function (node, parent, property, index) {
    var _this = this;
    if (node === null) {
        this.emit('node.null');
        return;
    }
    var hasOnUnknown = !!this._delegate.onUnknown;
    if (this._delegate[node.$type + 'Enter']) {
        this._delegate[node.$type + 'Enter'](node);
    } else if (hasOnUnknown) {
        this._delegate.onUnknown(node);
    }
    switch (node.$type) {
        // Operators
        case 'UnaryExpression':
            this.walk(node.argument, node, 'argument');
            break;
        case 'BinaryExpression':
            this.walk(node.left, node, 'left');
            this.walk(node.right, node, 'right');
            break;
        case 'AssignmentExpression':
            this.walk(node.left, node, 'left');
            this.walk(node.right, node, 'right');
            break;
        case 'CallExpression':
            node.arguments.forEach(function (argument, index) {
                _this.walk(argument, node, 'arguments', index);
            });
            this.walk(node.callee, node, 'callee');
            break;
        case 'BracketExpression':
            node.items.forEach(function (item, index) {
                _this.walk(item, node, 'items', index);
            });
            break;
        case 'ConditionalExpression':
            this.walk(node.test, node, 'test');
            this.walk(node.consequent, node, 'consequent');
            this.walk(node.alternate, node, 'alternate');
            break;
        case 'LambdaExpression':
            this.walk(node.body, node, 'body');
            break;
        case 'MemberExpression':
            this.walk(node.object, node, 'object');
            this.walk(node.property, node, 'property');
            break;
        case 'SubscriptExpression':
            this.walk(node.object, node, 'object');
            this.walk(node.index, node, 'index');
            break;
        // Statements
        case 'ExpressionStatement':
            this.walk(node.expression, node, 'expression');
            break;
        case 'BlockStatement':
            node.body.forEach(function (node, index) {
                _this.walk(node, node, 'body', index);
            });
            break;
        case 'ThrowStatement':
            this.walk(node.argument, node, 'argument');
            break;
        case 'ReturnStatement':
            this.walk(node.argument, node, 'argument');
            break;
        case 'TryStatement':
            this.walk(node.block, node, 'block');
            node.handlers.forEach(function (handler, index) {
                _this.walk(handler, node, 'handlers', index);
            });
            this.walk(node.finalizer, node, 'finalizer');
            break;
        case 'CatchClause':
            this.walk(node.body, node, 'body');
            break;
        // Declarations
        case 'VariableDeclaration':
            this.walk(node.init, node, 'init');
            break;
        case 'ConstantDeclaration':
            this.walk(node.init, node, 'init');
            break;
        case 'ClassDeclaration':
            node.members.forEach(function (member, index) {
                _this.walk(member, node, 'members', index);
            });
            break;
        case 'InterfaceDeclaration':
            node.members.forEach(function (member, index) {
                _this.walk(member, node, 'members', index);
            });
            break;
        case 'ClassMethod':
            node.params.forEach(function (parameter, index) {
                _this.walk(parameter, node, 'params', index);
            });
            this.walk(node.body, node, 'body');
            break;
        case 'NamespaceDeclaration':
            node.body.forEach(function (statement, index) {
                _this.walk(statement, node, 'body', index);
            });
            break;
        // Misc
        case 'Program':
            node.body.forEach(function (statement, index) {
                _this.walk(statement, node, 'body', index);
            });
            this.walk(node.body, node, 'body');
            break;
    }
    if (this._delegate[node.$type + 'Leave']) {
        var res = this._delegate[node.$type + 'Leave'](node);
        if (res !== undefined) {
            if (index !== undefined) {
                parent[property][index] = res;
            } else {
                parent[property] = res;
            }
        }
    } else if (hasOnUnknown) {
        this._delegate.onUnknown(node);
    }
};

module.exports = Walker;
