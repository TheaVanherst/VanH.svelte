<script>
    import { fly } from "svelte/transition";

    export let
		active = false,
		hover = false,
		absolute = false
</script>

{#if !active}
	<div class="previewCard card"
		 class:absolute={absolute}
		 class:hovered={hover}
		 transition:fly={{y: -50, duration: 400 }}>
		{#if $$slots['title']}
			<div class="titleCard regularBorder">
				<div class="wrapper">
					<slot name="title"/>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="infoPlate regularBorder card"
		 class:absolute={absolute}
		 transition:fly={{y: 50, duration: 400 }}>
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
		bottom: 	0;}
	.absolute {
		position: absolute;}

	.titleCard, .descCard {
		display: 	grid;
		position: 	relative;
		overflow: 	hidden;

		transition: ease background .3s, ease border .3s;
		border: 	1px solid transparent;
		> * {
			display: block;}}

	.wrapper {		margin: 	8px 12px 10px 10px;}
	.titleCard {	background: var(--TransWhite);}
	.accent {		background: var(--accent9);}
	.previewCard.hovered .titleCard {
					background: var(--accent9);}
	.previewCard:hover .titleCard {
					border: 	1px solid var(--accent2);}

	.infoPlate {
		max-height: calc(100% - 10px);
		overflow: 	hidden scroll;}
</style>