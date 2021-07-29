const http = require("http"); // Require the http module so we can use it in our app
const url = require("./urlFunctions.js");

url.parse("?first=hello&second=test")

const server = http.createServer(function(request, response){
    if(request.url.split("?")[0] == "/SetKey"){ // Determine if the request is on our API url
        const queryObject = url.parse(request.url).query;
        console.log("setkey");
        response.write("test");
        response.end();
    }else{ // Otherwise send a generic response back saying that the API doesn't exist
        console.log(`A request was sent at the different URL: ${request.url}`);
        response.write("The specified API does not exist.");
        response.end();
    }
});

var port = process.env.PORT || 3000; // Try finding a port or set it to 3000 if none exists
server.listen(port); // Tell our server to listen for requests on the specified port
console.log(`The node app is now listening for requests on port ${port}.`);