<script>
    import { page } from '$app/stores';

    import SidebarTexts from "$root/components/layout/coreLayoutComponents/pageLayout/sidebarTexts.svelte";
</script>

{#if $page?.error}
    <SidebarTexts titlecard="Error {$page?.status}" icon="resetIcon.webp">
        <div class="container wideBorder">
            <img class="errorImage regularBorder imageWrapper" src="/branding/error.gif"/>
            <div class="caption">
                <h1>{$page?.error?.message}</h1>
            </div>
        </div>
    </SidebarTexts>
{/if}

<style lang="scss">

	.container {
		display:            flex;
        background:         var(--transPure2);
        border:             1px solid var(--accent1);

        .errorImage {
			width:          60%;
            margin:         10px;
            overflow:       hidden;}

        .caption {  padding: 15px;
            > *:not(:first-child) {   padding-top: 8px;}}}
</style>