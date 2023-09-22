<script>
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

    import { nsfw } from "$lib/controllers/accessibilityController.js";

    import SidebarTexts 	from "$root/components/layout/sidebarTexts.svelte";
    import Container		from "$root/components/generic/containers/container.svelte";
    import Carousel 		from "$root/components/generic/controllers/carousel.svelte";

    import SectionListCard from "$root/components/sections/generic/sectionListCard.svelte";

    import { exampleArr } from "$lib/databases/commissionDetails.js";

    import { register } from 'swiper/element/bundle';

    register();

    export let data;
    // console.log(data);
</script>

{#if $nsfw}
	<SidebarTexts titlecard="Examples">
		<div class="table">
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
	</SidebarTexts>
{/if}

{#if $nsfw}
<!--	<SidebarTexts titlecard="Examples">-->
<!--		<Carousel maxWidth={2} customCalc={$screenType > 2 ? 2 : 1}>-->
<!--			{#each exampleArr as image}-->
<!--				<swiper-slide>-->
<!--					<div class="bottom">-->
<!--						<CommissionCard data={image}/>-->
<!--						<ImageTitleplate image={image}/>-->
<!--					</div>-->
<!--				</swiper-slide>-->
<!--			{/each}-->
<!--		</Carousel>-->
<!--		<ListedCard-->
<!--			data={dosAndDonts} citation={citation}-->
<!--			divisional={2}-->
<!--			buttonTog={false} redirect={false}/>-->
<!--	</SidebarTexts>-->
{/if}

<!--<SidebarTexts titlecard="Prices">-->
<!--	<Container>-->
<!--		<CommissionPrices/>-->
<!--	</Container>-->
<!--</SidebarTexts>-->

<SidebarTexts titlecard="General">
	<Container>
		<div class="chunk">
			<h3>How to commission</h3>
			<p>
				{data.commissionData[0].howToComm}
			</p>
			<h3>Commissioner benefits:</h3>
			<ul>
				{#each data.commissionData[0].benefitList as benefit}
					<li> {benefit} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<!--<SidebarTexts titlecard="Terms & Conditions">-->
<!--	<Container>-->
<!--		<div class="chunk">-->
<!--			<h3>Notices</h3>-->
<!--			{#each notices as notice}-->
<!--				<p> {notice} </p>-->
<!--			{/each}-->

<!--			<h3>Terms and Conditions</h3>-->
<!--			<ul>-->
<!--				{#each tnc as term}-->
<!--					<li> {term} </li>-->
<!--				{/each}-->
<!--			</ul>-->
<!--		</div>-->
<!--	</Container>-->
<!--</SidebarTexts>-->

<style lang="scss">
	.table {
		width:	 	100%;
		display: 	inline-flex;
		gap: 	 	15px;
		margin-bottom: 15px;

		.column {
			width: 50%;
			display: flex;}}


	ul {		padding-left: 	20px;}
	.bottom {	margin-bottom: 	25px;}
	.chunk {	padding: 		1px 3px;
		> * {	margin-bottom: 	10px;}
		p { &:last-child {
				margin: 		0;}}}
</style>