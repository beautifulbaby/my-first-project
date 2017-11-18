var time = 0;
function lB(wine,flower,shop) {
    if (wine == 0 && flower == 10 && shop == 5){
        time++;
        return;
    }
    if(wine <= 0 || shop > 5 || flower >= 10){
        return;
    }
    lB(wine*2, flower, shop+1);
    lB(wine-1, flower+1, shop);
}
lB(2,0,0);
console.log(time);


var x = 1;
console.log(++x);
console.log(x)