module.exports = {

    // Values

    Literal: function (value) {
        return {
            type: 'Literal',
            value: value
        };
    },
    Identifier: function (name) {
        return {
            type: 'Identifier',
            name: name
        };
    },

    // Expressions

    UnaryExpression: function (operator, argument) {
        return {
            type: 'UnaryExpression',
            operator: operator,
            argument: argument
        };
    },
    BinaryExpression: function (operator, left, right) {
        return {
            type: 'BinaryExpression',
            operator: operator,
            left: left,
            right: right
        };
    },
    AssignmentExpression: function (operator, left, right) {
        return {
            type: 'AssignmentExpression',
            operator: operator,
            left: left,
            right: right
        };
    },
    CallExpression: function (callee, arguments) {
        return {
            type: 'CallExpression',
            callee: callee,
            arguments: arguments
        };
    },
    BracketExpression: function (items) {
        items = items == null ? [] : items;
        return {
            type: 'BracketExpression',
            items: Array.isArray(items) ? items : [items]
        };
    },
    ConditionalExpression: function (test, consequent, alternate) {
        return {
            type: 'ConditionalExpression',
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    },
    LambdaExpression: function (params, body) {
        return {
            type: 'LambdaExpression',
            params: params,
            body: body
        };
    },
    SubscriptExpression: function (object, index) {
        return {
            type: 'SubscriptExpression',
            object: object,
            index: index
        };
    },
    MemberExpression: function (object, property) {
        return {
            type: 'MemberExpression',
            object: object,
            property: property
        };
    },

    // Statement

    ExpressionStatement: function (expression) {
        return {
            type: 'ExpressionStatement',
            expression: expression
        };
    },
    BlockStatement: function (body) {
        body = body == null ? [] : body;
        return {
            type: 'BlockStatement',
            body: Array.isArray(body) ? body : [body]
        };
    },
    ReturnStatement: function (argument) {
        return {
            type: 'ReturnStatement',
            argument: argument
        };
    },
    ThrowStatement: function (argument) {
        return {
            type: 'ThrowStatement',
            argument: argument
        };
    },
    TryStatement: function (block, handlers, finalizer) {
        return {
            type: 'TryStatement',
            block: block,
            handlers: handlers,
            finalizer: finalizer
        };
    },
    CatchClause: function (name, kind, body) {
        return {
            type: 'CatchClause',
            param: {
                type: 'Identifier',
                kind: kind,
                name: name
            },
            body: body
        };
    },

    // Misc

    Program: function (body) {
        return {
            type: 'Program',
            body: body
        };
    },
    ClassDeclaration: function (name, members) {
        return {
            type: 'ClassDeclaration',
            name: name,
            members: members
        };
    },
    InterfaceDeclaration: function (name, members) {
        return {
            type: 'InterfaceDeclaration',
            name: name,
            members: members
        };
    },
    ClassAttribute: function (name, kind) {
        return {
            type: 'ClassAttribute',
            name: name,
            kind: kind
        };
    },
    ClassMethod: function (name, returnKind, parameters, body) {
        return {
            type: 'ClassMethod',
            name: name,
            returnKind: returnKind,
            parameters: parameters,
            body: body
        };
    },
    MethodParameter: function (name, kind) {
        return {
            type: 'MethodParameter',
            name: name,
            kind: kind
        };
    },
    VariableDeclaration: function (name, kind, init) {
        return {
            type: 'VariableDeclaration',
            name: name,
            kind: kind,
            init: init || null
        };
    },
    ConstantDeclaration: function (name, kind, init) {
        return {
            type: 'ConstantDeclaration',
            name: name,
            kind: kind,
            init: init || null
        };
    }
};