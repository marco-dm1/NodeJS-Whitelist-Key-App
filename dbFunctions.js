var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/DemoData";

MongoClient.connect(url, function(err, db){
    console.log("Connected");
    db.close();
})