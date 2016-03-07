var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    path = require("path"),
    util = require("util"),
    EventEmitter = require("events").EventEmitter,
    path = require("path"),
    spawn = require('child_process').spawn;

var myClass = function(){
       var self = this;
       setInterval(function(){
            self.emit("custom event","arg1","arg2");},500); 
     };
 
     util.inherits(myClass,EventEmitter);


function start(response,request){
     console.log("Hey there you are servering request by 'start'");
     console.log(path.normalize("ABS/DFH/djgh/.."));    
     
     /*var child = spawn('node child.js');
     child.on('data',function(err,data){
         console.log("Recieved Data from child!:"+data);
     });*/
     
     var body = '<html>'+
                '<head>'+
                '<meta http-equiv="Content-Type" content="text/html; '+
                'charset=UTF-8" />'+
                '</head>'+
                '<body>'+
                '<form action="/upload" enctype="multipart/form-data" '+'method="post">'+
                '<input type="file" name="upload">'+
                '<input type="text" name="name" placeholder="Name" />'+
                '<input type="Date" name="birthdate" placeholder="Birthdate" />'+
                '<textarea name="text" rows="20" cols="60"></textarea>'+
                '<input type="submit" value="Submit text" />'+
                '</form>'+
                '</body>'+
                '</html>';
     response.writeHead(200,{"Content-Type":"text/html"});
     response.write(body);
     response.end();
}

function upload(response,request){
     console.log("Hey there you are servering request by 'upload'");
     /*form.parse(request,function(error,fields,files){
        console.log("Parsing done!");
        var tempPath = files.upload.path,
        targetPath = path.resolve('./files/test.jpg');
        if (path.extname(files.upload.name).toLowerCase() === '.jpg') {
            fs.rename(tempPath, targetPath, function(err) {
                if (err) throw err;
                console.log("Upload completed!");
            });
        } else {
            fs.unlink(tempPath, function (err) {
                if (err) throw err;
                console.error("Only .png files are allowed!");
            });
        }
     });*/
    show(response,request);
}

function show(response,request){
     console.log("Show is serving request!");
    
     var myInst = new myClass();
     fs.open('files/abc','a',function opened(err,fd){
        if(err)
            console.log(err);
        else
        {

            var form = new formidable.IncomingForm();
            var formFields = {};
            
            function writeToFile(){
                var writeBuffer =new Buffer(formData),
                bufferPosition= 0,
                bufferLength = writeBuffer.length,
                fileOffset = null;
            
            fs.write(fd,
                    writeBuffer,
                    bufferPosition,
                    bufferLength,
                    fileOffset,
                    function wrote(err,writeBytes){
                        if(err)
                            console.log(err);
                        else
                        { 
                            console.log("written "+ writeBytes +" bytes of data!");
                            fs.close(fd,function(){
                                console.log("File closed!");
                            });
                            readFileAndOutput();
                        }   
                    });
            };
            
            
     
     function readFileAndOutput(){
        fs.readFile("files/abc",function(error,file){
            if(error){
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(error + "\n");
                response.end();
            }else{    
                response.writeHead(200, {"Content-Type": "text/plain"});
                console.log(file.toString());
                response.write(file.toString());
                response.end();
            }
        });
      }
            
            console.log("Parsing form data!");
            var formData ='';
            form.parse(request,function(error,fields,files){
                if(error)
                    console.log(error);
                
                console.log(fields.name+fields.birthdare+fields.text);
                formData += "Name: "+fields.name+"\n"+
                            "Birthdate: "+fields.birthdate+"\n"+
                            "Details: "+fields.text+"\n\n";
                
                writeToFile();
            });
        }
     });
     
    /* myInst.on("custom event",function(arg1,arg2){
          console.log("Custom Fired!:"+arg1+arg2);
     });*/
}

exports.start = start;
exports.upload = upload;
exports.show = show;