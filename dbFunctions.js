function updateWhitelist(database, keyToSearch, accountToSet){
    database.collection("whitelists").updateOne({key: keyToSearch} ,{$set: {account: accountToSet}} ,function(err, res){
        // Update specified key documents with a new account field then return the number modified to the caller
        if (err){throw err};
        return res["modifiedCount"];
    })
}


function getWhitelists(database){
    database.collection("whitelists").find({}, {projection:{ _id: 0 }}).toArray().then(function(data){
        // Get all documents in collection, omit all ids, convert to array, and then return to the caller
        return data;
    });
}

// Export the functions for use in other scripts
module.exports.updateWhitelist = updateWhitelist;
module.exports.getWhitelists = getWhitelists;