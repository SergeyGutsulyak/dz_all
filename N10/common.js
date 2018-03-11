    "use strict";

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        var curentColors={ };//Хеш с текущими цветами
        console.log( 'цветов: ' + colorsCount );
        for ( var i=1; i<=colorsCount; i++ ) {
            while (true){
                var n=randomDiap(1,7);
                var colorName=colors[n];
                if ((colorName in curentColors)==false){
                    curentColors[colorName]=1;
                    break;
                }
            }
            
            console.log( colorName );
        }
    }

    mood(3);