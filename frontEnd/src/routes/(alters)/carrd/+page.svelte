<script>
    import { socialMedias } 	from '$lib/navigationDirectories.js';
</script>

<div class="wrapper">
	<div class="imageWrapper">
		<img src="/branding/vahnicon.webp">
		<div class="socialCard">
			<h3>Thea Vanherst</h3>
			<div class="desc">
				<p>Digital Designer, Artist, Developer</p>
				<p>A Panromantic astral trans deer</p>
			</div>
		</div>
	</div>
	{#each socialMedias as push}
		<a href="https://www.{push.path}" target="_blank">
			<div class="social wideBorder">
				<div class="flex">
					<div class="mediaIcon">
						<img src="/icons/{push.imagePath}.webp">
					</div>
					<div class="text">
						<h3> {push.name} </h3>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.wrapper {
		margin: 0 auto;
		max-width: 450px;}

	.imageWrapper {
		img {
			transition: .3s ease;
			padding:	0 0 10px 15px;
			max-width: 	90px;}
		&:hover {
			h3 {	@include rainbowTransition();}
			img {	transform: 	scale(1.1) rotate(6deg);}}

		.socialCard {
			background: 	var(--backgroundTrans);
			border-left: 	1px solid var(--accent6);

			width: 		inherit;
			margin: 	auto 15px;
			padding: 	7px 15px;

			h3 {	transition: .3s ease;
					padding-bottom: 10px;}
			p {		padding-bottom: 3px;}}}

	.wrapper > * {
		margin: 	0 auto 15px auto;}
	.social {
		padding: 	10px;
		margin-bottom: 10px;
		transition: transform .2s ease, border .4s ease;

		border: 	1px solid var(--accent2);
		background: var(--backgroundTrans);

		.flex {		display: 		flex;
			.text {	text-align: 	center;
					white-space: 	nowrap;
					margin: 		0 auto;}
			h3 {	white-space: 	nowrap;}}

		&:hover {
			transform: 	scale(1.05);
			border: 	1px solid var(--accent6);}}
</style>