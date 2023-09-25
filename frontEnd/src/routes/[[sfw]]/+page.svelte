<script>
    import { goto } 		from '$app/navigation';
    import {
        directionProcessing, rootPath,
        screenSize, pageLoaded, transitioning,
    	} from "$lib/controllers/accessibilityController.js";

    import ProfileBar 		from "$root/components/layout/header/bannerAnimation.svelte";
    import LoadingFull 		from "../../components/layout/loadingFull.svelte";
    import { page } from "$app/stores";

    const pageRedirect = async (e) => {
        setTimeout(async () => {
            let paraLength = Object.keys($page.params).length;
            let newRoute = paraLength > 0 ? `/${$page.params.sfw}${e}/` : e;
            $rootPath = e;

            await directionProcessing(e,newRoute,newRoute,paraLength);
            $transitioning = true;

            setTimeout(async () => {
                $transitioning = false;

                await goto(newRoute);
            }, 250);

        }, 50);
	};

    $: $screenSize !== 0 && $pageLoaded === true ? pageRedirect("/home") : false;

    export let data;
</script>

{#if !$pageLoaded} <!-- prevents issues on dev server -->
	<div id="loading">
		<div class="content">
			<ProfileBar/>
			<div class="loadingBar">
				<LoadingFull/>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	#loading { // loading animation
		display: 	flex;

		width: 		100%;
		height: 	100%;
		position: 	fixed;
		top: 		0;

		.loadingBar {
			position: 	relative;
			top: 		150px;}
		.content {
			position: 	relative;
			padding: 	0 0 15px 0;
			margin: 	auto auto;}}
</style>