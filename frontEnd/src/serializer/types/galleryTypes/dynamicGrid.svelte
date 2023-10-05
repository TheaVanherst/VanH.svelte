<script>
    import CitedImage from "$root/serializer/types/citedImage.svelte";

    export let push;
    export let citation;
</script>

<div class="dynamicGrid">
    {#each push as row}
        <div class="row">
            {#each row as image}
                <div class="col regularBorder">
                    <CitedImage image={image} citation={citation[i]}/>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
	.row {
		display:    inline-flex;
		gap:        var(--imageSpacing);
		vertical-align: bottom;

		.col {
			background: var(--backgroundAccent2);
			overflow:   hidden;

			&:not(:only-child) {
				max-width: 60%;}}}
</style>