module.exports = {

    // Values

    Literal: function (value, type) {
        return {
            $type: 'Literal',
            raw: value,
            type: type
        };
    },
    Identifier: function (name) {
        return {
            $type: 'Identifier',
            name: name
        };
    },

    // Expressions

    UnaryExpression: function (operator, argument, prefix) {
        return {
            $type: 'UnaryExpression',
            operator: operator,
            argument: argument,
            prefix: prefix
        };
    },
    BinaryExpression: function (operator, left, right) {
        return {
            $type: 'BinaryExpression',
            operator: operator,
            left: left,
            right: right
        };
    },
    AssignmentExpression: function (operator, left, right) {
        return {
            $type: 'AssignmentExpression',
            operator: operator,
            left: left,
            right: right
        };
    },
    CallExpression: function (callee, arguments) {
        return {
            $type: 'CallExpression',
            callee: callee,
            arguments: arguments
        };
    },
    BracketExpression: function (items) {
        items = items == null ? [] : items;
        return {
            $type: 'BracketExpression',
            items: Array.isArray(items) ? items : [items]
        };
    },
    ConditionalExpression: function (test, consequent, alternate) {
        return {
            $type: 'ConditionalExpression',
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    },
    LambdaExpression: function (params, body) {
        return {
            $type: 'LambdaExpression',
            params: params,
            body: body
        };
    },
    SubscriptExpression: function (object, index) {
        return {
            $type: 'SubscriptExpression',
            object: object,
            index: index
        };
    },
    MemberExpression: function (object, property) {
        return {
            $type: 'MemberExpression',
            object: object,
            property: property
        };
    },

    // Statement

    ExpressionStatement: function (expression) {
        return {
            $type: 'ExpressionStatement',
            expression: expression
        };
    },
    BlockStatement: function (body) {
        body = body == null ? [] : body;
        return {
            $type: 'BlockStatement',
            body: Array.isArray(body) ? body : [body]
        };
    },
    ReturnStatement: function (argument) {
        return {
            $type: 'ReturnStatement',
            argument: argument
        };
    },
    ThrowStatement: function (argument) {
        return {
            $type: 'ThrowStatement',
            argument: argument
        };
    },
    TryStatement: function (block, handlers, finalizer) {
        return {
            $type: 'TryStatement',
            block: block,
            handlers: handlers,
            finalizer: finalizer
        };
    },
    CatchClause: function (name, type, body) {
        return {
            $type: 'CatchClause',
            param: {
                $type: 'Identifier',
                type: type,
                name: name
            },
            body: body
        };
    },

    // Declarations

    VariableDeclaration: function (name, type, init) {
        return {
            $type: 'VariableDeclaration',
            name: name,
            type: type,
            init: init || null
        };
    },
    ConstantDeclaration: function (name, type, init) {
        return {
            $type: 'ConstantDeclaration',
            name: name,
            type: type,
            init: init || null
        };
    },

    // Misc

    Program: function (body) {
        return {
            $type: 'Program',
            body: body
        };
    },
    NamespaceDeclaration: function (path, body) {
        return {
            $type: 'NamespaceDeclaration',
            path: path,
            body: body
        };
    },
    ClassDeclaration: function (kind, name, members, pExtends, pImplements) {
        return {
            $type: 'ClassDeclaration',
            name: name,
            members: members,
            extends: pExtends,
            isClass: kind === 'class',
            isInterface: kind === 'interface',
            implements: pImplements
        };
    },
    MemberDeclaration: function (kind, name, type, params, body) {
        return {
            $type: 'MemberDeclaration',
            name: name,
            type: type,
            returnType: type,
            params: params,
            body: body,
            isAttribute: kind === 'attribute',
            isMethod: kind === 'method'
        };
    },
    MethodParameter: function (name, type) {
        return {
            $type: 'MethodParameter',
            name: name,
            type: type
        };
    },

    // Types

    NamedType: function (name) {
        return {
            $type: 'NamedType',
            name: name
        };
    },
    FunctionType: function (returnType, argumentsType) {
        return {
            '$type': 'FunctionType',
            returnType: returnType,
            argumentsType: argumentsType
        };
    },
    ArrayType: function (type) {
        return {
            $type: 'ArrayType',
            type: type
        };
    }
};
