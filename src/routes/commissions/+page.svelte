<script>
    import SidebarTexts from "../../components/generic/sidebarTexts.svelte";
    import Container	from "../../components/generic/container.svelte";

    import {
        dosAndDonts, citation,
		notices, howToCom,
		benefits,
		tnc, payDetails
    } from "$lib/databases/commissionDetails.js";

    import DonationCard from "../../components/sections/donationCard.svelte";
</script>

<SidebarTexts titlecard="General">
	<Container>
		<div class="image">
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

	<DonationCard
			data={dosAndDonts} citation={citation}
			divisional={2}
			buttonTog={false} redirect={false}/>
</SidebarTexts>

<SidebarTexts titlecard="TLDR">
	<Container>
		<div class="chunk">
			<h3>Commissioner benefits:</h3>
			<p class="generic">
				"What exactly separates me from other content creators?"
			</p>
			<ul>
				{#each benefits as benefit}
					<li> {benefit} </li>
				{/each}
			</ul>
		</div>
	</Container>
</SidebarTexts>

<SidebarTexts titlecard="T&C">
	<Container>
		<div class="chunk">
			<h3>
				Terms and Conditions
			</h3>
			<ul>
				{#each tnc as term}
					<li> {term} </li>
				{/each}
			</ul>
			<h3>
				Payment and refunds
			</h3>

			{#each payDetails as detail}
				<p> {detail} </p>
			{/each}
		</div>
	</Container>
</SidebarTexts>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.image {
		width: 		100%;
		height: 	200px;
		overflow: 	hidden;

		img {
			height: 	100%;
			width: 		100%;
			object-fit: cover;}}

	h3 {
		text-transform: uppercase;
	}

	ul {
		padding-left: 20px;
	}

	.chunk {
		padding: 10px 15px;
		> * {
			margin-bottom: 	10px;}
		p {
			font-size: 		12px;
			font-family:    "Helvetica", Sans-serif;

			&:last-child {
				margin: 0;}}
	}

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
		li {		@include customFontColour(white)}}


</style>