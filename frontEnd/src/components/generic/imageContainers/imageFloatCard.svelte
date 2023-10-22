<script>
    import { fly } from "svelte/transition";

    export let active = false;
</script>

{#if !active}
	<div class="previewCard card" transition:fly={{y: -50, duration: 400 }}>
		{#if $$slots['title']}
			<div class="titleCard regularBorder">
				<div class="wrapper">
					<slot name="title"/>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="infoPlate regularBorder card" transition:fly={{y: 50, duration: 400 }}>
		<div class="descCard regularBorder">
			<div class="titleCard">
				<div class="wrapper">
					<slot name="desc"/>
				</div>
			</div>
			{#if $$slots['alt']}
				<div class="accent">
					<div class="wrapper">
						<slot name="alt"/>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	:global(.card p, .card h3, .card h4) {
		color: 		black;}
	:global(.card span) {
		color: 		white;}

	.previewCard, .infoPlate {
		margin: 	5px;
		bottom: 	0;
		position: 	absolute;}

	.titleCard, .descCard {
		display: 	grid;
		position: 	relative;
		overflow: 	hidden;
		> * {
			display: block;}}

	.wrapper {		margin: 	8px 15px 10px 10px;}
	.titleCard {	background: var(--TransWhite);}
	.accent {		background: var(--accent9);}

	.infoPlate {
		max-height: calc(100% - 10px);
		overflow: scroll;
	}
</style>