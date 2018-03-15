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
    delete this.data[key]
}

HashStorage.prototype.getKeys=function(){
    var keys=[]
    for (el in this.data){
        keys.push(el);
    }
    return keys;
}

//var a = new HashStorage;
//var b={1:2,3:4}
//console.log(b)
//a.addValue(7,b)
//a.addValue(5,6)
//a.addValue(7,8)
//console.log(a.data)
//console.log(a.getKeys())
//console.log(a.data)

