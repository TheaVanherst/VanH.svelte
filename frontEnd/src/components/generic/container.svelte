<script>
	export let
		border = 8,
		bottom = undefined;
</script>

<div
	class="container wideBorder"
	style="
		{!!bottom ? `padding-bottom: -${10 - bottom}px; ` : ''}
		{!!border ? `border: 1px solid var(--accent${border})` : ''}">
	<slot/>
</div>

<style lang="scss">
	.container {
		position: 		relative;
		background: 	var(--backgroundTrans);

		margin-bottom: 	15px;
		padding: 		10px;
	}
</style>