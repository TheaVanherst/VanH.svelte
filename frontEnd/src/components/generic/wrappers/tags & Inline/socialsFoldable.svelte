<script>
    import RollupButton from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import SocialMediaTag from "$root/components/generic/wrappers/tags & Inline/inlineRedirectTag.svelte";
    import { slide } 	from 'svelte/transition';

	export let socials = [];
    let active = false;
</script>

<div class="inlineRedirect">
	<div class="expandedSlot">
		<slot/>
	</div>
	{#if !!socials && socials.length > 0}
		<RollupButton bind:active invert={true}/>
	{/if}
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
		display: 	flex;
		.expandedSlot {
			width: 	100%;}}
</style>