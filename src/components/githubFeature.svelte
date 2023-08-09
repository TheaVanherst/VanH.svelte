<script>
    import scss from "./generic/swiperPreset.scss";

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
				<a href="https://github.com/TheaVanherst/{dataEntry.url}" target="_blank">
					<div class="slide">
						<h4 class="title">
							{dataEntry.name}
						</h4>
						<div class="preview">
							<img src="/github/{dataEntry.preview}.webp">
							<div class="descCard">
								<img src="/icons/githubLogo.webp">
								<p class="description">
									{dataEntry.description}
								</p>
								<p class="referral" style="background: {dataEntry.color}">
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
	* {
		transition: ease .3s;
	}

	a:hover {
		.referral {
			background: var(--accent2)!important;
			color: 		white!important;
		}
		.title {
			filter:
				drop-shadow(0px 0px 1px var(--accent9))
				brightness(0) 	saturate(100%)
				invert(15%) 	sepia(75%)
				saturate(5273%) hue-rotate(271deg)
				brightness(97%) contrast(132%);
		}
		img  {
			opacity: 1!important;
			transform: scale(1.1);
		}
	}

	a {
		vertical-align: bottom;
	}

	.slide {
		border-radius: 	5px;
		overflow: 		hidden;
		position: 		relative;

		font-family:    "Helvetica", Sans-serif;

		h4 {
			filter:	 		drop-shadow(0px 0px 0.8px var(--accent9));
			padding: 		7px 10px 10px 10px;

			white-space: 	nowrap;
			text-transform: uppercase;
		}

		.preview {
			height:			220px;
			overflow: 		hidden;

			> img {
				width:	100%;
				opacity: 0.7;
			}

			.descCard {
				position: absolute;

				width: 100%;
				bottom: 0;

				img {
					position: 	absolute;
					width: 		28px;
					height: 	28px;

					right: 		0;
					top: 		-38px;
					padding: 	5px;
				}

				.description {
					background: var(--backgroundTrans);

					padding: 		10px 10px 0 10px;
					margin-bottom: 	10px; // required for the text overflow to behave.

					display: 		-webkit-box;
					overflow: 		hidden;

					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					line-height: 		1rem;
				}

				.referral {
					padding: 		6px 10px;
					font-weight: 	700;
					background: 	var(--accent9);
					color: 			black;
				}
			}

		}
	}
</style>