<script>
    import navigation 	from '$lib/databases/navigationDirectories.js';
    import { screenType } 	from '$lib/accessibilityController.js';
    import Button 		from "$root/components/layout/navButton.svelte";

    import { fly } from 'svelte/transition';
</script>

<div class="navigationBar">
	{#key $screenType > 2}
		<div class="controller" in:fly={{x: -50}}>
			{#each navigation as item}
				<div class="cropController">
					<Button push="{item}"/>
				</div>
			{/each}
		</div>
	{/key}
</div>

<style lang="scss">
	.navigationBar {
		margin: 	0 auto 15px auto;
		position: 	relative;

		border-radius: 	5px;
		overflow: 		hidden;


		.controller {
			border: 				1px solid var(--accent6);
			border-top-color: 		transparent;
			border-left-color: 		transparent;
			border-right-color: 	transparent;

			background: 	var(--backgroundTrans);
			border-radius: 	5px;
			overflow: 		hidden;

			padding: 		7px 0;
			margin: 		0 auto;
			width: 			max-content;

			text-align: 	center;
			display: 		flex;

			&:not(:only-child){
				&:first-child{
					position: absolute;}
				&:last-child {
					position: relative;}}
		}
	}
</style>