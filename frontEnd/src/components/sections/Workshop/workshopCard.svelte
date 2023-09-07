<script>
	export let dataEntry
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={dataEntry.url}" target="_blank">
	<div class="workshopItem regularBorder">
		<h4 class="titleH4">
			{dataEntry.name}
		</h4>

		<div class="workshopPreview regularBorder imageWrapper">
			<img 	class="tinyIco socialIco shortBorder"
					src="/icons/steamLogo.webp">
			<img 	class="regularBorder"
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
	@import "../../../commonStyles";

	* {	transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}

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

	.workshopPreview {
		overflow: hidden;
		.socialIco {
			top: 0;}}

	.workshopItem {
		overflow: hidden;

		.workshopData {
			position: relative;

			.description {
				@include shortForm(4);}

			.details {
				white-space: 	nowrap;
				border-top: 	1px solid var(--accent10);
				padding: 		10px 10px 27px 10px;

				.game {
					display: 		flex;
					margin-bottom: 	3px;

					p { margin: 	auto 0 auto 7px;}}

				.developers {	display: flex;
					p, span {	color: var(--accent10);
						&::selection {
								color: var(--accent10);}}
					.author {	color: var(--accent9);
						&::selection {
								color: var(--accent9);}}}}}}
</style>