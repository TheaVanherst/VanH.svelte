<script>
    import { horizontalSlide } from "$lib/transitions/transitionPresets.js";
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

	export let
		titlecard,
		icon = undefined;
</script>


<div class="wrapper {$screenType > 2 ? 'textVis' : 'textHidden'} {icon ? 'icon' : ''}">
	<div class="sideBar">
		{#if $screenType > 2}
			<h1 transition:horizontalSlide={{axis: 'x', duration: 300}}>
				{#if icon}
					<img src="/icons/{icon}">
				{/if}
				{titlecard}
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
	* {	transition: ease .5s;}

	h1, h2 {	text-transform:	uppercase;
				height: max-content;}
	img {		filter: invert(1);
				height: 32px;}

	.wrapper {			display: flex;
		&.textVis {		gap: 	10px;
			.offset { 	width: 	calc(100% - 2rem - 10px);}}
		&.textHidden {	gap: 	0;
			.offset {	max-width: 	100%;}}}

	.offset {
		.divider {	display: 		flex;
					border-left: 	3px solid var(--accent2);
					background: 	var(--TransBlack);
					padding: 	0 0 0 15px;
					margin: 	0 0 15px 0;
			img {	margin: 	auto 0;}
			h2 {	padding: 	6px 10px 10px 10px;}}}

	.sideBar {	display: 		inline-grid;
		img {	margin: 		0 0 15px -4px;
				position: 		relative;}
		h1 {	writing-mode: 	vertical-rl;
				text-orientation: 	mixed;
				margin:			10px 0 0 0;}}

</style>
