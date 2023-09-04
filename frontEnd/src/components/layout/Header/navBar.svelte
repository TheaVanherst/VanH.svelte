<script>
    import { slide } 	from 'svelte/transition';
    import { page } 	from '$app/stores';

    import { socialMedias, navigationDirectories } 	from '$lib/controllers/navigationDirectories.js';
    import Button 	from "$root/components/layout/Header/navButton.svelte";

    import { navigationVisibility, socialMediaVisibility } from "$lib/controllers/accessibilityController.js";
</script>

{#if $navigationVisibility || $socialMediaVisibility}
	<div class="navigationBar">
		<div class="controller">
			{#if $navigationVisibility}
				<div transition:slide id="navigation">
					{#each navigationDirectories as nav}
						<Button push="{nav}"
								smaller={true}
								faded={$page.url.pathname === nav.path + "/"}/>
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
				background: 	var(--backgroundTrans);
				width: 			max-content;
				margin: 		0 auto;
				border-bottom: 	1px solid black;}

			> *:not(:first-child) {
				margin-top: 10px;}

			#navigation {
				padding: 0 10px;
				border-bottom: 	1px solid var(--accent2);}
			#socials {
				padding: 0 10px;
				border: 1px solid var(--accent10);}

		}}
</style>