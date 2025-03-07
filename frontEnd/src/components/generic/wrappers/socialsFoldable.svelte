<script>
    import { slide } 			from 'svelte/transition';

    import { page } from "$app/stores";
    import { directoryStatus } 	from "$lib/settings/navigationHandling.js";

    import RollupButton 		from "$root/components/generic/buttons/rollupButton.svelte";
    import RedirectBuilder 		from "$root/components/generic/wrappers/redirects/internalRedirectBuilder.svelte";
    import SanityImage 			from "$root/serializer/sanityImage.svelte";

    import InternalRedirectTag 	from "$root/components/generic/wrappers/redirects/internalRedirectTag.svelte";
    import SocialMediaTag 		from "$root/components/generic/wrappers/redirects/inlineSocialRedirect.svelte";

	export let
		author = 		undefined,
		authorSocials = true,
        character = 	false,
		customRoot = 	undefined,
		inverted = 		false;

    let active = 		false,
        timer;
</script>

{#if character === false}
	<div class="authorCardWrapper"
		 on:mouseenter={() => clearInterval(timer)}
		 on:mouseleave={() => timer = setInterval(function () {active = false;}, 2000)}>
		<div class="inlineRedirect" class:inverted={inverted}>
			<div class="expandedSlot">
				<RedirectBuilder url="{!!customRoot ? customRoot : $directoryStatus.strippedUrl}?query=@{author.handle.toLowerCase().replaceAll(' ','_')}">
					<div class="characterCard">
						<div class="mediaIcon rounded">
							<SanityImage image={author.userPortrait}/>
						</div>
						<h4>{author.handle}</h4>
					</div>
				</RedirectBuilder>
			</div>
			{#if authorSocials && !!author.socialMedia}
				<RollupButton bind:active invert={!inverted} padding={0} border={false}/>
			{/if}
		</div>
		{#if active}
			<div class="transitionFix" out:slide={{axis:'x', delay:100}} in:slide={{axis:'x'}}>
				<div class="marginGap" out:slide in:slide={{ delay:300}}>
					{#if author.searchable}
						<InternalRedirectTag redirect="/authors/?user={author.slug}" inverted={inverted}>{author.slug}</InternalRedirectTag>{/if}
					{#if author.socialMedia.length > 0}
						<SocialMediaTag data={author.socialMedia[0]} inverted={inverted}/>{/if}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="inlineRedirect" class:inverted={inverted}>
		<div class="expandedSlot">
			<RedirectBuilder url="{!!customRoot ? customRoot : $directoryStatus.strippedUrl}?query=:{(author.nickName ?? author.fullName).toLowerCase().replaceAll(' ','_')}">
				<div class="characterCard characters" class:inverted={inverted}>
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
	.authorCardWrapper {
		display: inline-grid;
		margin: 4px 0 auto 0;}

	.marginGap {
		margin: 		1px 0 auto 0;}

	.inlineRedirect {
		position: 		relative;
		vertical-align: top;
		min-width: 		max-content;
		display: 		inline-flex;

		&.inverted {
			border-radius: 	19px;
			border: 		1px solid var(--accent1);
			.characterCard {
				:global {
					h4 { 	color: 		white;}}}}

		.expandedSlot {
			width: 		100%;}}

	.characterCard {
		display: 		flex;
		vertical-align: bottom;
		margin: 		3px 1px 1px 1px ;
		padding:    	3px 10px 3px 3px;
		gap: 			5px;
		border-radius: 	20px;
		transition: 	ease .3s;

		h4 { color: 	black;
			 margin: 0 0 1px 0;}

		&:hover {	background: var(--accent1);
			h4 {	color: 		white;}}
		&.characters {
			padding:    	3px 15px 3px 3px;}
		> * {		margin: 	auto 0;}}
</style>