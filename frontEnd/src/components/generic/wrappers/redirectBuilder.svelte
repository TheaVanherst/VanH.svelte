<script>
    import { directoryProcessing, directoryData, navigationControls } from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { pageName } from "$lib/controllers/stylingControllers/titlebarScoller.js";

    import { goto } from "$app/navigation";
    import { galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";

    export let
        url = '',
		redirectName = undefined,
		nsfwPointer = undefined;

    const redirectCheck = (e, n, p = undefined) => {
        let newRoute;
        if (p !== undefined) { // protects from false redirects
            $navigationControls.nsfw = p
            newRoute = (p ? `/${$directoryData.nsfwKeyword}` : '') + e;}
        else {
            newRoute = $directoryData.nsfwUrlCheck() + e;}
        // this allows plain redirects via. eg. /artwork, and adds the NSFW filter keyword.

        if (newRoute + "/" !== $directoryData.raw && !$navigationControls.transitioning) {
            galleryChange();
			directoryProcessing($directoryData.raw, newRoute);
            $navigationControls.transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});
            setTimeout(async () => {
                await goto(newRoute);
                $navigationControls.transitioning = false;
            }, 250);}

    	if (n) { // this sets a custom page name.
            $pageName = n;}}
</script>

<a href="{$navigationControls.nsfw ? `/${$directoryData.nsfwKeyword}`  : ''}{url}" target=""
   	on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}> <!-- NEEDS to be a click, otherwise it doesn't register queries. -->
		<slot/>
</a>

<style lang="scss">
	a {
		color: inherit;}
</style>