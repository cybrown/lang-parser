var fs = require('fs');
var Walker = require('./lib/walker');
var parser = require('./lib/parserw');
var Lowerer = require('./lib/lowerer');

var text = fs.readFileSync(process.argv[2]).toString();
var program = parser.parse(text);
var walker = new Walker();
var lowerer = new Lowerer();


var prgm = lowerer.construct(walker);
walker.walk(program);

console.log(prgm);
