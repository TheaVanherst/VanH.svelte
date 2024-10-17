<script>
    import { deviceData } 	from '$lib/settings/navigationHandling.js';
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
		<c> Website developed and created by Thea Vanherst <br> Rights reserved <a href="https://github.com/TheaVanherst/VanH.svelte/">VanH.art</a></c>
		<img src="/icons/vanhSocial.webp">
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

	.footer {
		background-color: 			var(--transPure2);
		border-top: 				1px solid var(--accent1);
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

		.right {
			display: flex;
			gap: 15px;
			margin: 0 15px 0 auto;
			width:	max-content;
			img {
				filter: invert(1);}
			c {		text-align: right;
					color: var(--dark1);}}}
</style>