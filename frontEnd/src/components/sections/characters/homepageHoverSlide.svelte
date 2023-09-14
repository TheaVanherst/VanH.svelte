<script>
    import { fly } from 'svelte/transition';
    import SanityImage from "$lib/serializer/sanityImage.svelte";

    export let data

    let active = false;
</script>

<div class="card regularBorder {active ? 'hovered' : ''}"
	 on:mouseenter={() => {active = true;}}
	 on:mouseleave={() => {active = false;}}>
	<h3 class="titleH4">
		{data.nickName}
	</h3>
	<div class="showcase imageWrapper regularBorder">
		<div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
		<div class="fade">
			<SanityImage image="{data.fullRender}"/>
		</div>

		{#if active}
			<div class="infoPlate" transition:fly={{y: 50, duration: 400 }}>
				<div class="scrollWrap">
					<slot/>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../../../commonStyles";

	* {	transition: transform .5s ease, opacity .5s ease; }

	.hovered {
		.titleH4 { 	@include rainbowTransition();}
		.fade {		transform: scale(1.1);
					opacity: 0.2;}}
	.showcase,
	.infoPlate {	height: 520px;}
	.card {			margin: 0 0 30px 0;
					height: 550px;
		.showcase {	background: white;
					display: 	flex;}}

	.infoPlate {	position: 	absolute;
					overflow-y:	scroll;
		.scrollWrap {
					padding: 12px 15px 10px 15px;}}
</style>