<script>
	import { screenType } from "$lib/controllers/pageControllers.js";

    import Container from "../../../generic/containers/container.svelte";
	import GithubCard from "$root/components/sections/homePage/embedded/githubCard.svelte";

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

		.cell {		width: calc(50% - 5px);}
		&.full {
			.cell {	width: 100%;}}}
</style>