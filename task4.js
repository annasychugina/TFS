let t4 = function bind(f, context) {
    let bArg = [].slice.call(arguments, 2);
    return function() {
        let fArgs = [].slice.call(arguments);
        return f.apply(context, bArg.concat(fArgs));
    };
}();
