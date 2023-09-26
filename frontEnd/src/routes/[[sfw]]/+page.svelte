<script>
    import { goto } 		from '$app/navigation';
    import {
        directionProcessing, rootPath, transitioning,
    	} from "$lib/controllers/accessibilityController.js";

    import { page } from "$app/stores";
    import {onMount} from "svelte";

    let redirect = "/home"

    onMount(async () => {
        // temp until I make a cool intro page

        let paraLength = Object.keys($page.params).length;
        let newRoute = paraLength > 0 ? `/${$page.params.sfw}${redirect}/` : redirect;
        $rootPath = redirect;

        await directionProcessing(redirect,newRoute,newRoute,paraLength);
        $transitioning = true;
        await goto(newRoute);
        $transitioning = false;
	});

    export let data;
</script>