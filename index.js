// Client side script that handles the index page.


var accountName = document.getElementById("accountName");
var whitelistKey = document.getElementById("whitelistKey");
var available = document.getElementById("available");
var set = document.getElementById("set");


function createAnchorElement(parent, text){
    const newElement = document.createElement("a");
    newElement.innerText = text;
    parent.appendChild(newElement);
}

function formSubmit(){
    console.log(accountName.value, whitelistKey.value);

    let request = fetch("https://jsonplaceholder.typicode.com/todos/1")
    request.then(function(response){
        console.log("response");
    })
    request.catch(function(error){
        console.log("error", error);
    })
}