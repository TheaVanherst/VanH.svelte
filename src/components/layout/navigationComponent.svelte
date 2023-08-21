<script>
    import { fly } 	from 'svelte/transition';
    import { page } from '$app/stores';

    import { socialMedias, navigationDirectories } 	from '$lib/navigationDirectories.js';
    import { screenType } 							from '$lib/accessibilityController.js';

    import Button 	from "$root/components/layout/navButton.svelte";
</script>

<div class="navigationBar">
	{#key $screenType > 2}
		<div class="controller" in:fly={{x: -50}}>
			<div class="socials">
				{#each socialMedias as item}
					<Button push="{item}" blank={true}/>
				{/each}
			</div>
			<div>
				{#each navigationDirectories as nav}
					<Button push="{nav}"
							smaller={true}
							faded={$page.route.id === nav.path}/>
				{/each}
			</div>
		</div>
	{/key}
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	.navigationBar {
		margin: 	0 auto 15px auto;
		position: 	relative;

		.controller {
			background: 	var(--backgroundTrans);
			padding:		0 5px;

			width: 			max-content;
			margin: 		0 auto;
			> * {
				width: 			max-content;
				margin: 		0 auto;}

			.socials {
				border-bottom: 	1px solid var(--accent6);}}}
</style>