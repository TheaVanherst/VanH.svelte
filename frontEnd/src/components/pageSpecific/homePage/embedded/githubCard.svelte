<script>
    import SanityImage from "$root/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/generic/containers/textContainers/blankFlyIn.svelte";

	export let data;

    let active = false;
</script>

<a href="https://{data.url}" target="_blank">
	<div class="slide regularBorder"
		 on:mouseenter={() => active=true} on:mouseleave={() => active=false}>
		<div class="thumbnail">
			<div class="imageWrapper">
				<SanityImage image={data.previewImage}/>
			</div>
			<FlyInCard {active}>
				<h5 slot="title"> {data.itemName} </h5>
				<span slot="desc">{data.shortDesc}</span>
			</FlyInCard>
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
			background: var(--accent7)!important;
			p {	color: 	white!important;}}}

	.slide {
		overflow: hidden;

		.thumbnail {
			position: 	relative;
			overflow: 	hidden;
			max-height: 180px;
			min-height: 150px;

			.imageWrapper {
				height: 250px;}}}

	.referral { // fallback colour
		padding: 	7px 9px 6px 9px;
		overflow: 	hidden;
		background: var(--accent10);

		p {
			color: 			black;
			font-weight: 	600;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			display: 	-webkit-box;
			overflow: 	hidden;}}
</style>