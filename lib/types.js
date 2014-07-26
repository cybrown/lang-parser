var acc = 1;

module.exports = {
    PrimitiveType: function (size, float, unsigned) {
        return {
            $type: 'PrimitiveType',
            size: size,
            float: float,
            unsigned: unsigned
        };
    },
    ReferenceType: function (type, nullable) {
        return {
            $type: 'ReferenceType',
            type: type,
            nullable: nullable
        };
    },
    ArrayType: function (type) {
        return {
            $type: 'ArrayType',
            type: type
        };
    },
    GenericType: function (type, parameters) {
        return {
            $type: 'GenericType',
            type: type,
            parameters: parameters
        };
    },
    QualifiedType: function (type, qualifiers) {
        return {
            $type: 'QualifiedType',
            type: type,
            qualifiers: qualifiers
        };
    }
};
