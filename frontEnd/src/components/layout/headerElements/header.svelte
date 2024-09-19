<script>
	import { fade, slide } from "svelte/transition";
    import { page } from "$app/stores";

    import { deviceData, navigationControls, directoryStatus } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import RedirectBuilder 		from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import ProfileBar 			from "$root/components/layout/headerElements/bannerAnimation.svelte";

    import SplashTexts 			from "$root/components/layout/headerElements/splashTexts.svelte";
    import { splashTextData } 	from "$lib/controllers/layoutControllers/pageSettings.js";
    import { submitters } 		from "$lib/localDatabases/splashTextDatabase.js";

    import PageIntroduction 	from "$root/components/layout/stylingComponents/pageIntroduction.svelte";

    let hover = false,
    	timer = undefined;
</script>

<PageIntroduction visible="{$page.url.pathname === '/'}"/>

<div class="websiteLoadinProcess"
	 transition:slide={{axis: "y"}}
	 class:transitioning={$navigationControls.transitioning}
	 class:enabled={$page.url.pathname === "/"}></div>
<!-- deals with introduction animation, LAZY. -->

{#if $navigationControls.loaded}
	{#if $deviceData.deviceType === 2}
		<div class="desktop">
			<SplashTexts bind:hover bind:timer/>
			<ProfileBar extended={$page.url.pathname !== "/"}>
				<RedirectBuilder url="/featured">
					<div class="branding" class:disabled={$directoryStatus.currentRoot === "/featured"}>
						<img src="/branding/vanhlogo.webp"/>
					</div>
				</RedirectBuilder>
			</ProfileBar>
		</div>
	{:else if $deviceData.deviceType < 2}
		<div class="tablet imageWrapper">
			<img src="/branding/vanhlogo.webp"></div>
	{:else}
		<div class="mobile imageWrapper">
			<img src="/branding/vanhlogo.webp"></div>
	{/if}

	<!-- deals with introduction animation -->
	{#if hover}
		<div id="splash"
			 transition:fade
			 on:mouseover={	() => {hover = true; clearInterval(timer);}}
			 on:mouseleave={() => timer = setInterval(function () {hover = false;}, 1000)}>
			<p>Splash text by
				{#key $splashTextData?.[2]?.user}
					<span transition:fade>
						{$splashTextData?.[2]?.user ?? submitters?.thea?.user ?? "[NOT FOUND]"}</span>
				{/key}
			</p>
		</div>
	{/if}
{/if}

<style lang="scss">
	.websiteLoadinProcess {
		height: 0;
		width: 100%;
		&.transitioning {
			transition: ease-in-out height .5s;}
		&.enabled {
			height: calc(50vh - 200px);}}

	#splash {
		width: 		max-content;
		margin: 	0 auto 0 auto;
		z-index: 	10;
		position: 	relative;

		p {
			position: 		absolute;
			white-space: 	nowrap;
			margin: 		-19px 0 0 0;

			font-family: 	"Lucida Console", Monospace;
			color: 			var(--accent2);
			text-shadow:
				3px 3px 0 rgba(0, 0, 0.4),
				-1px -1px 0 rgba(0, 0, 0.4),
				1px -1px 0 rgba(0, 0, 0.4),
				-1px 1px 0 rgba(0, 0, 0.4),
				1px 1px 0 rgba(0, 0, 0.4);

			span {
				position: 	absolute;
				margin: 	0 0 0 6px;
				&:hover {
					animation:
						colorRotate 1s linear infinite;}}}}

	.mobile {
		overflow: visible;
		img {
			margin: 5px 0 -10px -5px;
			width: 	100%;}}

	.tablet {
		height: 	220px;
		z-index: 	1;
		width: 		100%;
		margin: 	5px auto -10px auto;

		img {
			left: 		50%;
			transform: 	translateX(-50%);
			position: 	relative;
			display: 	block;}}

	.desktop {
		position: 	relative;
		padding: 	15px 0;
		margin: 	0 auto;

		.branding {
			position: 	absolute;
			transform: 	translate(-50%, 0);
			height: 	100%;

			&.disabled {
				pointer-events: none;}
			&:not(.disabled):hover img {
				transform: scale(1.1);}
			img {
				transition: .3s transform ease;
				height: 	110%;}}}
</style>