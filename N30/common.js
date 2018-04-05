"use strict"
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}
function initImg(mainContainer){
    //console.log(mainContainer);
    var imagesA=mainContainer.getElementsByTagName('img');
    for (var i=0;i<imagesA.length;i++){
        console.log(imagesA[i]);
        var currPos=getElementPos(imagesA[i]);
        console.log(currPos);
        imagesA[i].setAttribute('style','position:absolute;left:'+currPos.left+'px;top:'+currPos.top+'px');
        //imagesA[i].style.position='absolute';
       // imagesA[i].style.left=currPos.left+'px';
        //imagesA[i].style.top=currPos.top+'px';
        //console.log(i)
        
    }
    var containerPos=getElementPos(mainContainer);
    //console.log(containerPos);
}
function divDragEnter(EO) {
    // мяч вошёл в область div
    EO=EO||window.event;
    EO.preventDefault();
    EO.currentTarget.style.borderStyle="dashed";
}
var mainContainer=document.getElementById('main');
mainContainer.addEventListener('dragenter',divDragEnter,false)
initImg(mainContainer);
