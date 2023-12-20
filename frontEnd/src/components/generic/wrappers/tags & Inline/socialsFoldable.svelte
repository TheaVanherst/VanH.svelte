<script>
    import SocialMediaTag from "$root/components/generic/wrappers/tags & Inline/inlineRedirectTag.svelte";
    import { slide } 	from 'svelte/transition';

	export let socials = [];
    let active = false;
</script>

<div class="inlineRedirect">
	<div class="expandedSlot">
		<slot/>
	</div>
	<div class="filterBar">
		{#if !!socials && socials.length > 0}
			<div class="expandIcon"
				 on:mousedown={() => active = !active}
				 class:active={active}>
				<img src="/icons/downIcon.webp">
			</div>
		{/if}
	</div>
</div>
{#if active}
	<div class="socialInline" transition:slide>
		{#each socials as social}
			<SocialMediaTag data={social}/>
		{/each}
	</div>
{/if}

<style lang="scss">
	.inlineRedirect {
		width: 		100%;
		display: 	inline-flex;
		gap: 		10px;
		.expandedSlot {
			width: 	100%;}}

	.expandIcon {
		border-radius: 	50%;
		width: 			33px;
		height: 		33px;
		display: 		flex;
		transition: 	background .5s ease, transform .3s ease;

		img {
			top: 		1px;
			padding: 	5.5px;
			margin: 	auto;

			position: 	relative;
			height: 	max-content;
			transition: filter .2s ease;}

		&:hover {
			background: var(--accent10);
			img {
				filter: 	invert(1);}}

		&.active {
			transform: 	rotate(180deg);}
	}
</style>