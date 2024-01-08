<script>
	export let portableText

	let style = portableText.value.style;
</script>

{#if style === 'h1'}
	<h1 ><slot /></h1>
{:else if style === 'h2'}
	<h2><slot /></h2>
{:else if style === 'h3'}
	<h3><slot /></h3>
{:else if style === 'h4'}
	<h4><slot /></h4>
{:else}
	<h5><slot /></h5>
{/if}

<style lang="scss">
	h1, h2, h3, h4, h5 {
		margin: 0 0 12px 0;}
</style>