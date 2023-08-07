<script>
    import { screenSize } 	from '$lib/accessibilityController.js';

    import SidebarTexts 	from "../components/generic/sidebarTexts.svelte";

	import CharacterFeature from "../components/characterFeature.svelte";
    import DonationFeature 	from "../components/donationFeature.svelte";
    import QandaFeature 	from "../components/qandaFeature.svelte";
    import WorkshopFeature from "../components/workshopFeature.svelte";
</script>

<SidebarTexts titlecard="Characters" icon="furaffinityLogo.webp">
	<CharacterFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
	<DonationFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	<WorkshopFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Q&A">
	<QandaFeature/>
</SidebarTexts>

<div class="footer {$screenSize < 800 ? 'active' : ''}">
	<p>	All featured artwork is drawn and created by Thea Vanherst. </p>
	<p>	Website developed and created by Thea Vanherst @ <span>vanh.art</span> </p>
</div>

<style lang="scss">
	.footer {
		background-color: 	var(--backgroundTrans);
		border-top: 		1px solid var(--accent2);

		width: 		calc(100%);
		padding: 	15px 0;
		margin: 	15px 0 0 0;

		transition: ease .3s;

		&.active {
			width: 	calc(100% + 30px)!important;
			margin: 15px -15px 0 -15px!important;
		}

		p {
			margin: 0 15px 0 auto;
			width:	max-content;

			font-family:	"Helvetica", Sans-serif;
			font-size: 		12px;
			color:			var(--accent8)
		}

		span {
			color: var(--accent9);
		}
	}
</style>