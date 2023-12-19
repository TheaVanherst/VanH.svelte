
import { get } from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";
import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";

const
    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        goto(pageData);
    },
    queryFilter = (dataSet) => {
        navigationControls.update(e => ({...e, direction: 0}));
        let searchQuery = (get(dataSetStore).searchQuery).toLowerCase() ?? "";
        if (!get(navigationControls).nsfw ) {
            searchQuery += " !!sfw";}
        return dataSet.filter(item => {
            let array = searchQuery.split(' ');
            return array.every(el => item.searchTerms.toLowerCase().includes(el))
        }) ?? [];
    }

export { urlSerializer, queryFilter }