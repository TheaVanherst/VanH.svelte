<script>
    import { directionProcessing, directory, navStatus } from '$lib/pageSettings/redirectHandling.js';
    import { pageName } from "$lib/controllers/titlebarScoller.js";

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
            $navStatus.nsfw = p
            newRoute = (p ? '/nsfw' : '') + e;}
        else {
            newRoute = (paraLength > 0 ? `/${$page.params.sfw}` : "") + e;}

        if (newRoute + "/" !== $directory.raw && !$navStatus.transitioning) {

			directionProcessing($directory.raw, newRoute, newRoute, paraLength);
            $navStatus.transitioning = true;
            window.scrollTo({top: 0, behavior: 'smooth'});

            setTimeout(async () => {
                await goto(newRoute);
                $navStatus.transitioning = false;}, 350);}

    	if (n) { // this sets a custom page name.
            $pageName = n;}
    }
</script>

<a href="{url}" target="" on:click|preventDefault={() => redirectCheck(url, redirectName, nsfwPointer)}>
	<slot/>
</a>