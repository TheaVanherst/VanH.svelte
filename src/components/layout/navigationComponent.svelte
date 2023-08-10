<script>
    import navigation 	from '$lib/databases/navigationDirectories.js';
    import { screenType } 	from '$lib/accessibilityController.js';
    import Button 		from "$root/components/layout/navButton.svelte";

    import { fly } from 'svelte/transition';
</script>

<div class="navigationBar regularBorder">
	{#key $screenType > 2}
		<div class="controller" in:fly={{x: -50}}>
			{#each navigation as item}
				<Button push="{item}"/>
			{/each}
		</div>
	{/key}
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.navigationBar {
		margin: 	0 auto 15px auto;
		position: 	relative;

		.controller {
			border-bottom: 	1px solid var(--accent6);
			background: 	var(--backgroundTrans);

			padding:		0 5px;
			margin: 		0 auto;
			width: 			max-content;
		}
	}
</style>