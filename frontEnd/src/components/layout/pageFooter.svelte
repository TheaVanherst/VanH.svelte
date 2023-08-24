<script>
    import { screenSize, screenType } 	from '$lib/accessibilityController.js';

    // import { socialMedias } 	from '$lib/navigationDirectories.js';
</script>

<div class="footer {$screenSize < 800 ? 'cropped' : ''} {$screenType < 3 ? 'mobile' : ''}">
	<div class="left">
		<!--{#each socialMedias as item}-->
		<!--	<a href={item.path}>-->
		<!--		<img-->
		<!--			class="tinyIco"-->
		<!--			src="/icons/{item.imagePath}.webp">-->
		<!--	</a>-->
		<!--{/each}-->

		<img src='https://www.free-website-hit-counter.com/c.php?d=9&id=154101&s=7'>
	</div>
	<div class="right">
		<p>
			All featured artwork is drawn and created by Thea Vanherst
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
		background-color: 	var(--backgroundTrans);
		border-top: 		1px solid var(--accent2);

		width: 		calc(100%);
		padding: 	15px 0;

		display: flex;

		.left {
			margin: 0 15px 0 15px;
			width:	max-content;

			img {
				padding: 		4px;
				margin: 		auto 0;
				vertical-align: bottom;

				//&:hover {
				//	@include rainbowTransition();}
		}}

		.right {
			margin: 0 15px 0 auto;
			width:	max-content;

			p {	text-align: 	right;
				color:			var(--accent8);}

			span {
				color: var(--accent9);
				&:hover {
					@include rainbowTransition();}}}}
</style>