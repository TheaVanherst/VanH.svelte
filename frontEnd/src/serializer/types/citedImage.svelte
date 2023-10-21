<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import ImageTag from "$root/components/generic/imageContainers/imageTag.svelte";
    import { fade } from "svelte/transition";

    export let
		citation = undefined,
    	image = undefined;
    let active = false;
</script>

<div
	class="imageWrapper"
	on:mouseenter={() => active = true}
	on:mouseleave={() => active = false}>
	<SanityImage image={image}/>
	{#if citation?.length > 0}
		{#if active}
			<div transition:fade={{duration:150}}>
				<ImageTag position={[1,0]} border="shortBorder">
					<p>{citation}</p>
				</ImageTag>
			</div>
		{/if}
	{/if}
</div>