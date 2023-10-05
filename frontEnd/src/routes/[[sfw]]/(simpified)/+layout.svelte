<script>
    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";

    import { socialMediaVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = false;
</script>

<TransitionHandler>
	<slot/>
</TransitionHandler>
