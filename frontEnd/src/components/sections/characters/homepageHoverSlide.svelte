<script>
    import { fly } from 'svelte/transition';
    import SanityImage from "$lib/serializer/sanityImage.svelte";

    export let data

    let active = false;
</script>

<div class="card wideBorder {active ? 'hovered' : ''}"
	 on:mouseenter={() => {active = true;}}
	 on:mouseleave={() => {active = false;}}>

	<div class="showcase imageWrapper wideBorder">
		<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
		<div class="fade">
			<SanityImage image="{data.fullRender}"/>
		</div>

		{#if active}
			<div class="infoPlate" transition:fly={{y: -50, duration: 400 }}>
				<slot/>
			</div>
		{:else}
			<div class="titleCard" transition:fly={{y: 50, duration: 400 }}>
				<h4>{data.nickName}</h4>
				<p>{data.job}</p>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../../../commonStyles";

	* {	transition: transform .5s ease; }

	.hovered {
		.fade {		transform: scale(1.1);}}
	.showcase,
	.infoPlate {	height: 520px;}
	.card {			height: 550px;
		.showcase {	display: 	flex;
				position: relative;
			.titleCard {
				position: absolute;
				bottom: 0;
				background: var(--TransWhite);
				width: 100%;
				padding: 7px 10px 10px 10px;
				z-index: 1;

				p, h4 {
					color: 	black;}
			}
		}}

	.infoPlate {	position: 	absolute;
					overflow-y:	scroll;}
</style>