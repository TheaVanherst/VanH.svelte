<script>
	import { fly } from "svelte/transition";

    import { deviceType } from "$lib/controllers/accessibilityController.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
	import {createdPush} from "$lib/misc/dateBuilder.js";

    export let postData;

    let active
</script>

<div class="postWrapper wideBorder"
	 on:click={() => {active = !active}}
	 on:mouseenter={() => {$deviceType === 2 ? active = true : false}}
	 on:mouseleave={() => {active = false}}>
	<div class="galleryWrapper">
		<SanityGalleries portableText={postData.gallery}/>
		{#if !active}
			<div class="titleCard regularBorder"
				 transition:fly={{y: -50, duration: 400 }}>
				<h4>{postData.pieceName}</h4>
			</div>
		{:else}
			<div class="descCard regularBorder"
				 transition:fly={{y: 50, duration: 400 }}>
				<div class="description">
					<h4>{postData.pieceName}</h4>
					{#if postData.description}
						<p>
							{postData.description}
						</p>
					{/if}
					{#if !!postData.commissionData}
						<p class="title fancy">
							{postData.commissionData.artType.preName} {postData.commissionData.artType.typeName} for:
						</p>
						{#each postData.commissionData.characters as character}
							<div class="commissionerCard">
								<div class="icon mediaIcon shortBorder">
									<SanityImage image={character.owner.userPortrait}/>
								</div>
								<h4>
									{character.owner.handle}
								</h4>
							</div>
						{/each}
					{/if}
				</div>
				<div class="characterCards">
					{#if postData.characters || postData.commissionData?.characters}
						<p class="title fancy">
							Featured Character{postData.characters?.length + postData.commissionData?.characters?.length > 1 ? 's' : ''}:
						</p>
					{/if}
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
					<p class="creationDate">{createdPush(postData.publishedAt)}</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">

	p, h4 {
		color: black;}

	.postWrapper {
		overflow: hidden;
		.galleryWrapper {
			position: relative;
			.titleCard,
			.descCard {
				overflow: 	hidden;
				position: 	absolute;}}}

	.galleryWrapper {
		.titleCard,
		.descCard {
			margin: 	5px;
			bottom: 	0;}
		.titleCard, .description, .characterCards {
			padding: 	8px 15px 10px 10px;}
		.characterCards > .title {
			padding-bottom: 7px;}
		.description > p {
			padding-top: 7px;}
		.description, .titleCard {
			background: var(--TransWhite);}
		.characterCards {
			background: var(--accent9);}}

	.commissionerCard,
	.characterCard {
		display: inline-flex;
		width: 100%;
		gap: 10px;
		vertical-align: bottom;

		> * {
			margin: auto 0;}

		.icon {
			overflow: hidden;}}

	.characterCards {
		padding-bottom: 5px;
		.characterCard:not(:last-of-type) {
			padding-bottom: 5px;
		}
	}
	.creationDate,
	.commissionerCard {
		padding-top: 5px;}
</style>