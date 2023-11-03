<script>
    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";

    import { navigationVisibility, socialMediaVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = false;
    $navigationVisibility = true;
</script>

<TransitionHandler>
	<slot/>
</TransitionHandler>
