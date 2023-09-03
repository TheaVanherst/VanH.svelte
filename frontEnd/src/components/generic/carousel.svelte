<script>
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

	export let
		maxWidth = 3,
		customCalc = undefined
	export let
		pagination = true,
		centered = false;

    import { register } from 'swiper/element/bundle';

    register();

    let swiper;
</script>

{#if !customCalc}
	<swiper-container
			slides-per-view={$screenType <= maxWidth ? $screenType : maxWidth}
			centeredSlidesBounds={centered} grabCursor={true}
			navigation="true" pagination={pagination} space-between={5}>
		<slot/>
	</swiper-container>
{:else}
	<swiper-container
			slides-per-view="{customCalc}"
			navigation="true" pagination={pagination} space-between={5}>
		<slot/>
	</swiper-container>
{/if}
<style lang="scss">
	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		width: 		12px;
		padding: 	0 5px;

		border-radius: 		5px;
		background-color: 	var(--backgroundTrans);
		color: 				white!important;

		transition: ease .3s;

		&:hover {
			background: var(--accent2);}}

	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		border-radius:  3px;
		width: 	        35px;
		height:         3px;}
	swiper-container::part(bullet) {
		background: var(--accent8);
		opacity:    1;
		transition: ease .3s;}
	swiper-container::part(bullet-active) {
		background: var(--accent2);}
</style>