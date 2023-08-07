<script>
    import { horizontalSlide } from "$lib/transitionPresets.js";
    import { screenType } 	from '$lib/accessibilityController.js';

	export let titlecard, icon = undefined;
</script>


<div class="wrapper {$screenType > 2 ? 'textVis' : 'textHidden'} {icon ? 'icon' : ''}">
	<div class="sideBar">
		{#if $screenType > 2}
			<h1 transition:horizontalSlide={{axis: 'x', duration: 300}}>
				{#if icon}<img src="/icons/{icon}">{/if}{titlecard}
			</h1>
		{/if}
	</div>

	<div class="offset">
		{#if $screenType < 3}
			<div class="divider"
				 transition:horizontalSlide={{axis: 'y', duration: 300}}>
				{#if icon}
					<img src="/icons/{icon}">
				{/if}
				<h2>
					{titlecard}
				</h2>
			</div>
		{/if}
		<slot/>
	</div>
</div>


<style lang="scss">
	$fontSize: 40px;
	$gapSize: 10px;

	* { transition: ease .5s;}

	h1, h2 {
		height: max-content;}

	.icon {
		&.textVis {
			img {
				position: relative;
				margin-left: -4px;
				margin-bottom: 15px;
				width: 	30px;}}
		&.textHidden {
			.divider {
				display: flex;
			}
			img {
				margin: auto 0;
				z-index: 10;
				height: 40px;}
			h2 {
				width: 	30px;}}
	}

	.offset {
		position: relative;

		.divider {
			border-left: 	3px solid var(--accent2);
			padding-left: 	15px;
			margin-bottom: 	15px;
			background-color: 	var(--backgroundTrans);

			h2 {
				text-transform:	uppercase;
				padding: 		6px 10px 10px 10px;}}}

	.sideBar {
		position: relative;
		display: inline-grid; // this fixes a bug relating to the flex parent -
		// for some reason not specifying this breaks shit.

		h1 {
			writing-mode: 		vertical-rl;
			text-orientation: 	mixed;
			text-transform: 	uppercase;
			margin-top:			$gapSize;}
	}

	.wrapper {
		display: flex;

		&.textVis {
			gap: 		$gapSize;
			.offset { width: 	calc(100% - $fontSize - $gapSize);}}

		&.textHidden {
			gap: 		0;
			.offset { width: 	100%;}} // this is required to keep the animation type consistant.
	}

</style>
