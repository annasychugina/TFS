let t1 = function toBinary(n, s) {
    if (n === 0) {

        return s;
    } else {

        return toBinary(~~(n / 2), (n % 2) + s);
    }
}(25, "");
    console.log(t1);