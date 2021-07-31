function updateWhitelist(database, keyToSearch, accountToSet){
    database.collection("whitelists").updateOne({key: keyToSearch} ,{$set: {account: accountToSet}} ,function(err, res){
        if (err){throw err};
        console.log(JSON.stringify(res));
        console.log(res["modifiedCount"]);
        //console.log("Key: " + res.key + "Name: " + res.account);
    })
}

module.exports.updateWhitelist = updateWhitelist;