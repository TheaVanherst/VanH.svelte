<script>
	import qaDatabase 	from "$lib/databases/qaDatabase.js";

    import Container 	from "../../generic/container.svelte";
</script>

<Container>
	{#each qaDatabase as qa}
		<div class="questionBlock">
			<div>
				<p class="q">
					"{qa.question}"
				</p>
				<p class="s citation">
					{#if qa.submittedby}
						Question submitted by: <span>{qa.submittedby}</span>
					{:else}
						Question submitted by anon.
					{/if}
				</p>
			</div>
			<div class="a fancy">
				<img class="profileIcon"
						src="/branding/vahnPfp.webp">
				<p class="quote fancy">
					{qa.answer}
				</p>
			</div>
		</div>
	{/each}
</Container>

<style lang="scss">
	@import "../../../commonStyles";

	* {	transition: .3s ease; }

	.questionBlock {
		padding: 0 10px 8px 10px;
		overflow: hidden;

		&:hover {
			.q {	color: 		white;
					background: var(--accent2);
					padding: 	1px 5px 2px 15px;}
			.s {	margin: 	-5px 60px 0 100px;}
			.a { img {
					transform: scale(1.2);}}}

		&:first-child {	padding-top: 	10px;}
		&:last-child {	padding-bottom: 4px;}

		.q {
			margin-bottom: 	10px;
			padding: 		1px 2px 2px 2px;

			width: 			max-content;
			font-weight: 	700;
			font-size: 		14px;
			border-radius: 3px;

			color: 		black;
			background: var(--accent9);
			&::selection {
				color: var(--accent9);};}

		.s {
			margin: 	-5px 60px 0 50px;
			width: 		max-content;}

		.a {
			text-align: right;
			margin: 	-6px 40px 0 10px;

			img {	position: 	absolute;}
			p {		margin:		0 11px 0 0;}}}
</style>