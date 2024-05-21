
import { get }  from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { navigationControls }   from "$lib/controllers/layoutControllers/navigationHandling.js";
import { dataSetStore }         from "$lib/controllers/layoutControllers/pageSettings.js";

const
    urlSerializer = (values) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        goto(pageData);
    },
    queryFilter = (dataSet) => {
        let searchQuery = (get(dataSetStore).searchQuery).toLowerCase() ?? "";
            // just ensures everything is lowercase.
        if (!get(navigationControls).nsfw) {
            searchQuery += " !!sfw ";}
        // adds a NSFW absolute filter to allow users to filter for only SFW content.
        return dataSet.filter(i => {
            let array = searchQuery.split(' ');
            return array.every(el => i.searchTerms.toLowerCase().includes(el))
        }) ?? [];
    };

export { urlSerializer, queryFilter }

const
    searchTermBuilder = {
        sfw:
            e => (!e?.nsfw ? `!!sfw `: `!!nsfw ` ?? '') + (!e?.sfw ? '!!risky ' : ''),
        title:
            e => `${e.pieceName?.replaceAll(" ","_")} ${e.slug} `,
        renderStyle:
            e => `${e.gallery.renderType?.replaceAll(' ','_')} ${e.gallery.styleType?.replaceAll(' ','_')} `,
        tags:
            e => !!e.tags ? `${e.tags.map(
                i => `${i.title.replace(' ','_')}${(!!i?.relatedTags ? ` ${i.relatedTags}` : '')} `).join('')}` : '',
        authors:
            e => !!e.authors ? e.authors.map(
                a => `@${a.fullName.replaceAll(' ','_')} @${a.handle.replaceAll(' ','_')}`).join('') : '',
        characters:
            e => !!e.characters ? e.characters?.map(
                c => `:${c.fullName.replaceAll(' ','_')} :${c?.nickName?.replaceAll(' ','_')}`).join('') : '',
        commissions:
            e => !!e.commissionData ?
                `${e.commissionData?.commissionType} commission commissioned` + e.commissionData?.characters?.map(
                    c => `:${c.fullName.replaceAll(' ','_')} @${c.owner.handle.replaceAll(' ','_')} `).join('') : ''
    };

export { searchTermBuilder }