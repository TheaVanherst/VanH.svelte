<script>
    import { scale, fly } 		from 'svelte/transition';

    import { deviceData, directoryProcessing } from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { messengerSettings } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { directoryData, navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";
    import GenericButton 		from "$root/components/generic/wrappers/buttons/genericButton.svelte";
    import { navigationDirectories } from "$lib/controllers/layoutControllers/redirectHandling.js";

    let chatBox = false;
	let transitionSpeed = 250;

	let directions;
    $: directions = $deviceData.screenType < 3 ? [0, 150] : [150, 0];

    const pageCheck = () => {
        if ($navigationControls.nsfw !== false) {
            const placement = navigationDirectories.findIndex(e => e.path === $directoryData.root);
			if (navigationDirectories[placement].nsfw) {
                directoryProcessing('/home', '/home');}}}
</script>

<div id="messageController"
	 class="{$deviceData.screenType < 3 ? 'mobile' : ''}">
	{#if !chatBox && $messengerSettings}
		<div class="open"
			 in:scale={{delay: transitionSpeed}}
			 out:scale
			 on:click={() => {chatBox = !chatBox}}>
			<RainbowButtonWrap padding={[5,5]}>
				<img src="/icons/qAndAIcon.webp">
			</RainbowButtonWrap>
		</div>

		<RedirectBuilder url={$directoryData.stripped} nsfwPointer={!$navigationControls.nsfw}>
			<div class="nsfwToggle profileIcon wideBorder" class:afterDark={$navigationControls.nsfw} on:click={pageCheck}>
				<img src="/icons/afterDarkIcon.webp">
			</div>
		</RedirectBuilder>
	{:else if $messengerSettings}
		<div id="messager"
			 class="wideBorder"
			 in:fly={{
				x: directions[0],
				y: directions[1],
				delay:transitionSpeed}}
			 out:fly={{
				x: directions[0],
				y: directions[1]}}>
			<div class="nav wrapCorrection">
				<div class="title">
					<h3>MESSENGER</h3>
				</div>
				<div on:click={() => {chatBox = !chatBox}}>
					<GenericButton icon="/icons/closeIcon"/>
				</div>
			</div>


			<div id="chatbox">
				<iframe src="https://www5.cbox.ws/box/?boxid=945697&boxtag=RzY1tf"
						width="100%" height="100%" allowtransparency="yes" allow="autoplay"
						frameborder="0" marginheight="0" marginwidth="0" scrolling="auto">
				</iframe>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	* {	right: 			0;
		z-index: 		9;}

	#messageController {
		position: 	fixed;
		display: 	grid;
		margin: 	15px;
		gap: 		15px;

		> *  {
			height: min-content;
			width: max-content;}}

	.nsfwToggle {
		display: flex;
		background: var(--accent10);
		border: 1px solid var(--accent7);
		transition: border .2s ease, background .2s ease;
		&:hover {
			border: 1px solid var(--accent10);}
		img {
			padding: 5px;
			transition: filter .2s ease;}

		&.afterDark {
			background: var(--TransBlack);
			border: 1px solid var(--accent7);
			&:hover {
				background: var(--accent7);
			}
			img {
				filter:  invert(1);}}}

	.mobile {
		#messager {
			bottom: 	0;}
		#chatbox {
			width: 		100%;
			min-width: 	100%;}}

	#messager {
		position: 	fixed;
		margin: 	0 15px;
		overflow: 	hidden;
		border: 	1px solid var(--accent7);

		height: 	calc(100% - 30px);
		background: var(--TransBlack);

		> * {
			position: 	relative;}

		.nav {
			width: 		100%;
			height: 	max-content;
			display: 	flex;
			padding: 	10px;

			.title {
				margin:	 auto auto auto 2px;}}

		#chatbox {
			max-height: calc(100% - 49px);
			height: 	100%;
			max-width:	348px;
			overflow: 	hidden;}}

</style>