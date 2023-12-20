<script>
    import { slide } from 'svelte/transition';

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";
    import SanityImage 					from "$root/serializer/types/sanityImage.svelte";

    import { navigationControls, deviceData,
       		 navigationData, directoryData } 	from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { navigationDirectories } 	from '$lib/controllers/layoutControllers/navigationDirectories.js';

    export let socials;
</script>

<div class="navigationBar">
	{#if $navigationData.navigation}
		<div transition:slide={{duration: 200}} id="navigation">
			{#each navigationDirectories as item}
				{#if item.nsfw && $navigationControls.nsfw || !item.nsfw}
					<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
						<div class="navButton" class:currentRoot={$directoryData.root === item.path}>
							<h5> {item.title} </h5>
						</div>
					</RedirectBuilder>
				{/if}
			{/each}
		</div>
	{/if}

	{#if $navigationData.socials}
		<div transition:slide={{duration: 200}} id="socials">
			{#each socials.socialMedia.map(e => e.chunkSocials.flat()).map(i => !i.nsfw && !$deviceData.nsfw || $deviceData.nsfw ? i : undefined).flat().filter(Boolean).slice(0, 5) as social}
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
	@import "../../../commonStyles";

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

	#navigation {
		display: 		flex;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent2);

		.navButton {padding:				10px;
					transition: ease .3s;
			h5 {	text-transform: 		uppercase;
					text-underline-offset: 	0.6em;
					text-decoration:	 	underline 1px transparent;}
			&.currentRoot {
				h5 {	text-decoration-color: white;
						text-underline-offset: 0.2em;}}
			&:hover {	@include rainbowTransition();}}}

	#socials {
		display: flex;
		gap: 10px;
		.central {
			gap: 		5px;
			display: 	flex;
			h3 {
				color:	black;}}}

	.largerIcon.mediaIcon {
		width:      30px;
		height:     30px;}
</style>