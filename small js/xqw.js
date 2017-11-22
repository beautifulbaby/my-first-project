var time = 0;
function xqw(n, m) {
    if (n == m){
        time++;
        return;
    }
    if (n > m){
        return;
    }
    xqw(n+1, m);
    xqw(n+2, m);
}

xqw(0, 2);
console.log(time);