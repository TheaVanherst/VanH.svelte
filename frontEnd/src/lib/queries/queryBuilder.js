
let referenceTypes = {
    "tags" : `in categories[] -> title`,
    "char" : `in characters[] -> slug.current`,
    "auth" : `in authors[].author -> slug.current`,
    "c^char" : `in commissionData.characters[] -> slug.current`,
    "slug" : `== slug.current`,
    "nsfw" : `match string(NSFW) `,
};

const queryGenerator = (query) => { //request string for specific query types prompted by [[query]]
    let queryString = "";

    if (!!query){
        query = query.slice(1);
        let queryPartition = query.split('&'); // splits the query types

        for (let e in queryPartition) {
            let query = queryPartition[e].split('='); // query assignment to tags

            if (query.length === 2){
                let queryArray = [],
                    queryReqT = query[1].split(':'); // tag splitting
                for (let i in queryReqT){
                    queryArray[i] = `'${queryReqT[i]}' ${referenceTypes[query[0]]}`;}
                //searches the query type to search against the tag type.
                queryString += ` && ${queryArray.join(' && ')}`;}}} // strings together the query for GROQ to use.
    return queryString;
}

export { queryGenerator, referenceTypes }
