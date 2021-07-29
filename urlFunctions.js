// Parses queries for values to set up a dictionary
function parseValues(queries){
    let valueDictionary = {};
    for(let i = 0; i < queries.length; i++){ // Iterate over every query in the array
        queries[i] = queries[i].split('=') // Split the string into the key and the value
        valueDictionary[queries[i][0]] = queries[i][1];
    }
    return valueDictionary; // Return the end result
}

// Parses a url for queries
function parseQueries(url){
    let queries = [];
    let lastQueryPosition = -1;
    for(let i = 0; i < url.length; i++){
        if(url[i] == '?' || url[i] == '&'){
            if(lastQueryPosition != -1){
                queries.push(url.substring(lastQueryPosition + 1, i));
            }
            lastQueryPosition = i;
        }else if(i + 1 == url.length){
            if(lastQueryPosition != -1){
                queries.push(url.substring(lastQueryPosition + 1));
            }
        }
    }
    parseValues(queries);
    return queries;
}

module.exports.parse = parseQueries;