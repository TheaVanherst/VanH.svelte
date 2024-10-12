<script>
    import CitedImage           from "$root/serializer/citedImage.svelte";
    import { galleryChange }    from "$lib/settings/pageSettings.js";

    export let
        push,
        citation;
</script>

<div class="table vertical">
    {#each push as image, i}
        <div class="regularBorder" on:click={() => galleryChange(i)}>
            <CitedImage {image} citation={citation[i]}/>
        </div>
    {/each}
</div>

<style lang="scss">
	.table {
        gap:        5px;
        display:    grid;
        height:     100%;
        width:      auto;

        div {
            min-height: 150px;
            overflow:   hidden;}}
</style>