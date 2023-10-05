
let referenceTypes = {
    "tags" : `in categories[] -> title`,
    "char" : `in characters[] -> slug.current`,
    "author" : `match author -> slug.current`,
};

const queryGenerator = (query) => { //request string for specific query types prompted by [[query]]
    let queryString = "";

    if (!!query){
        let queryPartition = query.split('&'); // splits the query types

        for (let e in queryPartition) {
            let query = queryPartition[e].split('='); // query assignment to tags

            if (query.length === 2){
                let queryArray = [],
                    queryReqT = query[1].split(':'); // tag splitting
                for (let i in queryReqT){
                    queryArray[i] = `'${queryReqT[i]}' ${referenceTypes[query[0]]}`;}
                //searches the query type to search against the tag type.
                queryString += ` && ${queryArray.join(' && ')}`;} // strings together the query for GROQ to use.
        }
    }

    console.log(queryString)
    return queryString;
}

export { queryGenerator, referenceTypes }