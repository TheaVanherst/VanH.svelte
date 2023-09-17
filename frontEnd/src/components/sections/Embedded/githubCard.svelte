<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/sections/Embedded/flyInCard.svelte";

	export let data;

    let hover = false;
</script>

<a href="https://github.com/TheaVanherst/{data.url}" target="_blank">
	<div class="slide regularBorder"
		 on:mouseenter={() => hover=true} on:mouseleave={() => hover=false}>
		<div class="thumbnail">
			<SanityImage image={data.previewImage}/>
			<FlyInCard title={data.itemName} desc={data.shortDesc} hover={hover}/>
		</div>
		<div class="referral" style="background: var(--accent{data.accentColour})">
			<p>TheaVanherst/{data.url}</p>
		</div>
	</div>
</a>

<style lang="scss">
	@import "../../../commonStyles";

	* {	transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}

	a:hover {
		.referral {
			background: var(--accent2)!important;
			p {	color: 	white!important;}}}

	.slide {
		overflow: hidden;
		margin-bottom: 27px;

		.thumbnail {
			position: 	relative;
			overflow: 	hidden;
			max-height: 250px;
			min-height: 200px;}}

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