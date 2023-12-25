<script>
    import RollupButton from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import InternalRedirectTag from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectTag.svelte";
    import SocialMediaTag from "$root/components/generic/wrappers/tags & Inline/redirects/inlineRedirectTag.svelte";
    import { slide } 	from 'svelte/transition';

	export let socials = [];
    export let internal = {user:undefined, redirect:undefined};
    export let padding;
    let active = false;

</script>

<div class="inlineRedirect">
	<div class="expandedSlot">
		<slot/>
	</div>
	{#if !!socials && socials.length > 0}
		<RollupButton bind:active invert={true} {padding}/>
	{/if}
</div>
{#if active}
	<div class="socialInline" transition:slide>
		{#if internal.redirect && internal.user}
			<InternalRedirectTag redirect="/{internal.redirect}?query={internal.user}" user="{internal.user}"/>
		{/if}
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