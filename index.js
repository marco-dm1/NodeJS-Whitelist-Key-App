// Client side script that handles the index page.

var accountName = document.getElementById("accountName");
var whitelistKey = document.getElementById("whitelistKey");
var available = document.getElementById("available");
var set = document.getElementById("set");


function createAnchorElement(parent, text){
    const newElement = document.createElement("a");
    newElement.innerText = text;
    parent.appendChild(newElement); // Put our new element into the intended parent element
}

async function apiRequest(account, key){
    let requestURL = `http://localhost:3000/SetKey?account=${account}&key=${key}`;
    let request = await fetch(requestURL);
    let requestJSON = await request.json();
    return requestJSON
}

function formSubmit(){
    if(accountName.value != "" & whitelistKey.value != ""){ // Don't bother wasting requests when there is no input        
        apiRequest(accountName.value, whitelistKey.value).then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log("An error occured when trying to fetch the results from the server's API.");
        })
    }
}