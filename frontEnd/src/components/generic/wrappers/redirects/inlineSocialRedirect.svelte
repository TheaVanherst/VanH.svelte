<script>
	import SanityImage from "$root/serializer/sanityImage.svelte";

	export let
		data = 		undefined,
        inverted = 	false;
</script>

<a class="inlineTag" href="https://www.{data.platformName.socialURL + data.url}" target="_blank"  class:inverted={inverted}>
	<div class="icon inlineIcon rounded">
		<SanityImage image={data.platformName.socialLogo}/>
	</div>
	<p> / {data.url} </p>
</a>

<style lang="scss">
	a { .icon {
			margin:	0 0 0 2px;
			display: flex;}
		p {	margin: 0 5px;
			color: 	black;}

		&.inverted {
			background: white;
			p {
				color: black;
			}
		}

		&:hover {
			background: 	var(--accent1);
			.icon {
				filter: invert(1);}
			p {	color: 	white;}}}
</style>