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
					<img class="icon"
						 src="/workshop/gameIcons/{dataEntry.game.url}.webp">
					<p class="name">
						{dataEntry.game.name}
					</p>
				</div>
				<div class="developers">
					By:&nbsp;
					{#each dataEntry.authors as author, i}
						<span class="author">{author}</span>
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
		.title {
			filter:
					drop-shadow(0px 0px 1px var(--accent9))
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);}
		.details {
			border-top: 	1px solid var(--accent2)!important;}
		.author {
			filter:
					drop-shadow(0px 0px 1px var(--accent9))
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);}
	}

	.workshopItem {
		position: 		relative;
		border-radius: 	5px;
		overflow: 		hidden;

		img {
			width: 			100%;
			border-radius: 	4px;
			overflow: 		hidden;}

		h4 {
			filter:	 		drop-shadow(0px 0px 0.8px var(--accent9));
			padding: 		7px 10px 10px 10px;
			white-space: 	nowrap;
			text-transform: uppercase;
			position: 		relative;}}

	.workshopData {
		.description {
			position: 		relative;
			font-family:	"Helvetica", Sans-serif;
			height: 		100px;
			padding:		5px 10px;}

		.details {
			white-space: 	nowrap;
			position: 		relative;
			background: 	rgba(0, 0, 0, 0.8);
			border-top: 	1px solid var(--accent2);
			box-shadow: 	17px 15px 15px 15px rgba(0, 0, 0, 0.8);

			padding: 		7px 10px 24px 10px;
			margin-top: 	-30px;

			.game {
				display: flex;
				margin-bottom: 3px;
				.name {
					margin: auto 0 auto 7px;}
				.icon {
					width: 22px;
					height: 22px;}}

			.developers {
				font-family:	"Helvetica", Sans-serif;
				display: 		flex;
				font-size: 		12px;

				color: var(--accent8);
				.author {
					color: var(--accent9);}}
		}
	}
</style>