<script>
    export let portableText = null;

	const
		lastOfType = portableText.global.ptBlocks.length - 1 === portableText.indexInParent;
</script>

<p class:lastOfType={lastOfType}>
	<slot/>
</p>

<style lang="scss">
	p {
        margin: 0 0 8px 0;
		&.lastOfType{
			margin-bottom: 0;}}
</style>