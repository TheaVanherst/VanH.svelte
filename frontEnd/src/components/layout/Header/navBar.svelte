<script>
    import { slide } 	from 'svelte/transition';

    import { socialMedias, navigationDirectories } 	from '$lib/controllers/navigationDirectories.js';
    import Button 	from "$root/components/layout/Header/navButton.svelte";

    import { navigationVisibility, socialMediaVisibility, rootPath } from "$lib/controllers/accessibilityController.js";
</script>

{#if $navigationVisibility || $socialMediaVisibility}
	<div class="navigationBar">
		<div class="controller">
			{#if $navigationVisibility}
				<div transition:slide id="navigation">
					{#each navigationDirectories as nav}
						<Button push="{nav}"
								redirect={true}
								selected={$rootPath === nav.path}/>
					{/each}
				</div>
			{/if}

			{#if $socialMediaVisibility}
				<div transition:slide id="socials">
					{#each socialMedias.slice(0, 5) as item}
						<Button push="{item}" blank={true}/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@import "../../../commonStyles";

	.navigationBar {
		margin: 	10px auto;
		position: 	relative;

		.controller {
			width: 			max-content;
			margin: 		0 auto;

			> * {
				transition: 	border ease .5s .3s;
				border-radius: 	$normalBorder;
				width: 			max-content;
				margin: 		0 auto;
				border-bottom: 	1px solid black;}

			> *:not(:first-child) {
				margin: 10px 0 0 0;}

			#navigation {
				padding: 		0 10px;
				background: 	var(--backgroundTrans);
				border-bottom: 	1px solid var(--accent2);}

		}}
</style>