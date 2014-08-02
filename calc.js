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

var main = program.namespaces['main'].classes['Main'].methods['main'];

var runner = new Walker();

var builtins = {
    '+': function (stack) {
        var a = stack[stack.length - 1];
        var b = stack[stack.length - 1];
        stack.pop();
        stack.pop();
        stack.push(a + b);
    },
    print: function (stack) {
        console.log(stack[stack.length - 1]);
    }
};

var stack = [];

runner.setDelegate({
    LiteralLeave: function (node) {
        stack.push(Number(node.value));
    },
    IdentifierLeave: function (node) {
        stack.push(node.name);
    },
    CallExpressionLeave: function (node) {
        var method = builtins[stack[stack.length - 1]];
        stack.pop();
        method(stack);
    },
    ExpressionStatementLeave: function (node) {
        stack.pop();
    },
    onUnknown: function (node) {
        console.error('Unknown node type: ' + node.$type);
    }
});

runner.walk(main.body);
