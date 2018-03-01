/**
 * LS-8 v2.0 emulator skeleton code
 */

const fs = require('fs');

// Instructions

const HLT = 0b00000001; // Halt CPU
// !!! IMPLEMENT ME
const LDI = 0b10011001;
const MUL = 0b10101010;
const PRN = 0b01000011;
const ADD = 0b10101000;
/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
    this.reg.IR = 0; // Instruction Register

    // Init the stack pointer
    // this.reg[SP] = 0xf3;

    this.setupBranchTable();
  }

  /**
   * Sets up the branch table
   */
  setupBranchTable() {
    let bt = {};

    bt[HLT] = this.HLT;
    // !!! IMPLEMENT ME
    bt[LDI] = this.LDI;
    bt[MUL] = this.MUL;
    bt[PRN] = this.PRN;
    bt[ADD] = this.ADD;

    this.branchTable = bt;
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    const _this = this;

    this.clock = setInterval(() => {
      _this.tick();
    }, 1);
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case 'AND':
        this.reg[regA] = this.reg[regA] & this.reg[regB];
        break;

      case 'MUL':
        // !!! IMPLEMENT ME
        this.reg[regA] = this.reg[regA] * this.reg[regB];
        break;

      case 'ADD':
        this.reg[regA] = this.reg[regA] + this.reg[regB];
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR) from the current PC
    // !!! IMPLEMENT ME
    this.reg.IR = this.ram.read(this.reg.PC);

    // Debugging output
    // console.log(`${this.reg.PC}: ${this.reg.IR.toString(2)}`);

    // Based on the value in the Instruction Register, locate the
    // appropriate hander in the branchTable
    // !!! IMPLEMENT ME
    const handler = this.branchTable[this.reg.IR];

    // Check that the handler is defined, halt if not (invalid
    // instruction)
    // !!! IMPLEMENT ME
    if (handler === undefined) {
      console.log(`ERROR: Unknown Instruction ${this.reg.IR.toString(2)}`);
      console.log('Instruction undefined: ', handler);
      this.stopClock();
      return;
    }

    let operandA = this.ram.read(this.reg.PC + 1);
    let operandB = this.ram.read(this.reg.PC + 2);

    // We need to use call() so we can set the "this" value inside
    // the handler (otherwise it will be undefined in the handler)
    handler.call(this, operandA, operandB);

    let bitMask = (this.reg.IR >> 6) & 0b00000011;

    // Increment the PC register to go to the next instruction
    // !!! IMPLEMENT ME
    this.reg.PC = this.reg.PC + bitMask + 1;
  }

  // INSTRUCTION HANDLER CODE:

  ADD(regA, regB) {
    this.alu('ADD', regA, regB);
  }

  AND(regA, regB) {
    this.alu('AND', regA, regB);
  }

  /**
   * HLT
   */
  HLT() {
    // !!! IMPLEMENT ME
    this.stopClock();
  }

  /**
   * LDI R,I
   */
  LDI(reg, value) {
    // !!! IMPLEMENT ME
    this.reg[reg] = value;
  }

  /**
   * MUL R,R
   */
  MUL(regA, regB) {
    // !!! IMPLEMENT ME
    this.alu('MUL', regA, regB);
  }

  /**
   * PRN R
   */
  PRN(reg) {
    // !!! IMPLEMENT ME
    fs.writeSync(process.stdout.fd, this.reg[reg]);
  }

  PUSH(regNum) {
    let value = this.reg[regNum];
    this.reg[SP] = this.reg[SP] - 1;

    this.ram.write(this.reg[SP], value);
  }
}

module.exports = CPU;
