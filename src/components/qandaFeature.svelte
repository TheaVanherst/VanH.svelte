<script>
	import qaDatabase 	from "$lib/databases/qaDatabase.js";

    import Container 	from "./generic/container.svelte";
</script>

<Container>
	{#each qaDatabase as qa}
		<div class="questionBlock">
			<div>
				<p class="q generic">
					"{qa.question}"
				</p>
				<p class="s">
					{#if qa.submittedby}
						Question submitted by: <span>{qa.submittedby}</span>
					{:else}
						Question submitted by anon.
					{/if}
				</p>
			</div>
			<div class="a">
				<img class="profileIcon pfp"
						src="/branding/vahnPfp.webp">
				<p class="quote">
					{qa.answer}
				</p>
			</div>
		</div>
	{/each}
</Container>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.wrapper {
		padding: 5px;}

	.questionBlock {
		padding: 		0 10px 8px 10px;

		&:first-child {
			padding-top: 10px;}

		.q {
			width: 			max-content;
			border-bottom: 	solid 1px var(--accent3);
			font-weight: 	700;
			font-size: 		14px;

			@include customFontColour(var(--accent3));}

		.s {
			margin: 	-5px 60px 0 50px;
			width: 		max-content;

			@include citationText(var(--accent1), var(--accent3));}

		.a {
			text-align: right;
			margin: 	-6px 40px 0 10px;

			img {
				position: absolute;}
			p {
				margin:			0 11px 0 0;}}
	}
</style>