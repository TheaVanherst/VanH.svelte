<script>
    import { navigationControls, deviceData } from '$lib/settings/navigationHandling.js';

    import RedirectBuilder  from "$root/components/generic/wrappers/redirects/internalRedirectBuilder.svelte";
    import PortableText 	from "$root/serializer/portableText.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";

    import SidebarTexts 	from "$root/components/layout/coreLayoutComponents/pageLayout/sidebarTexts.svelte";
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";
    import ImageTag 		from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Examples" icon="galleryIcon.webp">
	<Carousel>
		{#each data.commissionData.commissionExamples as artwork}
			{#if $navigationControls.localNsfwCheck(artwork.nsfw)}
				<swiper-slide>
					<div class="imageCard wideBorder">
						{#if !!artwork.gallery.images[0]}
							<SanityImage image="{artwork.gallery.images[0]}"/>
						{/if}
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

<SidebarTexts titlecard="How To" icon="documentIcon.webp">
	<div class="container wideBorder">
		<PortableText data={data.commissionData.commissionInstructions}/>
	</div>
</SidebarTexts>

<SidebarTexts titlecard="Prices" icon="billIcon.webp">
	<div class="container wideBorder">
		{#each data.commissionData.prices as commissionType}
			<div class="commType">
				<h2>{commissionType.styleName}</h2>
				{#if $navigationControls.nsfw}
					<div class="previewBanner imageWrapper">
						{#each commissionType?.previewImages as preview, i}
							{#if i < $deviceData?.screenType}
								<div class="regularBorder imageWrapper">
									<SanityImage image={preview}/>
								</div>
							{/if}
						{/each}
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
		<h3>Additional purchases</h3>
		<div class="additionalPurchases">
			{#each data.commissionData.additionalPurchases as type}
				<div class="type">
					<h5>
						<span>{type.additionalItem}:</span> +{type?.purchaseType?.costPercentage ? `${type.additionalPrice}%` : `£${type.additionalPrice}.00`}{type.additionalPriceTag ? '+' : ''}</h5>
					<p>
						{type.additionalDescription}
					</p>
				</div>
			{/each}
		</div>

		<PortableText data={data.commissionData.priceNotices}/>
	</div>
</SidebarTexts>

<SidebarTexts titlecard="T&C" icon="tierList.webp">
	<div class="container wideBorder">
		<PortableText data={data.commissionData.terms}/>
	</div>
</SidebarTexts>

<style lang="scss">
	.container {
		> * {	margin: 	0 0 10px 0;}
		p { &:last-child {
			margin: 	0 0 0 0;}}}

	.artworkTitle {
		padding: 	7px 12px 11px 9px;
		margin: 	5px;
		bottom: 	0;
		position: 	absolute;

		background: var(--transPure1);
		color: 		black;
		transition: .3s ease background, .3s ease color;
		&:hover {
			color: white;
			background: var(--accent1);}}

	.imageCard {
		height: 	500px;
		overflow: 	hidden;
		position: 	relative;

		p {	text-transform: lowercase;
			&:first-letter {
				text-transform: capitalize;}}}

	p { &:last-child {
		margin: 0;}}
	h3, h2 {margin-bottom: 15px;}

	.commType {
		padding: 	0 0 8px 15px;
		margin: 	10px 0 10px 0;

		.previewBanner {
			margin: 	0 0 15px 0;
			gap: 		5px;
			height: 	400px;}

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
				color: 		var(--alternateAccent3);
				font-style: italic;}
			h5 {
				padding: 	0 0 0 0;
				width: 		max-content;
				height: 	max-content;
				display: 	grid;

				&:nth-of-type(1){ span {color:var(--alternateAccent2);}}
				&:nth-of-type(2){ span {color:var(--accent2);}}
				&:nth-of-type(3){ span {color:var(--alternateAccent3);}}
				&:nth-of-type(4){ span {color:var(--alternateAccent1);}}
				&:nth-of-type(5){ span {color:var(--accent1);}}
				&:nth-of-type(6){ span {color:var(--brightAccent2);}}}}
		&:nth-child(1) { border-left: 1px solid var(--accent1);}
		&:nth-child(2) { border-left: 1px solid var(--alternateAccent2);}
		&:nth-child(3) { border-left: 1px solid var(--alternateAccent1);}
		&:nth-child(4) { border-left: 1px solid var(--alternateAccent3);}
		&:nth-child(5) { border-left: 1px solid var(--accent2);}
		&:nth-child(6) { border-left: 1px solid var(--brightAccent2);}}

	.additionalPurchases {
		.type {		padding: 	3px 5px 3px 15px;
			margin: 	0 0 10px 0;
			h5 {	padding: 	0 0 5px 0;}

			@mixin cbc ($colour){
				border-left: 	1px solid $colour;
				span {	color: 			$colour;}}

			&:nth-child(1) { @include cbc(var(--accent2));}
			&:nth-child(2) { @include cbc(var(--alternateAccent3));}
			&:nth-child(3) { @include cbc(var(--brightAccent2));}
			&:nth-child(4) { @include cbc(var(--alternateAccent1));}
			&:nth-child(5) { @include cbc(var(--alternateAccent2));}
			&:nth-child(6) { @include cbc(var(--accent1));}}}
</style>