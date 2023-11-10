<script>
    import { register } from 'swiper/element/bundle';
    import { onMount } from "svelte";

    import { screenType } 	from '$lib/pageSettings/redirectHandling.js';

	export let
		maxWidth = 3,
		customCalc = undefined
	export let
		pagination = true,
		centered = false;
	export let
        footerAdd = true;

    onMount(() => {register();})
</script>

{#if !customCalc}
	<swiper-container
			slides-per-view={$screenType <= maxWidth ? $screenType : maxWidth}
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

<style lang="scss">
	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		width: 			12px;
		padding: 		0 5px;
		border-radius: 	5px;

		background-color: 	var(--TransBlack);
		color: 				white!important;

		transition: filter ease .3s, background ease .3s;

		&:hover {
			background: black;
			filter: 	invert(1);}}

	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		border-radius:  3px;
		width: 	        30px;
		height:         4px;}
	swiper-container::part(bullet) {
		background: var(--accent2);
		opacity:    1;
		transition: ease .3s;}
	swiper-container::part(bullet-active) {
		background: white;}

	// custom junk

	swiper-container.margin::part(container) { // bad work around.
		padding-bottom: 27px;}
</style>