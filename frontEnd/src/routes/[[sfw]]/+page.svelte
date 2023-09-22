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

                await goto(e);
            }, 250);

        }, 50);
	};

    $: $screenSize !== 0 && $pageLoaded === true ? pageRedirect("/home") : false;
</script>

<div id="loading">
	<div class="content">
		<ProfileBar/>
		<div class="loadingBar">
			<LoadingFull/>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		position: 	relative;
		padding: 	0 0 15px 0;
		margin: 	0 auto;}

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
			margin: 	auto auto;}}
</style>