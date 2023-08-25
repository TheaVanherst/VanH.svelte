<script>
	export let
		border = 8,
		bottom = undefined;
</script>

<div
	class="container"
	style="
		{!!bottom ? `padding-bottom: -${10 - bottom}px; ` : ''}
		{!!border ? `border-color: var(--accent${border})` : ''}">
			<slot/>
</div>

<style lang="scss">
	.container {
		position: 		relative;
		background: 	var(--backgroundTrans);

		margin-bottom: 	15px;
		padding: 		10px;

		border-width: 	1px;
		border-style: 	solid;
	}
</style>