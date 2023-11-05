<script>
    import { directionProcessing, directory, nsfw, rootPath, transitioning } from '$lib/controllers/pageControllers.js';
    import { pageName } from "$lib/controllers/titlebarScoller.js";

    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let
        url = 		'',
        internal = 	false,
		redirectName = undefined,
		nsfwPointer = undefined;

    const redirectCheck = (e, n, p = null) => {
        let paraLength = Object.keys($page.params).length;
        let newRoute;

        if (p !== null) {
            $nsfw = (p ? 'nsfw' : '')
            newRoute = (p ? '/nsfw' : '') + e;}
        else {
            newRoute = (paraLength > 0 ? `/${$page.params.sfw}` : "") + e;}

        if (newRoute !== $directory && !$transitioning) {
            $rootPath = e;

			directionProcessing($directory, newRoute, newRoute, paraLength);
            $transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});

            setTimeout(async () => {
                await goto(newRoute);
                $transitioning = false;
            }, 350);
        }

    	if (n) { // this sets a custom page name.
            $pageName = n;}
    }
</script>

{#if internal}
	<a href="{url}" target="" on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}>
		<slot/>
	</a>
{:else}
	<a href="https://www.{url}" target="_blank" data-sveltekit-preload-data>
		<slot/>
	</a>
{/if}