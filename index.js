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

function formSubmit(){
    if(accountName.value != "" & whitelistKey.value != ""){ // Don't bother wasting requests when there is no input
        let request = fetch(`https://jsonplaceholder.typicode.com/todos/1?account=${accountName.value}&key=${whitelistKey.value}`)
        request.then(function(response){
            console.log("response");
        })
        request.catch(function(error){
            console.log("An error occured while sending the HTTP request: ", error);
        })
    }
}