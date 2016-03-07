var http = require("http");
var url = require("url");
var router = require("./router");

function start(handle){
var i=0;
    
http.createServer(function(request,response){
      var pathname = url.parse(request.url).pathname;
      var postData = "";
      console.log("Serving request: #" + ++i+"\n");
      
      //request.setEncoding("utf8");
      
      /*request.addListener("data",function(postDataChunk){
           postData += postDataChunk;
           console.log("Recieved POST chunk: "+ postDataChunk);
       });*/
       
      //request.addListener("end",function(){
          router.route(pathname,handle,response,request);
      //});
    
    }).listen(8888);

console.log("Server Started!");
}

exports.start = start;