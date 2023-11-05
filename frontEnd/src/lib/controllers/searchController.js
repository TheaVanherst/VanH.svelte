
import { get } from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { direction, nsfw } from "$lib/controllers/pageControllers.js";
import { dataSetStore } from "$lib/controllers/pageSettings.js";

const
    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        goto(pageData);
    },
    queryFilter = (dataSet, sfwFilter = false) => {
        direction.set([0,0]);
        return dataSet.filter(item => {
            let array = (get(dataSetStore).searchQuery.toLowerCase() || "").split(' ');
            if (sfwFilter) {
                array.push(get(nsfw) ? "" : "!nsfw");}
            return array.every(el => item.searchTerms.toLowerCase().includes(el))
        }) ?? [];
    }

export { urlSerializer, queryFilter }