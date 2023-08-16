<script>
    import { screenType } from '$lib/accessibilityController.js';

    import Container from "./generic/container.svelte";

	import { githubDatabase } from "$lib/databases/githubDatabase.js";
</script>

<Container>
	<swiper-container
			slides-per-view="{$screenType < 3 ? 1 : 2}"
			navigation="true" pagination="true" space-between={5}>
		{#each githubDatabase as dataEntry}
			<swiper-slide>
				<a 	class="{$screenType < 3 ? 'crop' : ''}"
					href="https://github.com/TheaVanherst/{dataEntry.url}"
				   	target="_blank">
					<div class="slide regularBorder">
						<h4 class="titleH4">
							{dataEntry.name}
						</h4>
						<div class="preview">
							<img src="/github/{dataEntry.preview}.webp">
							<div class="descCard">
								<img 	class="tinyIco socialIco shortBorder"
										src="/icons/githubLogo.webp">
								<p class="description">
									{dataEntry.description}
								</p>
								<p class="referral buttonPadding" style="background: {dataEntry.color}">
									TheaVanherst/{dataEntry.url}
								</p>
							</div>
						</div>
					</div>
				</a>
			</swiper-slide>
		{/each}
	</swiper-container>
</Container>

<style lang="scss">
	@import "./src/components/generic/swiperPreset.scss";
	@import "./src/commonStyles.scss";

	* {	transition: ease .3s;}

	a:hover {
		.referral {
			background: var(--accent2)!important;
			color: 		white!important;}}

	.crop { // manages the pagination
		.slide {
			margin-bottom: 28px;}}

	.slide {
		position: 		relative;
		font-family:    "Helvetica", Sans-serif;

		.preview {
			height:			220px;
			overflow: 		hidden; //img cropper

			> img {	width:		100%;}

			.descCard {
				position: 	absolute;
				width: 		100%;
				bottom: 	0;

				.tinyIco {
					top: 		-42px;}

				.description {
					background: var(--backgroundTrans);
					@include shortForm(3);}

				.referral {
					// fallback colour
					background: 	var(--accent9);}}
		}
	}
</style>