<script>
	import ArtworkCard from "$root/components/sections/artworks/artworkCard.svelte";
    import Masonry from 'svelte-bricks'; // THIS IS SO FUCKING GOOD.

	export let data;
</script>

<div class="wrapper">
	<Masonry
			items=	{data.artworks}
			gap=	{5}
			idKey=	{`_id`}

			animate=		{false}
			columnClass=	"flex"
			let:item>
		<div class="artPost">
			<ArtworkCard postData={item}/>
		</div>
	</Masonry>
	<div class="endOfContent wideBorder">
		<p>Currently a WIP!</p>
	</div>
</div>


<style lang="scss">
	.wrapper {
		.artPost {
			display: 	flex;
			overflow: 	hidden;}}

	.endOfContent {
		padding: 	7px 30px;
		margin: 	var(--marginGap) auto;
		width: 		max-content;

		background: var(--TransBlack);
		border:	 	1px solid var(--accent2);}
</style>