<script>
    import { scale, fly } from 'svelte/transition';
    import { screenType } 	from '$lib/accessibilityController.js';

    let chatBox = false;
	let transitionSpeed = 200;
</script>

<div
	id="messageController"
	class="{$screenType < 3 ? 'mobile' : ''}">
	{#if !chatBox}
		<div class="neonButton open"
			 in:scale={{delay: transitionSpeed}} out:scale
			 on:click={() => {chatBox = !chatBox}}>
			<img src="/icons/commentIcon.webp">
		</div>
	{:else}
		<div id="messager"
			 class="wideBorder"
			 in:fly={{x: 150, delay:transitionSpeed}} out:fly={{x: 150}}>
			<div class="nav">
				<div class="title">
					<h3>MESSENGER</h3>
				</div>
				<div class="neonButton close small"
					 on:click={() => {chatBox = !chatBox}}>
					<img src="/icons/closeIcon.webp">
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

		right: 		0;
		z-index: 	2;}

	.mobile {
		#messager {
			left: 0;
			height: calc(100% - 30px);
			bottom: 0;
			min-width: calc(300px - 30px);}
		#chatbox {
			min-width: 100%;}}

	.open {	position: 	absolute;
			margin: 	15px;}

	#messager {
		overflow: 	hidden;
		position: 	absolute;
		display: 	grid;

		border: 1px solid var(--accent8);
		margin: 16px;

		height: 	calc(100% - 30px);
		background: var(--backgroundTrans);

		> * {
			position: 	relative;}

		.nav {
			width: 		calc(100%);
			height: 	max-content;
			display: 	flex;
			padding: 	10px;

			.title {
				margin:	 auto auto auto 2px;}}

		#chatbox {
			min-height: calc(100vh - 46px - 30px); // this is braindead.
			width:			348px;
			overflow: 		hidden;}
	}

</style>