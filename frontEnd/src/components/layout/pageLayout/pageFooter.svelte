<script>
    import { deviceData } 	from '$lib/controllers/layoutControllers/redirectHandling.js';
    import { splashTextData } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { submitters } from "$lib/localDatabases/splashTextDatabase.js";

    import { page } from "$app/stores";
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
		<p id="splash">
			Splash text by <span>{$splashTextData?.[2]?.user ?? submitters?.thea?.user ?? "[NOT FOUND]"}</span>
		</p><p>
			Website developed and created by Thea Vanherst @ <a href="https://github.com/TheaVanherst/VanH.svelte/">vanh.art</a>
		</p>
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
		border-top: 				1px solid var(--accent2);
		border-top-left-radius: 	var(--borderWide);
		border-top-right-radius: 	var(--borderWide);

		width: 		100%;
		padding: 	15px 0;

		display: 	flex;
		position: 	relative;
		bottom: 	0;


		a { color: white;
			&:hover {
				animation:
					colorRotate 3s linear infinite;}}

		.left {	margin: 0 15px 0 15px;
				width:	max-content;
			img {
				padding: 		4px;
				margin: 		auto 0;
				vertical-align: bottom;}}

		.right {	margin: 0 15px 0 auto;
					width:	max-content;
			p {		text-align: right;
					color: var(--accent10);}
			span {	color: var(--accent9);}}}

	#splash {
		span:hover {
			color: var(--accent1);}}
</style>