<script>
    import { horizontalSlide } 	from "$lib/scripts/transitionPresets.js";
    import { deviceData } 		from '$lib/settings/navigationHandling.js';

	export let
		titlecard,
		icon = 		undefined;
</script>


<div class="wrapper {$deviceData.screenType > 2 ? 'textVis' : 'textHidden'} {icon ? 'icon' : ''}">
	{#if $deviceData.screenType > 2 && titlecard}
		<div class="sideBar" transition:horizontalSlide={{axis: 'x', duration: 300}}>
			{#if icon}
				<div class="profileIcon">
					<img src="/icons/{icon}">
				</div>
			{/if}
			<h1>
				{titlecard}
			</h1>
		</div>
	{/if}

	<div class="offset">
		{#if titlecard && $deviceData.screenType < 3}
			<div class="titleBar" transition:horizontalSlide={{axis: 'y', duration: 300}}>
				{#if icon}
					<div class="profileIcon">
						<img src="/icons/{icon}">
					</div>
				{/if}
				<div class="divider">
					<h2>
						{titlecard}
					</h2>
				</div>
			</div>
		{/if}
		<slot/>
	</div>
</div>

<style lang="scss">
	* {	transition: ease .5s;}

	h1, h2 {	font-family: 	"Jura", sans-serif;
				text-transform:	uppercase;
				margin: 		0 auto;
				padding: 		0 0 0 2px;
				height: 		max-content;}

	.profileIcon {	height: 32px;
		img {		filter: invert(1);}}

	.wrapper {			display: flex;
		&.textVis {
			.offset { 	width: calc(100% - 2rem - 15px);}} //needed or this breaks the site.
		&.textHidden {	gap: 	0;
			.offset {	width: 	100%;}}}

	.offset {		margin: 	0 0 0 auto;
		.divider {	border-left: 3px solid var(--accent7);
					background: var(--TransBlack);
					padding: 	0 0 0 10px;
			img {	margin: 	auto 0;}
			h2 {	padding: 	6px 10px 10px 10px;}}}

	.sideBar {	display: 	flex;
				flex-wrap: 	wrap;
				gap: 		10px;
				margin: 	10px 0;
				height: 	fit-content;
				width: 		min-content;
		.profileIcon {	margin: 0 auto;
						width: 	32px;}
		img {	position: 		relative;}
		h1 {	writing-mode: 	vertical-rl;
				text-orientation: 	mixed;}}

	.titleBar {			display: 	flex;
						flex-wrap: 	nowrap;
						margin:	 	0 0 15px 0;
		.profileIcon {	margin: 	6px 10px;}
		.divider {		width: 		100%;}}

</style>
