<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/sections/Embedded/flyInEmbedCard.svelte";

	export let data;

    let hover = false;
</script>

<a href="https://{data.url}" target="_blank">
	<div class="slide regularBorder"
		 on:mouseenter={() => hover=true} on:mouseleave={() => hover=false}>
		<div class="thumbnail">
			<div class="image">
				<SanityImage image={data.previewImage}/>
			</div>
			<FlyInCard title={data.itemName} desc={data.shortDesc} hover={hover}/>
		</div>
		<div class="referral" style="background: var(--accent{data.accentColour})">
			<p>TheaVanherst/{data.slug}</p>
		</div>
	</div>
</a>

<style lang="scss">
	* {	transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}

	a:hover {
		.referral {
			background: var(--accent2)!important;
			p {	color: 	white!important;}}}

	.slide {
		overflow: hidden;

		.thumbnail {
			position: 	relative;
			overflow: 	hidden;
			max-height: 180px;
			min-height: 150px;

			.image {
				height: 250px;
			}
		}}

	.referral { // fallback colour
		padding: 	7px 9px 6px 9px;
		overflow: 	hidden;
		background: var(--accent9);

		p {
			color: 			black;
			font-weight: 	600;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			display: 	-webkit-box;
			overflow: 	hidden;}}
</style>