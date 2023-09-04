<script>
    import { socialMedias } 	from '$lib/controllers/navigationDirectories.js';
</script>

<div class="wrapper">
	<div class="imageWrapper">
		<img src="/branding/vahnIcon.webp">
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
	@import "../../../../commonStyles";

	* {transition: .2s ease}

	.wrapper {
		margin: 0 auto;
		max-width: 450px;}

	.imageWrapper {
		img {
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

			h3 {	padding-bottom: 10px;}
			p {		padding-bottom: 3px;}}}

	.wrapper > * {
		margin: 	0 auto 15px auto;}
	.social {
		&:before {
			content: "";
			height: 500px;
			width: 500px;
			position: absolute;
			z-index: -2;
			background: conic-gradient(
				var(--accent2),
				var(--accent2));
			top: -228px;}

		position: relative;
		overflow: hidden;
		margin-bottom: 10px;

		.flex {
			padding: 		10px;
			display: 		flex;
			background: 	black;
			margin: 		1px;
			border-radius:  8px;
			.text {
				text-align: 	center;
				white-space: 	nowrap;
				margin: 		0 auto;}
			h3 {	white-space: 	nowrap;}}

		&:hover {
			transform: 	scale(1.1);

			&:before {
				background: conic-gradient(
					var(--accent2), var(--accent5), var(--accent6), var(--accent3),
					var(--accent7), var(--accent1), var(--accent2));
				animation: spin 3s infinite linear;}

			.flex {
				filter: invert(1);
				border-radius: 7px;

				margin: 	2px;
				padding: 	9px;}}}

	@keyframes spin {
		from {	transform: rotate(360deg);}
		to {	transform: rotate(0deg);}
	}
</style>