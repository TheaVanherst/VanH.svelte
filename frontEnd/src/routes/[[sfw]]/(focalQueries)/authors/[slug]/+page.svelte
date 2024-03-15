<script>
    import { fade } from "svelte/transition";

    import BackButton from "$root/components/generic/wrappers/buttons/backButton.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";

    export let data;
</script>

<div class="wrapper">
	{#if data?.authorData}
		<BackButton>
			<h1>
				{data.authorData.fullName}
			</h1>
		</BackButton>

		<div class="authorCard" transition:fade>
			<div class="profileBanner">
				<div class="banner">
					{#if data.authorData.profileBanner}
						<SanityImage image={data.authorData.profileBanner}/>
					{/if}
				</div>
				<div class="Icon">
					<div class="rounded">
						{#if data.authorData.userPortrait}
							<SanityImage image={data.authorData.userPortrait}/>
						{/if}
					</div>
				</div>
			</div>

			<div class="title">
				<h3 class="userName">{data.authorData.fullName}</h3>
				<p class="handle"><span>@</span>{data.authorData.handle}{data.authorData.internalRole[0] ? "," + data.authorData.internalRole[0].title : ""}</p>
			</div>

			<div class="descriptionWrapper">
				{#if data.authorData?.authorTag?.length > 0}
					<div class="authorTags">
						{#each data.authorData.authorTag as tag}
							<p>{tag.emoji} {tag.title}</p>
						{/each}
					</div>
				{/if}
				<p class="description">
					{data.authorData.shortDesc}
				</p>
			</div>
		</div>
	{/if}

	<p>
		WIP! to be extended to at a later date.
	</p>
</div>

<style lang="scss">
	.wrapper {
		max-width: 	550px;
		margin: 	0 auto;
		display: 	grid;
		gap: 		15px;}

	.authorCard {
		transition: background .3s ease;
		overflow: 	hidden;
		gap: 		12px;
		background: 	var(--TransWhite);
		border-radius: 	var(--borderWide);

		h1,h2,h3,h4,p {
			color: black;}}

	.profileBanner {
		position: relative;
		.Icon {
			height: 	80px;
			width: 		80px;
			padding: 	12px;
			position: 	absolute;
			bottom: 	0;
			.rounded {
				border: 1px solid var(--TransWhite);}}
		.banner {
			height: 104px;
			width: 	100%;}}

	.descriptionWrapper {
		padding: 	9px 4px 8px 10px;
		.description {
			margin-left: 	2px;}
		p { margin-bottom: 	5px;}}

	.title {
		background: white;
		padding: 	9px 4px 9px 13px;
		transition: background .3s ease;

		h1,h2,h3,h4,p {
			transition: 	color .2s ease;}

		.userName, .handle {
			width: 	max-content;
			height: max-content;
			margin: auto 0 3px 0;}

		.userName {
			text-transform: capitalize;
			font-weight: 	800;}
		.handle {
			margin-bottom:	-1px;
			color: 			var(--accent9);
			span {
				bottom: 	1px;
				position: 	relative;}}}

	.authorTags {
		display: 		inline-flex;
		margin-left: 	-1px;
		gap: 			6px;
		p {
			border-radius: 	12px;
			padding: 		2px 9px 2px 5px;
			background: var(--accent9);
			color: 		white;}}
</style>