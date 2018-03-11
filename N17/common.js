function culcVowel(strIsh) {
	vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
	             'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
	var sum=0;
    var strR=strIsh.toUpperCase();
    

	var symb
	for (var i=0;i<strR.length;i++){
		symb=strR[i];
		if (symb in vowelSymbol){
			sum++;
		}
	}
	return sum;	
}
//для forEach
function f1(v,i,a){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
    if (v in vowelSymbol) return 1;
    else return 0;

}
//для reduce
function f2(r,v,i,a){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};
    if (v in vowelSymbol) return r++;
    else return r;
}
//для filter
function f3(v,i,a){
    vowelSymbol={'А':true,'О':true, 'Е':true, 'Ё':true, 'И':true,
    'Ы':true,'Ю':true, 'Я':true, 'Э':true, 'У':true};

    if (v in vowelSymbol) return True;
    else return False;

}

str=prompt('Введите строку');
var rez='В строке '+str+' '+culcVowel(str)+' гласных букв';
console.log(rez);
alert(rez);