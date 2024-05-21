<script>
    import CitedImage           from "$root/serializer/citedImage.svelte";
    import { galleryChange }    from "$lib/controllers/layoutControllers/pageSettings.js";

    export let
            push,
            citation;
</script>

<div class="dynamicGrid">
    {#each push as row, x}
        <div class="row">
            {#each row as image, i}
                <div class="col regularBorder" on:click={() => galleryChange(i)}>
                    <CitedImage {image} citation={citation[x][i]}/>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
    .dynamicGrid {
        display: grid;
        gap: var(--imageSpacing);
        vertical-align: bottom;

        .row {
            vertical-align: bottom;
            display: flex;
            gap: var(--imageSpacing);

            width: 100%;

            .col {
                background: var(--TransBlack);

                overflow:   hidden;
                width:      50%;
                min-height: 150px;

                &:only-child {
                    width:    inherit;}}}}
</style>