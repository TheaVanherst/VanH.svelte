
import { writable } from "svelte/store"

const search = writable();

const searchQuery = (data) => {
    const { subscribe, set, update } = writable({
        data: data,
        filtered: data,
        search: ""
    });
    return { subscribe, set, update }
}

const searchHandler = (store) => {
    const searchTerm = store.search.toLowerCase() || ""
    store.filtered = store.data.filter(item => {
        return item.searchTerms.toLowerCase().includes(searchTerm)});
}

export { search, searchQuery, searchHandler }