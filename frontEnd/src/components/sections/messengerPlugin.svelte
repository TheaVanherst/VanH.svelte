<script>
    import { slide, scale } from 'svelte/transition';

    import { screenType } 	from '$lib/accessibilityController.js';

    let chatBox = false;
</script>

<div
	id="messageController"
	class="{$screenType < 3 ? 'mobile' : ''}">
	{#if !chatBox}
		<div class="button open"
			 in:scale={{delay: 300}} out:scale
			 on:click={() => {chatBox = !chatBox}}>
			<img src="/icons/commentIcon.webp">
		</div>
	{:else}
		<div id="messager"
			 in:slide={{delay: 300}} out:slide>
			<div class="button close"
				 transition:scale
				 on:click={() => {chatBox = !chatBox}}>
				<img src="/icons/closeIcon.webp">
			</div>
			<div id="chatbox">
				<iframe src="https://www5.cbox.ws/box/?boxid=945697&boxtag=RzY1tf"
						width="100%" height="450" allowtransparency="yes" allow="autoplay"
						frameborder="0" marginheight="0" marginwidth="0" scrolling="auto">
				</iframe>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">

	* {
		bottom: 	0;
		right: 		0;

		vertical-align: bottom;
		float: 			right;

		z-index: 	2;}

	.mobile {
		#messager {
			max-width: calc(100% - 30px);
			width: 100%;}
		#chatbox {
			width: 100%;}
	}

	.button {
		width: 		min-content;
		height: 	min-content;

		&:hover {
		img {
			background: var(--accent6);}}

		img {
			transition: 	ease .3s;
			padding: 		5px;
			border-radius: 	5px;
			background: 	var(--accent2);}}
	.open {
		margin: 	15px;}
	.close {
		margin: 	0 0 10px 0;
		img {
			width: 20px;
			height: 20px;}}

	.button,
	#messager {
		position: 		absolute;
		overflow: 		hidden;

		> * {
			position: 	relative;}}
	#messager {
		margin: 		15px 15px 0 15px;
		width: 			calc(100% - 30px);
		min-width:		270px;
		max-width: 		350px;}
	#chatbox {
		margin-bottom: 	15px; // shit fix to fix the transition
		border-radius: 	5px;
		width:			350px;
		overflow: 		hidden;}

</style>