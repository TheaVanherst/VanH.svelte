<script>
    import { fly } from 'svelte/transition';

    export let
		active = false;
</script>

{#if !active}
	<div class="previewCard"
		 transition:fly={{y: -50, duration: 400 }}>
		<div class="card regularBorder">
			{#if $$slots.title}
				<slot name="title"/>
			{/if}
			{#if $$slots.subtitle}
				<slot name="subtitle"/>
			{/if}
		</div>
	</div>
{:else}
	<div class="previewCard"
		 transition:fly={{y: 50, duration: 400 }}>
		{#if $$slots.description}
			<div class="card regularBorder">
				<slot name="description"/>
			</div>
		{/if}
		<slot/>
	</div>
{/if}

<style lang="scss">
	.previewCard {
		position: 	absolute;
		z-index: 	1;
		bottom: 	0;
		width: 		100%;

		.card {
			margin:     5px 5px 5px 5px;
			padding: 	9px 10px 8px 10px;
			background: var(--transPure1);
			:global(h4) {
				padding-bottom: 2px;
				color: black;}
			:global(p) {
				color: black;}}}

	.descriptionCard {
		margin:     5px 5px 5px 5px;
		padding: 	7px 10px 10px 10px;}
</style>