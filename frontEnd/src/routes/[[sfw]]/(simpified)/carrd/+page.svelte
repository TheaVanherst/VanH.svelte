<script>
    import { socialMedias } 	from '$lib/controllers/navigationDirectories.js';
    import RedirectBuilder 		from "$root/components/generic/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/rainbowButtonWrap.svelte";
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
		<RedirectBuilder url={push.path} redirectName={push.pagePreview}>
			<RainbowButtonWrap bottom={10} padding={[9,15]}>
				<div class="central">
					<div class="mediaIcon">
						<img src="/icons/{push.imagePath}.webp">
					</div>
					<div class="text">
						<h3> {push.name} </h3>
					</div>
				</div>
			</RainbowButtonWrap>
		</RedirectBuilder>
	{/each}
</div>

<style lang="scss">
	@import "../../../../commonStyles";

	* { transition: .2s ease}

	.wrapper {
		margin: 	0 auto;
		max-width: 	450px;}

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

			h3 {	padding: 0 0 10px 0;}
			p {		padding: 0 0 3px 0;}}}

	.central {
			display: 	flex;
			width: 		100%;
		.text {
			width: 		100%;
			text-align: center;}}
	.wrapper > * {
			margin: 	0 auto 15px auto;}
</style>