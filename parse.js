var path = require('path');
var fs = require("fs");

var parser = require("./lib/parserw");

if (!process.argv[2]) {
    throw new Error("Usage: " + process.argv[1] + " FILE [OUTFILE]");
}
var source = fs.readFileSync(__dirname + '/' + process.argv[2]);
console.log(JSON.stringify(parser.parse(source.toString()), null, '    '));
