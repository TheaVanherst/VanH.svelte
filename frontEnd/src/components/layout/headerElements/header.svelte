<script>
	import { fade, slide } from "svelte/transition";

    import { page } from "$app/stores";
    import { deviceData, navigationControls, directoryStatus } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import { splashTextData } 	from "$lib/controllers/layoutControllers/pageSettings.js";
    import { submitters } 		from "$lib/localDatabases/splashTextDatabase.js";

    import ProfileBar 			from "$root/components/layout/headerElements/bannerAnimation.svelte";
    import SplashTexts 			from "$root/components/layout/headerElements/splashTexts.svelte";
    import PageIntroduction 	from "$root/components/layout/stylingComponents/pageIntroduction.svelte";
    import RedirectBuilder
        from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";

    let hover = false,
    	timer = undefined;

    let preScreenHover = false,
		hoverDisable = false,
        logoIntialization = false;

    $: hoverDisable =  $directoryStatus.currentRoot === "/featured";
    $: logoIntialization = $page.url.pathname === "/" || $page.url.pathname === "/afterdark/";
    // TODO: this is jank, but removing it means that I can't access the header before the transition can
	// TODO: lock it out. So I have to use the url before the transition via the $page.
	// TODO: The $page data does not contain "/" with and without the optional params, so I can't remove it.
	// TODO: DO NOT REMOVE THIS, DUMBASS.
</script>

<PageIntroduction visible={logoIntialization} bind:preScreenHover/>

<div class="headerWrapper" class:logoIntialization class:hoverDisable class:preScreenHover>
	<div class="websiteLoadinProcess"
		 transition:slide={{axis: "y"}}
		 class:transitioning={$navigationControls.transitioning}></div>
	<!-- deals with introduction animation, LAZY. -->

	{#if $navigationControls.loaded}
		{#if $deviceData.deviceType === 2}
			<div class="desktop">
				<SplashTexts bind:hover bind:timer/>
				<ProfileBar>
					<div class="branding">
						<RedirectBuilder url="/featured">
							<img src="/branding/vanhlogo.webp" alt="VanH logo"/>
						</RedirectBuilder>
					</div>
				</ProfileBar>
			</div>
		{:else}
			<div class="mobile branding imageWrapper">
				<RedirectBuilder url="/featured">
					<img src="/branding/vanhlogo.webp" alt="VanH logo"/>
				</RedirectBuilder>
			</div>
		{/if}

		{#if hover}
			<div id="splashAuthor" transition:fade
				 	on:focus={ 	() => {hover = true; timer = undefined}}
				 	on:blur={	() => timer = setInterval(function () {hover = false;}, 1000)}>
				<p>Splash text by
					{#key $splashTextData?.[2]?.user}
						<span transition:fade>{$splashTextData?.[2]?.user ?? submitters?.thea?.user ?? "[NOT FOUND]"}</span>
					{/key}
				</p>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.websiteLoadinProcess {		height: 		0;
								width: 			100%;
		&.transitioning {		transition:	 	ease-in-out height .5s;}}
	.logoIntialization {		pointer-events: none;
		.websiteLoadinProcess {	height: 		calc(50vh - 200px);}}

	.mobile {
		z-index: 			1;
		pointer-events: 	none;
		margin: 			5px auto -10px auto;
		width: 				max-content;
		img {
			display: 		block;
			object-fit: 	contain;
			height: 		max-content;
			max-height: 	20vh;
			position: 		relative;
			width: 			100%;}}
	.desktop {		position: 	relative;
					padding: 	15px 0;
					margin: 	0 auto;
		.branding {	position: 	absolute;
					height: 	100%;
			img {	transition: .5s transform ease;
					height: 	110%;}}}

	.headerWrapper.hoverDisable {					pointer-events: none;
													transform: 		revert}
	.headerWrapper:not(.hoverDisable) img:hover { 	transform: 		scale(1.1);}
	.preScreenHover img {							transform: 		scale(1.1) !important;}

	#splashAuthor {
		width: 		max-content;
		margin: 	0 auto 0 auto;
		z-index: 	10;
		position: 	relative;

		p {	position: 		absolute;
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
</style>