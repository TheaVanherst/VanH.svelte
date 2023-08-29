<script>
    import { screenType } 	from '$lib/accessibilityController.js';

	export let maxWidth = 3;
    export let customCalc = undefined
	export let pagination = true;

    import { register } from 'swiper/element/bundle';

    register();
</script>

{#if !customCalc}
<swiper-container
		slides-per-view="{$screenType <= maxWidth ? $screenType : maxWidth}"
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

		border-radius: 		0;
		background-color: 	var(--backgroundTrans);
		color: 				white!important;

		transition: ease .3s;

		&:hover {
			background: var(--accent2);}}

	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		border-radius:  0;
		width: 	        35px;
		height:         3px;}
	swiper-container::part(bullet) {
		background: var(--accent8);
		opacity:    1;
		transition: ease .3s;}
	swiper-container::part(bullet-active) {
		background: var(--accent2);}
</style>