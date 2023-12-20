<script>
    import CitedImage from "$root/serializer/types/citedImage.svelte";
    import { galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";

    export let push;
    export let citation;
</script>

<div class="dynamicVertical">
    {#each push as row, x}
        <div class="row" style="--yWid: {push.length}">
            {#each row as image, i}
                <div class="col" on:click={() => galleryChange(push, i + (x * 2))}>
                    <CitedImage image={image} citation={citation[x][i]}/>
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
                min-height: 150px;
				display:    flex;
				overflow:   hidden;
                background: var(--TransBlack);
            }
        }
    }
</style>