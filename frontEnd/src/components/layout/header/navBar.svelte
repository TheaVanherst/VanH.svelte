<script>
    import { slide } from 'svelte/transition';

    import { navStatus } 		from '$lib/pageSettings/redirectHandling.js';
    import RedirectBuilder 		from "$root/components/generic/controllers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/rainbowButtonWrap.svelte";

    import { navigationDirectories } 	from '$lib/pageSettings/navigationDirectories.js';

    import SanityImage 					from "$root/serializer/types/sanityImage.svelte";
    import { navigation, directory } 	from "$lib/pageSettings/redirectHandling.js";

    export let socials;
</script>

<div class="navigationBar">
	{#if $navigation.navigation}
		<div transition:slide={{duration: 200}} id="navigation">
			{#each navigationDirectories as item}
				{#if item.nsfw && $navStatus.nsfw || !item.nsfw}
					<RedirectBuilder url="{item.path}" internal={true} redirectName={item.pagePreview}>
						<div class="navButton" class:currentRoot={$directory.root === item.path}>
							<h5> {item.title} </h5>
						</div>
					</RedirectBuilder>
				{/if}
			{/each}
		</div>
	{/if}

	{#if $navigation.socials}
		<div transition:slide={{duration: 200}} id="socials">
			{#each socials.map(e => e.chunkSocials.map(i => !i.nsfw && !$navStatus.nsfw || $navStatus.nsfw ? i : undefined)).flat().filter(Boolean).slice(0, 5) as item}
				<RedirectBuilder url={item.platformName.socialURL + item.url}>
					<RainbowButtonWrap padding="{$navStatus.screenType > 2 ? [5,10] : [6,6]}">
						<div class="central">
							<div class="mediaIcon" class:largerIcon={$navStatus.screenType < 3}>
								<SanityImage image={item.platformName.socialLogo}/>
							</div>
							{#if $navStatus.screenType > 2}
								<h3> {item.platformName.socialNickname} </h3>
							{/if}
						</div>
					</RainbowButtonWrap>
				</RedirectBuilder>
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