<script>
    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";

    import { socialMediaVisibility, navigationVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = 	true;
    $navigationVisibility = 	true;
</script>

<TransitionHandler>
	<slot/>
</TransitionHandler>
