<script>
    import { deviceData } 	from '$lib/controllers/layoutControllers/navigationHandling.js';
    import { page } 		from "$app/stores";
</script>

<div class="footer"
		class:cropped={$deviceData.screenSize < 800}
		class:mobile={$deviceData.screenType < 3}>
	<div class="left">
		{#if $page.url.hostname !== "localhost"} <!-- dev check -->
			<img src='https://www.free-website-hit-counter.com/c.php?d=9&id=154101&s=7'>
		{/if}
	</div>
	<div class="right">
		<p> Website developed and created by Thea Vanherst <br> Rights reserved <a href="https://github.com/TheaVanherst/VanH.svelte/">VanH.art</a></p>
	</div>
</div>

<style lang="scss">
	* {	transition: ease .3s; }

	.cropped {
		width: 	calc(100% + 30px)!important;
		margin: 0 -15px!important;}

	.mobile {	display: 	block;
		> * {	margin: 	0 auto!important;}
		.right {display: 	none;}}

	.hitCounter {
		padding: 10px;}

	.footer {
		background-color: 			var(--TransBlack);
		border-top: 				1px solid var(--accent7);
		border-top-left-radius: 	var(--borderWide);
		border-top-right-radius: 	var(--borderWide);

		width: 		100%;
		padding: 	15px 0;

		display: 	flex;
		position: 	relative;
		bottom: 	0;


		a { color: white;
			animation:
					colorRotateFadeout .3s ease;
			&:hover {
				animation:
					colorRotateFadeIn .3s ease,
					colorRotate 2s .3s linear infinite;}}

		.left {	margin: 0 15px 0 15px;
				width:	max-content;
			img {
				padding: 		4px;
				margin: 		auto 0;
				vertical-align: bottom;}}

		.right {	margin: 0 15px 0 auto;
					width:	max-content;
			p {		text-align: right;
					color: var(--accent9);}
			span {	color: var(--accent10);}}}
</style>