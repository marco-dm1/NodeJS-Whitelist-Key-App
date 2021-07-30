const { spawn } = require("child_process");
const { NONAME } = require("dns");
const http = require("http"); // Require the http module so we can use it in our app
const url = require("./urlFunctions.js");

url.parse("?first=hello&second=test")

var sampleKeys = {
    "1a": "None",
    "2a": "None",
    "1b": "None",
    "2b": "None"
}
//console.log(sampleKeys.indexOf("1b"));

const server = http.createServer(function(request, response){
    if(request.url.split('?')[0] == "/SetKey"){ // Determine if the request is on our API url
        const queryObject = url.parse(request.url);
        let contentType = "text/html";
        response.setHeader("Access-Control-Allow-Origin", '*');

        if("account" in queryObject && "key" in queryObject){
            console.log("Request received with account name: ", queryObject.account, " and the key being ", queryObject.key);
            response.setHeader("Content-Type","application/json");
            //let keyCheck = sampleKeys.indexOf(queryObject.key);
            
            if(queryObject.key in sampleKeys){
                console.log("key is valid!");
                sampleKeys[queryObject.key] = queryObject.account;
                console.log(sampleKeys);
            }
            response.write(JSON.stringify(queryObject));
        }else{
            response.setHeader("Content-Type", "text/html");
            response.write("A request was received with invalid querie(s) attached.");
        }
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