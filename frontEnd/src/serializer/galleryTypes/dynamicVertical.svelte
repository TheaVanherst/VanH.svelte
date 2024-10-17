<script>
    import CitedImage           from "$root/serializer/citedImage.svelte";
    import { galleryChange }    from "$lib/settings/pageSettings.js";

    export let
            push,
            citation;
</script>

<div class="dynamicVertical">
    {#each push as row, x}
        <div class="row" style="--yWid: {push.length}">
            {#each row as image, i}
                <div class="col" on:click={() => galleryChange(i + (x * 2))}>
                    <CitedImage {image} citation={citation[x][i]}/>
                </div>
            {/each}
        </div>
    {/each}
</div>


<style lang="scss">
	.dynamicVertical {
		column-count:   2;
		gap:            var(--smallSpacing);
		display:        flex;

		.row {
			width:  50%;
			gap:    var(--smallSpacing);

			display:        grid;
			flex-direction: column;

			.col {
                min-height: 150px;
				display:    flex;
				overflow:   hidden;
                background: var(--transPure2);
            }
        }
    }
</style>