<script>
	import {screenType} from "$lib/controllers/accessibilityController.js";

    import SanityImage 	from "$lib/serializer/sanityImage.svelte";
    import Container 	from "../../generic/containers/container.svelte";

    export let dataset = [];
</script>

<Container>
	{#each dataset[0].questions as qa}
		<div class="row">
			{#if $screenType > 2}
				<div class="profileIcon anon">
					{#if qa.user}
						<SanityImage image={qa.user.userPortrait}/>
					{:else}
						<SanityImage image={dataset[0].anon.userPortrait}/>
					{/if}
				</div>
			{/if}
			<div class="questionBlock">
				<div>
					<div class="q">
						<h5>"{qa.question}"</h5>
					</div>
					<p class="s citation">
						{#if qa.user}
							Question submitted by: <span>{qa.user.handle}</span>
						{:else}
							Question submitted by {dataset[0].anon.handle}.
						{/if}
					</p>
				</div>
				<div class="a">
					<p class="quote fancy">
						{qa.answer}
					</p>
				</div>
			</div>
			<div class="profileIcon thea">
				<SanityImage image={dataset[0].answerer.userPortrait}/>
			</div>
		</div>
	{/each}
</Container>

<style lang="scss">
	@import "../../../commonStyles.scss";

	* {	transition: .3s ease; }

	.row:hover {
		.profileIcon {
			transform: scale(1.2);}
		.q {margin: 4px 0 4px 20px;}
		.s {margin: 2px 0 0 75px;}
	}

	.profileIcon {
		aspect-ratio: 	1/1;
		display: 		inline-table;
		background: 	white;

		&.thea {
			margin: auto 0;}}

	.row {
		display: 	flex;
		gap: 		10px;

		.questionBlock {
			width: 	100%;}}

	.questionBlock {
		.q {margin: 4px 4px 4px 4px;}
		.s {margin: 2px 0 0 15px;}
		.a {margin: 4px 4px 4px 4px;
			text-align: right;}
	}
</style>