//для forEach
function f1(strOriginal){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
    var sum=0
    strOriginal.toUpperCase().split('').forEach(function(v){
        if (v in vowelSymbol) sum++;
    });
    return sum;
}
//для reduce
function f2(strOriginal){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
    var sum
    sum=strOriginal.toUpperCase().split('').reduce(function(r,v){
        if (v in vowelSymbol) r++;
        return r;
    },0);
    return sum;
}
//для filter
function f3(strOriginal){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
    var massVowelSymbol=strOriginal.toUpperCase().split('').filter(function(v){
        if (v in vowelSymbol) return true;
        else return false;
    });
    return massVowelSymbol.length;
}

str=prompt('Введите строку');
var rez='Расчет с forEach: В строке '+str+' '+f1(str)+' гласных букв';
console.log(rez);
alert(rez);
rez='Расчет с reduce: В строке '+str+' '+f2(str)+' гласных букв';
console.log(rez);
alert(rez);
rez='Расчет с filter: В строке '+str+' '+f3(str)+' гласных букв';
console.log(rez);
alert(rez);