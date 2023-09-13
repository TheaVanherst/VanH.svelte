<script>
    import { fly } from "svelte/transition";
    import {quartIn, quartOut} from "svelte/easing";

    import {screenSize, scrollPos} from "$lib/controllers/accessibilityController.js";

    const
		getRandomInt = (max) => {
        return Math.floor(Math.random() * max);};

    let comet = {},
		xPosition = 0,
		yPosition = 0,
        rScale = 1;

    let outerHeight; // calculates page height

    let ms = 1000,
		clear

    $: {
        clearInterval(clear);

        clear = setInterval(() => {
            ms = getRandomInt(5000);

            xPosition = getRandomInt($screenSize) + 200;
            yPosition = getRandomInt(outerHeight + 100) - 300;
            rScale = getRandomInt(7) + 0.5;

            comet = {};
        }, ms);
    }
</script>

<svelte:window bind:outerHeight />

<div id="cometController" style="height:{outerHeight}px">
	{#key comet}
		<img src="/cursors/comet.gif"
			 style="
			 	transform: scale(rScale);
				left: {xPosition}px;
				top: {yPosition}px"
			 in:fly={{y: 8, x: -8, duration: 50, easing: quartIn }}
			 out:fly={{y: 800, x: -800, duration: 5000, easing: quartOut }}>
	{/key}
</div>

<style lang="scss">
	#cometController {
		position: absolute;}
	img {	position: fixed;
		&:last-of-type { //dumb fix
			display: none;}}
</style>