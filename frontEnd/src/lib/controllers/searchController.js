
import { writable, get } from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { nsfw } from "$lib/controllers/pageControllers.js";

const
    searchQuery = (data) => {
        const { subscribe, set, update } = writable({
            data: data,
            filtered: data,
            search: ""
        });
        return { subscribe, set, update }
    },

    searchHandler = (store, nsfwCheck = false) => {
        const searchTerm = store.search.toLowerCase() || ""
        store.filtered = store.data.filter(item => {
            let array = searchTerm.split(' ');
            if (nsfwCheck) {
                array.push(get(nsfw) ? "" : "!nsfw");
            }
            return array.every(el => item.searchTerms.toLowerCase().includes(el))});
    },

    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        goto(pageData);
    };

export { urlSerializer, searchQuery, searchHandler }

// old junk for Sanity

let referenceTypes = {
    "tags" : `in categories[] -> title`,
    "char" : `in characters[]`,
    "auth" : `in authors[].author -> slug.current`,
    "c^char" : `in commissionData.characters[] -> slug.current`,
    "slug" : `== slug.current`,
    "nsfw" : `match string(NSFW) `,
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
                queryString += ` && ${queryArray.join(' && ')}`;}}} // strings together the query for GROQ to use.
    return queryString;
}

export { queryGenerator, referenceTypes }