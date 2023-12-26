<script>
    import { slide } from 'svelte/transition';

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";
    import SanityImage 					from "$root/serializer/sanityImage.svelte";

    import { navigationControls, deviceData,
       		 navigationData, directoryData } 	from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { navigationDirectories } 	from '$lib/controllers/layoutControllers/navigationDirectories.js';

    export let socials = {};
    const socialMedia = socials.map(e => e);
    	// Needed; fixes an issue where the socialmedias loaded in the layout will unload -
		// this just retains the store locally.
</script>

<div class="navigationBar">
	{#if $navigationData.navigation}
		<div transition:slide={{duration: 200}} id="navigation">
			{#each navigationDirectories as item}
				{#if item.nsfw && $navigationControls.nsfw || !item.nsfw}
					<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
						<div class="navButton" class:currentRoot={$directoryData.root === item.path}>
							{#if $deviceData.screenType > 2}
								<div class="inlineIcon">
									<img src="/icons/{item.imagePath}.webp"/>
								</div>
								<h5>{item.title}</h5>
							{:else}
								<div class="mediaIcon">
									<img src="/icons/{item.imagePath}.webp"/>
								</div>
							{/if}
						</div>
					</RedirectBuilder>
				{/if}
			{/each}
		</div>
	{/if}

	{#if $navigationData.socials && socialMedia.length > 0}
		<div transition:slide={{duration: 200}} id="socials">
			{#each socialMedia.map(e => e.chunkSocials.flat()).map(i => !i.nsfw && !$deviceData.nsfw || $deviceData.nsfw ? i : undefined).flat().slice(0, 5) as social}
				<a href="https://{social.platformName.socialURL + social.url}" target="_blank">
					<RainbowButtonWrap padding="{$deviceData.screenType > 2 ? [5,10] : [6,6]}">
						<div class="central">
							<div class="mediaIcon" class:largerIcon={$deviceData.screenType < 3}>
								<SanityImage image={social.platformName.socialLogo}/>
							</div>
							{#if $deviceData.screenType > 2}
								<h3> {social.platformName.socialNickname} </h3>
							{/if}
						</div>
					</RainbowButtonWrap>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.navigationBar {
		position: 	relative;
		gap: 		10px;
		display: 	grid;
		> * {
			transition: 	border ease .5s .3s;
			margin: 		0 auto 0 auto;

			border-radius: 	20px;
			padding: 		0 5px;
			width: 			max-content;}}

	.navIcon {
		padding: 	4px;
		border: 	1px solid var(--accent7);
		margin: 	5px;
		img {
			filter: invert(1);}}

	#navigation {
		display: 		flex;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent7);

		.navButton {
			display: 	flex;
			padding:	10px;
			transition: ease .3s;

			h5 {
				text-transform: 		uppercase;
				text-underline-offset: 	0.6em;
				text-decoration:	 	underline 1px transparent;
				height: 	max-content;
				padding: 	0 0 2px;
				margin: 	auto 0;}
			.inlineIcon {
				height: 	18px;
				width: 		18px;
				padding: 	0 7px 1px 0;}
			img {
				filter: 	invert(1);}

			&.currentRoot {
				h5 {	text-decoration-color: 	white;
						text-underline-offset: 	0.2em;}
				.mediaIcon img {
					filter:
						invert(73%) sepia(58%)
						saturate(769%) hue-rotate(357deg)
						brightness(101%) contrast(107%);}}
			&:hover {
				filter:
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);}}}

	#socials {
		display: 	flex;
		gap: 		10px;
		.central {
			gap: 		5px;
			display: 	flex;
			h3 {
				color:	black;}}}

	.largerIcon.mediaIcon {
		width:      30px;
		height:     30px;}
</style>