<script>
	export let data;
</script>

<a href="https://github.com/TheaVanherst/{data.url}" target="_blank">
	<div class="slide regularBorder">
		<h4 class="titleH4">
			{data.name}
		</h4>
		<div class="imageWrapper">
			<img src="/github/{data.preview}.webp">
			<div class="descCard">
				<img
					class="tinyIco socialIco shortBorder"
					src="/icons/githubLogo.webp">
				<p class="description">
					{data.description}
				</p>
				<div class="referral buttonPadding inline" style="background: var(--accent{data.color})">
					<p>
						TheaVanherst/{data.url}
					</p>
				</div>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* { transition: ease .3s; }

	a:hover {
		.referral {
			background: var(--accent2)!important;
			p {	color: 	white;}}}

	.slide {
		margin-bottom: 27px;
		.descCard {
			position: 	absolute;
			bottom: 	0;
			background: var(--backgroundTrans);

			.tinyIco {
				top: 	-42px;}

			.description {
				@include shortForm(3);}

			.referral { // fallback colour
				overflow: hidden;
				background: 	var(--accent9);}}}
</style>