<script>
    import { slide } 	from 'svelte/transition';

    import { directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import RollupButton from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";

    import InternalRedirectTag from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectTag.svelte";
    import SocialMediaTag from "$root/components/generic/wrappers/tags & Inline/redirects/inlineRedirectTag.svelte";

	export let
        padding = undefined,
		author = undefined,
		authorSocials = true,
		character = false;

    let active = false;
</script>

{#if !character}
	<div class="inlineRedirect">
		<div class="expandedSlot">
			<RedirectBuilder url="{$directoryData.stripped}?query=@{author.handle.toLowerCase().replaceAll(' ','_')}">
				<div class="characterCard">
					<div class="mediaIcon rounded">
						<SanityImage image={author.userPortrait}/>
					</div>
					<h4>{author.handle}</h4>
				</div>
			</RedirectBuilder>
		</div>
		{#if authorSocials && !!author.socialMedia}
			<RollupButton bind:active invert={true} {padding}/>
		{/if}
	</div>
	{#if active}
		<div class="socialInline" transition:slide>
			{#if author.searchable}
				<InternalRedirectTag redirect="/authors/{author.handle.toLowerCase()}" user="{author.handle.toLowerCase()}"/>
			{/if}
			{#if author.socialMedia.length > 0}
				<SocialMediaTag data={author.socialMedia[0]}/>
			{/if}
		</div>
	{/if}
{:else}
	<div class="inlineRedirect">
		<div class="expandedSlot">
			<RedirectBuilder url="{$directoryData.stripped}?query=:{(author.nickName ?? author.fullName).toLowerCase().replaceAll(' ','_')}">
				<div class="characterCard">
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
		width: 		100%;
		display: 	flex;
		.expandedSlot {
			width: 	100%;}}

	.characterCard {
		display: 		flex;
		vertical-align: bottom;
		transition: 	ease .3s;

		padding:    	4px;
		gap: 			10px;
		margin: 		0px -3px 1px -1px ;
		border-radius: 	20px;

		&:hover {		background: var(--accent7);
			h4 {		color: 		white;}}
		> * {			margin: 	auto 0;}}
</style>