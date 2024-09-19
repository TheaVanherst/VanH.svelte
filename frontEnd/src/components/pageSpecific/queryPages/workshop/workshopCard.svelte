<script>
	import PortableText from "$root/serializer/portableText.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";

    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

    export let data = {};

    import { deviceData } from "$lib/controllers/layoutControllers/navigationHandling.js";
</script>

<div class="featuredItem">
	<div class="workshopFeature wideBorder">
		<div class="bannerWrapper">
			{#if data.banner}
				<div class="banner imageWrapper">
					<SanityImage image={data.banner} width={800}/>
				</div>
			{/if}
		</div>

		<div class="dataWrapper">
			{#if $deviceData.screenType > 2}
				<div class="thumbnailWrapper">
					<div class="thumbnail imageWrapper regularBorder">
						<SanityImage image={data.previewImage} width={200}/>
						<div class="gameThumbnail profileIcon shortBorder">
							<SanityImage image={data.gameLogo} width={48}/>
						</div>
					</div>
					{#if data.authors }
						<div class="authors">
							{#each data.authors as author}
								<SocialsFoldable {author} inverted={true}/>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<div class="information">
				<div class="header">
					<h2>
						{data.itemName}
					</h2>
					<p>{data.shortDesc}</p>
				</div>
				{#if data.desc}
					<div class="description">
						<PortableText data={data.desc}/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.gameThumbnail {
		position: 	absolute;
		background: black;

		bottom: 0;
		right: 	0;
		margin: 5px;}

	.featuredItem {
		max-width: 		770px;
		margin-bottom: 	15px;
		.workshopFeature {
			position: 	relative;
			overflow: 	hidden;
			width: 		100%;
			top: 		0;
			left: 		0;
			background: var(--TransBlack);

			> * {
				width: 		100%;
				box-sizing: border-box;
				display: 	flex;}

			.bannerWrapper {
				width: 		100%;}
			.banner {
				vertical-align: bottom;
				background: var(--accent7);
				height: 	200px;}}}

	.dataWrapper {
		padding: 	15px;
		gap: 		14px;

		.thumbnailWrapper {
			width: 		200px;
			min-width: 	fit-content;
			gap: 		15px;
			display: 	grid;

			.thumbnail {
				display: 	block;
				position: 	relative;}
			.authors {
				display: grid;
				gap: 5px;}}

		.information {
			flex-grow: 	1;

			.header {
				gap: 		6px;
				display: 	grid;}
			.description {
				margin: 	0 auto auto 0;}}}
</style>