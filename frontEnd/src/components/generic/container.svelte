<script>
	export let
		radius = 5,
		border = 8,
		bottom = undefined;
</script>

<div
	class="container"
	style="
		{!!bottom ? `padding-bottom: -${10 - bottom}px; ` : ''}
		{!!border ? `border: 1px solid var(--accent${border})` : ''}">
	<slot/>
</div>

<style lang="scss">
	.container {
		background: 	var(--backgroundTrans);
		position: 		relative;
		margin-bottom: 	15px;
		padding: 10px;
	}
</style>