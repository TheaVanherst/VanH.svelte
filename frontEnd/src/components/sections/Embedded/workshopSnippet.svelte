<script>
    import { fly } from 'svelte/transition';
	import SanityImage from "$lib/serializer/sanityImage.svelte";

	export let item;

    let active = false;
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={item.url}" target="_blank"
   on:mouseenter={() => {active = true;}}
   on:mouseleave={() => {active = false;}}>
	<div class="thumbnail regularBorder">
		<SanityImage image={item.previewImage}/>
	</div>

	{#if active}
		<div class="gameIcon shortBorder" transition:fly={{x: 20}}>
				<SanityImage image={item.gameLogo}/>
		</div>
	{/if}
</a>

<style lang="scss">
	a {
		width: 		80px;
		height: 	70px;
		margin: 	10px 0;
		opacity: 	0.75;

		display: 	flex;
		position:   relative;
		transition: cubic-bezier(0.33, 1, 0.68, 1) .4s;

		.thumbnail {
			overflow: 	hidden;
			margin: 	0 5px;
			width: 		100%;
			height: 	100%}

		.gameIcon {
			position: 	absolute;
			background: white;
			padding: 	2px;

			width: 	20px;
			height: 20px;

			bottom: 0;
			right:	0;
			margin: 3px 0 3px 3px;}

		&:hover {
			opacity: 	1;
			z-index: 	1;
			transform: 	scale(1.2);}}
</style>