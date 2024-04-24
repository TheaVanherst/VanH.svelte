<script>
    import CitedImage from "$root/serializer/citedImage.svelte";
    import { galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";

    export let push;
    export let citation;
</script>

<div class="table vertical">
    {#each push as image, i}
        <div class="regularBorder" on:click={() => galleryChange(push, i)}>
            <CitedImage image={image} citation={citation[i]}/>
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