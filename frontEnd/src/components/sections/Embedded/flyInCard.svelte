<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import { fly } from "svelte/transition";

	export let
		desc = undefined,
		icon = undefined,
		lineCount = 2;

    export let
		hover = false;
</script>

{#if hover}
	<div class="trans shortBorder" transition:fly={{y:-50}}>
		{#if icon}
			<div class="gameIcon">
				<SanityImage image={icon}/>
			</div>
		{/if}

		<div>
			<p style="-webkit-line-clamp: {lineCount}">{desc}</p>
		</div>
	</div>
{/if}

<style lang="scss">

	.transWrap {
		position: 	absolute;
		bottom: 	0;
	}

	.trans {
		bottom: 	0;
		margin: 	5px;

		position: 	absolute;
		overflow: 	hidden;
		background: white;
		display: 	flex;

		.gameIcon {
			min-width: 	24px;
			height: 	24px;
			margin: 	auto -3px auto 8px;}

		p {
			color: black;

			line-height: 	1rem;
			display: 		-webkit-box;
			overflow: 		hidden;

			-webkit-box-orient: vertical;

			padding: 		8px 10px 0 10px;
			margin-bottom: 	7px;
		}
	}
</style>