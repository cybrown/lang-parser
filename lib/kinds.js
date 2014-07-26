var acc = 1;

module.exports = [
    'SIGNED_INTEGER',
    'UNSIGNED_INTEGER',
    'FLOAT',
    'DOUBLE',
    'STRING'
].reduce(function (prev, name) {
    prev[name] = acc++;
    return prev;
}, {});
