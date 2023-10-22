<script>
    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";
    import { socialMediaVisibility } from "$lib/controllers/pageControllers.js";

    $socialMediaVisibility = true;

    export let data;
</script>

<TransitionHandler>
	<slot/>
</TransitionHandler>