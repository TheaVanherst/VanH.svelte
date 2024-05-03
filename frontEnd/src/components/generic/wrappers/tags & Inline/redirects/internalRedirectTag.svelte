<script>
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    export let
		redirect,
		user,
		inverted = false;
</script>

<RedirectBuilder url="{redirect}">
	<div class="inlineTag" class:inverted={inverted}>
		<div class="icon inlineIcon rounded">
			<img src="/icons/vanhSocial.webp" alt="">
		</div>
		<p> / {user} </p>
	</div>
</RedirectBuilder>

<style lang="scss">
	.inlineTag {
		white-space: nowrap;
		.icon {
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
			background: 	var(--accent7);
			.icon {
				filter: invert(1);}
			p {	color: 	white;}}}
</style>