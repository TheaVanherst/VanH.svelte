<script>
	import ArtworkCard from "$root/components/sections/artworkPage/artworkCard.svelte";
    import Masonry from 'svelte-bricks'; // THIS IS SO FUCKING GOOD.

	export let data;
</script>

<div class="center wrapper">
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