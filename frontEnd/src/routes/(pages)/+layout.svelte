<script>
    import { fly } 	from 'svelte/transition';

	import ProfileBar 			from "$root/components/layout/bannerAnimation.svelte";
    import NavigationComponent 	from "$root/components/layout/navigationComponent.svelte";
    import TransitionHandler from "$lib/transitionHandler.svelte";
    import PageFooter 			from "../../components/layout/pageFooter.svelte";
</script>

<div id="navigation">
	<div id="layout">
		<div class="content"
			 in:fly={{y: -100, duration: 500, delay: 300 }}>
			<ProfileBar/>
		</div>

		<NavigationComponent/>
		<TransitionHandler>
			<slot/>
		</TransitionHandler>
		<PageFooter/>
	</div>
</div>

<style lang="scss">
	* {	-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;} 	/* Opera/IE 8+ */

	// generic navigation

	#navigation,
	#layout {
		max-width: 	800px;}
	#navigation {
		margin: 	0 auto;}

	#layout { // loaded page data
		width: 		100%;
		height: 	100%;
		position: 	absolute;

		min-width: 	300px;
		padding: 	15px;

		.content {
			position: 	relative;
			padding: 	0 0 15px 0;
			margin: 	0 auto;}}

</style>
