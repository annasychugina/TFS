let t3 = function unwrap(arr) {

    return arr.reduce(function(a, b) {

        return a.concat(b);
    })
}([[1,2], [3,4,5], [6]]);

    console.log(t3);
