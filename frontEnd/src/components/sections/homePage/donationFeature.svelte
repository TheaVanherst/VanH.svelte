<script>
    import { fly } from 'svelte/transition';
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

    import { donationTiers, personalMessage, citation } from "$lib/databases/donationTiers.js";
    import ListedCard from "$root/components/generic/ListedCard.svelte";
</script>

<ListedCard data={donationTiers} citation={citation}/>

<div class="container wideBorder">
	{#if $screenType > 2}
		<div class="imageShowcase"
			 in:fly={{y: 100, duration: 1200, delay: 300 }}>
			<img src="/branding/vahnGraphic.webp">
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
					<img src="/branding/vahnIcon.webp">
				{/if}
			</div>
		{/key}
	</div>
</div>

<style lang="scss">
	.container {
		display: 	flex;
		overflow: 	visible;

		border: 	1px solid var(--accent9);
		background: var(--backgroundTrans);

		padding: 	10px;
		margin: 	0 0 15px 0;}

	.imageShowcase {
		margin: 	-10px -15px 0 -57px;
		z-index: 	1;

		animation: 	float 6s infinite ease-in-out;

		> img {
			position: 	relative;
			max-width: 	280px;
			display: 	flex;

			top: 		50%;
			transform: 	translatey(-50%);}}

	.citation {	margin: 5px;
		> p {	padding: 0 0 9px 0;
			&:last-of-type {
				padding: 0 0 0 0;
				margin: 0 100px 0 0}}

		.closeQuote {
			margin: 	1px 10px -4px auto;
			width:	 	max-content;
			display: 	flex;

			> * {	margin: auto 0;}
			img {	width: 	70px;
					margin: -30px -20px -15px 8px;}}}
</style>