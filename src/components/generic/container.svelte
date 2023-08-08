<script>
	export let borders = false;
</script>


<div class="container {borders ? 'borders' : ''}">
	<slot/>
</div>

<style lang="scss">
	.container {
		background: 	var(--backgroundTrans);
		border-radius: 	5px;
		overflow: 		hidden;

		&.borders {
			border: 	1px solid var(--accent2);
			border-top-color: 		transparent;
			border-bottom-color: 	transparent;
		}

		margin-bottom: 	15px;

		* {
			color:	var(--textColour);
			&::selection {
				color: 		black;
				background: var(--accent2) !important;
			}
		}
	}
</style>