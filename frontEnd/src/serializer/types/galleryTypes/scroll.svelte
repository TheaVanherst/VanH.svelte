<script>
    import CitedImage from "$root/serializer/types/citedImage.svelte";

    export let push;
    export let citation;
</script>

<div class="table">
    <div class="row">
        {#each push as image, i}
            <div class="col">
                <CitedImage image={image} citation={citation[i]}/>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
	.table {
        display:        grid;
        overflow-y:     hidden;
        white-space:    nowrap;

        .col {
            background: var(--backgroundAccent2);
            display:    inline-grid;
            height:     100%;
        }
    }
</style>