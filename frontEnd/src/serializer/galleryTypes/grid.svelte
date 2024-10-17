<script>
    import CitedImage           from "$root/serializer/citedImage.svelte";
    import { galleryChange }    from "$lib/settings/pageSettings.js";

    export let
            push,
            citation;
</script>

<div class="grid">
    {#each push as row, x}
        <div class="row">
            {#each row as image, i}
                <div class="col regularBorder" on:click={() => galleryChange(i + (x * 2))}>
                    <CitedImage {image} citation={citation[x][i]}/>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
	.grid {
        display:        grid;
        gap:            var(--smallSpacing);
        vertical-align: bottom;

        height:     100%;
        width:      auto;

        .row {
	        vertical-align: bottom;
	        display: flex;
            gap: var(--smallSpacing);

	        min-width: 100%;

	        .col {
                background: var(--transPure2);

		        overflow:   hidden;
		        width:      50%;
                min-height: 150px;

		        &:only-child {
			        width:    inherit;}}}}
</style>