let t1 = function toBinary(n) {
	return (n === 0) ? '' : toBinary(Math.floor(n / 2)) + (n % 2).toString();
}(25, "");

console.log(t1);