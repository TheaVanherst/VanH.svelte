<script>
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    export let
		redirect,
		user;
</script>

<RedirectBuilder url="{redirect}">
	<div class="inlineTag">
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

		&:hover {
			background: 	var(--accent7);
			.icon {
				filter: invert(1);}
			p {	color: 	white;}}}
</style>