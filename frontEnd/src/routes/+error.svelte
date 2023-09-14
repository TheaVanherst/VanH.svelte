<script>
    import { page } from '$app/stores';
    import SidebarTexts 	from "../components/layout/sidebarTexts.svelte";
</script>

{#if $page?.error}
    <SidebarTexts titlecard="Error {$page?.status}">
        <div class="container">
            <img src="/branding/error.gif"/>
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
        background:         var(--TransBlack);
        position:           relative;
        margin-bottom:      15px;

        img {
			width:          60%;
            object-fit:     cover;
            margin:         10px;
            border-radius:  5px;
            overflow:       hidden;}

        .caption {
            padding: 15px;}
	}
</style>