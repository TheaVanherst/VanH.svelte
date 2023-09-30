<script>
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

	export let
        featured = false,
		image = undefined;
</script>

<div class="card wideBorder {featured ? 'black' : 'white'}">
	<div class="banner">
		{#if image}
			<div class="imageWrapper">
				<SanityImage image={image}/>
			</div>
		{/if}
		<div class="titleCard">
			<slot name="title"/>
		</div>
	</div>
	<slot/>
</div>

<style lang="scss">
	:global {
		ul {
			margin:  10px 0 10px 0!important;
			padding: 2px 10px 2px 24px!important;
			li {
				padding: 0 0 4px 5px!important;}}}

	:global(.card.white *) {
		color: black;
		&::selection, ::selection {
			color:      var(--accent2);}}
	:global(.card.black *) {
		color: white;
		&::selection, ::selection {
			color: var(--accent6);}}

	.card {
		width: 		100%;
		overflow: 	hidden;
		.banner {
			position: 	relative;
			overflow: 	hidden;
			.titleCard {
				position: 	absolute;
				width: 		100%;
				width: 		-moz-available;
				bottom: 	0;
				padding: 	8px 10px;}}}

	.card.white {
		background: white;
		.banner {
			height: 	120px;}
		.titleCard {
			background: var(--TransWhite);}}

	.card.black {
		border: 	1px solid var(--accent9);
		background: black;
		.banner {		height:	 	150px;}
		.titleCard {	background: var(--TransBlack);}}
</style>