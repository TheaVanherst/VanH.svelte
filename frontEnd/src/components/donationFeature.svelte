<script>
    import { fly } from 'svelte/transition';
    import { screenType } 	from '$lib/accessibilityController.js';

    import { donationTiers, personalMessage, citation } from "$lib/databases/donationTiers.js";
    import ListedCard from "$root/components/sections/listedCard.svelte";
</script>

<ListedCard
		data={donationTiers} citation={citation}/>

<div class="box regularBorder">
	{#if $screenType > 2}
		<div class="imageShowcase"
			 in:fly={{y: 100, duration: 1200, delay: 300 }}>
			<img src="/branding/profileGraphic.webp">
		</div>
	{/if}
	<div class="citation quote">
		{#each personalMessage as text}
			<p class="fancy"> {text} </p>
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
	.box {
		display: 		flex;
		overflow: 		visible;

		border: 		1px solid var(--accent9);
		background: 	var(--backgroundTrans);

		padding: 		10px;
		margin-bottom: 	15px;}

	.imageShowcase {
		margin: 	-10px -15px 0 -57px;
		z-index: 	1;

		animation: 	float 6s infinite ease-in-out;

		> img {
			position: 	relative;
			max-width: 	280px;
			display: 	flex;

			top: 		50%;
			transform: 	translatey(-50%);
		}}

	.citation {	margin: 5px;
		> p {	padding-bottom: 9px;
			&:last-of-type {
				padding-bottom: 0;}}

		.closeQuote {
			margin: 	1px 10px -4px auto;
			width:	 	max-content;
			display: 	flex;

			> * {	margin: auto 0;}
			img {	width: 	70px;
					margin: -30px -20px -20px 8px;}}}

	@keyframes float {
		0% {	transform: translatey(-20px);}
		50% {	transform: translatey( 20px);}
		100% {	transform: translatey(-20px);}}
</style>