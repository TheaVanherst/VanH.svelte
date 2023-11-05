<script>
    import { slide } 	from 'svelte/transition';

    import {nsfw, screenType} from '$lib/controllers/pageControllers.js';
    import RedirectBuilder from "$root/components/generic/controllers/redirectBuilder.svelte";
    import RainbowButtonWrap from "$root/components/generic/wrappers/rainbowButtonWrap.svelte";

    import { navigationDirectories } from '$lib/pageSettings/navigationDirectories.js';

    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import { navigationVisibility, socialMediaVisibility, rootPath } from "$lib/controllers/pageControllers.js";

    export let socials;
</script>

{#if $navigationVisibility || $socialMediaVisibility}
	<div class="navigationBar">
		{#if $navigationVisibility}
			<div transition:slide={{duration: 200}} id="navigation">
				{#each navigationDirectories as item}
					{#if item.nsfw && $nsfw || !item.nsfw}
						<RedirectBuilder url="{item.path}" internal={true} redirectName={item.pagePreview}>
							<div class="navButton" class:currentRoot={$rootPath === item.path}>
								<h5> {item.title} </h5>
							</div>
						</RedirectBuilder>
					{/if}
				{/each}
			</div>
		{/if}

		{#if $socialMediaVisibility}
			<div transition:slide={{duration: 200}} id="socials">
				{#each socials.map(e => e.chunkSocials.map(i => !i.nsfw && !$nsfw || $nsfw ? i : undefined)).flat().filter(Boolean).slice(0, 5) as item}
					<RedirectBuilder url={item.platformName.socialURL + item.url}>
						<RainbowButtonWrap padding="{$screenType > 2 ? [5,10] : [6,6]}">
							<div class="central">
								<div class="mediaIcon" class:largerIcon={$screenType < 3}>
									<SanityImage image={item.platformName.socialLogo}/>
								</div>
								{#if $screenType > 2}
									<h3> {item.platformName.socialNickname} </h3>
								{/if}
							</div>
						</RainbowButtonWrap>
					</RedirectBuilder>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import "../../../commonStyles";

	* { transition: ease .3s; }

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

		.navButton {	padding:			10px;
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