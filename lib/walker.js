var EventEmitter = require('events').EventEmitter;

var Walker = function () {
    EventEmitter.call(this);
};
Walker.prototype = Object.create(EventEmitter.prototype);

Walker.prototype.walk = function (node) {
    var _this = this;
    if (node === null) {
        this.emit('node.null');
        return;
    }
    this.emit('node', node);
    this.emit('node.' + node.$type + '.enter', node);
    switch (node.$type) {
        // Operators
        case 'UnaryExpression':
            this.walk(node.argument);
            break;
        case 'BinaryExpression':
            this.walk(node.left);
            this.walk(node.right);
            break;
        case 'AssignmentExpression':
            this.walk(node.left);
            this.walk(node.right);
            break;
        case 'CallExpression':
            this.walk(node.callee);
            node.arguments.forEach(function (argument) {
                _this.walk(argument);
            });
            break;
        case 'BracketExpression':
            node.items.forEach(function (item) {
                _this.walk(item);
            });
            break;
        case 'ConditionalExpression':
            this.walk(node.test);
            this.walk(node.consequent);
            this.walk(node.alternate);
            break;
        case 'LambdaExpression':
            this.walk(node.body);
            break;
        case 'MemberExpression':
            this.walk(node.object);
            this.walk(node.property);
            break;
        case 'SubscriptExpression':
            this.walk(node.object);
            this.walk(node.index);
            break;
        // Statements
        case 'ExpressionStatement':
            this.walk(node.expression);
            break;
        case 'BlockStatement':
            node.body.forEach(function (node) {
                _this.walk(node);
            });
            break;
        case 'ThrowStatement':
            this.walk(node.argument);
            break;
        case 'ReturnStatement':
            this.walk(node.argument);
            break;
        case 'TryStatement':
            this.walk(node.block);
            node.handlers.forEach(function (handler) {
                _this.walk(handler);
            });
            this.walk(node.finalizer);
            break;
        case 'CatchClause':
            this.walk(node.body);
            break;
        // Declarations
        case 'VariableDeclaration':
            this.walk(node.init);
            break;
        case 'ConstantDeclaration':
            this.walk(node.init);
            break;
        case 'ClassDeclaration':
            node.members.forEach(function (member) {
                _this.walk(member);
            });
            break;
        case 'InterfaceDeclaration':
            node.members.forEach(function (member) {
                _this.walk(member);
            });
            break;
        case 'ClassMethod':
            node.parameters.forEach(function (parameter) {
                _this.walk(parameter);
            });
            this.walk(node.body);
            break;
        case 'NamespaceDeclaration':
            node.body.forEach(function (statement) {
                _this.walk(statement);
            });
            break;
        // Misc
        case 'Program':
            node.body.forEach(function (statement) {
                _this.walk(statement);
            });
            this.walk(node.body);
            break;
    }
    this.emit('node.' + node.$type + '.leave', node);
};

module.exports = Walker;
