<script>
	import { screenType } from "$lib/controllers/accessibilityController.js";

    import Container from "../../generic/containers/container.svelte";
	import GithubCard from "$root/components/sections/embedded/githubCard.svelte";

    export let dataset = [];
</script>

<Container>
	<div class="table"
		class:full={$screenType < 2}>
		{#each dataset as dataEntry}
			<div class="cell">
				<GithubCard data={dataEntry}/>
			</div>
		{/each}
	</div>
</Container>

<style lang="scss">
	.table {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 	 	10px;

		.cell {
			max-width: calc(50% - 5px);}

		&.full {
			.cell {
				max-width: 100%;
				width: 100%;}}}
</style>