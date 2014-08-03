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
    '+': function (stack) {
        var b = stack[stack.length - 1];
        stack.pop();
        var a = stack[stack.length - 1];
        stack.pop();
        stack.push(a + b);
    },
    '-': function (stack) {
        var b = stack[stack.length - 1];
        stack.pop();
        var a = stack[stack.length - 1];
        stack.pop();
        stack.push(a - b);
    },
    print: function (stack) {
        console.log(stack[stack.length - 1]);
    }
};

var stack = [];

var doLoad = true;

var setValue = function (name, value) {
    scope[name] = value;
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

//Object.keys(program.namespaces.main.classes.Main.methods).forEach(function (key) {
//    scope[key] = program.namespaces.main.classes.Main.methods[key];
//});

newScope();

runner.setDelegate({
    LiteralLeave: function (node) {
        stack.push(Number(node.value));
    },
    IdentifierLeave: function (node) {
        if (doLoad) {
            stack.push(getValue(node.name));
        } else {
            stack.push(node.name);
        }
        doLoad = true;
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
        doLoad = false;
    },
    AssignmentExpressionLeave: function (node) {
        var b = stack[stack.length - 1];
        stack.pop();
        var a = stack[stack.length - 1];
        stack.pop();
        setValue(a, b);
        stack.push(b);
    },
    BlockStatementEnter: function (node) {
        newScope();
    },
    BlockStatementLeave: function (node) {
        deleteScope();
    },
    onUnknown: function (node) {
        console.error('Unknown node type: ' + node.$type);
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
    var cls = method.$$class;
    Object.keys(cls.methods).forEach(function (key) {
        scope[key] = cls.methods[key];
    });
    for (var i = method.params.length - 1; i >= 0; i--) {
        scope[method.params[i].name] = stack[stack.length - 1];
        stack.pop();
    }
    runner.walk(method.body);
    deleteScope();
    deleteFrame();
};

callMethod(program.namespaces['main'].classes['Main'].methods.main);
