var i=1;

var timer=setInterval(function(){
    console.log("hey its child!"+i++);
    if(i==10)
    clearInterval(timer);
},2000);