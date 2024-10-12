<script>
    import { fly } from "svelte/transition";

	export let
		lineCount = 2,
        active = 	false
</script>

{#if active}
	<div class="card" transition:fly={{y:-50}}>
		<div class="container shortBorder">
			{#if $$slots.title}
				<div class="title">
					<slot name="title"/>
				</div>
			{/if}

			{#if $$slots.icon || $$slots.desc}
				<div class="description">
					{#if $$slots.icon}
						<div class="gameIcon">
							<slot name="icon"/>
						</div>
					{/if}
					{#if $$slots.desc}
						<p style="-webkit-line-clamp: {lineCount}">
							<slot name="desc"/>
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{:else}
{/if}

<style lang="scss">
	.card {
		position: 	absolute;
		flex: 		100%;
		bottom: 	0;
		width: 		100%;

		.container {
			overflow: 	hidden;
			background: white;
			padding: 	5px 6px 6px 6px;
			margin: 	5px;}}

	.title {
		margin: 0 2px 5px 2px;
		width: 	100%;
		:global(*) {
			white-space: 	nowrap;
			color: 			black;} }

	p {
		-webkit-box-orient: vertical;
		line-height: 1rem;
		display: 	-webkit-box;
		overflow: 	hidden;
		padding: 	0 2px;
		:global(span) {
			color: black;}}

	.container > div {
		overflow: 	hidden;
		display: 	flex;

		.gameIcon {
			aspect-ratio: 1/1;
			height: 24px;
			margin: auto 4px auto 2px;}}
</style>