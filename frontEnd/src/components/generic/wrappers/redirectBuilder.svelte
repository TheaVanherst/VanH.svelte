<script>
    import { directionProcessing, directoryData, navigationControls } from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { pageName } from "$lib/controllers/stylingControllers/titlebarScoller.js";

    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let
        url = 		'',
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

			directionProcessing($directoryData.raw, newRoute, newRoute, paraLength);
            $navigationControls.transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});

            setTimeout(async () => {
                await goto(newRoute);
                $navigationControls.transitioning = false;}, 350);}

    	if (n) { // this sets a custom page name.
            $pageName = n;}
    }
</script>

<a href="{url}" target="" on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}>
	<slot/>
</a>