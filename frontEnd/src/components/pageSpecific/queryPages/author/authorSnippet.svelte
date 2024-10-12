<script>
    import { slide } 	from 'svelte/transition';

    import { deviceData } from "$lib/settings/navigationHandling.js";

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import SocialMediaTag 		from "$root/components/generic/wrappers/redirects/inlineSocialRedirect.svelte";
    import InternalRedirectTag 	from "$root/components/generic/wrappers/redirects/internalRedirectTag.svelte";

	export let
		authorData = undefined;
    let active = false,
        timer;
</script>

<div class="authorWrapper"
	 	on:mouseenter={() => {clearInterval(timer); setTimeout(function () {active = true;}, 750);}}
	 	on:mouseleave={() => {timer = setInterval(function () {active = false;}, 500)}}>
	{#if $deviceData.deviceType === 2}
		{#if authorData?.internalRole}
			{#if active}
				<div class="offset"
					 	on:click={()=>active=false}>
					<div class="cardWrapper wideBorder" transition:slide>
						{#if authorData.profileBanner}
							<div class="authorBanner">
								<SanityImage image={authorData.profileBanner}/>
							</div>
						{/if}
						<div class="authorCard">
							<div class="authorInfo">
								<div class="authorIcon profileIcon regularBorder">
									<SanityImage image={authorData.userPortrait}/>
								</div>
								<div class="authorName">
									<h4>{authorData.handle}</h4>
									<p class="citation">{authorData?.internalRole?.map(i=>i.title)}</p>
									<p>{authorData?.authorTag?.map(i=>i.title).join(", ")}.</p>
								</div>
							</div>
							<div class="marginGap">
								{#if authorData.searchable}
									<InternalRedirectTag redirect="/authors/?user={authorData.handle.toLowerCase()}">{authorData.handle}</InternalRedirectTag>{/if}
								{#if authorData.socialMedia.length > 0}
									{#each authorData.socialMedia.slice(0,3) as social}
										<SocialMediaTag data={social}/>
									{/each}
								{/if}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/if}
	{/if}
	<slot/>
</div>

<style lang="scss">
	.authorWrapper {
		position: 	relative;}
	.offset {
		position: sticky;
		bottom: 	0;}
	.cardWrapper {
		overflow: 	hidden;
		gap: 		10px;
		width: 		250px;
		gap: 		10px;
		.marginGap {
			margin: 	1px 0 auto 0;}
		.authorBanner {
			height: 	50px;}
		.authorCard {
			padding: 	8px;
			gap: 		4px;
			display: 	grid;
			background: var(--TransWhite);
			.authorInfo {	display: 	flex;
							gap: 		10px;}
			.authorName {		margin: -1px 0 0 0;}
			.commissionerName {	margin: 0 0 0 0;}
			.mediaIcon {	overflow: 	hidden;
							height: 	30px;
							width: 		30px;}}}
</style>