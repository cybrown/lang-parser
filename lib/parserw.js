var parser = require('./parser').parser;
parser.yy.node = require('./nodes');
parser.yy.kinds = require('./kinds');

module.exports = parser;
