<script>
    import { navigationControls } from "$lib/settings/navigationHandling.js";

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
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
	{#each data.socialMedia as section}
		<div class="sectionTitle">
			<h4>{section.chunkName}</h4>
		</div>
		{#each section.chunkSocials as social, i}
			{#if $navigationControls.localNsfwCheck(social.nsfw)}
				<a href="https://{social.platformName.socialURL + social.url}" target="_blank">
					<RainbowButtonWrap bottom={10} padding={[9,15]}>
						<div class="central">
							<div class="mediaIcon">
								<SanityImage image={social.platformName.socialLogo}/>
							</div>
							<div class="text">
								<h3> {social.platformName.socialName} </h3>
							</div>
						</div>
					</RainbowButtonWrap>
				</a>
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">

	h3 {	font-family: "Jura", sans-serif; }

	.wrapper {
		margin: 	0 auto 35px auto;
		max-width: 	450px;}

	.sectionTitle {
		h4 {
			margin: 	15px auto;
			padding: 	10px 10px;
			max-width: max-content;

			background: var(--transPure2);
			border-bottom: 1px solid var(--accent1);}}

	.imageWrapper {
		img {
			padding:	0 0 10px 15px;
			margin: 	auto 0;
			max-width: 	90px;
			max-height: 90px;
			aspect-ratio: 1/1;}
		.socialCard {
			background: 	var(--transPure2);
			border-left: 	1px solid var(--accent2);

			width: 		inherit;
			margin: 	auto 15px;
			padding: 	7px 15px;

			h3 {	padding: 0 0 10px 0;}
			p {		padding: 0 0 3px 0;}}}

	a {				margin: 0 auto;
		.central {	display: 	flex;
					width: 		100%;
			.text {	width: 	max-content;
					margin: 0 auto;
				h3 {color:	black;}}}}

</style>