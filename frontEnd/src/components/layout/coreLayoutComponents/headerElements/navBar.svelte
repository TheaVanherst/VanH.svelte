<script>
    import { slide } 			from 'svelte/transition';

    import { navigationControls, deviceData, navigationData, directoryStatus, navigationDirectories }
								from '$lib/settings/navigationHandling.js';

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder 		from "$root/components/generic/wrappers/redirects/internalRedirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/buttons/rainbowButtonWrap.svelte";

    export let
		socials = {};

    let filteredSocialMedia,
    	currentIdSelected = undefined,
		timer;

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

	// TODO: Mobile needs to have the ability to close the fold down menu on click.
	// TODO: This entire UI needs to be reworked. It's fucking stupid.
</script>

{#if $navigationData.navigation}
	<div class="navigationWrapper"
			class:compactMode={$deviceData.screenType <= 2}
			class:defaultMode={$deviceData.screenType > 2}>
		<div transition:slide={{duration: 200}} id="navigation">
			{#each navigationDirectories as item, id}
				{#if navigationDirectories.directoryVisibility[id]}
					<div transition:slide={{duration: 200, axis: 'x'}}>
						{#if !!item.pages}
							<div class="navButton dropDown"
									class:currentRoot={item.pages.map(e => e.path).includes($directoryStatus.currentRoot)}
									class:currentSubmenu={currentIdSelected === id}
									on:mouseover={() => {currentIdSelected = id; clearInterval(timer);}}
									on:mouseleave={() => timer = setInterval(() => currentIdSelected = undefined, 250)}
									transition:slide={{duration: 200, axis: 'x'}}>
								<div class="mediaIcon">
									<img src="/icons/{item.imagePath}.webp"/>
								</div>
								{#if $deviceData.screenType > 2 || item.pages.map(e => e.path).includes($directoryStatus.currentRoot)}
									<h5 transition:slide={{duration: 200, axis: 'x'}}>
										{item.title}
									</h5>
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
														{#if page.title}
															<h5>{page.title}</h5>
														{/if}
													</div>
												</RedirectBuilder>
											{/if}
										{/each}
									</div>
								{/if}
							</div>
						{:else}
							<RedirectBuilder url="{item.path}" redirectName={item.pagePreview}>
								<div class="navButton {item.class ?? ''}"
										class:currentRoot={$directoryStatus.currentRoot === item.path}
										transition:slide={{duration: 200, axis: 'x'}}>
									<div class="mediaIcon">
										<img src="/icons/{item.imagePath}.webp"/>
									</div>
									{#if item.title}
										{#if $deviceData.screenType > 2 || $directoryStatus.currentRoot === item.path}
											<h5 transition:slide={{duration: 200, axis: 'x'}}>
												{item.title}
											</h5>
										{/if}
									{/if}
								</div>
							</RedirectBuilder>
						{/if}
					</div>
				{/if}
			{/each}
			<RedirectBuilder nsfwPointer={!$navigationControls.nsfw}>
				<div class="navButton dropDown {$navigationControls.nsfw ? 'activeInv' : 'inv'}">
					<div class="mediaIcon">
						<img src="/icons/Plus18Icon.webp"/>
					</div>
				</div>
			</RedirectBuilder>
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
								<div class="mediaIcon">
									<img src="/icons/{page.imagePath}.webp"/>
								</div>
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
	<div class="navigationWrapper" class:compactMode={$deviceData.screenType <= 2} id="socials" transition:slide={{duration: 200}}>
		{#each filteredSocialMedia as social}
			<a href="https://{social.platformName.socialURL + social.url}" target="_blank" transition:slide={{duration: 200, axis: 'x'}}>
				<RainbowButtonWrap padding="{$deviceData.screenType > 2 ? [5,10] : [6,6]}">
					<div class="socialMedia">
						<div class="mediaIcon">
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
			h3 {	font-family: "Jura", sans-serif;
					color:		black;
					margin:	 	auto 0;
					padding: 	0 0 1px 0;}}}
	#navigation {
		display: 	flex;
		flex-wrap: 	nowrap;
		padding: 	0 6px;
		margin: 	0 0 10px;
		gap: 		1px;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent7);
		border-radius: 	20px;

		.navButton {
			padding: 8px 11px 7px 9px;
			&:not(.dropDown):hover {
				filter: brightness(0) 	saturate(100%)
				invert(15%) 	sepia(75%)
				saturate(5273%) hue-rotate(271deg)
				brightness(97%) contrast(132%);}}}

	// menu drop-down

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

	// small, rounded toggle buttons

	#navigation > * {
		&:first-child {  .inv, .activeInv { margin: 0 0 -1px -6px; }}
		&:last-child {	 .inv, .activeInv { margin: 0 -6px -1px 0; }}}
	.inv, .activeInv {	padding: 			9px!important;
		border-radius: 		50%;}
	.inv { &:hover {	background: var(--accent7);
		filter: 	revert!important;}}
	.activeInv {		background: var(--accent10);
		img {			filter: 	revert;}
		&:hover {		background: var(--accent7);
			filter: 	revert!important;
			img {		filter: 	invert(1)!important;}}}

	// DESKTOP

	.defaultMode {
		.navButton {
			.mediaIcon {
				height: 	18px;
				width: 		18px;}}}

	// MOBILE

	.compactMode {
		.social {
			.mediaIcon {
				width: 	30px!important;
				height: 30px!important;}}
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

		:global(a) {	flex: 1;}
		.navButton {
			padding: 	5px 15px 5px 10px;
			margin: 	0 auto;
			border: 	1px solid var(--accent7);
			background: var(--TransBlack);
			&.currentRoot {
				background: var(--accent7);
				border: 	1px solid var(--accent7);}}}
</style>