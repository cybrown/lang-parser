var parser = require('./parser').parser;
parser.yy.node = require('./nodes');

module.exports = parser;
