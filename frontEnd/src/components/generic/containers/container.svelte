<script>
	export let
		border = 7,
		padding = [15,15,15,15]
</script>

<div
	class="container wideBorder"
	style="
		{`padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`}
		{`border-color: var(--accent${border})`}">
			<slot/>
</div>

<style lang="scss">
	.container {
		position: 		relative;
		background: 	var(--TransBlack);

		margin-bottom: 	15px;
		padding: 		15px;

		border-width: 	1px;
		border-style: 	solid;
	}
</style>