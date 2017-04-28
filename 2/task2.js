let t2 = function intersection(arr1, arr2) {
    let arr = [];

	arr1.forEach(function(item){
		arr[item] = true;
	});

	return arr2.filter(function(item) {
		return arr[item];
	})


}([1, 3, 5, 7, 9],[1, 2, 3, 4]);

console.log(t2);
