
import { writable } from "svelte/store"
import {goto} from "$app/navigation";

const
    searchQuery = (data) => {
        const { subscribe, set, update } = writable({
            data: data,
            filtered: data,
            search: ""
        });
        return { subscribe, set, update }
    },

    searchHandler = (store) => {
        const searchTerm = store.search.toLowerCase() || ""
        store.filtered = store.data.filter(item => {
            let array = searchTerm.split(' ');
            return array.every(el => item.searchTerms.toLowerCase().includes(el))});
    },

    urlSerializer = (values) => {
        const url = new URL(window.location.href);

        for ( let [k, v] of Object.entries(values) ) {
            v ? url.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : url.searchParams.delete(k);};

        goto(url);
    };

export { urlSerializer, searchQuery, searchHandler }
