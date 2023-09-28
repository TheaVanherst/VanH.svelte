<script>
    import { screenType } 	from '$lib/controllers/accessibilityController.js';
    import { nsfw } from "$lib/controllers/accessibilityController.js";

    import SidebarTexts 	from "$root/components/layout/sidebarTexts.svelte";
    import Container		from "$root/components/generic/containers/container.svelte";
    import SectionListCard from "$root/components/sections/generic/sectionListCard.svelte";
    import Carousel 		from "$root/components/generic/controllers/carousel.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

    import CommissionPrices from "$root/components/sections/commissions/commissionPrices.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Examples" icon="galleryIcon.webp">
	<Carousel>
		{#each data.commissionPrices[0].PreviewImages as image}
			{#if !$nsfw && image.nsfwRender !== true || $nsfw}
				<swiper-slide>
					<div class="imageCard wideBorder">
						<SanityImage image="{image.imageRender}"/>
						<div class="imageCite regularBorder bottom">
							<p>{image.renderStyle}</p>
						</div>
					</div>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
</SidebarTexts>

<SidebarTexts titlecard="General">
	{#if $nsfw}
		<div class="table"
			 class:full={$screenType < 2}>
			<div class="column">
				<SectionListCard
					banner={data.commissionTypes[0].dosList.banner}
					list={data.commissionTypes[0].dosList.list}
					title={data.commissionTypes[0].dosList.title}
					description={data.commissionTypes[0].dosList.desc}/>
			</div>
			<div class="column">
				<SectionListCard
					banner={data.commissionTypes[0].dontsList.banner}
					list={data.commissionTypes[0].dontsList.list}
					title={data.commissionTypes[0].dontsList.title}
					description={data.commissionTypes[0].dontsList.desc}/>
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

<SidebarTexts titlecard="Terms & Conditions">
	<Container>
		<div class="chunk">
			<h3>Notices</h3>
			<p>
				{data.commissionData[0].notices}
			</p>
			<h3>Terms and Conditions</h3>
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
		margin-bottom: 15px;

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
		margin: 	0 0 27px 0;}

	h3 {		margin:  	0 0 10px 0;}
	ul {		padding: 	0 0 3px 15px;
		&:last-child {
				margin:  0 0 0 0;}}
	.bottom {	margin: 	0 0 27px 10px;}
	.chunk {	padding: 	1px 3px 1px 3px;
		> * {	margin: 	0 0 10px 0;}
		p { &:last-child {
				margin: 		0;}}}
</style>