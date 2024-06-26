<script>
    import { slide } from 'svelte/transition';

    import { navigationControls, deviceData, navigationData,
		directoryStatus, navigationDirectories } 	from '$lib/controllers/layoutControllers/navigationHandling.js';

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder 		from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";

    export let
		socials = {};

    let filteredSocialMedia,
    	currentIdSelected = undefined;
    let timer;

    const
		nsfwUiUpdate = () => {
			filteredSocialMedia = structuredClone(socials).map(
                e => e.chunkSocials.flat()).map(
                    i => $navigationControls.localNsfwCheck(i.nsfw) ? i : undefined
				).flat().slice(0, 5)

			navigationDirectories.directoryVisibility =
				navigationDirectories.map(i => (i.pages?.map(
					e => $navigationControls.localNsfwCheck(e.nsfw)
				).filter(Boolean) ?? [true]).length > 0);}

    $: $navigationControls.nsfw ? nsfwUiUpdate() : nsfwUiUpdate();
</script>

{#if $navigationData.navigation}
	<div class="navigationWrapper"
		class:compactMode={$deviceData.screenType <= 2}
		class:defaultMode={$deviceData.screenType > 2}>
		<div transition:slide={{duration: 200}} id="navigation">
			{#each navigationDirectories as item, id}
				{#if navigationDirectories.directoryVisibility[id]}
					<div class="transitionWrapper" transition:slide={{duration: 200, axis: 'x'}}>
						{#if !!item.pages}
							<div class="navButton dropDown"
								class:currentRoot={item.pages.map(e => e.path).includes($directoryStatus.currentRoot)}
								class:currentSubmenu={currentIdSelected === id}
								on:mouseover={() => {currentIdSelected = id; clearInterval(timer);}}
								on:mouseleave={() => timer = setInterval(() => currentIdSelected = undefined, 450)}
								transition:slide={{duration: 200, axis: 'x'}}>
									<div class="mediaIcon"><img src="/icons/{item.imagePath}.webp"/></div>
									{#if $deviceData.screenType > 2 || item.pages.map(e => e.path).includes($directoryStatus.currentRoot)}
										<h5 transition:slide={{duration: 200, axis: 'x'}}>{item.title}</h5>
									{/if}
									{#if $deviceData.screenType > 2 && id === currentIdSelected}
										<div class="navDropdown" transition:slide>
											{#each navigationDirectories[currentIdSelected]?.pages as page}
												{#if $navigationControls.localNsfwCheck(page.nsfw)}
													<RedirectBuilder url="{page.path}" redirectName={page.pagePreview}>
														<div class="navButton" transition:slide={{duration: 200, axis: 'x'}}
															class:currentRoot={$directoryStatus.currentRoot === page.path}>
															<div class="mediaIcon">
																<img src="/icons/{page.imagePath}.webp"/>
															</div>
															<h5>{page.title}</h5>
														</div>
													</RedirectBuilder>
												{/if}
											{/each}
										</div>
									{/if}
							</div>
						{:else}
							<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
								<div class="navButton"
									class:currentRoot={$directoryStatus.currentRoot === item.path}
									transition:slide={{duration: 200, axis: 'x'}}>
										<div class="mediaIcon"><img src="/icons/{item.imagePath}.webp"/></div>
										{#if $deviceData.screenType > 2 || $directoryStatus.currentRoot === item.path}
											<h5 transition:slide={{duration: 200, axis: 'x'}}>{item.title}</h5>
										{/if}
								</div>
							</RedirectBuilder>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	{#if $deviceData.screenType <= 2 && !!currentIdSelected}
		<div transition:slide>
			{#key currentIdSelected}
				<div class="wideBorder" id="seperatedMenu" transition:slide
					on:mouseover={	() => clearInterval(timer)}
					on:mouseleave={	() => timer = setInterval(() => currentIdSelected = undefined, 500)}>
					{#each navigationDirectories[currentIdSelected].pages as page}
						<RedirectBuilder url="{page.path}" redirectName={page.pagePreview}>
							<div class="navButton wideBorder"
								 class:currentRoot={$directoryStatus.currentRoot === page.path}>
								<div class="mediaIcon"><img src="/icons/{page.imagePath}.webp"/></div>
								<h5>{page.title}</h5>
							</div>
						</RedirectBuilder>
					{/each}
				</div>
			{/key}
		</div>
	{/if}
{/if}

{#if $navigationData.socials && filteredSocialMedia.length > 0}
	<div class="navigationWrapper" id="socials" transition:slide={{duration: 200}}>
		{#each filteredSocialMedia as social}
			<a href="https://{social.platformName.socialURL + social.url}" target="_blank" transition:slide={{duration: 200, axis: 'x'}}>
				<RainbowButtonWrap padding="{$deviceData.screenType > 2 ? [5,10] : [6,6]}">
					<div class="socialMedia">
						<div class="mediaIcon"><SanityImage image={social.platformName.socialLogo}/></div>
						{#if $deviceData.screenType > 2}
							<h3> {social.platformName.socialNickname} </h3>
						{/if}
					</div>
				</RainbowButtonWrap>
			</a>
		{/each}
	</div>
{/if}


<style lang="scss">
	.navigationWrapper {
		margin: 		0 auto 0 auto;
		width: 			max-content;}

	.navButton {
		position: 	relative;
		display: 	flex;
		transition: ease .3s;
		z-index: 	10;

		h5 {
			text-decoration:	underline 1px transparent;
			text-transform: 	uppercase;
			margin: 	auto 0;
			padding: 	0 0 2px 6px;
			transition: ease .3s;}
		.mediaIcon {
			transition: ease .3s;}
		&.currentRoot {
			> h5 {	text-decoration-color: 	white;}}
		img {		filter: 				invert(1);}}

	#socials {
		display: 	flex;
		gap: 		10px;
		.socialMedia {
			gap: 		5px;
			display: 	flex;
			.mediaIcon {
				width: 	30px;
				height:	30px;}
			h3 {color:	black;}}}
	#navigation {
		display: 	flex;
		flex-wrap: 	nowrap;

		padding: 	0 6px;
		margin: 	0 0 10px;
		gap: 		1px;

		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent7);
		border-radius: 	20px;}

	// DESKTOP

	.defaultMode {
		.navButton {
			.mediaIcon {
				height: 	18px;
				width: 		18px;}}}

	.dropDown {
		border-top-right-radius: 	var(--borderWide);
		border-top-left-radius: 	var(--borderWide);

		.navDropdown {
			min-width: 	100%;
			top: 		100%;
			left: 		-1px;
			padding: 	0 0 3px;

			position: 	absolute;
			background: black;
			border:		1px solid var(--accent7);
			border-top: 1px solid black;
			border-bottom-right-radius: var(--borderWide);
			border-bottom-left-radius: 	var(--borderWide);}
		&:hover {
			background: var(--accent7);
			> h5 {
				text-decoration-color: 	transparent;}}}

	#navigation {
		.navButton {
			padding:	8px 11px 7px 9px;
			&:not(.dropDown):hover {
				filter:
					brightness(0) 	saturate(100%)
					invert(15%) 	sepia(75%)
					saturate(5273%) hue-rotate(271deg)
					brightness(97%) contrast(132%);}}}

	// MOBILE

	.compactMode {
		.social {
			.mediaIcon {
				width: 	24px!important;
				height: 24px!important;}}
		#navigation {
			.navButton {
				&.currentSubmenu {
					background: var(--accent7);}}}}

	#seperatedMenu {
		display: 	flex;
		flex-wrap: 	wrap;
		width: 		100%;
		gap: 		15px;
		box-sizing: border-box;
		padding:	0 0 10px 0;

		:global(a) {
			flex: 1;
		}

		.navButton {
			padding: 	5px 15px 5px 10px;
			margin: 	0 auto;
			border: 	1px solid var(--accent7);
			background: var(--TransBlack);
			&.currentRoot {
				border: 	1px solid white;}
			&:hover {
				border: 	1px solid var(--accent7);
				background: var(--accent7);}}}
</style>