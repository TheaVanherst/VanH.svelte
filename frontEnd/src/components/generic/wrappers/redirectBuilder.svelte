<script>
    import { directionProcessing, directoryData, navigationControls } from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { pageName } from "$lib/controllers/stylingControllers/titlebarScoller.js";

    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";

    export let
        url = '',
		redirectName = undefined,
		nsfwPointer = undefined;

    const redirectCheck = (e, n, p = null) => {
        let paraLength = Object.keys($page.params).length;
        let newRoute;

        if (p !== null) {
            $navigationControls.nsfw = p
            newRoute = (p ? '/nsfw' : '') + e;}
        else {
            newRoute = (paraLength > 0 ? `/${$page.params.sfw}` : "") + e;}

        if (newRoute + "/" !== $directoryData.raw && !$navigationControls.transitioning) {
            galleryChange();
			directionProcessing($directoryData.raw, newRoute, newRoute, paraLength);
            $navigationControls.transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(async () => {
                await goto(newRoute);
                $navigationControls.transitioning = false;}, 250);}

    	if (n) { // this sets a custom page name.
            $pageName = n;}
    }
</script>

<a href="{url}" target="" on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}>
	<slot/>
</a>

<style lang="scss">
	a {
		color: inherit;
	}
</style>