function route(pathname,handle,response,request){
 
    console.log("Hey there! Router here! Routing the request for: "+pathname);
    if(typeof handle[pathname] === 'function')
    {
        handle[pathname](response,request);    
    }
    else
    {
        console.log("Oops throw 404!");
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("404! Requested document not found");
        response.end();
    } 
}

exports.route = route;