<script>
    import { nsfw } from "$lib/controllers/accessibilityController.js";

	export let data;

    $nsfw = data.params === 'nsfw';
</script>

<slot/>