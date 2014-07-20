var parser = require('./parser').parser;
parser.yy.node = {
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
    CallExpression: function (callee, arguments) {
        if (arguments.type && arguments.type === 'ItemList') {
            arguments = arguments.items;
        } else if (arguments == null) {
            arguments = [];
        } else if (!Array.isArray(arguments)) {
            arguments = [arguments];
        }
        return {
            type: 'CallExpression',
            callee: callee,
            arguments: arguments
        };
    },
    ParenthesisExpression: function (elements) {
        return {
            type: 'ParenthesisExpression',
            elements: elements
        };
    },
    BracketExpression: function (items) {
        items = items == null ? [] : items;
        return {
            type: 'BracketExpression',
            items: Array.isArray(items) ? items : [items]
        };
    },
    LambdaExpression: function (params, body) {
        return {
            type: 'LambdaExpression',
            params: params,
            body: body
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
    BlockStatement: function (body) {
        body = body == null ? [] : body;
        return {
            type: 'BlockExpression',
            body: Array.isArray(body) ? body : [body]
        };
    }
};

module.exports = parser;
