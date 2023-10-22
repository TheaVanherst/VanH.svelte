<script>
    import CitedImage from "$root/serializer/types/citedImage.svelte";

    export let push;
    export let citation;
</script>

<div class="dynamicGrid">
    {#each push as row, x}
        <div class="row">
            {#each row as image, i}
                <div class="col regularBorder">
                    <CitedImage image={image} citation={citation[x][i]}/>
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
                background:   var(--backgroundAccent2);

                overflow: hidden;
                width:    50%;

                &:only-child {
                    width:    inherit;}}}}
</style>