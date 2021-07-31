function updateWhitelist(database, keyToSearch, accountToSet){
    database.collection("whitelists").updateOne({key: keyToSearch} ,{$set: {account: accountToSet}} ,function(err, res){
        if (err){throw err};
        console.log(JSON.stringify(res));
        console.log(res["modifiedCount"]);
        //console.log("Key: " + res.key + "Name: " + res.account);
    })
}


function getWhitelists(database){
    database.collection("whitelists").find({}, {projection:{ _id: 0 }}).toArray().then(function(data){
        // Get all documents in collection, omit all ids, convert to array, and then return to the caller
        return data;
    });
}

module.exports.updateWhitelist = updateWhitelist;
module.exports.getWhitelists = getWhitelists;