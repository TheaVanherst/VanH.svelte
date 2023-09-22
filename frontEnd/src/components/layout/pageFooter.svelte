<script>
    import { screenSize, screenType } 	from '$lib/controllers/accessibilityController.js';
    import { splashText } from "$lib/controllers/accessibilityController.js";
    import { submitters } from "$lib/databases/splashTextDatabase.js";

    import { page } from "$app/stores";
</script>

<div class="footer {$screenSize < 800 ? 'cropped' : ''} {$screenType < 3 ? 'mobile' : ''}">
	<div class="left">
		{#if $page.url.hostname !== "localhost"} <!-- dev check -->
			<img src='https://www.free-website-hit-counter.com/c.php?d=9&id=154101&s=7'>
		{/if}
	</div>
	<div class="right">
		<p id="splash">
			Splash text by <span>{$splashText?.[2]?.user ?? submitters?.thea?.user ?? "[NOT FOUND]"}</span>
		</p><p>
			Website developed and created by Thea Vanherst @ <span>vanh.art</span>
		</p>
	</div>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

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

		p:hover {
			span {
				animation:
					colorRotateFadeIn .3s linear,
					colorRotate 1s .3s linear infinite;
			}}

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
</style>