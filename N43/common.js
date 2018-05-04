"use strict"
//смещение относительно начала картинки

function MovingObj(){
    var self=this;
    self.width=0;
    self.heigth=0;
    self.x=0;//координата по x
    self.y=0;//координата по y
    self.speedX=0;
    self.speedY=0;
    self.idName="renameId";
    //self.container=container;//ссылка на объект в котором находится
}
MovingObj.prototype.setSize=function(width,height){
    this.width=width;
    this.height=height;
}

MovingObj.prototype.setXY=function(x,y){
    this.x=x;
    this.y=y;
}

MovingObj.prototype.setSpeed=function(speedX,speedY){
    this.speedX=speedX;
    this.speedY=speedY;
}

MovingObj.prototype.mov=function(){
    this.x+=this.speedX;
    this.y+=this.speedY;

}
MovingObj.prototype.inversSpeed=function(){
    this.speedX=-this.speedX;
}

//определяет есть ли столкновение с переданным объектом, возврат True если есть
MovingObj.prototype.collisonTest=function(obj2){
    var xColl=false;
    var yColl=false;
  
    if ((this.x + this.width >= obj2.x) && (this.x <= obj2.x + obj2.width)) xColl = true;
    if ((this.y + this.height >= obj2.y) && (this.y <= obj2.y + obj2.height)) yColl = true;
  
    if (xColl&yColl){return true;}
    return false;
}
MovingObj.prototype.displayObj=function(){
    //console.log(this)
    var objDOM=document.createElement("div");
    objDOM.style.width=this.width+"px";
    objDOM.style.height=this.height+"px";
    objDOM.style.position="absolute";
    objDOM.style.left=this.x+"px";
    objDOM.style.top=this.y+"px";
    objDOM.id=this.idName;
    return objDOM;
}

//обновеление позиции
MovingObj.prototype.refreshPos=function(){
    var objDOM=document.getElementById(this.idName);
    objDOM.style.left=this.x+"px";
    objDOM.style.top=this.y+"px";

}
//класс ракетка
function Racket(){
    MovingObj.call(this);

}

Racket.prototype=Object.create(MovingObj.prototype);
Racket.prototype.constructor=Racket;

function Ball(){
    MovingObj.call(this);
    this.radius=0;

}
Ball.prototype=Object.create(MovingObj.prototype);
Ball.prototype.constructor=Ball;

Ball.prototype.setRadius=function(r){
    this.radius=r;
    this.height=r*2;
    this.width=r*2;
}

//функция рассчитывающа по координате X 2 координаты Y края круга
//планировалось использовать для ситуации когда мяч попадает на угол
Ball.prototype.culcYByX=function(xn){
    var dx=Math.abs(this.x-xn-this.radius);
    if (dx>this.radius) {return false}
    var dy=Math.sqrt(this.radius*this.radius-dx*dx);
    return {y1:this.y+(this.radius-dy),
            y2:this.y+(this.radius+dy)};
}

//функция рассчитывающа по координате Y 2 координаты X края круга
//планировалось использовать для ситуации когда мяч попадает на угол
Ball.prototype.culcXByY=function(yn){
    var dy=Math.abs(this.y-yn-this.radius);
    if (dy>this.radius) {return false}
    var dx=Math.sqrt(this.radius*this.radius-dy*dy);
    return {x1:this.x+(this.radius-dx),
            x2:this.x+(this.radius+dx)};
}

Ball.prototype.displayObj=function(){
    var objDOM=MovingObj.prototype.displayObj.call(this);
    objDOM.style.borderRadius=50+"%";
    return objDOM;
}
//теннисное поле
function TennisField(){
    this.height=400;//высота поля
    this.width=600; //ширина поля
    this.WRCK=15;    //ширина ракетки
    this.HRCK=80;    //высота ракетки
    this.BALLRADIUS=15;
    this.SPEED_RACKET=3;
    this.SPEED_BALL=3;

    this.leftPoints=0;//очки левого игрока
    this.rightPoints=0;//очки правого игрока

    //создание ракеток и мяча
    this.leftRacket=new Racket();
    this.leftRacket.idName="leftRacket"
    this.leftRacket.setSize(this.WRCK,this.HRCK);
   
    this.rightRacket=new Racket();
    this.rightRacket.idName="rightRacket"
    this.rightRacket.setSize(this.WRCK,this.HRCK);
        
    this.tennisBall=new Ball();
    this.tennisBall.idName="tennisBall";
    this.tennisBall.setRadius(this.BALLRADIUS);
    this.setStart();
    this.dinamicObject=[this.leftRacket,this.rightRacket,this.tennisBall];

}
//обработка тика
TennisField.prototype.tick=function(){
    for (var i in this.dinamicObject){
        this.dinamicObject[i].mov();
    }

    if (this.leftRacket.collisonTest(this.tennisBall)) {
        this.tennisBall.inversSpeed();
        this.tennisBall.x=this.leftRacket.x+this.leftRacket.width;
    }
    if (this.rightRacket.collisonTest(this.tennisBall)) {
        this.tennisBall.inversSpeed();
        this.tennisBall.x=this.rightRacket.x-this.tennisBall.width;
    }
    this.outBoundBall(this.tennisBall);
    this.outBoundRacket(this.leftRacket);
    this.outBoundRacket(this.rightRacket);
    for (var i in this.dinamicObject){
        this.dinamicObject[i].refreshPos();
    }
}

