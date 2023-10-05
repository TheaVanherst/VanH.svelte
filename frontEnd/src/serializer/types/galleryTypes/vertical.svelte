<script>
    import CitedImage from "$root/serializer/types/citedImage.svelte";

    export let push;
    export let citation;
</script>

<div class="table vertical">
    {#each push as image, i}
        <div class="regularBorder">
            <CitedImage image={image} citation={citation[i]}/>
        </div>
    {/each}
</div>

<style lang="scss">
	.table {
        gap:        5px;
        display:    grid;

        div {
            overflow: hidden;}}
</style>