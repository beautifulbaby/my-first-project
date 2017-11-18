function get(n) {
    if (n == 2 || n == 1) {
        return 1
    }
    return get(n-1)+get(n-2)
}

var v = get(10)
console.log(v)