//создание объектов в DOM
TennisField.prototype.initDisplay=function(){
    this.refreshPoints();
    var pole=document.createElement("div");
    pole.style.width=this.width+"px";
    pole.style.height=this.height+"px";
    pole.style.position="relative";
    pole.id=this.idName;
    for (var i in this.dinamicObject){
        pole.appendChild(this.dinamicObject[i].displayObj());
   }
    return pole;
}
//мяч и ракетки на исходную
TennisField.prototype.setStart=function(){
    this.leftRacket.setXY(0,this.height/2-this.HRCK/2);
    this.rightRacket.setXY(this.width-this.WRCK,this.height/2-this.HRCK/2);
    this.tennisBall.setXY(this.width/2-this.BALLRADIUS,this.height/2-this.BALLRADIUS);
}

//обработка событй клавиш
TennisField.prototype.controlHandleMove=function(keyCode){
    switch (keyCode){
        case 16: this.leftRacket.setSpeed(0,-this.SPEED_RACKET);
                break;
        case 17: this.leftRacket.setSpeed(0,this.SPEED_RACKET);
                break;
        case 38: this.rightRacket.setSpeed(0,-this.SPEED_RACKET);
                break;
        case 40: this.rightRacket.setSpeed(0,this.SPEED_RACKET);
                break;}
   }
//обработка отпускания клавиши
TennisField.prototype.controlHandleStop=function(keyCode){
    switch (keyCode){
        case 16: this.leftRacket.setSpeed(0,0);
                break;
        case 17: this.leftRacket.setSpeed(0,0);
                break;
        case 38: this.rightRacket.setSpeed(0,0);
                break;
        case 40: this.rightRacket.setSpeed(0,0);
                break;}
   }
//проверка выхода за границы мяча
TennisField.prototype.outBoundBall=function(obj){
    
    if (obj.y<=0){
        obj.y=0;
        obj.speedY=-obj.speedY;
    }
    
    if (obj.y+obj.height>=this.height){
        obj.y=this.height-obj.height;
        obj.speedY=-obj.speedY;
    }

    if (obj.x<0){
        obj.x=0;//в начало координат
        obj.setSpeed(0,0);
        this.rightPoints++;
        this.refreshPoints();
        this.stopGame();
    }

    if (obj.x+obj.width>this.width){
        this.stopGame();
        obj.x=this.width-obj.width;
        obj.setSpeed(0,0);
        this.leftPoints++;
        this.refreshPoints();
        
    }
}
//контроль выхода ракеток за границы
TennisField.prototype.outBoundRacket=function(obj){
    
    if (obj.y<=0){
        obj.y=0;
        obj.speedY=0;
    }
    
    if (obj.y+obj.height>=this.height){
        obj.y=this.height-obj.height;
        obj.speedY=0;
    }
}

TennisField.prototype.startGame=function(){
    var zn=1;
    var c=Math.floor(Math.random()*2 - 1);
    if (c==0) zn=-1;
    this.tennisBall.setSpeed(zn*this.SPEED_BALL,Math.floor(Math.random()*3+1));
    window.addEventListener('keydown',keyDown,false);
    window.addEventListener('keyup',keyUp,false);
    this.setStart();
    for (var i in this.dinamicObject){
        this.dinamicObject[i].refreshPos();
    }
}

TennisField.prototype.stopGame=function(){
  window.removeEventListener('keydown',keyDown,false);
  window.removeEventListener('keyup',keyUp,false);
  this.rightRacket.setSpeed(0,0);
  this.leftRacket.setSpeed(0,0);
  
}

TennisField.prototype.refreshPoints=function(){
    var pointCont=document.getElementById("points");
    pointCont.innerHTML=this.leftPoints+":"+this.rightPoints;

}
var tennisF=new TennisField();
tennisF.idName="tennisF";

var mainContainer=document.getElementById("main");

var btnStart=document.createElement("button");
btnStart.id="btnStart";
btnStart.innerHTML="Старт!";
btnStart.onclick=clickStart;
mainContainer.appendChild(btnStart);

var points=document.createElement("div");
points.id="points";
mainContainer.appendChild(points);

mainContainer.appendChild(tennisF.initDisplay());
tennisF.startGame();
requestAnimationFrame(tick);


function tick(){
    tennisF.tick();
    //console.log('тик');
    requestAnimationFrame(tick);
}

function keyDown(EO){
    EO=EO||window.event;
    tennisF.controlHandleMove(EO.keyCode);
}
function keyUp(EO){
    EO=EO||window.event;
    tennisF.controlHandleStop(EO.keyCode);
}

function clickStart(EO){
    EO=EO||window.event;
    tennisF.startGame();
}
