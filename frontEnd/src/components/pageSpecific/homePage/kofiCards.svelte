<script>
	import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import Carousel from "$root/components/generic/containers/carousel.svelte";

	export let tiers = [];
</script>

<div class="cardsWrapper">
	{#if tiers}
		<Carousel maxWidth={2.5} centered={true}>
			{#each tiers as tier, i}
				<swiper-slide style="height:auto;">
					<a href={tier.tierRedirect} target="_blank">
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
									<div class="joinButton">
										<p class="subtitle">Join</p>
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
					</a>
				</swiper-slide>
			{/each}
		</Carousel>
	{/if}
</div>

<style lang="scss">
	.cardsWrapper {
		margin: 	0 5px 15px 5px;}

	.contents {
		height: 	100%;
		width: 		100%;

		overflow: 	hidden;
		display: 	inline-flex;
		background: var(--accent9);

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

	.joinButton {
		background: var(--accent10);
		margin: 	10px 0 15px 0;
		padding: 	8px;
		border-radius: 20px;

		transition: background .2s ease-in-out;

		p { color: 	white;
			width: 	max-content;
			margin: 0 auto;}}

	a:hover {
		.joinButton {
			background: var(--accent2);}}

	ul {	margin: 		10px 0 5px 0;
			padding-left: 	15px!important;
		li.bold {
			font-weight: 700;}}
</style>