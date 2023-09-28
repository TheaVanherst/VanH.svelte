<script>
    import { deviceType } from "$lib/controllers/accessibilityController.js";
    import { createdPush } from "$lib/misc/dateBuilder.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

    import ImageCard from "$root/components/generic/containers/imageCard.svelte";

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

		<ImageCard active={active} accent={true}>
			<h4 slot="title">{postData.pieceName}</h4>
			<p slot="desc">
				{!!postData.description ? postData.description : ''}
			</p>
			<div slot="misc">
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

			<div slot="altMisc">
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
		</ImageCard>
	</div>
</div>

<style lang="scss">

	.postWrapper {
		overflow: hidden;
		.galleryWrapper {
			position: relative;}}

	.characterCard {
		display: flex;
		width: 100%;
		margin: 5px 0;
		gap: 10px;
		vertical-align: bottom;

		> * {
			margin: auto 0;}
		.icon {
			overflow: hidden;}}

	.creationDate{
		padding-top: 7px;}

	p {	margin: 7px 0;}
</style>