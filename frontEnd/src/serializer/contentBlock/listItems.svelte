<script>
    export let portableText = null;
</script>


<li class={portableText.value.listItem}>
	<slot/>
</li>

<style lang="scss">
	.bullet {
		display: list-item;}
</style>