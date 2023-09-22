<script>
    import { scale, fly } 	from 'svelte/transition';
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

    import RainbowButtonWrap from "$root/components/generic/buttons/rainbowButtonWrap.svelte";
    import GenericButton from "$root/components/generic/buttons/genericButton.svelte";

    let chatBox = false;
	let transitionSpeed = 200;

	let directions;
    $: directions = $screenType < 3 ? [0, 150] : [150, 0];
</script>

<div
	id="messageController"
	class="{$screenType < 3 ? 'mobile' : ''}">
	{#if !chatBox}
		<div class="open"
			 in:scale={{delay: transitionSpeed}} out:scale
			 on:click={() => {chatBox = !chatBox}}>
			<RainbowButtonWrap padding={[5,5]}>
				<img src="/icons/qAndAIcon.webp">
			</RainbowButtonWrap>
		</div>
	{:else}
		<div id="messager"
			 class="wideBorder"
			 in:fly={{
                 x: directions[0],
                 y: directions[1],
                 delay:transitionSpeed}}
			 out:fly={{
                 x: directions[0],
                 y: directions[1]}}>
			<div class="nav">
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
	* { -webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;
		right: 			0;
		z-index: 		10;}

	.mobile {
			height: 	100%;
		#messager {
			left: 		0;
			bottom: 	0;
			height: 	calc(100% - 28px);
			min-width: 	300px - 30px;}
		#chatbox {
			width: 		100%;
			min-width: 	100%;}}

	.open {	position: 	fixed;
			margin: 	15px;}

	.messageController {
		position: 	absolute;
		top: 		0;
		width: 		100%;
		height: 	100vh;}

	#messager {
		overflow: 	hidden;
		position: 	fixed;

		border: 	1px solid var(--accent2);
		margin: 	15px;

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