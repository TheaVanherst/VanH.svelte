<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    export let push;
</script>

<div class="dynamicVertical">
    {#each push as row}
        <div class="row" style="--yWid: {push.length}">
            {#each row as image}
                <div class="col">
                    <SanityImage image={image}/>
                </div>
            {/each}
        </div>
    {/each}
</div>


<style lang="scss">
	.dynamicVertical {
		column-count:   2;
		gap:            var(--imageSpacing);
		display:        flex;

		.row {
			width:  50%;
			gap:    var(--imageSpacing);

			display:        grid;
			flex-direction: column;

			.col {
				display:    flex;
				overflow:   hidden;
				background: var(--backgroundAccent2);
            }
        }
    }
</style>