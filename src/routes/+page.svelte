<script>
    import { screenType, screenSize } 	from '$lib/accessibilityController.js';

    import SidebarTexts 	from "../components/generic/sidebarTexts.svelte";

	import CharacterFeature from "../components/characterFeature.svelte";
    import DonationFeature 	from "../components/donationFeature.svelte";
    import QandaFeature 	from "../components/qandaFeature.svelte";
    import WorkshopFeature from "../components/workshopFeature.svelte";

    import navigation 	from '$lib/databases/navigationDirectories.js';
</script>

<SidebarTexts titlecard="Characters" icon="furaffinityLogo.webp">
	<CharacterFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	<WorkshopFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
	<DonationFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Q&A">
	<QandaFeature/>
</SidebarTexts>

<div class="footer {$screenSize < 800 ? 'cropped' : ''} {$screenType < 3 ? 'mobile' : ''}">
	<div class="left">
		{#each navigation as item}
			<a href={item.path}>
				<img src="/icons/{item.imagePath}.webp">
			</a>
		{/each}
	</div>
	<div class="right">
		<p>	All featured artwork is drawn and created by Thea Vanherst </p>
		<p>	Website developed and created by Thea Vanherst @ <span>vanh.art</span> </p>
	</div>
</div>

<style lang="scss">
	span {
		color: var(--accent9);
	}

	.footer {
		background-color: 	var(--backgroundTrans);
		border-top: 		1px solid var(--accent2);

		width: 		calc(100%);
		padding: 	15px 0;
		margin: 	15px 0 0 0;

		transition: ease .3s;

		&.cropped {
			width: 	calc(100% + 30px)!important;
			margin: 15px -15px 0 -15px!important;
		}

		&.mobile {
			display: block;

			> * {
				margin: 0 auto!important;
			}

			.right {
				display: none;}
		}

		.left {
			margin: 0 15px 0 15px;
			width:	max-content;

			img {
				padding: 4px;
				width:  18px;
				height: 18px;
				margin: auto 0;

				transition: ease .3s;

				&:hover {
					filter:
						drop-shadow(0px 0px 1px var(--accent9))
						brightness(0) 	saturate(100%)
						invert(15%) 	sepia(75%)
						saturate(5273%) hue-rotate(271deg)
						brightness(97%) contrast(132%);
				}
			}
		}

		display: flex;

		.right {
			margin: 0 15px 0 auto;
			width:	max-content;

			p {
				text-align: 	right;
				font-family:	"Helvetica", Sans-serif;
				font-size: 		12px;
				color:			var(--accent8)
			}
		}
	}
</style>