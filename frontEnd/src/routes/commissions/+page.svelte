<script>
    import SidebarTexts from "../../components/layout/sidebarTexts.svelte";
    import Container	from "../../components/generic/container.svelte";
    import Carousel from "$root/components/generic/carousel.svelte";

    import ListedCard 		from "../../components/generic/ListedCard.svelte";
	import CommissionCard 	from "../../components/sections/commissionCard.svelte";
    import CommissionPrices from "$root/components/sections/commissionPrices.svelte";

    import { dosAndDonts, exampleArr, citation, howToCom, benefits, notices, tnc,
		} from "$lib/databases/commissionDetails.js";

    import { register } from 'swiper/element/bundle';

    register();
</script>

<SidebarTexts titlecard="Examples">
	<Container bottom={10}>
		<Carousel maxWidth={2}>
			{#each exampleArr as image}
				<swiper-slide>
					<div class="bottom">
						<CommissionCard data={image}/>
					</div>
				</swiper-slide>
			{/each}
		</Carousel>
	</Container>
	<ListedCard
			data={dosAndDonts} citation={citation}
			divisional={2}
			buttonTog={false} redirect={false}/>
</SidebarTexts>

<SidebarTexts titlecard="Prices">
	<Container>
		<CommissionPrices/>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="General">
	<Container>
		<div class="chunk">
			<h3>How to commission</h3>
			{#each howToCom as instruction}
				<p> {instruction} </p>
			{/each}
			<h3>Commissioner benefits:</h3>
			<ul>
				{#each benefits as benefit}
					<li> {benefit} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="Terms & Conditions">
	<Container>
		<div class="chunk">
			<h3>Notices</h3>
			{#each notices as notice}
				<p> {notice} </p>
			{/each}

			<h3>Terms and Conditions</h3>
			<ul>
				{#each tnc as term}
					<li> {term} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<style lang="scss">
	* {			transition: 	ease .3s; }
	ul {		padding-left: 	20px;}
	.bottom {	margin-bottom: 	60px;}
	.chunk {	padding: 		1px 3px;
		> * {	margin-bottom: 	10px;}
		p { &:last-child {
				margin: 		0;}}}
</style>