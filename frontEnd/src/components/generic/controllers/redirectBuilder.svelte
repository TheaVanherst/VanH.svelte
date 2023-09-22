<script>
    import { directionProcessing, directory, nsfw, rootPath, transitioning} from '$lib/controllers/accessibilityController.js';
    import { pageName } from "$lib/controllers/titlebarScoller.js";

    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    export let
        url = 		'',
        external = 	false,
		redirectName = undefined;

    const redirectCheck = (e, n) => {
        let paraLength = Object.keys($page.params).length;
        let newRoute = paraLength > 0 ? `/${$page.params.sfw}${e}/` : e;

        if (newRoute !== $directory && !$transitioning) {
            $rootPath = e;
            $nsfw = $page.params.sfw === "nsfw";

			directionProcessing($directory, newRoute, newRoute, paraLength);
            $transitioning = true;

            window.scrollTo({
                top: 0,
                behavior: 'smooth'})

            setTimeout(async () => {
                await goto(newRoute)
                $transitioning = false;
            }, 250);}

    	if (n) {
            $pageName = n;}
    }
</script>

<a href={external ? '' : `https://www.${url}`}
   target={external ? '' : '_blank'}
   on:mousedown|preventDefault={() => external ? redirectCheck(url, redirectName) : false}>
	<slot/>
</a>