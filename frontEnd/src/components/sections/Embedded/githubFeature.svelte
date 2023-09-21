<script>
    import Container from "../../generic/container.svelte";
	import GithubCard from "$root/components/sections/Embedded/githubCard.svelte";

    export let dataset = [];
</script>

<Container>
	<div class="table">
		{#each dataset as dataEntry}
			<div class="cell">
				<GithubCard data={dataEntry}/>
			</div>
		{/each}
	</div>
</Container>

<style lang="scss">
	.table {
		box-sizing: border-box;
		gap: 5px;
		column-count: 2;

		.cell {
			display: inline-block;
			width: 100%;
		}
	}
</style>