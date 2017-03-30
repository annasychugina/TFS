function sum(arg) {
    let result = function(b) {
        return sum(arg + b);
    };

    result.toString = function() {
        return arg;
    };

    result.valueOf = function() {
        return arg;
    };

    return result;
}

console.log(sum(1)(2));
console.log(sum(1)(2)(3));
console.log(sum(3)(5)(6)(0));
