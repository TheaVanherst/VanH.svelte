<script>
    import {onMount} from "svelte"; // THIS IS SO FUCKING GOOD.
	import { page } from "$app/stores";

    import { queryGenerator } from "$lib/queries/queryBuilder.js";
    import client from "$lib/sanityClient.js";

    import ArtworkCard from "$root/components/sections/artworkPage/artworkCard.svelte";
    import Masonry from 'svelte-bricks';

    export let data;

    onMount(async () => {
        [data] = await Promise.all([await client.fetch(`{
			"artworks":
				*[ _type == 'artworks' ${queryGenerator($page.url.search)}][0...10] | order(publishedAt desc) {
					...,
					'gallery': gallery {
						...,
						'renderType': renderType->renderName,
						'styleType': styleType->styleName
					},
					'characters': characters[]->{
						fullName,
						charIcon,
						owner,
						fursona
					},
					'commissionData': commissionData {
						'artType': artType-> {
							typeName,
							preName},
						'characters': characters[]-> {
							charIcon,
								fullName,
							'owner': owner-> {
								handle,
								userPortrait,
								slug,
								socialMedia}}}}}`
		)]);
    });

</script>

<div class="center wrapper">
	{#if data.artworks}
		{#key !!data.artworks}
			<Masonry
				items=	{data.artworks}
				gap=	{10}
				idKey=	{`_id`}

				animate=		{false}
				columnClass=	"flex"
				let:item>
					<div class="artPost">
						<ArtworkCard postData={item}/>
					</div>
			</Masonry>
		{/key}
	{/if}
</div>

<div class="center endOfContent wideBorder">
	<p>That's all she wrote!</p>
</div>


<style lang="scss">
	.center {
		margin: 	0 auto 15px auto;}

	#characterSelect {
		display: flex;
		gap: 10px;}

	.wrapper {
		width: 100%;
		.artPost {
			display: 	flex;}}

	.endOfContent {
		padding: 	7px 30px;
		width: 		max-content;
		background: var(--TransBlack);
		border:	 	1px solid var(--accent2);}
</style>