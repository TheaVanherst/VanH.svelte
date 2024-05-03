<script>
    import { slide } from 'svelte/transition';

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";
    import SanityImage 			from "$root/serializer/sanityImage.svelte";

    import { navigationControls, deviceData,
       		 navigationData, directoryStatus,
        	 navigationDirectories } 	from '$lib/controllers/layoutControllers/navigationHandling.js';

    export let
		socials = 	{};

    const socialMedia = socials.map(e => e);
	let desktop = 		false;
    let currentId = 	undefined;

    $: desktop = 	$deviceData.screenType > 2;
</script>

<div class="navigationBar">
	{#if $navigationData.navigation}
		<div class="inlineNav">
			<div transition:slide={{duration: 200}} id="navigation">
				{#each navigationDirectories as item, id}
					{#if !!item.pages}
						{#if item.pages.map(e => !e.nsfw && !$navigationControls.nsfw ? !e.nsfw : null).filter(Boolean).length > 0 || $navigationControls.nsfw}
							<div class="navButton dropDown" transition:slide={{duration: 200, axis: 'x'}}
								 on:mouseover={() => currentId = id}
								 on:mouseleave={() => currentId = 0}
								 class:currentRoot={item.pages.map(e=>e.path).includes($directoryStatus.currentRoot)}
								 class:smallerIcon={desktop}>
								<div class="mediaIcon">
									<img src="/icons/{item.imagePath}.webp"/>
								</div>
								{#if desktop || item.pages.map(e=>e.path).includes($directoryStatus.currentRoot)}
									<h5 transition:slide={{duration: 200, axis: 'x'}}>{item.title}</h5>
								{/if}

								{#if currentId === id}
									<div class="navDropdown" transition:slide>
										{#each item.pages as page}
											{#if page.nsfw && $navigationControls.nsfw || !page.nsfw}
												<RedirectBuilder url="{page.path}" redirectName={page.pagePreview}>
													<div class="navButton" transition:slide={{duration: 200, axis: 'x'}}
														 class:currentRoot={$directoryStatus.currentRoot === page.path}
														 class:smallerIcon={desktop}>
														<div class="mediaIcon">
															<img src="/icons/{page.imagePath}.webp"/>
														</div>
														<h5 transition:slide={{duration: 200, axis: 'x'}}>{page.title}</h5>
													</div>
												</RedirectBuilder>
											{/if}
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					{:else}
						{#if item.nsfw && $navigationControls.nsfw || !item.nsfw}
							<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
								<div class="navButton" transition:slide={{duration: 200, axis: 'x'}}
									 class:currentRoot={$directoryStatus.currentRoot === item.path}
									 class:smallerIcon={desktop}>
									<div class="mediaIcon">
										<img src="/icons/{item.imagePath}.webp"/>
									</div>
									{#if desktop || $directoryStatus.currentRoot === item.path}
										<h5 transition:slide={{duration: 200, axis: 'x'}}>{item.title}</h5>
									{/if}
								</div>
							</RedirectBuilder>
						{/if}
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
		display: 	flex;
		flex-wrap: 	nowrap;
		gap: 		15px;}

	#navigation {
		display: 		flex;
		flex-wrap: 		nowrap;

		padding: 		0 6px;
		margin-bottom: 	10px;
		gap: 			1px;

		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent7);
		border-radius: 	20px;

		.navButton {
			position: 	relative;
			display: 	flex;
			padding:	8px 11px 7px 9px;
			transition: ease .3s;
			z-index: 	10;

			h5 {	text-decoration:	 underline 1px transparent;
					text-underline-offset: 	0.2em;
					text-transform: 	uppercase;
					transition: 		text-decoration .3s ease, color .5s ease, height .4s ease, padding .2s ease;}
			img {	filter: 			invert(1);}

			&.smallerIcon {
				h5 {	height: 	max-content;
						padding: 	0 0 1px;}
				.mediaIcon {
						height: 	18px;
						width: 		18px;
						padding: 	0 7px 1px 0;}}

			&.currentRoot {
				> h5 {	text-decoration-color: white;}}

			&.dropDown {
				.navDropdown {
					min-width: 	100%;
					top: 		100%;
					left: 		-1px;
					padding-bottom: 3px;

					background: black;
					border:		1px solid var(--accent7);
					border-top: 1px solid black;
					border-bottom-right-radius: var(--borderWide);
					border-bottom-left-radius: 	var(--borderWide);

					position: 	absolute;}
				&:hover {
					background: var(--accent7);
					border-top-right-radius: 	var(--borderWide);
					border-top-left-radius: 	var(--borderWide);
					> h5 {
						text-decoration-color: 	transparent;}}}

			&:not(.smallerIcon) {
				h5 {	transition: color .3s ease;
						padding: 	4px 0 4px 10px;}
				&.currentRoot {
					> h5 {
						padding: 	4px 0 4px 10px;}}}

			&:not(.dropDown):hover {
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