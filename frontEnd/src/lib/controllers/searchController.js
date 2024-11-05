
import { get }  from "svelte/store"
import { page } from '$app/stores';
import { goto } from "$app/navigation";

import { navigationControls }                                   from "$lib/settings/navigationHandling.js";
import { dataSetStore, fullscreenGalleryStore, scrollIntoView } from "$lib/settings/pageSettings.js";

import ArtworkDescription from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";
import StoryCard from "$root/components/pageSpecific/queryPages/erotica/storyCard.svelte";

const
    urlSerializer = (values, check= true) => {
        let pageData = get(page).url;
        for ( let [k, v] of Object.entries(values) ) {
            v ? pageData.searchParams.set(encodeURIComponent(k), encodeURIComponent(v)) : pageData.searchParams.delete(k);}
        if (check) {goto(pageData);}
    },
    queryFilter = (dataSet) => {
        let searchQuery = get(dataSetStore).searchQuery.toLowerCase() ?? "";
        !get(navigationControls).nsfw ? searchQuery += " !!sfw " : false;
        return dataSet.filter(i => {
            return searchQuery.split(' ')
                .every(el => i.searchTerms.toLowerCase().includes(el))
        }) ?? [];
    };

export { urlSerializer, queryFilter }

const
    galleryManager = {
        galleryInitializing: (dataset, slug) => {
            let clonedDataset = structuredClone(dataset).map(i => i.slug === slug ? i : undefined).filter(n => n)[0];
            if (clonedDataset) {
                let dataTypes = {
                    style: clonedDataset.gallery.styleType,
                    render: clonedDataset.gallery.renderType };
                clonedDataset.gallery = 			clonedDataset.gallery.images.flat();
                clonedDataset.gallery.styleType = 	dataTypes.style;
                clonedDataset.gallery.renderType = 	dataTypes.render;

                setTimeout(() => {
                    scrollIntoView(`#${slug}`)}, 250)

                fullscreenGalleryStore.set({
                    componentUrl:   ArtworkDescription,
                    componentData:  clonedDataset,
                    currentImage:   Number(get(page).url.searchParams.get('img'))});
            }
        },
        artworkSelection: async (galleryItem) => {
            setTimeout(async () => { // TODO: fix the img id being placed before the gallery slug.
                let currentImage = get(fullscreenGalleryStore).currentImage
                let searchParams = get(page).url.searchParams;
                    searchParams.set('gallery',galleryItem.slug);
                currentImage > 0 ?
                    searchParams.set('img', currentImage) : null
                await goto (`?${searchParams.toString()}`,{noScroll: true});
            }, 250);
        },

        textInitializing: (dataset, slug) => {
            let clonedDataset = structuredClone(dataset).map(i => i.slug === slug ? i : undefined).filter(n => n)[0];
            if (clonedDataset) {
                setTimeout(() => {
                    scrollIntoView(`#${slug}`)}, 250)
                fullscreenGalleryStore.set({
                    componentUrl: StoryCard,
                    componentData: clonedDataset});
            }
        },
        storySelection: (story) => {
            setTimeout( async () => {
                let searchParams = get(page).url.searchParams;
                searchParams.set('story',story.slug);

                fullscreenGalleryStore.set({
                    componentUrl: StoryCard,
                    componentData: story});

                await goto (`?${searchParams.toString()}`,{noScroll: true});
            }, 250);
        }
    }

export { galleryManager }

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