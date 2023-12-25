<script>
    import { register } 	from 'swiper/element/bundle';
    import { onMount } 		from "svelte";

    import { deviceData } 	from '$lib/controllers/layoutControllers/redirectHandling.js';

	export let
		maxWidth = 3,
		customCalc = undefined,
		pagination = true,
		centered = false,
        footerAdd = true;

    onMount(() => {register();})
</script>

<div class="wideBorder">
	{#if !customCalc}
		<swiper-container
				slides-per-view={$deviceData.screenType <= maxWidth ? $deviceData.screenType : maxWidth}
				centeredSlidesBounds={centered}
				grabCursor={true}
				class="wideBorder {footerAdd ? 'margin' : ''}"
				navigation="true" pagination={pagination} space-between={10}>
			<slot/>
		</swiper-container>
	{:else}
		<swiper-container
				slides-per-view="{customCalc}"
				class="wideBorder {footerAdd ? 'margin' : ''}"
				navigation="true" pagination={pagination} space-between={10}>
			<slot/>
		</swiper-container>
	{/if}
</div>

<style lang="scss">
	.wideBorder {
		overflow: hidden;}

	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		display: none;}

	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		border-radius:  3px;
		width: 			30px;
		height:         4px;}
	swiper-container::part(pagination) {
		display: flex;
		white-space: nowrap;
		position: relative;
		max-width: 	100%;
		width: 		max-content;
		margin: 	20px auto 0 auto;}

	swiper-container::part(bullet) {
		background: 	var(--accent7);
		opacity:    	1;
		transition: 	ease .3s;}
	swiper-container::part(bullet-active) {
		background: 	white;}

	swiper-container.margin::part(container) { // bad work around.
		padding-bottom: 4px;}
</style>