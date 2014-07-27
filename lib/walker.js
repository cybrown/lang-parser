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
    switch (node.$type) {
        // Values
        case 'Literal':
            this.emit('node.Literal', node);
            break;
        case 'Identifier':
            this.emit('node.Identifier', node);
            break;
        // Operators
        case 'UnaryExpression':
            this.emit('node.UnaryExpression.enter', node);
            this.walk(node.argument);
            this.emit('node.UnaryExpression.leave', node);
            break;
        case 'BinaryExpression':
            this.emit('node.BinaryExpression.enter', node);
            this.walk(node.left);
            this.walk(node.right);
            this.emit('node.BinaryExpression.leave', node);
            break;
        case 'AssignmentExpression':
            this.emit('node.AssignmentExpression.enter', node);
            this.walk(node.left);
            this.walk(node.right);
            this.emit('node.AssignmentExpression.leave', node);
            break;
        case 'CallExpression':
            this.emit('node.CallExpression.enter', node);
            this.walk(node.callee);
            node.arguments.forEach(function (argument) {
                _this.walk(argument);
            });
            this.emit('node.CallExpression.leave', node);
            break;
        case 'BracketExpression':
            this.emit('node.BracketExpression.enter', node);
            node.items.forEach(function (item) {
                _this.walk(item);
            });
            this.emit('node.BracketExpression.leave', node);
            break;
        case 'ConditionalExpression':
            this.emit('node.ConditionalExpression.enter', node);
            this.walk(node.test);
            this.walk(node.consequent);
            this.walk(node.alternate);
            this.emit('node.ConditionalExpression.leave', node);
            break;
        case 'LambdaExpression':
            this.emit('node.LambdaExpression.enter', node);
            this.walk(node.body);
            this.emit('node.LambdaExpression.leave', node);
            break;
        case 'MemberExpression':
            this.emit('node.MemberExpression.enter', node);
            this.walk(node.object);
            this.walk(node.property);
            this.emit('node.MemberExpression.leave', node);
            break;
        case 'SubscriptExpression':
            this.emit('node.SubscriptExpression.enter', node);
            this.walk(node.object);
            this.walk(node.index);
            this.emit('node.SubscriptExpression.leave', node);
            break;
        // Statements
        case 'ExpressionStatement':
            this.emit('node.ExpressionStatement.enter', node);
            this.walk(node.expression);
            this.emit('node.ExpressionStatement.leave', node);
            break;
        case 'BlockStatement':
            this.emit('node.BlockStatement.enter', node);
            node.body.forEach(function (node) {
                _this.walk(node);
            });
            this.emit('node.BlockStatement.leave', node);
            break;
        case 'ThrowStatement':
            this.emit('node.ThrowStatement.enter', node);
            this.walk(node.argument);
            this.emit('node.ThrowStatement.leave', node);
            break;
        case 'ReturnStatement':
            this.emit('node.ReturnStatement.enter', node);
            this.walk(node.argument);
            this.emit('node.ReturnStatement.leave', node);
            break;
        case 'TryStatement':
            this.emit('node.TryStatement.enter', node);
            this.walk(node.block);
            node.handlers.forEach(function (handler) {
                _this.walk(handler);
            });
            this.walk(node.finalizer);
            this.emit('node.TryStatement.leave', node);
            break;
        case 'CatchClause':
            this.emit('node.CatchClause.enter', node);
            this.walk(node.body);
            this.emit('node.CatchClause.leave', node);
            break;
        // Declarations
        case 'VariableDeclaration':
            this.emit('node.VariableDeclaration.enter', node);
            this.walk(node.init);
            this.emit('node.VariableDeclaration.leave', node);
            break;
        case 'ConstantDeclaration':
            this.emit('node.ConstantDeclaration.enter', node);
            this.walk(node.init);
            this.emit('node.ConstantDeclaration.leave', node);
            break;
        case 'ClassDeclaration':
            this.emit('node.ClassDeclaration.enter', node);
            node.members.forEach(function (member) {
                _this.walk(member);
            });
            this.emit('node.ClassDeclaration.leave', node);
            break;
        case 'InterfaceDeclaration':
            this.emit('node.InterfaceDeclaration.enter', node);
            node.members.forEach(function (member) {
                _this.walk(member);
            });
            this.emit('node.InterfaceDeclaration.leave', node);
            break;
        case 'MethodParameter':
            this.emit('node.MethodParameter.enter', node);
            this.emit('node.MethodParameter.leave', node);
            break;
        case 'ClassAttribute':
            this.emit('node.ClassAttribute.enter', node);
            this.emit('node.ClassAttribute.leave', node);
            break;
        case 'ClassMethod':
            this.emit('node.ClassMethod.enter', node);
            node.parameters.forEach(function (parameter) {
                _this.walk(parameter);
            });
            this.walk(node.body);
            this.emit('node.ClassMethod.leave', node);
            break;
        case 'NamespaceDeclaration':
            this.emit('node.NamespaceDeclaration.enter', node);
            node.body.forEach(function (statement) {
                _this.walk(statement);
            });
            this.emit('node.NamespaceDeclaration.leave', node);
            break;
        // Misc
        case 'Program':
            this.emit('node.Program.enter', node);
            node.body.forEach(function (statement) {
                _this.walk(statement);
            });
            this.walk(node.body);
            this.emit('node.Program.leave', node);
            break;
    }
};

module.exports = Walker;
