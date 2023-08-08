<script>
    import { fly } from 'svelte/transition';
    import { screenType } 		from '$lib/accessibilityController.js';
    import { donationTiers, personalMessage } 	from "$lib/databases/donationTiers.js";

    import DonationCard 	from "$root/components/sections/donationCard.svelte";
</script>

<div class="table">
	{#each donationTiers as tier}
		<div class="tierBlock {$screenType < 3 ? 'stack' : ''}" >
			<DonationCard tierData={tier}/>
		</div>
	{/each}
	<div class="box">
		{#if $screenType > 2}
			<div class="imageShowcase"
				 in:fly={{y: 100, duration: 1200, delay: 300 }}>
				<img src="/branding/profileGraphic.webp">
			</div>
		{/if}
		<div class="citation">
			{#each personalMessage as text}
				<p class="text"> {text} </p>
			{/each}

			{#key $screenType < 3}
				<div class="closeQuote"
					 in:fly={{y: 20, duration: 400, delay: 200 }}>
					<p> Love, Thea </p>
					{#if $screenType < 3}
						<img src="/branding/vahnicon.webp">
					{/if}
				</div>
			{/key}
		</div>
	</div>
</div>

<style lang="scss">
	$gap: 15px;

	.table {
		display: 		flex;
		flex-wrap: 		wrap;
		gap: 			$gap;
		margin-bottom: 	20px;

		.tierBlock {
			width: 			calc((100% - $gap) / 2);
			display: 		block;
			margin-bottom: 	25px;

			&.stack {
				width: 100%;
			}
		}

		.box {
			display: 	flex;

			border-radius: 		5px;
			border: 			1px solid var(--accent9);
			background: 		var(--backgroundTrans);

			font-size: 	12px;
			padding: 	10px;
			&::selection {
				color:              black;
				background-color: 	var(--accent9);
			}
		}
	}

	.imageShowcase {
		margin: 	-15px 0 -70px -57px;
		animation: 	float 6s infinite ease-in-out;
		position: 	relative;
		z-index: 	10;

		> img {
			width: 			300px;
			padding-bottom: 10px;
		}
	}

	.citation {
		border: 		1px solid var(--accent8);
		border-right: 	transparent;
		border-left: 	transparent;
		border-radius: 	3px;

		margin: 	8px 0;
		padding: 	10px;

		&::before,
		&::after {
			position: 	absolute;
			font-size: 	55px;
		}

		&::before {
			content: 	open-quote;
			margin: 	-25px 0 0 -25px;
		}
		&::after {
			content: 	close-quote;
			margin: 	0 5px -25px 0;
			right: 		0px;
			bottom: 	0px;
		}

		p.text {
			font-size: 		12px;
			padding-bottom: 9px;

			&:last-of-type {
				padding-bottom: 0;
			}
		}
	}

	.closeQuote {
		margin: 		1px 10px -4px auto;
		padding-bottom: 0;

		width:	 			max-content;
		display: 			flex;
		justify-content: 	center;

		> * {
			margin: auto 0;
		}

		p {
			font-size: 		19px;
		}

		img {
			width: 70px;
			height: 70px;
			margin: -30px -20px -20px 8px;
		}
	}

	@keyframes float {
		0% {
			transform: translatey(-20px);
		}
		50% {
			transform: translatey(0px);
		}
		100% {
			transform: translatey(-20px);
		}
	}
</style>