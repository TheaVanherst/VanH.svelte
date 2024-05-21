<script>
	import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import Carousel 	from "$root/components/generic/containers/imageContainers/carousel.svelte";

	export let tiers = [];
    export let customSize = 2.5
</script>

<Carousel maxWidth={customSize}>
	{#each tiers as tier, i}
		<swiper-slide style="height:auto;">
			<div class="contents wideBorder">
				<div class="card">
					<div class="imageWrapper tierImage">
						<SanityImage image={tier.bannerImage}/>
						<div class="titleWrapper">
							<div class="titles regularBorder">
								<h3>{tier.tierEmoji}{tier.tierName}</h3>
								<p>{tier.tierDesc}</p>
							</div>
						</div>
					</div>
					<div class="desc">
						<p class="price fancy">£{tier?.tierCost?.price.toFixed(2)}{tier?.tierCost?.additional ? " or more" : ""} {tier?.tierCost?.recurring ? "monthly" : "single"} donation</p>
						<div class="buttonRow">
							{#if tier.tierRedirect}
								<a href={tier.tierRedirect} target="_blank">
									<div class="joinButton kofi">
										<img src="/icons/kofiFilled.webp">
									</div>
								</a>
							{/if}
							{#if tier.altRedirect}
								<a href={tier.altRedirect} target="_blank">
									<div class="joinButton patreon">
										<img src="/icons/patreonFilled.webp">
									</div>
								</a>
							{/if}
						</div>
						<ul>
							{#each tier.tierPerks as perk, i}
								<li class="{i === 0 && tier.boldFirst ? 'bold' : ''}">
									{perk}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</swiper-slide>
	{/each}
</Carousel>

<style lang="scss">
	.contents {
		height: 	100%;
		width: 		100%;

		overflow: 	hidden;
		display: 	inline-flex;
		background: var(--accent10);

		.card {
			width: 		100%;
			margin: 	0 0 auto 0;
			overflow: 	hidden;

			.tierImage {
				aspect-ratio: 	1/1;
				width: 			100%}}}

	.titleWrapper {
		position: 	absolute;
		display: 	flex;
		height: 	100%;
		width: 		100%;

		.titles {
			background: var(--TransWhite);
			margin: 	auto 5px 5px 5px;
			padding: 	8px 10px;
			width: 		100%;

			h3 {	margin-bottom: 	1px;}
			* {		color: 			black;}}}

	.desc {	padding: 10px;
		* {	color: black;}}

	.buttonRow {
		display: flex;
		gap: 10px;
		> * {
			display: 	flex;
			width: 		100%;
			margin: 0 	auto;}
		.joinButton {
			margin: 	10px 0 5px 0;
			width: 		100%;
			padding: 		5px;
			border-radius: 	20px;

			background: var(--accent9);
			transition: background .2s ease-in-out;
			img {
				height: 24px;
				width: 	24px;
				margin: 0 auto;
				display: flex;
				filter: invert(1);}
			p { color: 	white;
				width: 	max-content;
				margin: 0 auto;}}
	}

	a:hover {
		.joinButton {
			&.patreon {	background: var(--accent7);}
			&.kofi {		background: var(--accent6);} }
	}

	ul {	margin: 		10px 0 5px 0;
			padding-left: 	15px!important;
		li.bold {
			font-weight: 700;}}
</style>