// Client side script that handles the index page.

const accountName = document.getElementById("accountName");
const whitelistKey = document.getElementById("whitelistKey");
const whitelistTable = document.getElementById("whitelistTable");

function createWhitelistEntry(key, name){
    // Creates tables rows for each of the whitelists
    const newTableRow = document.createElement("tr");
    whitelistTable.appendChild(newTableRow);
    var newWhitelistBox = document.createElement("td");
    newWhitelistBox.innerText = key;
    newWhitelistBox.setAttribute("style", "background-color: #e0e0e0;")
    var newAccountBox = document.createElement("td");
    newAccountBox.innerText = name;
    newAccountBox.setAttribute("style", "background-color: #e0e0e0;")
    whitelistTable.appendChild(newWhitelistBox);
    whitelistTable.appendChild(newAccountBox);
}

function clearPreviousWhitelistEntries(){
    // Clears the whitelist table to allow for the new data to populate it.
    whitelistTable.innerHTML = "";
    var newTableRow = document.createElement("tr");
    var newTableHeaderKey = document.createElement("th");
    newTableHeaderKey.innerText = "Whitelist Key";
    newTableRow.appendChild(newTableHeaderKey);
    var newTableHeaderWhitelist = document.createElement("th");
    newTableHeaderWhitelist.innerHTML = "Whitelist Owner";
    newTableRow.appendChild(newTableHeaderWhitelist);
    whitelistTable.appendChild(newTableRow);
}

async function apiRequest(account, key){
    let requestURL = `http://localhost:3000/SetKey?account=${String(account)}&key=${String(key)}`;
    let request = await fetch(requestURL);
    let requestJSON = await request.json();
    return requestJSON
}

function formSubmit(){
    if(accountName.value != "" & whitelistKey.value != ""){ // Don't bother wasting requests when there is no input        
        apiRequest(accountName.value, whitelistKey.value).then(function(result){
            clearPreviousWhitelistEntries();
            for(let i = 0; i < result.length; i++){
                // Iterate over the returned array and display each entry into the table.
                createWhitelistEntry(result[i].key, result[i].account)
            }
        }).catch(function(err){
            console.log("An error occured when trying to fetch the results from the server's API.");
        })
    }
}