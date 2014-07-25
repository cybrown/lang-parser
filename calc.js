'use strict';

var Walker = require('./lib/walker');
var parser = require('./lib/parserw');

var text = process.argv[2] || "1+1;"

var program = parser.parse(text);

var stack = [];

var walker = new Walker();

walker.on('node.UnaryExpression.leave', function (node) {
    var a = stack[stack.length - 1];
    stack.pop();
    var r = 0;
    switch (node.operator) {
        case '+':
            r = +a;
            break;
        case '-':
            r = -a;
            break;
        case '!':
            r = !a;
            break;
        case '~':
            r = ~a;
            break;
        default:
            throw new Error('Unknown unary operator: ' + node.operator);
    }
    stack.push(r);
});

walker.on('node.BinaryExpression.leave', function (node) {
    var b = stack[stack.length - 1];
    stack.pop();
    var a = stack[stack.length - 1];
    stack.pop();
    var r = 0;
    switch (node.operator) {
        case '+':
            r = a + b;
            break;
        case '-':
            r = a - b;
            break;
        case '*':
            r = a * b;
            break;
        case '/':
            r = a / b;
            break;
        case '%':
            r = a % b;
            break;
        case '&':
            r = a & b;
            break;
        case '|':
            r = a | b;
            break;
        case '^':
            r = a ^ b;
            break;
        case '<<':
            r = a << b;
            break;
        case '>>':
            r = a >> b;
            break;
        case '||':
            r = a || b;
            break;
        case '&&':
            r = a && b;
            break;
        default:
            throw new Error('Unknown binary operator: ' + node.operator);
    }
    stack.push(r);
});

walker.on('node.Literal', function (node) {
    stack.push(parseInt(node.value));
});

walker.walk(program);

console.log(stack[0]);
