<script>
	export let dataEntry
	let active = false;
</script>

<a href={dataEntry.url} target="_blank"
   class="{active ? 'hovered' : ''}"
   	on:mouseenter={() => {active = true;}}
   	on:mouseleave={() => {active = false;}}>
	<div class="workshopItem">
		<h4 class="title">
			{dataEntry.name}
		</h4>
		<img src="/workshop/{dataEntry.thumbnail}.webp">
		<div class="workshopData">
			<p class="description">
				{dataEntry.description}
			</p>
			<div class="details">
				<div class="game">
					<img src="/workshop/gameIcons/{dataEntry.game.url}.webp">
					<p>
						{dataEntry.game.name}
					</p>
				</div>
				<div class="developers">
					By:&nbsp;
					{#each dataEntry.authors as author, i}
						<a class="author" href={author.url}>
							{author.name}
						</a>
						{#if i < dataEntry.authors.length - 1}
							&nbsp;and&nbsp;
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	* {	transition: .5s ease;}

	.hovered {
		.workshopItem {
			.title {
				filter:
					drop-shadow(0px 0px 1px var(--accent9))
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);
			}
			.details {
				border-top: 1px solid var(--accent2)!important;
			}
			.author {
				&:hover {
					text-decoration: underline;
					color: var(--accent3)!important;
				}
				&:not(:hover){
					filter:
						drop-shadow(0px 0px 1px var(--accent9))
						brightness(0) 	saturate(100%)
						invert(15%) 	sepia(75%)
						saturate(5273%) hue-rotate(271deg)
						brightness(97%) contrast(132%);
				}
			}
		}
	}

	.workshopItem {
		position: 		relative;
		overflow: 		hidden;
		border-top: 	1px solid var(--accent8);
		border-bottom: 	1px solid var(--accent8);

		border-left: 	transparent;
		border-right: 	transparent;
		width: 			calc(100%);

		img {
			width:	100%;
			border-radius: 5px;
			overflow: hidden;
		}

		h4 {
			filter:	 		drop-shadow(0px 0px 0.8px var(--accent9));
			padding: 		7px 10px 10px 10px;
			white-space: 	nowrap;
			text-transform: uppercase;
			position: 		relative;
		}
	}

	.workshopData {
		padding:		5px 10px;
		.description {
			font-family:	"Helvetica", Sans-serif;
			margin-bottom: 	10px;
			line-height: 	1rem;

			display: 		-webkit-box;
			overflow: 		hidden;

			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}

		.details {
			> * {
				white-space: 	nowrap;
			}

			border-top: 	1px solid var(--accent8);
			padding: 		5px 0 18px 0;

			.game {
				display: 		flex;
				margin-bottom: 	3px;

				img {
					border-radius: 	2px;
					overflow: 		hidden;

					width: 	22px;
					height: 22px;
				}
				p {
					margin: 	auto 0 auto 7px;
				}
			}

			.developers {
				font-family:	"Helvetica", Sans-serif;
				font-size: 		12px;
				color: 			var(--accent8);

				display: 		flex;

				.author {
					color: var(--accent9);
				}
			}
		}
	}
</style>