/**
 * Created by firefish on 11/10/13.
 */
var cf_flag = 1<<0;
var pf_flag = 1<<2;
var af_flag = 1<<4;
var zf_flag = 1<<6;
var sf_flag = 1<<7;
var tf_flag = 1<<8;
var if_flag = 1<<9;
var df_flag = 1<<10;
var of_flag = 1<<11;

function set_flags($scope, prev_val, val, mask){
    if(mask & zf_flag)
        if(val == 0)
            $scope.cpu['eflags'] |= zf_flag;
        else
            $scope.cpu['eflags'] &= ~zf_flag;

    if(mask & cf_flag)
        if( (val>>31)!=(prev_val>>31) )
            $scope.cpu['eflags'] |= cf_flag;
        else
            $scope.cpu['eflags'] &= ~cf_flag;
}

function execute_inc($scope){
    var prev_val = $scope.cpu[$scope.instructions_args];
    $scope.cpu[$scope.instructions_args]++;
    if($scope.cpu[$scope.instructions_args]>0xffffffff)
        $scope.cpu[$scope.instructions_args] = 0;
    set_flags($scope, prev_val, $scope.cpu[$scope.instructions_args], zf_flag|cf_flag);
}

function execute_dec($scope){
    var prev_val = $scope.cpu[$scope.instructions_args];
    $scope.cpu[$scope.instructions_args]--;
    if($scope.cpu[$scope.instructions_args]<0)
        $scope.cpu[$scope.instructions_args] = 0xffffffff;
    set_flags($scope, prev_val, $scope.cpu[$scope.instructions_args], zf_flag|cf_flag);
}

function execute_aaa($scope){
    var val = $scope.cpu['eax'];
    var al = val & 0xff;
    var ah = (val>>8) & 0xff;
    var flags = $scope.cpu['eflags'];

    if( ((val&0xf) > 9) || (flags&af_flag) ){
        al+=6;
        ah++;
        al = al&0xf;
        flags |= af_flag;
        flags |= cf_flag;
    }else{
        al = al&0xf;
        flags &= ~af_flag;
        flags &= ~cf_flag;
    }
    $scope.cpu['eax'] = val&0xffff0000 | ah<<8 | al;
    $scope.cpu['eflags'] = flags;
}

var gp_regs = [
    'eax',
    'ebx',
    'ecx',
    'edx',
    'ebp',
    'esp',
    'edi',
    'esi'
];
var opcodes = {
    '8086/8088': {
        'AAA': {
            name: "ASCII Adjust After Addition",
            execute: execute_aaa
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
            name: "Decrement by 1",
            arg1: gp_regs,
            execute: execute_dec
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
            arg1: gp_regs,
            execute: execute_inc
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
    'eflags': 0,
    'eip': 0x01234567,
    'eax': 0x01234567,
    'ebx': 0x01234567,
    'ecx': 0x01234567,
    'edx': 0x01234567,
    'ebp': 0x01234567,
    'esi': 0x01234567,
    'edi': 0x01234567,
    'esp': 0x01234567
};

var eflags = {
    'cf' : {
        pos : 0,
        name : 'Carry flag'
    },
    'pf' : {
        pos : 2,
        name : 'Parity flag'
    },
    'af' : {
        pos : 4,
        name : 'Adjust flag'
    },
    'zf' : {
        pos : 6,
        name : 'Zero flag'
    },
    'sf' : {
        pos : 7,
        name : 'Sign flag'
    },
    'if' : {
        pos : 9,
        name : 'Interrupt enable flag'
    }
}