/**
 * Created by firefish on 11/10/13.
 */
var opcodes = {
    '8086/8088': {
        'AAA': {
            name: "ASCII Adjust After Addition"
        },
        'AAD': {
            name: "ASCII Adjust AX Before Division"
        },
        'AAM': {
            name: "ASCII Adjust AX After Multiply"
        },
        'AAS': {
            name: "ASCII Adjust AL After Subtraction"
        },
        'ADC': {
            name: "Add with Carry"
        },
        'ADD': {
            name: "Add"
        },
        'AND': {
            name: "Logical AND"
        },
        'CALL': {
            name: "Call procedure"
        },
        'CBW': {
            name: "Convert byte to word"
        },
        'CLC': {
            name: "Clear carry flag"
        },
        'CLD': {
            name: "Clear direction flag"
        },
        'CLI': {
            name: "Clear interrupt flag"
        },
        'CMC': {
            name: "Complement carry flag"
        },
        'CMP': {
            name: "Compare operands"
        },
        'CMPSB': {
            name: "Compare bytes in memory"
        },
        'CMPSW': {
            name: "Compare words"
        },
        'CWD': {
            name: "Convert word to doubleword"
        },
        'DAA': {
            name: "Decimal adjust AL after addition"
        },
        'DAS': {
            name: "Decimal adjust AL after subtraction"
        },
        'DEC': {
            name: "Decrement by 1"
        },
        'DIV': {
            name: "Unsigned divide"
        },
        'ESC': {
            name: "Used with floating-point unit"
        },
        'HLT': {
            name: "Enter halt state"
        },
        'IDIV': {
            name: "Signed divide"
        },
        'IMUL': {
            name: "Signed multiply"
        },
        'IN': {
            name: "Input from port"
        },
        'INC': {
            name: "Increment by 1",
            key:  'INC',
            args: ['rax', 'rbx', 'rcx', 'rdx']
        },
        'INT': {
            name: "Call to interrupt"
        },
        'INTO': {
            name: "Call to interrupt if overflow"
        },
        'IRET': {
            name: "Return from interrupt"
        },
        'Jcc': {
            name: "Jump if condition"
        },
        'JCXZ': {
            name: "Jump if CX is zero"
        },
        'JMP': {
            name: "Jump"
        },
        'LAHF': {
            name: "Load flags into AH register"
        },
        'LDS': {
            name: "Load pointer using DS"
        },
        'LEA': {
            name: "Load Effective Address"
        },
        'LES': {
            name: "Load ES with pointer"
        },
        'LOCK': {
            name: "Assert BUS LOCK# signal"
        },
        'LODSB': {
            name: "Load string byte"
        },
        'LODSW': {
            name: "Load string word"
        },
        'LOOP/LOOPx': {
            name: "Loop control"
        },
        'MOV': {
            name: "Move 	copies data from one location to another"
        },
        'MOVSB': {
            name: "Move byte from string to string"
        },
        'MOVSW': {
            name: "Move word from string to string"
        },
        'MUL': {
            name: "Unsigned multiply"
        },
        'NEG': {
            name: "Two's complement negation"
        },
        'NOP': {
            name: "No operation"
        },
        'NOT': {
            name: "Negate the operand"
        },
        'OR': {
            name: "Logical OR"
        },
        'OUT': {
            name: "Output to port"
        },
        'POP': {
            name: "Pop data from stack"
        },
        'POPF': {
            name: "Pop data from flags register"
        },
        'PUSH': {
            name: "Push data onto stack"
        },
        'PUSHF': {
            name: "Push flags onto stack"
        },
        'RCL': {
            name: "Rotate left"
        },
        'RCR': {
            name: "Rotate right"
        },
        'REPxx': {
            name: "Repeat MOVS/STOS/CMPS/LODS/SCAS"
        },
        'RET': {
            name: "Return from procedure"
        },
        'RETN': {
            name: "Return from near procedure"
        },
        'RETF': {
            name: "Return from far procedure "
        },
        'ROL': {
            name: "Rotate left"
        },
        'ROR': {
            name: "Rotate right"
        },
        'SAHF': {
            name: "Store AH into flags"
        },
        'SAL': {
            name: "Shift Arithmetically left"
        },
        'SAR': {
            name: "Shift Arithmetically right"
        },
        'SBB': {
            name: "Subtraction with borrow"
        },
        'SCASB': {
            name: "Compare byte string"
        },
        'SCASW': {
            name: "Compare word string"
        },
        'SHL': {
            name: "Shift left (unsigned shift left)"
        },
        'SHR': {
            name: "Shift right (unsigned shift right)"
        },
        'STC': {
            name: "Set carry flag"
        },
        'STD': {
            name: "Set direction flag"
        },
        'STI': {
            name: "Set interrupt flag"
        },
        'STOSB': {
            name: "Store byte in string"
        },
        'STOSW': {
            name: "Store word in string"
        },
        'SUB': {
            name: "Subtraction"
        },
        'TEST': {
            name: "Logical compare (AND)"
        },
        'WAIT': {
            name: "Wait until not busy"
        },
        'XCHG': {
            name: "Exchange data"
        },
        'XLAT': {
            name: "Table look-up translation"
        },
        'XOR': {
            name: "Exclusive OR"
        }
    }
};

var cpu_init = {
    'eflags': '0123456789012345',
    'rip': '0123456789012345',
    'rax': '0123456789012345',
    'rbx': '0123456789012345',
    'rcx': '0123456789012345',
    'rdx': '0123456789012345',
    'rbp': '0123456789012345',
    'rsi': '0123456789012345',
    'rdi': '0123456789012345',
    'rsp': '0123456789012345',
    'r8': '0123456789012345',
    'r9': '0123456789012345',
    'r10': '0123456789012345',
    'r11': '0123456789012345',
    'r12': '0123456789012345',
    'r13': '0123456789012345',
    'r14': '0123456789012345',
    'r15': '0123456789012345'
};