<script>
    import { navigationControls, deviceData } from '$lib/controllers/layoutControllers/redirectHandling.js';

    import SidebarTexts 	from "$root/components/layout/pageLayout/sidebarTexts.svelte";
    import Container		from "$root/components/generic/containers/container.svelte";
    import SectionListCard 	from "$root/components/generic/containers/sectionListCard.svelte";
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";

    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import ImageTag 		from "$root/components/generic/containers/imageContainers/imageTag.svelte";

	import RedirectBuilder  from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import PortableText from "$root/serializer/portableText.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Examples" icon="galleryIcon.webp">
	<Carousel>
		{#each data.commissionData.commissionExamples as artwork}
			{#if $navigationControls.localNsfwCheck(artwork.nsfw)}
				<swiper-slide>
					<div class="imageCard wideBorder">
						<SanityImage image="{artwork.gallery.images[0]}"/>
						<ImageTag>
							<p>{artwork.gallery.renderType}, {artwork.gallery.styleType}</p>
						</ImageTag>
						<RedirectBuilder url="/artwork/?query={artwork.pieceName.toLowerCase().replaceAll(' ','_')}">
							<h4 class="artworkTitle regularBorder">{artwork.pieceName}</h4>
						</RedirectBuilder>
					</div>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
</SidebarTexts>

<SidebarTexts titlecard="How To Commission" icon="documentIcon.webp">
	{#if $navigationControls.nsfw}
		<div class="table"
			 class:full={$deviceData.screenType < 2}>
			<div class="column">
				<SectionListCard image={data.commissionData.dosList.banner}>
					<div slot="title">
						<h5>{data.commissionData.dosList.title}</h5>
						<p>{data.commissionData.dosList.desc}</p>
					</div>
					<ul>
						{#each data.commissionData.dosList.list as bonus}
							<li>{bonus}</li>
						{/each}
					</ul>
				</SectionListCard>
			</div>
			<div class="column">
				<SectionListCard image={data.commissionData.dontsList.banner}>
					<div slot="title">
						<h5>{data.commissionData.dontsList.title}</h5>
						<p>{data.commissionData.dontsList.desc}</p>
					</div>
					<ul>
						{#each data.commissionData.dontsList.list as bonus}
							<li>{bonus}</li>
						{/each}
					</ul>
				</SectionListCard>
			</div>
		</div>
		<p class="citation externalCitation">
			{data.commissionData.exclusionText}
		</p>
	{/if}
	<Container>
		<div class="chunk">
			<PortableText data={data.commissionData.commissionInstructions}/>
		</div>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="Prices" icon="billIcon.webp">
	<Container>
		<div class="colourWrapper">
			{#each data.commissionData.prices as commissionType}
				<div class="commType">
					{#if $navigationControls.nsfw}
						<div class="previewBanner regularBorder imageWrapper">
							<SanityImage image={commissionType.previewImage}/>
							<ImageTag>
								<p>{commissionType.styleName}</p>
							</ImageTag>
						</div>
					{/if}
					<div class="commissionDetails">
						<p>
							{commissionType.styleDescription}
						</p>
						<div class="prices">
							{#each commissionType.styleTypes as type}
								<h5>
									<span>{type.renderType}:</span> £{type.renderTypePrice}.00{type.additionalPriceTag ? '+' : ''}
								</h5>
							{/each}
							{#each commissionType.additionalPurchases as type}
								<h5>
									<span>{type.renderType}:</span> (+£{type.renderTypePrice}.00{type.additionalPriceTag ? '+' : ''})
								</h5>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
		<h3>Additional purchases</h3>
		<div class="additionalPurchases">
			{#each data.commissionData.additionalPurchases as type}
				<div class="type">
					<h5>
						<span>{type.additionalItem}:</span> £{type.additionalPrice}.00{type.additionalPriceTag ? '+' : ''}
					</h5>
					<p>
						{type.additionalDescription}
					</p>
				</div>
			{/each}
		</div>

		<PortableText data={data.commissionData.priceNotices}/>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="T&C" icon="tierList.webp">
	<Container>
		<div class="chunk">
			<PortableText data={data.commissionData.terms}/>
		</div>
	</Container>
</SidebarTexts>

<style lang="scss">
	.chunk {	padding: 	1px 3px 1px 3px;
		ul {	padding: 	0 0 3px 15px;
			&:last-child {
				margin-bottom: 0!important;}}
		> * {	margin: 	0 0 10px 0;}
		p { &:last-child {
			margin: 	0 0 0 0;}}}

	.artworkTitle {
		padding: 	7px 12px 11px 9px;
		margin: 	5px;
		bottom: 	0;
		position: 	absolute;

		background: var(--TransWhite);
		color: 		black;
		transition: .3s ease background, .3s ease color;
		&:hover {
			color: white;
			background: var(--accent7);}}

	.imageCard {
		height: 	500px;
		overflow: 	hidden;
		position: 	relative;

		p {	text-transform: lowercase;
			&:first-letter {
				text-transform: capitalize;}}}

	.citation {
		margin: 0 0 15px auto;}

	.table {
		width:	 	100%;
		display: 	inline-flex;
		gap: 	 	10px;
		margin: 	0 0 15px 0;

		.column {
			width: 	50%;
			display: flex;}

		&.full {
			display: block;
			.column {
				margin: 0 0 15px 0;
				width: 	100%;
				&:last-of-type {
					margin: 0 0 0 0;}}}}

	.bottom {	margin: 	0 0 27px 10px;}

	p { &:last-child {
		margin: 0;}}
	h3 {margin-bottom: 15px;}

	.previewBanner {
		margin: 	0 0 15px 0;
		height: 	150px;}

	.commType {
		padding: 	0 0 8px 15px;
		margin: 	10px 0 10px 0;

		.commissionDetails {
			p {padding: 	0 0 10px 0;}}

		.prices {
			display: 	flex;
			display: 	-webkit-inline-box;

			gap: 		10px 20px;
			flex-flow: 	row wrap;

			width: 		100%;
			max-width: 	100%;

			@mixin cbc ($colour){
				span {
					color: 	$colour;}}

			span {
				color: 		var(--accent2);
				font-style: italic;}
			h5 {
				padding: 	0 0 0 0;
				width: 		max-content;
				height: 	max-content;
				display: 	grid;

				&:nth-of-type(1){ span {color:var(--accent6);}}
				&:nth-of-type(2){ span {color:var(--accent3);}}
				&:nth-of-type(3){ span {color:var(--accent2);}}
				&:nth-of-type(4){ span {color:var(--accent1);}}
				&:nth-of-type(5){ span {color:var(--accent7);}}
				&:nth-of-type(6){ span {color:var(--accent4);}}}}
		&:nth-child(1) { border-left: 1px solid var(--accent7);}
		&:nth-child(2) { border-left: 1px solid var(--accent6);}
		&:nth-child(3) { border-left: 1px solid var(--accent1);}
		&:nth-child(4) { border-left: 1px solid var(--accent2);}
		&:nth-child(5) { border-left: 1px solid var(--accent3);}
		&:nth-child(6) { border-left: 1px solid var(--accent4);}}

	.additionalPurchases {
		.type {		padding: 	3px 5px 3px 15px;
			margin: 	0 0 10px 0;
			h5 {	padding: 	0 0 5px 0;}

			@mixin cbc ($colour){
				border-left: 	1px solid $colour;
				span {	color: 			$colour;}}

			&:nth-child(1) { @include cbc(var(--accent3));}
			&:nth-child(2) { @include cbc(var(--accent2));}
			&:nth-child(3) { @include cbc(var(--accent4));}
			&:nth-child(4) { @include cbc(var(--accent1));}
			&:nth-child(5) { @include cbc(var(--accent6));}
			&:nth-child(6) { @include cbc(var(--accent7));}}}
</style>