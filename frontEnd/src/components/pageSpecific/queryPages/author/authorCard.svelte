<script>
    import { navigationControls } from "$lib/settings/navigationHandling.js";

    import RainbowButtonWrap 	from "$root/components/generic/buttons/rainbowButtonWrap.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";

    export let author;

    import PortableText from "$root/serializer/portableText.svelte";
</script>

<div class="authorWrapper centralClip">
	<div class="imageWrapper">
		<div class="icon wideBorder">
			<SanityImage image={author.userPortrait}/>
		</div>

		<div class="socialCard wideBorder">
			<h3>{author.fullName}</h3>
			<p><c class="colour"><span>@</span>{author.handle}</c><c>{author.internalRole[0] ? ", " + author.internalRole[0].title : ""}</c></p>
			<p>{author.shortDesc}</p>
			{#if author?.authorTag?.length > 0}
				<div class="authorTags">
					{#each author.authorTag as tag}
						<p>{tag.emoji} {tag.title}</p>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

{#if author.socialMedia}
	<div class="socialMedias centralClip">
		{#each author.socialMedia as social}
			{#if $navigationControls.localNsfwCheck(social.nsfw)}
				<a href="https://{social.platformName.socialURL + social.url}" target="_blank">
					<RainbowButtonWrap padding={[9,9]}>
						<div class="central">
							<div class="mediaIcon">
								<SanityImage image={social.platformName.socialLogo}/>
							</div>
						</div>
					</RainbowButtonWrap>
				</a>
			{/if}
		{/each}
	</div>
{/if}

<!--{#if author.bio}-->
<!--	<div class="centralClip author bio">-->
<!--		<div class="container wideBorder">-->
<!--			<PortableText data={author.bio}/>-->
<!--		</div>-->
<!--	</div>-->
<!--{/if}-->

<style lang="scss">
	h3 {	font-family: "Jura", sans-serif; }

	.centralClip {				max-width: 		450px;
								margin: 		0 auto 0 auto;
		&:not(:first-child) { 	margin-top: 	10px;}
		&:not(:last-child) {  	margin-bottom: 	10px;}}

	.authorWrapper {	margin-top: 10px;}
	.icon {				margin: 	auto 0;
						overflow: 	hidden;
						height: 	100px;
						min-width: 	100px;}
	.socialCard {
		background: 	var(--transPure2);
		border-left: 	1px solid var(--accent2);
		width: 			inherit;
		margin: 		auto 0 auto 15px;
		padding: 		5px 15px;

		h3 {	padding: 	0 0 10px 0;}
		p {		padding: 	0 0 3px 0;}
		.authorTags {	display: 	flex;
						gap: 		7px;
			p {	color: 				white;
				background: 		var(--dark1);
				padding: 			2px 9px 2px 5px;
				margin:  			2px 0 0 0;
				border-radius: 		12px;}}}

	.sectionTitle {
		h4 {	margin: 		15px auto;
				padding: 		10px 10px;
				max-width: 		max-content;

				background: 	var(--transPure2);
				border-bottom: 	1px solid var(--accent1);}}

	.socialMedias {
		display: 	flex;
		width: 		max-content;
		margin: 	0 auto 0 auto;
	}
	a {				margin: 0 5px;
		.central {	display: 	flex;
					width: 		100%;
			.text {	width: 	max-content;
					margin: 0 auto;
				h3 {color:	black;}}}}
</style>