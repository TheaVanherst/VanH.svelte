<script>
    import { deviceData, navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import ProfileBar 			from "$root/components/layout/headerElements/bannerAnimation.svelte";
    import SplashTexts 			from "$root/components/layout/headerElements/splashTexts.svelte";

    let hover = false;
</script>

<div class="bannerWrapper">
	{#if $navigationControls.loaded} <!-- this is a placeholder -->
		{#if $deviceData.deviceType === 2}
			<div class="desktop">
				<SplashTexts/>
				<ProfileBar>
					<div on:mouseenter={() => hover = true}
						 on:mouseleave={() => hover = false}>
						<slot/>
						<div class="branding">
							<img src="/branding/vanhlogo.webp"/>
						</div>
					</div>
				</ProfileBar>
			</div>
		{:else if $deviceData.deviceType === 1}
			<div class="tablet">
				<div class="logo">
					<img src="/branding/vanhlogo.webp">
				</div>
				<div class="banner wideBorder">
					<img src="/branding/tabletBanner.webp">
				</div>
			</div>
		{:else}
			<div class="mobile imageWrapper">
				<img src="/branding/vanhlogo.webp">
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	.mobile {
		overflow: visible;
		img {
			margin: 5px 0 -10px -5px;
			width: 	100%;}}

	.tablet {	position: 	relative;
				margin:	 	15px 0 10px 0;
		> * {	height: 	200px;}

		.banner {
			img {
				display: flex;
				height: 100%;}

			overflow: 	hidden;
			border: 	1px solid var(--accent2);}
		.logo {
			position: 	absolute;
			z-index: 	1;
			width: 		100%;

			img {
				margin: 	-10px 0 -10px -3px;
				left: 		50%;
				transform: 	translateX(-50%);
				height: 	calc(100% + 20px);

				position: 	relative;
				display: 	block;}}}

	.desktop {
		position: 	relative;
		padding: 	15px 0;
		margin: 	0 auto;

		.branding {
			position: 	absolute;
			transform: 	translate(-50%, 50%);
			height: 	100%;
			img {
				margin: 	5px 0 0 0;
				transform: 	translate(0, -50%);
				height: 	110%;}}}
</style>