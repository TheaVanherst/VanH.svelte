<script>
    import { screenType } 	from '$lib/accessibilityController.js';

    import SidebarTexts from "../../components/generic/sidebarTexts.svelte";
    import Container	from "../../components/generic/container.svelte";

    import ListedCard 		from "../../components/sections/ListedCard.svelte";
	import CommissionCard 	from "../../components/sections/commissionCard.svelte";

    import { dosAndDonts, citation, notices, howToCom, benefits, tnc, exampleArr }
    					from "$lib/databases/commissionDetails.js";

    import { register } from 'swiper/element/bundle';

    register();
</script>

<SidebarTexts titlecard="General">
	<Container>
		<div class="header">
			<img src="/branding/commissionBanner.webp">
		</div>

		<div class="chunk">
			<h3>Notices</h3>
			{#each notices as notice}
				<p> {notice} </p>
			{/each}

			<h3>How to commission</h3>
			{#each howToCom as instruction}
				<p> {instruction} </p>
			{/each}
		</div>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="Examples">
	<Container>
		<swiper-container
				slides-per-view="{$screenType < 3 ? 1 : 2}"
				navigation="true" pagination="true" space-between={5}>
			{#each exampleArr as image}
				<swiper-slide>
					<CommissionCard data={image}/>
				</swiper-slide>
			{/each}
		</swiper-container>
	</Container>
	<ListedCard
			data={dosAndDonts} citation={citation}
			divisional={2}
			buttonTog={false} redirect={false}/>
</SidebarTexts>

<SidebarTexts titlecard="Terms & Conditions">
	<Container>
		<div class="chunk">
			<h3>Commissioner benefits:</h3>
			<ul>
				{#each benefits as benefit}
					<li> {benefit} </li>
				{/each}
			</ul>
		</div>
		<div class="chunk">
			<h3>
				Terms and Conditions
			</h3>
			<ul>
				{#each tnc as term}
					<li> {term} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<style lang="scss">
	@import "./src/commonStyles.scss";
	@import "./src/components/generic/swiperPreset.scss";

	h3 {
		text-transform: uppercase;}

	ul {
		padding-left: 20px;}

	.header {
		width: 		100%;
		height: 	200px;
		overflow: 	hidden;

		img {
			height: 	100%;
			width: 		100%;
			object-fit: cover;}}

	.chunk {
		padding: 	10px 15px;
		> * {
			margin-bottom: 	10px;}
		p {
			font-size: 		12px;
			font-family:    "Helvetica", Sans-serif;

			&:last-child {
				margin: 0;}}}
</style>