<script>
    import { register } 	from 'swiper/element/bundle';
    import { onMount } 		from "svelte";
    import { Pagination } 	from 'swiper/modules';

    import { deviceData } 	from '$lib/controllers/layoutControllers/navigationHandling.js';

	export let
		maxWidth = 3,
		customCalc = undefined,
		pagination = true,
		centered = false;

    const clickablePagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="` + className + `">` + `</span>`;},
    };

    onMount(() => {register();})
</script>

<div class="wideBorder">
	{#if !customCalc}
		<swiper-container
				slides-per-view={$deviceData.screenType <= maxWidth ? $deviceData.screenType : maxWidth}
				centeredSlidesBounds={centered}
				grabCursor={true}
				modules={[Pagination]} pagination={clickablePagination}
				class="wideBorder"
				navigation="true" space-between={10}>
			<slot/>
		</swiper-container>
	{:else}
		<swiper-container
				slides-per-view="{customCalc}"
				class="wideBorder"
				modules={[Pagination]} pagination={clickablePagination}
				navigation="true" space-between={10}>
			<slot/>
		</swiper-container>
	{/if}
</div>

<style lang="scss">
	.wideBorder {
		overflow: 	hidden;}

	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		display: none;}

	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		position: relative;
		border-radius:  3px;
		width: 			30px;
		height:         5px;
		&:before {
			position: absolute;
			content: "";
			left: -5px;
			top: -12px;
			height: 29px;
			width: 	40px;}}
	swiper-container::part(pagination) {
		display: flex;
		white-space: nowrap;
		position: relative;
		max-width: 	100%;
		width: 		max-content;
		margin: 	20px auto 3px auto;}

	swiper-container::part(bullet) {
		background: 	var(--accent7);
		opacity:    	1;
		transition: 	ease .3s;
		&:hover {
			background: 	var(--accent3);}}
	swiper-container::part(bullet-active) {
		background: 	white;}

	swiper-container.margin::part(container) { // bad work around.
		padding-bottom: 5px;}
</style>