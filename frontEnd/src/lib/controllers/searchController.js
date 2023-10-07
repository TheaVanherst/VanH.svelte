
import { writable } from "svelte/store"
import { goto } from "$app/navigation";

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
    urlSerializer = (v) => {
        const queryParams = 	v.toString().replaceAll(' ','-');
        const params = 			new URLSearchParams(window.location.search);

        params.set('q', queryParams);
        goto(`?${params}`);
    }

export { urlSerializer, searchQuery, searchHandler }
