<script>
    import { fly } from "svelte/transition";

    export let active = false;
</script>

{#if !active}
	<div id="imageCard" transition:fly={{y: -50, duration: 400 }}>
		<div class="titleCard regularBorder">
			<div class="wrapper">
				<slot name="title"/>
			</div>
		</div>
	</div>
{:else}
	<div id="imageCard" transition:fly={{y: 50, duration: 400 }}>
		<div class="descCard regularBorder">
			<div class="titleCard">
				<div class="wrapper">
					<slot name="title"/>
					<slot name="desc"/>
					<slot name="misc"/>
				</div>
			</div>
			{#if $$slots['altMisc']}
				<div class="accent">
					<div class="wrapper">
						<slot name="altMisc"/>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	:global(#imageCard *) {
		color: black;
	}

	#imageCard  {
		margin: 	5px;
		bottom: 	0;
		position: 	absolute;}

	.titleCard, .descCard {
		display: 	grid;
		position: 	relative;
		overflow: 	hidden;
		> * {
			display: block;
		}
	}

	.wrapper {		margin: 8px 15px 10px 10px;}
	.description {	margin: 5px 0 5px 0;}

	.titleCard {	background: var(--TransWhite);}
	.accent {		background: var(--accent9);}
</style>