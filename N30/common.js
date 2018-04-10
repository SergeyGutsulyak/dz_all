"use strict"
//смещение относительно начала картинки
var dx=0;
var dy=0;
var mainCont=document.getElementById('main');
var draggedPict=null;
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}
function initImg(){
    
    var imagesA=document.querySelectorAll('#main img');
    var startPos={}
    for (var i=0;i<imagesA.length;i++){
        startPos[i]=getElementPos(imagesA[i]);
    }
    for (var i in startPos){
        imagesA[i].style.position='absolute';
        imagesA[i].style.left=startPos[i].left+'px';
        imagesA[i].style.top=startPos[i].top+'px';
        imagesA[i].addEventListener('mousedown',imgDragStart,false);
        imagesA[i].addEventListener('mouseup',imgDragEnd,false);
    }

}
//обработчик начала перетаскивания
function imgDragStart(EO){
    EO=EO||window.event;
    EO.preventDefault();
    draggedPict=EO.currentTarget
    var pos=getElementPos(EO.currentTarget)
    dx=EO.pageX-pos.left;
    dy=EO.pageY-pos.top;
    mainCont.addEventListener('mousemove',pictMove,false);
    EO.target.parentNode.appendChild(EO.target);
    mainCont.style.cursor='pointer';

}
//обработчик конца перетаскивания
function imgDragEnd(EO){
    EO=EO||window.event;
    mainCont.removeEventListener('mousemove',pictMove,false);
    mainCont.style.cursor='auto';
}

//Обработчик изменения координаты мыши
function pictMove(EO){
    EO=EO||window.event;
    mainCont.style.cursor='pointer';
    draggedPict.style.left=(EO.pageX-dx)+'px';
    draggedPict.style.top=(EO.pageY-dy)+'px';

}

window.addEventListener('load',initImg,false)

