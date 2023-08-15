<script>
    import { fly } from 'svelte/transition';

    import { screenType } 	from '$lib/accessibilityController.js';

    import { donationTiers, personalMessage, citation } from "$lib/databases/donationTiers.js";
    import DonationCard from "$root/components/sections/donationCard.svelte";
</script>

<DonationCard
		data={donationTiers} citation={citation}/>

<div class="box">
	{#if $screenType > 2}
		<div class="imageShowcase"
			 in:fly={{y: 100, duration: 1200, delay: 300 }}>
			<img src="/branding/profileGraphic.webp">
		</div>
	{/if}
	<div class="citation quote">
		{#each personalMessage as text}
			<p> {text} </p>
		{/each}

		{#key $screenType < 3}
			<div class="closeQuote"
				 in:fly={{y: 20, duration: 400, delay: 200 }}>
				<h4> Love, Thea </h4>
				{#if $screenType < 3}
					<img src="/branding/vahnicon.webp">
				{/if}
			</div>
		{/key}
	</div>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.box {
		display: 	flex;

		border-radius: 	5px;
		border: 		1px solid var(--accent9);
		background: 	var(--backgroundTrans);

		font-size: 	12px;
		padding: 	10px;
		margin-bottom: 	15px;

		@include customFontColour(var(--accent9));}

	.imageShowcase {
		margin: 	-10px 0 -70px -57px;

		animation: 	float 6s infinite ease-in-out;
		position: 	relative;

		> img {
			width: 	300px;}}

	.citation {
		margin: 5px;

		> p {
			font-size: 		12px;
			padding-bottom: 9px;

			&:last-of-type {
				padding-bottom: 0;}}

		.closeQuote {
			margin: 	1px 10px -4px auto;
			width:	 	max-content;
			display: 	flex;

			> * {
				margin: 	auto 0;}

			img {
				width: 	70px;
				margin: -30px -20px -20px 8px;}}
	}

	@keyframes float {
		0% {	transform: translatey(-20px);}
		50% {	transform: translatey(0px);}
		100% {	transform: translatey(-20px);}}
</style>