<script>
	import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SanityImage 			from "$root/serializer/types/sanityImage.svelte";
    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import RainbowButtonWrap 	from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";

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
	{#each data.featured as section}
		<div class="sectionTitle">
			<h4>{section.chunkName}</h4>
		</div>
		{#each section.chunkSocials as social}
			{#if !social.nsfw && !$navigationControls.nsfw || $navigationControls.nsfw}
				<div class="link">
					<RedirectBuilder url={social.platformName.socialURL + social.url}>
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
					</RedirectBuilder>
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">
	@import "../../../../commonStyles";

	* { transition: .2s ease}

	.wrapper {
		margin: 	0 auto;
		max-width: 	450px;}

	.sectionTitle {
		h4 {
			margin: 	15px auto;
			padding: 	10px 10px;
			max-width: max-content;

			background: var(--TransBlack);
			border-bottom: 1px solid var(--accent2);}}

	.link {
		margin: 	0 auto 10px auto;}

	.imageWrapper {
		img {
			padding:	0 0 10px 15px;
			margin: 	auto 0;
			max-width: 	90px;
			max-height: 90px;
			aspect-ratio: 1/1;}
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
</style>