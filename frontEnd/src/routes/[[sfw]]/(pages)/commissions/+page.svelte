<script>
    import { navigationControls, deviceData } from '$lib/pageSettings/redirectHandling.js';

    import SidebarTexts 	from "$root/components/layout/sidebarTexts.svelte";
    import Container		from "$root/components/generic/containers/container.svelte";
    import SectionListCard 	from "$root/components/generic/containers/sectionListCard.svelte";
    import Carousel 		from "$root/components/generic/controllers/carousel.svelte";

    import SanityImage 		from "$root/serializer/types/sanityImage.svelte";
    import ImageTag 		from "$root/components/generic/imageContainers/imageTag.svelte";
   	import CommissionPrices from "$root/components/pageSpecific/commissionPage/commissionPrices.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Examples" icon="galleryIcon.webp">
	<Carousel>
		{#each data.commissionPrices[0].PreviewImages as image}
			{#if !$navigationControls.nsfw && image.nsfwRender !== true || $navigationControls.nsfw}
				<swiper-slide>
					<div class="imageCard wideBorder">
						<SanityImage image="{image.imageRender}"/>
						<ImageTag>
							<p>{image.styleType}, {image.renderType}</p>
						</ImageTag>
					</div>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
</SidebarTexts>

<SidebarTexts titlecard="General">
	{#if $navigationControls.nsfw}
		<div class="table"
			 class:full={$deviceData.screenType < 2}>
			<div class="column">
				<SectionListCard image={data.commissionTypes[0].dosList.banner}>
					<div slot="title">
						<h5>{data.commissionTypes[0].dosList.title}</h5>
						<p>{data.commissionTypes[0].dosList.desc}</p>
					</div>
					<ul>
						{#each data.commissionTypes[0].dosList.list as bonus}
							<li>{bonus}</li>
						{/each}
					</ul>
				</SectionListCard>
			</div>
			<div class="column">
				<SectionListCard image={data.commissionTypes[0].dontsList.banner}>
					<div slot="title">
						<h5>{data.commissionTypes[0].dontsList.title}</h5>
						<p>{data.commissionTypes[0].dontsList.desc}</p>
					</div>
					<ul>
						{#each data.commissionTypes[0].dontsList.list as bonus}
							<li>{bonus}</li>
						{/each}
					</ul>
				</SectionListCard>
			</div>
		</div>
	{/if}
	<Container>
		<div class="chunk">
			<h3>How to commission</h3>
			<p>
				{data.commissionData[0].howToComm}
			</p>
			<h3>TLDR's</h3>
			<ul>
				{#each data.commissionData[0].benefitList as benefit}
					<li> {benefit} </li>
				{/each}
			</ul>
			<h3>Final Notices</h3>
			<p>
				{data.commissionData[0].notices}
			</p>
		</div>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="Prices">
	<Container>
		<CommissionPrices
			prices={data.commissionPrices[0].prices}
			additional={data.commissionPrices[0].additionalPurchases}>
		</CommissionPrices>
		<p>
			{data.commissionPrices[0].whatsIncluded}
		</p>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="T&C">
	<Container>
		<div class="chunk">
			<h3>Wrap Up;</h3>
			<ul>
				{#each data.commissionData[0].termsAndConditions as term}
					<li> {term} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<style lang="scss">
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

	.imageCard {
		height: 	500px;
		overflow: 	hidden;
		position: 	relative;

		p {	text-transform: lowercase;
			&:first-letter {
				text-transform: capitalize;}}}

	h3 {		margin:  	0 0 10px 0;}
	.bottom {	margin: 	0 0 27px 10px;}
	.chunk {	padding: 	1px 3px 1px 3px;
		ul {	padding: 	0 0 3px 15px;
			&:last-child {
				margin-bottom: 0!important;}}
		> * {	margin: 	0 0 10px 0;}
		p { &:last-child {
				margin: 	0 0 0 0;}}}
</style>