<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import { fly } from "svelte/transition";

	export let
		title = undefined,
		desc = undefined,
		icon = undefined,
		lineCount = 2;

    export let
		hover = false;
</script>

{#if hover}
	<div class="transWrap" transition:fly={{y:-50}}>
		<div class="container shortBorder">
			<h5>{title}</h5>

			<div class="description">
				{#if icon}
					<div class="gameIcon">
						<SanityImage image={icon}/>
					</div>
				{/if}
				<p style="-webkit-line-clamp: {lineCount}">{desc}</p>
			</div>
		</div>
	</div>
{:else}

{/if}

<style lang="scss">
	.transWrap {
		position: 	absolute;
		flex: 		100%;
		bottom: 	0;
		width: 		100%;

		.container {
			background: white;
			padding: 	5px;
			margin: 	5px;}}

	h5, p {
		color: black;}

	h5 {
		margin: 0 2px 5px 2px;
		width: 	100%;
		white-space: nowrap;}

	p {
		line-height: 1rem;
		display: 	-webkit-box;
		overflow: 	hidden;

		-webkit-box-orient: vertical;
		padding: 	0 10px 0 10px;}

	.container > div {
		overflow: 	hidden;
		display: 	flex;

		.gameIcon {
			min-width: 	24px;
			height: 	24px;
			margin: 	auto -3px auto 3px;}}
</style>