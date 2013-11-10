/**
 * Created by firefish on 11/9/13.
 */
function str_inc(str){
    var len=str.length;
    var carry = 1;
    var res = '';
    for(var i = len-1; i>=0; i-- ){
        var val = parseInt( str.charAt(i), 16 )+carry;
        res=(val%16).toString(16) + res;
        carry = (val>=16)?1:0;
    }
    return res;
}

function CpuController($scope) {
    $scope.opcodes = opcodes;
    $scope.instructions_class = opcodes[Object.keys(opcodes)[0]];
    $scope.instructions_signature = $scope.instructions_class[Object.keys($scope.instructions_class)[0]];

    $scope.run_cmd = function(){
        if($scope.instructions_signature.key == 'INC'){
            $scope.cpu[$scope.instructions_args] = str_inc($scope.cpu[$scope.instructions_args]);
        }
    };

    var bits = [];
    var bytes = [];
    var registers = ['rax', 'rbx', 'rcx', 'rdx'];
    for (var i = 63; i >= 0; i--)
        bits.push(i);
    for (var i = 7; i >= 0; i--)
        bytes.push(i);
    $scope.bits = bits;
    $scope.bytes = bytes;
    $scope.registers = registers;
    $scope.cpu = cpu_init;
    $scope.get_bit = function (name, bit) {
        return (   parseInt($scope.cpu[name].substr((14 - 2*(bit >> 3) ), 2), 16) >> (bit % 8)   ) & 1;
    };
    $scope.get_byte = function (name, byte) {
        return '0x' + $scope.cpu[name].substr((14 - byte * 2), 2);
    };
    $scope.get_class = function (bit) {
        return ((bit >> 3) & 1) ? 'odd_byte' : 'even_byte';
    };
}