<script>
	export let
		borders = false,
		colour = 1;
</script>


<div class="container {borders ? 'borders' : ''} class{colour}">
	<slot/>
</div>

<style lang="scss">
	.container {
		background: 	var(--backgroundTrans);
		border-radius: 	5px;
		overflow: 		hidden;

		margin-bottom: 	15px;

		* {
			color:	var(--textColour);
		}
	}
</style>