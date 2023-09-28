<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    export let push;
</script>

<div class="grid">
    {#each push as row}
        <div class="row">
            {#each row as image}
                <div class="col">
                    <SanityImage image={image}/>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="scss">
	.grid {
        display: inline-flex;
        gap: var(--imageSpacing);
        vertical-align: bottom;

        .row {
	        vertical-align: bottom;
	        display: flex;
            gap: var(--imageSpacing);

	        width: 100%;

	        .col {
		        background-color:   var(--backgroundAccent2);

		        overflow: hidden;
		        width:    50%;

		        &:only-child {
			        width:    inherit;}}}}
</style>