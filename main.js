/**
 * Created by firefish on 11/9/13.
 */
angular.module('customControl', []).
    directive('hexeditable', function() {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if(!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.val(ngModel.$viewValue.toString(16));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(read);
                });
                //read(); // initialize

                // Write data to the model
                function read() {
                    var val = element.val();
                    ngModel.$setViewValue( parseInt(val, 16) || 0 );
                }
            }
        };
    });

function CpuController($scope) {
    $scope.opcodes = opcodes;
    $scope.eflags = eflags;
    $scope.instructions_class = Object.keys(opcodes)[0];
    $scope.instructions_signature = Object.keys($scope.opcodes[$scope.instructions_class])[0];

    $scope.run_cmd = function(){
        if('execute' in $scope.opcodes[$scope.instructions_class][$scope.instructions_signature]){
            $scope.opcodes[$scope.instructions_class][$scope.instructions_signature].execute($scope);
        }
    };

    var bits = [];
    var bytes = [];
    for (var i = 31; i >= 0; i--)
        bits.push(i);
    for (var i = 3; i >= 0; i--)
        bytes.push(i);
    $scope.bits = bits;
    $scope.bytes = bytes;
    $scope.registers = gp_regs;
    $scope.cpu = cpu_init;
    $scope.get_flag = function (bit) {
        return ($scope.cpu['eflags'] >> bit) & 1;
    };
    $scope.get_bit = function (name, bit) {
        return ($scope.cpu[name] >> bit) & 1;
    };
    $scope.get_byte = function (name, byte) {
        val = (($scope.cpu[name] >> (8*byte)) & 255).toString(16);
        return (val.length>1 ? '0x' : '0x0')+val;
    };
    $scope.get_class = function (bit) {
        return ((bit >> 3) & 1) ? 'odd_byte' : 'even_byte';
    };
}