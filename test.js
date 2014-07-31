/*
 * Block:
 * opcode: i8
 * args: Block[]
 * next: Literal[]
 */

/*
 * Literal:
 * $type: LiteralType
 * value: any
 */

/*
 * LiteralType:
 * 'i8'
 * 'i16'
 * 'i32'
 * 'i64'
 * 'f32'
 * 'f64'
 * 'block'
 */


var Literal = function () {
    this._type = null;
    this._value = null;
};

Literal.prototype.setType = function (type) {
    this._size = 0;
    this._type = type;
};

Literal.prototype.setValue = function (value) {
    this._size = 0;
    this._value = value;
};

Literal.prototype.getSize = function () {
    switch (this._type) {
        case 'i8':
            this._size = 1;
            break;
        case 'i16':
            this._size = 2;
            break;
        case 'i32':
            this._size = 4;
            break;
        case 'i64':
            this._size = 8;
            break;
        case 'f32':
            this._size = 4;
            break;
        case 'f64':
            this._size = 8;
            break;
        default:
            throw new Error('Unknown literal type: ' + this._type);
    }
    return this._size;
};

Literal.prototype.writeToStream = function () {

};


var Instruction = function () {
    this._opcode = null;
    this._arguments = [];
    this._values = [];
    this._size = 0;
};

Instruction.prototype.setOpcode = function (opcode) {
    this._size = 0;
    this._opcode = opcode;
};

Instruction.prototype.addArgument = function (instruction) {
    this._size = 0;
    this._arguments.push(instruction);
};

Instruction.prototype.addValue = function (literal) {
    this._size = 0;
    this._values.push(literal);
};

Instruction.prototype.getSize = function () {
    if (!this._size) {
        this._size = 1;
        this._size += this._arguments.reduce(function (prev, instruction) {
            return prev + instruction.getSize();
        }, 0);
        this._size += this._values.reduce(function (prev, value) {
            return prev + value.getSize();
        }, 0);
    }
    return this._size;
};

Instruction.prototype.writeToStream = function () {

};


var Block = function () {
    this._size = 0;
    this._address = 0;
    this._instructions = [];
};

Block.prototype.addInstruction = function (instruction) {
    this._size = 0;
    this._instructions.push(instruction);
};

Block.prototype.getSize = function () {
    if (!this._size) {
        this._size = this._instructions.reduce(function (prev, instruction) {
            return prev + instruction.getSize();
        }, 0);
    }
    return this._size;
};

Block.prototype.writeToStream = function () {

};


var Opcodes = {
    ADD: 10,
    CONST: 11
};


var literal1 = new Literal();
literal1.setType('i32');
literal1.setValue(1);

var literal2 = new Literal();
literal2.setType('i32');
literal2.setValue(2);

var instruction_const_1 = new Instruction();
instruction_const_1.setOpcode(Opcodes.CONST);
instruction_const_1.addValue(literal2);

var instruction_const_2 = new Instruction();
instruction_const_2.setOpcode(Opcodes.CONST);
instruction_const_2.addValue(literal2);

var instruction = new Instruction();
instruction.setOpcode(Opcodes.ADD);
instruction.addArgument(instruction_const_1);
instruction.addArgument(instruction_const_2);

var block = new Block();
block.addInstruction(instruction);

console.log(block.getSize());
