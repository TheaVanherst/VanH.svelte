<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";

	export let
        featured = false,
        title = undefined, description = undefined,
        list = undefined, banner = undefined;
</script>

<div class="card wideBorder"
	 class:black={featured}>
	<div class="banner">
		{#if banner}
			<div class="img">
				<SanityImage image={banner}/>
			</div>
		{/if}
		<div class="titleCard">
			<h5>{title}</h5>
			<p>{description}</p>
		</div>
	</div>

	<ul>
		{#each list as bonus}
			<li>{bonus}</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.card {
		width: 		100%;

		overflow: 	hidden;
		background: white;

		.banner {
			position: 	relative;
			overflow: 	hidden;
			height: 	120px;

			.img {
				transition: transform .3s ease-in-out;
				height: 	100%;}

			.titleCard {
				position: absolute;

				bottom: 0;
				width: 	100%;
				width: 	-moz-available;

				background: var(--TransWhite);
				padding: 	8px 10px;}}

		ul {		padding: 2px 10px 2px 25px;
			&:last-child:not(:only-child) {
				margin:  10px 0 10px 0;}
			li {	padding: 0 0 4px 5px;}}

		h5, li, p {
			color: black;
			&::selection, ::selection {
				 color:      var(--accent2);}}

		&.black {
			background: var(--TransBlack);
			border: 	1px solid var(--accent9);

			.banner {
				height: 150px;}

			li {
				color: white;
				&::selection, ::selection {
					color:      var(--accent6);}}}

		&:not(.black) {
			&:hover {
				.img {
					transform: scale(1.1);}}}}
</style>