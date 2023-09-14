<script>
    import { fly } from "svelte/transition";

    import SanityImage from "$lib/serializer/sanityImage.svelte";

	export let data;

    let hover = false;
</script>

<a href="https://github.com/TheaVanherst/{data.url}" target="_blank">
	<div class="slide regularBorder"
		 on:mouseenter={() => hover=true} on:mouseleave={() => hover=false}>
		<h4 class="titleH4">
			{data.itemName}
		</h4>
		<div class="imageWrapper">
			<div class="thumbnail">
				<SanityImage image={data.previewImage}></SanityImage>
			</div>

			<div class="descCard">
				{#if hover}
					<div class="description shortBorder" transition:fly={{y:-50}}>
						<p>
							{data.shortDesc}
						</p>
					</div>
				{/if}

				<div class="referral" style="background: var(--accent{data.accentColour})">
					<p>TheaVanherst/{data.url}</p>
				</div>
			</div>

		</div>
	</div>
</a>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* {	transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}

	a:hover {
		.referral {
			background: var(--accent2)!important;
			p {
				color: white!important;}}}

	.slide {
		overflow: hidden;
		margin-bottom: 27px;

		.thumbnail {
			max-height: 250px;
			min-height: 200px;}}

	.descCard {
		position: 	absolute;
		width: 		100%;
		bottom: 	0;

		.description {
			margin: 	5px;
			background: white;
			overflow: 	hidden;
			p {
				color: black;
				@include shortForm(2);}}

		.referral { // fallback colour
			padding: 	7px 9px 6px 9px;
			overflow: 	hidden;
			background: 	var(--accent9);

			p {
				color: 			black;
				font-weight: 	600;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				display: 		-webkit-box;
				overflow: 		hidden;}}
	}
</style>