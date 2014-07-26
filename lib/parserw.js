var parser = require('./parser').parser;
parser.yy.node = require('./nodes');
parser.yy.types = require('./types');

module.exports = parser;
