/**
 * LS-8 v2.0 emulator skeleton code
 */

const fs = require('fs');

// Instructions

const HLT = 0b00000001; // Halt CPU
// !!! IMPLEMENT ME
const LDI = 0b10011001;
// MUL
// PRN

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
    // bt[MUL] = this.MUL;
    // bt[PRN] = this.PRN;

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
      case 'MUL':
        // !!! IMPLEMENT ME
        break;
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
    console.log(`${this.reg.PC}: ${this.reg.IR.toString(2)}`);

    // Based on the value in the Instruction Register, locate the
    // appropriate hander in the branchTable
    // !!! IMPLEMENT ME
    let handler = this.branchTable[this.reg.IR];

    // Check that the handler is defined, halt if not (invalid
    // instruction)
    // !!! IMPLEMENT ME
    if (handler === undefined) {
      console.log(`ERROR: Unknown Instruction ${this.reg.IR.toString(2)}`);
      console.log('Instruction undefined: ', handler);
      this.HLT();
      return;
    }

    const operandA = this.ram.read(this.reg.PC + 1);
    const operandB = this.ram.read(this.reg.PC + 2);

    // We need to use call() so we can set the "this" value inside
    // the handler (otherwise it will be undefined in the handler)
    handler(operandA, operandB);
    let bitMask = ((this.reg.IR >> 6) & 3) + 1;
    this.reg.PC + bitMask;
    console.log(bitMask);
    // Increment the PC register to go to the next instruction
    // !!! IMPLEMENT ME
    this.reg.PC++;
  }

  // INSTRUCTION HANDLER CODE:

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
  MUL() {
    // !!! IMPLEMENT ME
  }

  /**
   * PRN R
   */
  PRN() {
    // !!! IMPLEMENT ME
    console.log(this.reg[0]);
  }
}

module.exports = CPU;
