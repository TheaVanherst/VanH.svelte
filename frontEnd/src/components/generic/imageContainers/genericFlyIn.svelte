<script>
    import { fly } from "svelte/transition";

    export let
        hover = false
</script>

{#if hover}
	<div class="card" transition:fly={{y:-50}}>
		<div class="container shortBorder">
			<slot/>
		</div>
	</div>
{/if}

<style lang="scss">
	.card {
		position: 	absolute;

		flex: 		100%;
		bottom: 	0;
		width: 		100%;

		.container {
			overflow: 	hidden;
			background: white;
			padding: 	5px;
			margin: 	5px;}}
</style>