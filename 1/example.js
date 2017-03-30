function isAnagram(first, second) {
    first = first.toLowerCase().split("").sort().join("");
    second = second.toLowerCase().split("").sort().join("");
    return  first === second;
}

alert(isAnagram(prompt(1), prompt(2)));

