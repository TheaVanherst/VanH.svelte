<script>
    import { deviceType } from "$lib/controllers/accessibilityController.js";
    import { createdPush } from "$lib/builders/dateBuilder.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

    import ImageFloatCard from "$root/components/generic/imageContainers/imageFloatCard.svelte";

    export let postData;

    let active,
		arrayLength =
		(postData?.characters ? postData.characters.length : 0) +
		(postData?.commissionData?.characters ? postData.commissionData.characters?.length : 0);

</script>

<div class="postWrapper wideBorder"
	 on:click={() => {active = !active}}
	 on:mouseenter={() => {$deviceType === 2 ? active = true : false}}
	 on:mouseleave={() => {active = false}}>
	<div class="galleryWrapper">
		<SanityGalleries portableText={postData.gallery}/>

		<ImageFloatCard active={active} accent={true}>
			<h4 slot="title">
				{postData.pieceName}
			</h4>

			<div slot="desc">
				<h4>{postData.pieceName}</h4>
				<p>
					{!!postData.description ? postData.description : ''}
				</p>
				{#if !!postData.commissionData}
					<p class="altTitle">
						{postData.commissionData.artType.typeName} for:
					</p>
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.owner.userPortrait}/>
							</div>
							<h4>
								{character.owner.handle}
							</h4>
						</div>
					{/each}
				{/if}
				<p>
					Style: {postData.gallery.styleType}, {postData.gallery.renderType}
				</p>
			</div>

			<div slot="alt">
				<p>
					Featured Character{arrayLength > 1 ? 's' : ''}:
				</p>
				{#if !!postData.characters}
					{#each postData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>
								{character.fullName}
							</h4>
						</div>
					{/each}
				{/if}
				{#if !!postData.commissionData?.characters}
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>
								{character.fullName}
							</h4>
						</div>
					{/each}
				{/if}
				<p>
					{createdPush(postData.publishedAt)}
				</p>

			</div>
		</ImageFloatCard>
	</div>
</div>

<style lang="scss">
	.postWrapper {
		overflow: 		hidden;
		.galleryWrapper {
			position: 	relative;}}

	p {	margin: 	7px 0;}

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
</style>