const http = require("http"); // Require the http module so we can use it in our app
const url = require("./urlFunctions.js");
const MongoClient = require("mongodb").MongoClient;
const db = require("./dbFunctions.js");
var newDatabase;

MongoClient.connect("mongodb://localhost:27017/DemoData", function(err, database){
    if(err){console.log("An error occured when connecting to the MongoDB server."); throw err}
    console.log("Connected");
    newDatabase = database.db("myNewDB");
})

const server = http.createServer(function(request, response){
    if(request.url.split('?')[0] == "/SetKey"){ // Determine if the request is on our API url
        const queryObject = url.parse(request.url);
        response.setHeader("Content-Type","text/html"); // Set the default header to text/html
        response.setHeader("Access-Control-Allow-Origin", '*');
        let responseText = "demo data: ";
        if("account" in queryObject && "key" in queryObject){
            console.log("Request received with account name: ", queryObject.account, " and the key being ", queryObject.key);
            if(newDatabase != null){
                let getWhitelistsPromise = new Promise(async function(resolve, reject){
                    let whitelistsData = await db.getWhitelists(newDatabase);
                    if(whitelistsData != null){
                        console.log("resolved");
                        resolve(whitelistsData);
                    }else{
                        console.log("rejected");
                        reject();
                    }
                })
                
                getWhitelistsPromise.then(function(data){
                    response.setHeader("Content-Type","application/json");
                    response.write(JSON.stringify(data));
                    response.end();
                }).catch(function(err){
                    console.log("an error occured and was caught", err);
                    response.write("The server was unable to get the current whitelists.");
                    response.end();
                })
                //response.write("here is your demo data!" + responseText);
                
                //db.updateWhitelist(newDatabase, String(queryObject.key), String(queryObject.account)); // Update database and make sure the inputs are sanitized.
            }else{
                response.write("The server was unable to contact the database.");
                response.end();
            }
        }else{
            console.log("closing newdatabase");
            newDatabase.close(); // Will be fixed, referencing wrong database variable
            response.setHeader("Content-Type", "text/html");
            response.write("A request was received with invalid querie(s) attached.");
            response.end();
        }
    }else{ // Otherwise send a generic response back saying that the API doesn't exist
        console.log(`A request was sent at the different URL: ${request.url}`);
        response.write("The specified API does not exist.");
        response.end();
    }
});

var port = process.env.PORT || 3000; // Try finding a port or set it to 3000 if none exists
server.listen(port); // Tell our server to listen for requests on the specified port
console.log(`The node app is now listening for requests on port ${port}.`);