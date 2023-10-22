<script>
    import { createdPush } from "$lib/builders/dateBuilder.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

	import MemberReward from "$root/components/generic/buttons/memberRewardRef.svelte";
    import ImageFloatCard from "$root/components/generic/imageContainers/imageFloatCard.svelte";

    export let postData;

    let active = false,
		arrayLength =
			(postData?.characters ? postData.characters.length : 0) +
			(postData?.commissionData?.characters ? postData.commissionData.characters?.length : 0);
</script>

<div class="postWrapper wideBorder"
	 on:click={() => {active = !active}}
	 on:mouseleave={() => active = false}>

	<div class="galleryWrapper">
		<SanityGalleries portableText={postData.gallery}/>
		<ImageFloatCard active={active} accent={true}>
			<h4 slot="title">{postData.pieceName}</h4>
			<div slot="desc">
				<h4>{postData.pieceName}</h4>
				<p>
					{!!postData.description ? postData.description : ''}
				</p>
				{#if !!postData.commissionData}
					<p class="altTitle">
						{postData.commissionData.commissionType} for:
					</p>
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.owner.userPortrait}/>
							</div>
							<h4>{character.owner.handle}</h4>
						</div>
					{/each}
				{/if}
				{#if postData.authors.length > 0}
					<p> With additional help from: </p>
					{#each postData.authors as author}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={author.author.userPortrait}/>
							</div>
							<h4>{author.author.fullName}</h4>
						</div>
					{/each}
				{/if}
				{#if postData.gallery.styleType || postData.gallery.renderType}
					<p>
						{#if postData.gallery.styleType}
							{postData.gallery.styleType}
							{#if postData.gallery.styleType}
								: {postData.gallery.renderType}
							{/if}
						{:else if postData.gallery.renderType}
							{postData.gallery.renderType}
						{/if}
					</p>
				{/if}
			</div>
			<div slot="alt">
				{#if !!postData.characters}
					<p>
						Featured Character{arrayLength > 1 ? 's' : ''}:
					</p>
					{#each postData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>{character.fullName}</h4>
						</div>
					{/each}
				{/if}
				{#if !!postData.commissionData?.characters}
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>{character.fullName}</h4>
						</div>
					{/each}
				{/if}

				<p>{createdPush(postData.publishedAt)}</p>

				{#if postData.imageRefId || postData.photoshopRefId}
					<div class="footer">
						<p>Discord references:</p>
						<p class="links">
							{#if postData.imageRefId}
								<MemberReward url={postData.imageRefId}>
									<span slot="referral">Archive</span>
									<span slot="price">Tier 1 or higher</span>
								</MemberReward>
							{/if}
							{#if postData.photoshopRefId}
								<MemberReward url={postData.imageRefId}>
									<span slot="referral">Photoshop</span>
									<span slot="price">Tier 3</span>
								</MemberReward>
							{/if}
						</p>
					</div>
				{/if}
			</div>
		</ImageFloatCard>
	</div>
</div>

<style lang="scss">
	.postWrapper {
		width: 		100%;
		overflow: 	hidden;
		.galleryWrapper {
			position: 	relative;}}

	p {		margin: 7px 0;}
	p + p {	margin: 4px 0;}

	.characterCard {
		display: 	flex;
		width: 		100%;
		margin: 	5px 0;
		gap: 		10px;
		vertical-align: bottom;
		> * {
			margin: 	auto 0;}
		.icon {
			overflow:	hidden;}}

	.links {
		gap: 		5px;
		display: 	grid;}
</style>