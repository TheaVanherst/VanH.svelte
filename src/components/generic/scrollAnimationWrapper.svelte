<script>
    let parent;
    let pw = 0,
		cw = 0,
		uw = undefined;
    // wrapper width, child width, child [controlled] width

    const scrollToRight = async (node) => {
        if (pw < uw) { //checks if wrapper is bigger than children.
            node.scroll({ left: 0, behavior: 'smooth' }); // resets the container scroll

            setTimeout(() => { // Waits until the transition is finished.
                uw = cw - 20; //sets parent width - parent padding.
            }, 1000);}
        else {
            uw = cw - 20; //sets parent width - parent padding.
            // This changes the scroll position for overflowing generic automatically,
            //      but only if the route is longer than the container.
            node.scroll({ left: uw, behavior: 'smooth' });}}; // sets the container scroll pos

    $: if (cw !== uw && parent) scrollToRight(parent); //checks if contents of router is different to parent
    // this will update whenever the route changes, and will change the value of the parent equal to the child.
</script>

<div class="grid">
	<div class="wrapper"
		 bind:clientWidth={pw}
		 bind:this={parent}>
		<div class="sleeve"
			 style="width: {uw}px">
			<div class="routeWidth"
				 bind:clientWidth={cw}>
				<slot/>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.grid {
		display:        grid;}

	.wrapper {
		white-space:        nowrap;
		overflow-x:         scroll;

		-ms-overflow-style: none;       /* IE and Edge */
		scrollbar-width:    none;       /* Firefox */
		&::-webkit-scrollbar {
			display:        none;}      /* Chrome, Safari and Opera */

		.sleeve {
			position:   relative;
			width:      min-content;

			.routeWidth {
				width:  min-content;}}}
</style>