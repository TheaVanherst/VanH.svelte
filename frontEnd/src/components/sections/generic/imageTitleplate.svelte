<script>
    import { fly } from 'svelte/transition';

    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import { deviceType } from "$lib/controllers/accessibilityController.js";

    export let
		image = undefined,
		title = undefined,
		subtitle = undefined,
        devStatus = undefined;

    let active = false;
    export let
		hoverable = false;
</script>

<div class="card wideBorder {active ? 'hovered' : ''}"
	 on:click={() => {active = !active}}
	 on:mouseenter={() => {$deviceType === 2 ? active = true : false}}
	 on:mouseleave={() => {active = false}}>

	<div class="showcase imageWrapper wideBorder">
		<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
		<div class="characterImage">
			<SanityImage image={image}/>
		</div>

		{#if active && hoverable}
			<div class="infoPlate"
				 transition:fly={{y: -50, duration: 400 }}>
				<slot/>
			</div>
		{:else}
			{#if devStatus}
				<p class="developmentIcon regularBorder">
					{devStatus.statusName} {devStatus.emoji}
				</p>
			{/if}
			<div class="titleCard" transition:fly={{y: 50, duration: 400 }}>
				{#if title}
					<h4>{title}</h4>
				{/if}
				{#if subtitle}
					<p>{subtitle}</p>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	* {	transition: transform .5s ease; }

	.hovered {
		.characterImage {
			transform: scale(1.1);}}

	.showcase,
	.infoPlate {	height: 520px;}

	.card {			height: 550px;
		.showcase {
			display: 	flex;
			position: relative;

			.characterImage {
				width: 100%;
				height: 100%;}

			.titleCard {
				position: 	absolute;
				background: var(--TransWhite);
				z-index: 	1;

				bottom: 	0;
				width: 		100%;
				padding: 	7px 10px 10px 10px;

				p, h4 {
					color: 	black;}}}}

	.developmentIcon {
		position: 	absolute;
		top: 		0;
		right: 		0;

		margin: 	10px;
		padding: 	5px 7px;

		font-weight: 700;
		background: var(--TransWhite);
		color: 		black;
	}

	.infoPlate {	position: 	absolute;
					overflow-y:	scroll;}
</style>