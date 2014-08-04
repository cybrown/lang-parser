var nodes = require('./nodes');

var Lowerer = function (walker) {
    this._walker = walker;
    this._programStack = [];
    this._namespaceStack = [];
};

Lowerer.prototype.getCurrentProgram = function () {
    return this._programStack[this._programStack.length - 1];
};

Lowerer.prototype.getCurrentNamespace = function () {
    return this._namespaceStack[this._namespaceStack.length - 1];
};

Lowerer.prototype.getCurrentClass = function () {
    return this.currentClass;
};

Lowerer.prototype.process = function (node) {
    this._walker.setDelegate(this);
    this._walker.walk(node);
};

Lowerer.prototype.ProgramEnter = function (node) {
    this._programStack.push(node);
    node.namespaces = {};
};

Lowerer.prototype.ProgramLeave = function (node) {
    this._programStack.pop();
};

Lowerer.prototype.NamespaceDeclarationEnter = function (node) {
    if (node.path.length > 1) {
        var newNamespace = nodes.NamespaceDeclaration(node.path.slice(1), node.body);
        node.body = [newNamespace];
    }
    node.namespaces = {};
    node.classes = {};
    node.name = node.path[0];
    var ns = this.getCurrentNamespace();
    if (ns) {
        ns.namespaces[node.name] = node;
    } else {
        this.getCurrentProgram().namespaces[node.name] = node;
    }
    this._namespaceStack.push(node);
};

Lowerer.prototype.NamespaceDeclarationLeave = function (node) {
    this._namespaceStack.pop();
};

Lowerer.prototype.ClassDeclarationEnter = function (node) {
    if (this.currentClass) {
        throw new Error('Already in a class');
    }
    this.currentClass = node;
    node.methods = {};
    node.attributes = {};
    this.getCurrentNamespace().classes[node.name] = node;
};

Lowerer.prototype.ClassDeclarationLeave = function () {
    this.currentClass = null;
};

Lowerer.prototype.ClassMethodEnter = function (node) {
    this.getCurrentClass().methods[node.name] = node;
    node.$$class = this.getCurrentClass();
};

Lowerer.prototype.BinaryExpressionLeave = function (node) {
    if (node.operator === '&&') {
        return nodes.ConditionalExpression(node.left, node.left, node.right);
    } else if (node.operator === '||') {
        return nodes.ConditionalExpression(node.left, node.right, node.left);
    } else {
        return nodes.CallExpression(
            nodes.MemberExpression(node.left, '$binary$' + node.operator),
            [node.right]
        );
    }
};

Lowerer.prototype.AssignmentExpressionEnter = function (node) {
    if (node.operator != '=') {
        var op = node.operator.slice(0, -1);
        node.operator = '=';
        node.right = nodes.BinaryExpression(op, node.left, node.right);
    }
};

Lowerer.prototype.UnaryExpressionEnter = function (node) {
    if (node.prefix) {
        if (node.operator === '++') {
            return nodes.AssignmentExpression(
                '+=',
                node.argument,
                nodes.Literal('1', null)
            );
        } else if (node.operator === '--') {
            return nodes.AssignmentExpression(
                '-=',
                node.argument,
                nodes.Literal('1', null)
            );
        }
    }
};

Lowerer.prototype.UnaryExpressionLeave = function (node) {
    if (['!', '-', '~', '^'].indexOf(node.operator) !== -1) {
        return nodes.CallExpression(
            nodes.Identifier('$unary$' + node.operator),
            [node.argument]
        );
    }
};

Lowerer.prototype.ClassAttributeEnter = function (node) {
    this.getCurrentClass().attributes[node.name] = node;
};

module.exports = Lowerer;
