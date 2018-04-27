"use strict"
//смещение относительно начала картинки
const NHOURS=12;
const NMINUTES=60;
const NSECONDS=60;
const RADIUSHOUR=25; //радиус круга для цифры циферблата
const CLOCKRADIUS=250;

const KH=0.7;//отношение длины часовой стрелки к радиусу часов
const KM=0.8;//отношение длины минутной стрелки к радиусу часов
const KS=0.9;//отношение длины секундной стрелки к радиусу часов

const KHW=0.04;//отношение толщины часовой стрелки к радиусу часов
const KMW=0.03;//отношение толщины минутной стрелки к радиусу часов
const KSW=0.01;//отношение толщины секундной стрелки к радиусу часов

const KSTR=0.1;//смещение крепления стрелки в части от всей длины

const SMR=0.9;//смещение от кружков от края часов

setTimeout(updateTime,0);

function updateTime(){
    var curTime=new Date();
    setArrows(curTime);
    setTimeout(updateTime,1000-curTime.getMilliseconds())
}

function setArrows(curTime){
    var curHour=curTime.getHours();
    var curMinute=curTime.getMinutes();
    var curSecond=curTime.getSeconds();
    digitalClock.innerHTML=formatDateTime(curTime);
    arrowHour.style.transform="rotate("+(curHour*360/NHOURS-90)+"deg)";
    arrowMinute.style.transform="rotate("+(curMinute*360/NMINUTES-90)+"deg)";
    arrowSecond.style.transform="rotate("+(curSecond*360/NSECONDS-90)+"deg)";

}

function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}

var mainContainer=document.getElementById("main");
var clockCnt=document.createElement("div");
clockCnt.className="clock";
clockCnt.style.height=CLOCKRADIUS*2+"px";
clockCnt.style.width=CLOCKRADIUS*2+"px";
mainContainer.appendChild(clockCnt) 
var posClock=getElementPos(clockCnt);
//расстановка кружков
for (var i=1;i<=NHOURS;i++){
    var deg=2*Math.PI/NHOURS*(12-i);
    var roundHour=document.createElement("div");
    roundHour.innerHTML=i;
    roundHour.className="roundHour"
    roundHour.style.height=RADIUSHOUR*2+"px";
    roundHour.style.width=RADIUSHOUR*2+"px";
    roundHour.style.lineHeight=RADIUSHOUR*2+"px";
    roundHour.style.position="absolute";
    roundHour.style.top=posClock.top+CLOCKRADIUS*(1-SMR)+(CLOCKRADIUS*SMR-RADIUSHOUR)*(1-Math.cos(deg))+"px";
    roundHour.style.left=posClock.left+CLOCKRADIUS*(1-SMR)+(CLOCKRADIUS*SMR-RADIUSHOUR)*(1-Math.sin(deg))+"px"
    clockCnt.appendChild(roundHour) 
}
//часовая стрелка
var arrowHour=document.createElement("div");
arrowHour.className="arrowHour";
arrowHour.style.position="absolute";
arrowHour.style.width=CLOCKRADIUS*KH+"px";
arrowHour.style.height=CLOCKRADIUS*KHW+"px";
arrowHour.style.top=posClock.top+CLOCKRADIUS-CLOCKRADIUS*KHW/2+"px";
arrowHour.style.left=posClock.left+CLOCKRADIUS-CLOCKRADIUS*KH*KSTR+"px";
arrowHour.style.transformOrigin=KSTR*100+"% 50% 0px";
arrowHour.style.borderRadius=CLOCKRADIUS*KHW/2+"px";
clockCnt.appendChild(arrowHour); 

//минутная стрелка
var arrowMinute=document.createElement("div");
arrowMinute.className="arrowMinute";
arrowMinute.style.position="absolute";
arrowMinute.style.width=CLOCKRADIUS*KM+"px";
arrowMinute.style.height=CLOCKRADIUS*KMW+"px";
arrowMinute.style.top=posClock.top+CLOCKRADIUS-CLOCKRADIUS*KMW/2+"px";
arrowMinute.style.left=posClock.left+CLOCKRADIUS-CLOCKRADIUS*KM*KSTR+"px";
arrowMinute.style.transformOrigin=KSTR*100+"% 50% 0px";
arrowMinute.style.borderRadius=CLOCKRADIUS*KMW/2+"px";
clockCnt.appendChild(arrowMinute); 
//секундная стрелка
var arrowSecond=document.createElement("div");
arrowSecond.className="arrowSecond";
arrowSecond.style.position="absolute";
arrowSecond.style.width=CLOCKRADIUS*KS+"px";
arrowSecond.style.height=CLOCKRADIUS*KSW+"px";
arrowSecond.style.top=posClock.top+CLOCKRADIUS-CLOCKRADIUS*KSW/2+"px";
arrowSecond.style.left=posClock.left+CLOCKRADIUS-CLOCKRADIUS*KS*KSTR+"px";
arrowSecond.style.transformOrigin=KSTR*100+"% 50% 0px";
arrowSecond.style.borderRadius=CLOCKRADIUS*KSW/2+"px";
clockCnt.appendChild(arrowSecond); 

//цифровые часы
var digitalClock=document.createElement("div");
digitalClock.className="digitalClock";
digitalClock.style.position="absolute";
digitalClock.style.top=posClock.top+CLOCKRADIUS*0.6+"px";
digitalClock.style.left=posClock.left+"px";
digitalClock.style.width=CLOCKRADIUS*2+"px";
clockCnt.appendChild(digitalClock); 


function formatDateTime(dt) {
    var hours=dt.getHours();
    var minutes=dt.getMinutes();
    var seconds=dt.getSeconds();
    return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

// дополняет строку Val слева нулями до длины Len
function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}

setArrows(new Date());