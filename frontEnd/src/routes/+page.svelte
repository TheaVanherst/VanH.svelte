<script>
    import { goto } 		from '$app/navigation';
    import { screenSize, pageLoaded }	from "$lib/accessibilityController.js";

    import ProfileBar 		from "$root/components/layout/bannerAnimation.svelte";
    import LoadingFull 		from "../components/layout/loadingFull.svelte";

    $: $screenSize !== 0 && $pageLoaded === true ? setTimeout(() => goto('/home/'), 50) : '';
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
		position: 	absolute;
		top: 0;


		.loadingBar {
			position: 	relative;
			top: 		150px;}
		.content {
			margin: 	auto auto;}}
</style>