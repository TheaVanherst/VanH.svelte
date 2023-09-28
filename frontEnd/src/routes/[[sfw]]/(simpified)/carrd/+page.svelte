<script>
    import SanityImage 			from "$root/serializer/types/sanityImage.svelte";
    import RedirectBuilder 		from "$root/components/generic/controllers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/buttons/rainbowButtonWrap.svelte";

    export let data;
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
	{#each data.socials as item}
		<RedirectBuilder url={item.platformName.socialURL + item.url}>
			<RainbowButtonWrap bottom={10} padding={[9,15]}>
				<div class="central">
					<div class="mediaIcon">
						<SanityImage image={item.platformName.socialLogo}/>
					</div>
					<div class="text">
						<h3 class="selectInv"> {item.platformName.socialName} </h3>
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
			background: 	var(--TransBlack);
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
			width: 	max-content;
			margin: 0 auto;
			h3 {
				color:	black;}}}
	.wrapper > * {
			margin: 	0 auto 15px auto;}
</style>