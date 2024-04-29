<script>
    import { slide } 	from 'svelte/transition';

    import { directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import RollupButton from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";

    import InternalRedirectTag from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectTag.svelte";
    import SocialMediaTag from "$root/components/generic/wrappers/tags & Inline/redirects/inlineRedirectTag.svelte";

	export let
		author = undefined,
		authorSocials = true,
        character = false,
		customColour = false,
		customRoot = undefined;

    let active = false;
</script>

{#if character === false}
	<div class="inlineRedirect">
		<div class="expandedSlot">
			<RedirectBuilder url="{!customRoot ? customRoot : $directoryData.root}?query=@{author.handle.toLowerCase().replaceAll(' ','_')}">
				<div class="characterCard" class:white={customColour}>
					<div class="mediaIcon rounded">
						<SanityImage image={author.userPortrait}/>
					</div>
					<h4>{author.handle}</h4>
				</div>
			</RedirectBuilder>
		</div>
		{#if authorSocials && !!author.socialMedia}
			<RollupButton bind:active invert={true}/>
		{/if}
	</div>
	{#if active}
		<div class="socialInline" transition:slide>
			{#if author.searchable}
				<InternalRedirectTag redirect="/authors/?user={author.handle.toLowerCase()}" user="{author.handle.toLowerCase()}"/>
			{/if}
			{#if author.socialMedia.length > 0}
				<SocialMediaTag data={author.socialMedia[0]}/>
			{/if}
		</div>
	{/if}
{:else}
	<div class="inlineRedirect">
		<div class="expandedSlot">
			<RedirectBuilder url="{!customRoot ? customRoot : $directoryData.root}?query=:{(author.nickName ?? author.fullName).toLowerCase().replaceAll(' ','_')}">
				<div class="characterCard" class:white={customColour}>
					<div class="mediaIcon rounded">
						<SanityImage image={author.charIcon}/>
					</div>
					<h4>{author.fullName}</h4>
				</div>
			</RedirectBuilder>
		</div>
	</div>
{/if}

<style lang="scss">
	.inlineRedirect {
		min-width: 	max-content;
		display: 	flex;
		.expandedSlot {
			width: 	100%;}}

	.characterCard {
		display: 		flex;
		vertical-align: bottom;

		margin: 		0px -3px 1px -1px ;
		padding:    	4px 12px 4px 4px;
		gap: 			10px;
		border-radius: 	20px;

		transition: 	ease .3s;

			h4 { 	color: 		black; }
		&.white {
			h4 { 	color: 		white;}}
		&:hover {	background: var(--accent7);
			h4 {	color: 		white;}}
		> * {		margin: 	auto 0;}}
</style>