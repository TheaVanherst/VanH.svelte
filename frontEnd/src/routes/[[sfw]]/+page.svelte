<script>
    import { onMount } from "svelte";
    import { navigationData } from "$lib/controllers/layoutControllers/navigationHandling.js";
    export let data;

    onMount(async () => {
        navigationData.set(e => ({...e, logo: true, navigation: false, socials: false, search: false }));});
</script>