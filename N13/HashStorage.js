function HashStorage(){
    this.data={};
}

HashStorage.prototype.addValue=function(key,value){
    this.data[key]=value;
}

HashStorage.prototype.getValue=function(key){
    console.log(this.data[key]);
    return this.data[key];
}

HashStorage.prototype.deleteValue=function(key){
    
}

HashStorage.prototype.getKeys=function(){
    
}

var a = new HashStorage;
var c=[1,2,3,4,5,6,7]
var b={1:2,3:4,5:c}
console.log(b)
a.addValue(7,b)
console.log(a.data)
b[9]=10
c.
console.log(a.data)

