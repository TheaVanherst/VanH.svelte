<script>
    import { fly } 				from 'svelte/transition';

    import ProfileBar 			from "$root/components/layout/Header/bannerAnimation.svelte";
    import NavigationComponent 	from "$root/components/layout/Header/navBar.svelte";
    import SplashTexts 			from "$root/components/layout/Header/splashTexts.svelte";

    import { deviceType, pageLoaded } from "$lib/controllers/accessibilityController.js";

</script>

{#if $pageLoaded} <!-- this is a placeholder -->
	<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
		{#if deviceType === 2}
			<div class="desktop">
				<SplashTexts/>
				<ProfileBar/>
			</div>
		{:else if deviceType === 1}
			<div class="tablet">
				<div class="logo">
					<img src="/branding/vanhlogo.webp">
				</div>
				<div class="imageWrapper banner regularBorder">
					<img src="/branding/tabletBanner.webp">
				</div>
			</div>
		{:else}
			<div class="mobile imageWrapper">
				<img src="/branding/vanhlogo.webp">
			</div>
		{/if}
		<NavigationComponent/>
	</div>
{/if}

<style lang="scss">
	.mobile {
		margin: 5px 0 -25px -5px;}

	.tablet {
		position: relative;
		margin-top: 15px;

		> * {
			height: 	200px;}

		.banner {
			overflow: hidden;
			border: 1px solid var(--accent2);}

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
		margin: 	0 auto;}
</style>