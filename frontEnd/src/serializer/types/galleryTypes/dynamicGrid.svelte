<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    export let push;
</script>

<div class="dynamicGrid">
    {#each push as row}
        <div class="row">
            {#each row as image}
                <div class="col">
                    <SanityImage image={image}/>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
	.row {
		display: inline-flex;
		gap: var(--imageSpacing);
		vertical-align: bottom;

		&:not(:last-of-type) {
			padding-bottom: var(--imageSpacing);}

		.col {
			background-color:   var(--backgroundAccent2);
			overflow:           hidden;

			&:not(:only-child) {
				max-width: 60%;
			}
		}
	}
</style>