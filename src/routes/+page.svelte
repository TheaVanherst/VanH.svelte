<script>
    import { screenType, screenSize } 	from '$lib/accessibilityController.js';

    import SidebarTexts 	from "../components/generic/sidebarTexts.svelte";

	import CharacterFeature from "../components/characterFeature.svelte";
    import WorkshopFeature 	from "../components/workshopFeature.svelte";
    import GithubFeature 	from "../components/githubFeature.svelte";
    import DonationFeature 	from "../components/donationFeature.svelte";
    import QandaFeature 	from "../components/qandaFeature.svelte";
</script>

<SidebarTexts titlecard="Characters" icon="furaffinityLogo.webp">
	<CharacterFeature/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogo.webp">
	<GithubFeature/>
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
		<!--{#each navigation as item}-->
		<!--	<a href={item.path}>-->
		<!--		<img-->
		<!--			class="tinyIco"-->
		<!--			src="/icons/{item.imagePath}.webp">-->
		<!--	</a>-->
		<!--{/each}-->

		<!-- hit counter -->
		<img src='https://www.free-website-hit-counter.com/c.php?d=9&id=154101&s=7'>
	</div>
	<div class="right">
		<p>
			All featured artwork is drawn and created by Thea Vanherst
		</p>
		<p>
			Website developed and created by Thea Vanherst @ <span>vanh.art</span>
		</p>
	</div>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* {
		transition: ease .3s;
	}

	.cropped {
		width: 	calc(100% + 30px)!important;
		margin: 15px -15px 0 -15px!important;
	}

	.mobile {
		display: block;
		> * {
			margin: 0 auto!important;}
		.right {
			display: none;}
	}

	.hitCounter {
		padding: 10px;
	}

	.footer {
		background-color: 	var(--backgroundTrans);
		border-top: 		1px solid var(--accent2);

		width: 		calc(100%);
		padding: 	15px 0;

		display: flex;

		.left {
			margin: 0 15px 0 15px;
			width:	max-content;

			img {
				padding: 4px;
				margin: auto 0;

				//&:hover {
				//	@include rainbowTransition();}
			}
		}

		.right {
			margin: 0 15px 0 auto;
			width:	max-content;

			p {
				text-align: 	right;
				font-family:	"Helvetica", Sans-serif;
				font-size: 		12px;
				color:			var(--accent8);}

			span {
				color: var(--accent9);
				&:hover {
					@include rainbowTransition();} }
		}
	}
</style>