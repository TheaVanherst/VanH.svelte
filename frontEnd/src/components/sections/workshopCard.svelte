<script>
	export let dataEntry
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={dataEntry.url}" target="_blank">
	<div class="workshopItem regularBorder">
		<h4 class="titleH4">
			{dataEntry.name}
		</h4>

		<div class="workshopPreview regularBorder">
			<img 	class="tinyIco socialIco shortBorder"
					src="/icons/steamLogo.webp">
			<img 	class="thumbnail regularBorder"
					src="/workshop/{dataEntry.thumbnail}.webp">
		</div>

		<div class="workshopData">
			<p class="description">
				{dataEntry.description}
			</p>
			<div class="details">
				<div class="game">
					<img 	class="shortBorder tinyIco"
							src="/workshop/gameIcons/{dataEntry.game.url}.webp">
					<p>
						{dataEntry.game.name}
					</p>
				</div>
				<div class="developers">
					<p>
						By:
						{#each dataEntry.authors as author, i}
							<a class="author" href={author.website} target="_blank">
								{author.name}
							</a>
							{#if i < dataEntry.authors.length - 1}
								<span>and&nbsp;</span>
							{/if}
						{/each}
					</p>
				</div>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* {	transition: .5s ease;}

	a:hover {
		.workshopItem {
			.details {
				border-top: 1px solid var(--accent2)!important;}
			.author {
				&:hover {
					text-decoration: underline;
					color: var(--accent3)!important;}
				&:not(:hover){
					@include rainbowTransition();}}}}

	.socialIco {
		top: 38px;}

	.workshopItem {
		.thumbnail {
			width:	100%;}

		.workshopData {
			position: relative;

			.description {
				@include shortForm(4);}

			.details {
				white-space: 	nowrap;
				border-top: 	1px solid var(--accent8);
				padding: 		10px 10px 27px 10px;

				.game {
					display: 		flex;
					margin-bottom: 	3px;

					p { margin: 	auto 0 auto 7px;}}

				.developers {
					display: 		flex;
					p,
					span {
						@include customFontColour(var(--accent8));}
					.author {
						@include customFontColour(var(--accent9));}}}}}
</style>