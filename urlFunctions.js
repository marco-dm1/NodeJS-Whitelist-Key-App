// Parses queries for values to set up a dictionary
function parseValues(queries){
    let valueDictionary = {};
    for(let i = 0; i < queries.length; i++){ // Iterate over every query in the array
        queries[i] = queries[i].split('=') // Split the string into the key and the value
        valueDictionary[queries[i][0]] = queries[i][1];
    }
    return valueDictionary; // Return the end result
}

// Parses a URL for queries
function parseQueries(url){
    let queries = [];
    let lastQueryPosition = -1;
    for(let i = 0; i < url.length; i++){ // Iterate over every character in the URL
        if(url[i] == '?' || url[i] == '&'){ // Find the key characters that specify queries in a URL
            if(lastQueryPosition != -1){ // Make sure we have previously found one before making a query
                queries.push(url.substring(lastQueryPosition + 1, i)); // Save the query from last found + 1 to the current iteration
            }
            lastQueryPosition = i; // Mark that we have found a query character
        }else if(i + 1 == url.length){
            if(lastQueryPosition != -1){ // Make query if one was previously found and its the last iteration
                queries.push(url.substring(lastQueryPosition + 1));
            }
        }
    }
    return parseValues(queries);
}

module.exports.parse = parseQueries;