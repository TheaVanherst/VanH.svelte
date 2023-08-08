<script>
	import qaDatabase 	from "$lib/databases/qaDatabase.js";
    import Container 	from "./generic/container.svelte";

    let active = false;
</script>

<Container>
	{#each qaDatabase as qa}
		<div class="questionBlock">
			<div class="q">
				<p>
					"{qa.question}"
				</p>
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
				<p>
					{qa.answer}
				</p>
			</div>
		</div>
	{/each}
</Container>

<style lang="scss">
	.wrapper {
		padding: 5px;
	}

	img {
		width: 	40px;
		height: 40px;
		border-radius: 	50%;
		overflow: 		hidden;
	}

	.questionBlock {
		padding: 		0 10px 10px 10px;
		&:first-child {
			padding-top: 10px;
		}

		.q {
			display: 		flex;
			p {
				padding: 		0 5px 4px 5px;
				margin-bottom: 	10px;
				border-bottom: 	solid 1px var(--accent3);

				color:	 		var(--accent3);
				font-family: 	"Helvetica", Sans-serif;
				font-weight: 	700;
				font-size: 		14px;

				&::selection {
					color: 		black;
					background: var(--accent3) !important;
				}
			}
		}

		.s {
			margin: -2px 60px -17px 50px;

			text-align: 	right;
			font-size: 		10px;
			font-family: 	"Helvetica", Sans-serif;
			color: 			var(--accent8);

			span {
				color: 			var(--accent1);
				&::selection {
					color: 		black;
					background:	var(--accent1) !important;
				}
			}
		}

		.a {
			text-align: right;
			margin: 	15px 40px 0 10px;

			img {
				position: absolute;
			}

			p {
				border-left: 	1px solid var(--accent8);
				border-right: 	1px solid var(--accent8);

				padding: 	10px;
				margin:		0 10px 0 0;

				position: relative;

				&::before,
				&::after {
					position: 	absolute;
					font-size: 	55px;
				}
				&::before {
					left: 		0;
					margin: 	-15px 0 0 -12px;
					content: 	open-quote;
				}
				&::after {
					margin: 	5px -10px 0 0;
					content: 	close-quote;
				}
			}
		}
	}
</style>