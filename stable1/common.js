"use strict"
//console.log('Старт игры');
var game=new GameArea();
game.idName="game";

//var mainContainer=document.getElementById("main");
//mainContainer.appendChild(game.initDisplay());
var BASE_WIDTH=1280;
var BASE_HEIGHT=720;

var mainContainer=document.getElementById("gameContainer");
//mainContainer.style.width="602px";

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName='GUTSULYAK_ENDPROJ_LEVEL1';

$.ajax( {
    url : ajaxHandlerScript,
    type : 'POST', dataType:'json',
    data : { f : 'READ', n : stringName},
    cache : false,
    success : readReady,
    error : errorHandler
    }
);

function readReady(data){
    //console.log(data.result);
    var world=JSON.parse(data.result);
    //console.log(world);
    game.createMap(world);
    game.startGame();
    requestAnimationFrame(tick);
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}


var canvView=new ViewerCanv('CVS1',game);
var conCanv=document.getElementById('CVS1');

//conCanv.style.width="600px";
//conCanv.style.height="600px";
canvView.createGameArea();
setSize();
//console.log(document.body.clientWidth);
function tick(){
    game.tick();
    canvView.createGameArea();
    requestAnimationFrame(tick);
}

function keyDown(EO){
    EO=EO||window.event;
    game.controlHandleMove(EO.keyCode);
}
function keyUp(EO){
    EO=EO||window.event;
    game.controlHandleStop(EO.keyCode);
}
function keyUp2(EO){
    EO=EO||window.event;
    game.restartPress(EO.keyCode);
}

function clickStart(EO){
    EO=EO||window.event;
    game.startGame();
}

//----------Управление жестами----------------------
//var mc = new Hammer(mainContainer);
var TMR=400;
var mc    = new Hammer.Manager(mainContainer);
var swipe     = new Hammer.Swipe();
//console.log(swipe)
mc.add(swipe);
/*
mc.on("doubletap", function(ev) {
    game.pauseGame;
    console.log("doubletap")
});
*/

var timerSwipeLeft=0;
mc.on("swipeleft", function(ev) {
    game.rPlatform.startEngineRight();
    if (timerSwipeLeft){
        clearTimeout(timerSwipeLeft); // остановим
        timerSwipeLeft=0; // теперь таймера нет
    }
    timerSwipeLeft=setTimeout(function(){
        game.rPlatform.stopEngineRight();
    },TMR);   

});

var timerSwipeRight=0;
mc.on("swiperight", function(ev) {
    game.rPlatform.startEngineLeft();
    if (timerSwipeRight){
        clearTimeout(timerSwipeRight); // остановим
        timerSwipeRight=0; // теперь таймера нет
    }
    timerSwipeRight=setTimeout(function(){
        game.rPlatform.stopEngineLeft();
        console.log("стоп Левый");
    },TMR);   

});

var timerSwipeUp=0;
mc.on("swipeup", function(ev) {
    game.rPlatform.startEngineMain();
    if (timerSwipeUp){
        clearTimeout(timerSwipeUp); // остановим
        timerSwipeUp=0; // теперь таймера нет
    }
    timerSwipeUp=setTimeout(function(){
        game.rPlatform.stopEngineMain();
    },TMR);   

});


//-----------------------------------------------------


window.onresize=setSize;
var relWidth;
var relHeight;

function setSize(){
    var w =document.body.clientWidth
    ||window.innerWidth
    || document.documentElement.clientWidth;
    //var w=window.screen.availWidth;
    w=0.98*w;
    //console.log(window.innerWidth);
    //console.log(document.documentElement.clientWidth);
    //console.log(document.body.clientWidth);
    //console.log("width:"+document.body.clientWidth);
    var h=window.innerHeight
    ||document.body.clientHeight
    || document.documentElement.clientHeight;
    //var h=window.screen.availHeight;
    h=0.95*h;
    //console.log("height:"+h);

    relWidth=w/BASE_WIDTH;
    relHeight=h/BASE_HEIGHT;
    if (relWidth<relHeight){
        h=Math.round(relWidth*BASE_HEIGHT);
    }
    else{
        w=Math.round(relHeight*BASE_WIDTH);
    }
    //mainContainer.style.width=w+"px"
    conCanv.style.width=w+"px";
    conCanv.style.height=h+"px";

}