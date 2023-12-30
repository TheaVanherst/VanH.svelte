<script>
    import { slide } from 'svelte/transition';

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";
    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import { navigationControls, deviceData,
       		 navigationData, directoryData } 	from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { navigationDirectories } from "$lib/controllers/layoutControllers/redirectHandling.js";

    export let socials = 	{};
    const socialMedia = 	socials.map(e => e);
	let desktop = 	false;
    $: desktop = 	$deviceData.screenType > 2;
</script>

<div class="navigationBar">
	{#if $navigationData.navigation}
		<div class="inlineNav">
			<div transition:slide={{duration: 200}} id="navigation">
				{#each navigationDirectories as item}
					{#if item.nsfw && $navigationControls.nsfw || !item.nsfw}
						<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
							<div class="navButton" transition:slide={{duration: 200, axis: 'x'}}
								 class:currentRoot={$directoryData.root === item.path}
								 class:smallerIcon={desktop}>
								<div class="mediaIcon">
									<img src="/icons/{item.imagePath}.webp"/>
								</div>
								{#if desktop || $directoryData.root === item.path}
									<h5 transition:slide={{duration: 200, axis: 'x'}}>{item.title}</h5>
								{/if}
							</div>
						</RedirectBuilder>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

	{#if $navigationData.socials && socialMedia.length > 0}
		<div transition:slide={{duration: 200}} id="socials">
			{#each socialMedia.map(e => e.chunkSocials.flat()).map(i => !i.nsfw && !$deviceData.nsfw || $deviceData.nsfw ? i : undefined).flat().slice(0, 5) as social}
				<a href="https://{social.platformName.socialURL + social.url}" target="_blank" transition:slide={{duration: 200, axis: 'x'}}>
					<RainbowButtonWrap padding="{desktop ? [5,10] : [6,6]}">
						<div class="central">
							<div class="mediaIcon" class:largerIcon={!desktop}>
								<SanityImage image={social.platformName.socialLogo}/>
							</div>
							{#if desktop}
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
	.navigationBar > * {
		transition: 	border ease .5s .3s;
		margin: 		0 auto 0 auto;
		width: 			max-content;}

	.inlineNav {
		display: flex;
		flex-wrap: nowrap;
		gap: 15px;}

	#navigation {
		display: 		flex;
		flex-wrap: 		nowrap;
		border-radius: 	20px;
		padding: 		0 6px;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent7);
		margin-bottom: 	10px;

		.navButton {
			display: 	flex;
			padding:	8px;
			transition: ease .3s;

			&.smallerIcon {
				h5 {
					text-decoration:	 	underline 1px transparent;
					text-underline-offset: 	0.2em;
					height: 	max-content;
					padding: 	0 0 1px;}
				.mediaIcon {
					height: 	18px;
					width: 		18px;
					padding: 	0 7px 1px 0;}
				&.currentRoot {
					h5 {
						text-decoration-color: white;}}}
			&:not(.smallerIcon) {
				h5 {
					transition: color .3s ease;
					padding: 	4px 0 4px 10px;}
				&.currentRoot {
					h5 {
						color: 		var(--accent2);
						padding: 	4px 0 4px 10px;}}}

			h5 {	text-transform: uppercase;
					transition: 	text-decoration .3s ease, color .5s ease, height .4s ease, padding .2s ease;}
			img {	filter: 		invert(1);}

			&.currentRoot {
				h5 {	text-decoration-color: 	white;}
				&:not(.smallerIcon){
					.mediaIcon img {
						filter:
							invert(73%) 		sepia(58%)
							saturate(769%) 		hue-rotate(357deg)
							brightness(101%) 	contrast(107%);}}}
			&:hover {
				filter:
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);}}}

	#socials {
		display: 	flex;
		gap: 		10px;

		.largerIcon.mediaIcon {
			width:      30px;
			height:     30px;}

		.central {
			gap: 		5px;
			display: 	flex;
			h3 {
				color:	black;}}}
</style>