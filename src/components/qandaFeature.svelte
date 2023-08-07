<script>
	import qaDatabase 	from "$lib/databases/qaDatabase.js";
    import Container 	from "./generic/container.svelte";

    let active = false;
</script>

<Container>
	{#each qaDatabase as qa}
		<div class="questionBlock">
			<div class="q">
				<div class="pfp">
					<img src="/branding/{qa.profile ?? 'cosmaPfp'}.webp">
				</div>
				<p class="question">"{qa.question}"</p><br>
			</div>
			<p class="s">
				{#if qa.submittedby}
					Question submitted by: <span>{qa.submittedby}</span>
				{:else}
					Question submitted by anon.
				{/if}
			</p>
			<div class="a">
				<div class="pfp">
					<img src="/branding/vahnPfp.webp">
				</div>
				<p>{qa.answer}</p>
			</div>
		</div>
	{/each}
</Container>

<style lang="scss">
	.wrapper {
		padding: 5px;}

	img {
		width: 	40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;}

	.questionBlock {
		padding: 		0 10px 15px 10px;

		&:first-child {	padding-top: 	15px;}

		.q {
			display: 		flex;
			border: 1px solid var(--accent3);
			border-radius: 	5px;

			.pfp {
				margin: 	-9px 0 -11px 10px;

				> img {
					top: 		calc(50% - 1px);
					transform: 	translateY(-50%);
					position: 	relative;
					border: 	1px solid var(--accent3);}}

			p {
				padding: 	5px 15px 6px 10px;

				color:	 		var(--accent3);
				font-family: 	"Helvetica", Sans-serif;
				font-weight: 	700;
				font-size: 		14px;

				&::selection {
					color: black;
					background-color: var(--accent3) !important;}}}

		.s {
			margin: 7px 60px -17px 50px;

			text-align: 	right;
			font-size: 		10px;
			font-family: 	"Helvetica", Sans-serif;
			color: 			var(--accent8);

			span {
				color: var(--accent7);
				&::selection {
					color: black;
					background-color: var(--accent7) !important;}
			}
		}

		.a {
			text-align: 	right;
			margin: 		15px 40px 0 10px;

			img {
				border: 1px solid var(--accent8);
				position: absolute;}

			p {
				border: 		1px solid var(--accent8);
				border-top: 	transparent;
				border-bottom: 	transparent;

				border-radius: 	5px;
				padding: 		10px;
				margin:			0 10px 0 0;

				position: relative;

				&::before,
				&::after {
					position: 	absolute;
					font-size: 	55px;}
				&::before {
					left: 		0;
					margin: 	-25px 0 0 -8px;
					content: 	open-quote;}
				&::after {
					margin: 	5px -10px 0 0;
					content: 	close-quote;}}}
	}
</style>