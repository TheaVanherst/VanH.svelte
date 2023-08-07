<script>
    import { page } from '$app/stores';
    import SidebarTexts 	from "../components/generic/sidebarTexts.svelte";
</script>

{#if $page?.error}
    <SidebarTexts titlecard="Error {$page?.status}">
        <div class="container">
            <img src="/error.gif"/>
            <div class="caption">
                <h3>{$page?.error?.message}</h3>
            </div>
        </div>
    </SidebarTexts>
{/if}

<style lang="scss">
	.container {
		display:            flex;
		border-radius:      5px;
        backdrop-filter: 	blur(var(--imageBlurring));

        img {
			width:          60%;
            object-fit:     cover;
            margin:         10px;
            border-radius:  10px;
            overflow:       hidden;}
        .caption {
            padding: 15px;}
	}
</style>