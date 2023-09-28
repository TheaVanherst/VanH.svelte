<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    export let push;
</script>

<div class="table">
    <div class="row">
        {#each push as image}
            <div class="col">
                <SanityImage image={image}/>
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