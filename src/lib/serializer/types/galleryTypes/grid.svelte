<script>
    import SanityImage from '$lib/serializer/imageBuilder.svelte'
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
        .row {
	        vertical-align: bottom;
	        display: inline-flex;

	        width: 100%;
	        gap: var(--imageSpacing);

	        &:not(:last-of-type) {
		        padding: 0 0 var(--imageSpacing) 0;}

	        .col {
		        background-color:   var(--backgroundAccent2);

		        overflow: hidden;
		        width:    50%;

		        &:only-child {
			        width:    inherit;}}}}
</style>