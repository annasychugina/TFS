let t2 = function intersection(arr1, arr2) {
    let arr = [];

    arr1.map(function(elem) {
        if (arr2.indexOf(elem) >= 0) {
            arr.push(elem);
        }
    });

    return arr;

}([1, 3, 5, 7, 9],[1, 2, 3, 4]);

console.log(t2);
