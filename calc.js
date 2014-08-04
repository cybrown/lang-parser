'use strict';

var fs = require('fs');
var Walker = require('./lib/walker');
var Lowerer = require('./lib/lowerer');
var parser = require('./lib/parserw');

var text = fs.readFileSync('test.txt').toString();
var program = parser.parse(text);
var walker = new Walker();

var walker = new Walker();
var lowerer = new Lowerer(walker);
lowerer.process(program);

var runner = new Walker();

var builtins = {
    'int32add': function (stack) {
        var type = stack[stack.length - 1].type;
        var b = stack[stack.length - 1].value;
        stack.pop();
        var a = stack[stack.length - 1].value;
        stack.pop();
        stack.push({
            value: a + b,
            type: type
        })
    },
    'int32sub': function (stack) {
        var type = stack[stack.length - 1].type;
        var b = stack[stack.length - 1].value;
        stack.pop();
        var a = stack[stack.length - 1].value;
        stack.pop();
        stack.push({
            value: a - b,
            type: type
        })
    },
    'int32mul': function (stack) {
        var type = stack[stack.length - 1].type;
        var b = stack[stack.length - 1].value;
        stack.pop();
        var a = stack[stack.length - 1].value;
        stack.pop();
        stack.push({
            value: a * b,
            type: type
        })
    },
    'int32eq': function (stack) {
        var type = stack[stack.length - 1].type;
        var b = stack[stack.length - 1].value;
        stack.pop();
        var a = stack[stack.length - 1].value;
        stack.pop();
        stack.push({
            value: a === b,
            type: type
        });
    },
    'int32ne': function (stack) {
        var type = stack[stack.length - 1].type;
        var b = stack[stack.length - 1].value;
        stack.pop();
        var a = stack[stack.length - 1].value;
        stack.pop();
        stack.push({
            value: a !== b,
            type: type
        });
    },
    print: function (stack) {
        console.log(stack[stack.length - 1]);
    }
};

var stack = [];

var _push = stack.push.bind(stack);
Object.defineProperty(stack, 'push', {
    iterable: false,
    value: function (value) {
        _push(value);
        if (value === null) {
            1+1;
        }
    }
});

var doLoad = true;

var setValue = function (name, value) {
    getValue(name);
    scope[name] = value;
};

var defineValue = function (name) {
    scope[name] = undefined;
};

var getValue = function (name, pScope) {
    if (!pScope) {
        pScope = scope;
    }
    if (pScope.hasOwnProperty(name)) {
        return pScope[name];
    } else if (pScope.$parent) {
        return getValue(name, pScope.$parent);
    } else {
        throw new Error('Variable ' + name + ' does not exist');
    }
};

var newScope = function () {
    var newScope;
    if (scope === null) {
        scope = builtins;
    }
    var newScope = {
        $parent: scope
    };
    scope = newScope;
};

var deleteScope = function () {
    if (scope.$parent) {
        scope = scope.$parent;
    } else {
        throw new Error('No scope to delete');
    }
};

var curClass = program.namespaces.main.classes.Main;

runner.setDelegate({
    VariableDeclarationLeave: function (node) {
        defineValue(node.name);
        if (node.init) {
            var value = stack[stack.length - 1];
            stack.pop();
            setValue(node.name, value);
        }
    },
    LiteralLeave: function (node) {
        stack.push({
            value: Number(node.raw),
            type: typeInt
        })
    },
    IdentifierLeave: function (node) {
        if (doLoad) {
            stack.push(getValue(node.name));
        } else {
            stack.push(node.name);
            doLoad = true;
        }
    },
    CallExpressionEnter: function (node) {
        if (node.callee.$type === 'MemberExpression' && !node.isThisAdded) {
            node.isThisAdded = true;
            node.arguments.unshift(node.callee.object);
        }
    },
    CallExpressionLeave: function (node) {
        var method = stack[stack.length - 1];
        stack.pop();
        if (typeof method === 'function') {
            method(stack);
        } else {
            callMethod(method);
        }
    },
    ExpressionStatementLeave: function (node) {
        stack.pop();
    },
    AssignmentExpressionEnter: function (node) {
        if (node.left.$type === 'MemberExpression') {
            node.left.doLoad = false;
        } else {
            doLoad = false;
        }
    },
    AssignmentExpressionLeave: function (node) {
        var b = stack[stack.length - 1];
        stack.pop();
        var a = stack[stack.length - 1];
        stack.pop();
        if (Array.isArray(a)) {
            a[0][a[1]] = b;
        } else {
            setValue(a, b);
        }
        stack.push(b);
    },
    MemberExpressionLeave: function (node) {
        var obj = stack[stack.length - 1];
        stack.pop();
        if (node.doLoad !== false) {
            if (obj.hasOwnProperty(node.property)) {
                stack.push(obj[node.property]);
            } else if (obj.type.methods.hasOwnProperty(node.property)) {
                stack.push(obj.type.methods[node.property]);
            } else {
                throw new Error('Member ' + node.property + ' not found.');
            }
        } else {
            stack.push([obj, node.property]);
        }
    },
    ConditionalExpressionEnter: function (node) {
        if (node.consequent) {
            node._consequent = node.consequent;
            node.consequent = null;
        }
        if (node.alternate) {
            node._alternate = node.alternate;
            node.alternate = null;
        }
    },
    ConditionalExpressionLeave: function (node) {
        var test = stack[stack.length - 1].value;
        stack.pop();
        if (test) {
            runner.walk(node._consequent);
        } else {
            runner.walk(node._alternate);
        }
        1+1;
    },
    ReturnStatementEnter: function (node) {
        1+1;
    },
    ReturnStatementLeave: function (node) {
        var err = new Error('ok');
        err.returnFromCall = true;
        throw err;
    },
    BlockStatementEnter: function (node) {
        newScope();
    },
    BlockStatementLeave: function (node) {
        deleteScope();
    },
    onUnknown: function (node) {
        //console.error('Unknown node type: ' + node.$type);
    }
});

var scope = null;

var frames = [];

var newFrame = function () {
    frames.push(scope);
    scope = null;
};

var deleteFrame = function () {
    scope = frames[frames.length - 1];
    frames.pop();
};

var callMethod = function (method) {
    newFrame();
    newScope();
    for (var i = method.params.length - 1; i >= 0; i--) {
        scope[method.params[i].name] = stack[stack.length - 1];
        stack.pop();
    }
    scope['this'] = stack[stack.length - 1];
    stack.pop();
    try {
        runner.walk(method.body);
    } catch (err) {
        if (!err.returnFromCall) {
            throw err;
        }
    }
    deleteScope();
    deleteFrame();
};

var instantiate = function (cls) {
    var data = {};
    Object.keys(cls.attributes).forEach(function (attributeName) {
        data[cls.attributes[attributeName].name] = 0;
    });
    Object.keys(cls.methods).forEach(function (methodName) {
        data[cls.methods[methodName].name] = cls.methods[methodName];
    });
    return data;
};

var firstObject = instantiate(program.namespaces['main'].classes['Main']);

var typeInt = program.namespaces['lang'].classes['int'];

stack.push(firstObject);
stack.push({
    value: 10,
    type: typeInt
});
callMethod(program.namespaces['main'].classes['Main'].methods.main);
