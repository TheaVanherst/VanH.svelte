<script>
	import SanityImage from "$root/serializer/types/sanityImage.svelte";

	export let data = undefined;
</script>

<a class="inlineTag" href="https://www.{data.platformName.socialURL + data.url}" target="_blank">
	<div class="icon inlineIcon">
		<SanityImage image={data.platformName.socialLogo}/>
	</div>
	<p>
		/ {data.url}
	</p>
</a>

<style lang="scss">
	a {
		background: var(--accent10);
		.icon {
			filter: invert(1);
			margin:	0 0 0 2px;
			display: flex;}
		p {	margin: 0 5px;
			color: 	white;}

		&:hover {
			background: 	var(--accent2);}}
</style>