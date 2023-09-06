<script>
    import { directionProcessing, directory, rootPath, transitioning, nsfw
    } from '$lib/controllers/accessibilityController.js';
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const redirectCheck = (e, s) => {
        if (s) {
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

                setTimeout(() => {
                    goto(newRoute)
                    $transitioning = false;
                }, 250);}}}

	export let
		url = 		'',
        blank = 	false,
		external = 	false;
</script>

<a href={external ? '' : `https://www.${url}`}
   target={blank ? '_blank' : ''}
   on:mousedown|preventDefault={() => redirectCheck(url, external)}>
	<slot/>
</a>