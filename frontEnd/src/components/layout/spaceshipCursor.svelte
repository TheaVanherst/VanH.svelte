<script>
    import mousePosition from "$lib/controllers/mousePosition.js";
    import {screenSize} from "$lib/controllers/accessibilityController.js";
    import { fly } from "svelte/transition";

    import { spring } from 'svelte/motion';

    let coords = spring(
        { x: ($screenSize / 2), y: -100 },
        { stiffness: 0.1, damping: 0.6}
    );

    let shoot = {}
</script>

<svelte:window
		on:mousedown={() => shoot = {}}
		on:mousemove={() => coords.set({ x: $mousePosition.x, y: $mousePosition.y})} />

<div id="spaceShip"
	 style="left: {$coords.x}px; top: {$coords.y}px">
	<img id="ship" src="/cursors/shipCursor.webp" style="object-position: -{$mousePosition.xTilt}px 0;">
	<img id="booster1" src="/cursors/shipCursorShipBoost.webp" style="left: {$mousePosition.xTilt / 48 - 9}px">
	<img id="booster2" src="/cursors/shipCursorShipBoost.webp">
</div>
{#key shoot}
	<div id="laserParent"
		 out:fly={{y: -400, duration: 1200 }}
		 style="left: {$coords.x}px; top: {$coords.y}px">
		<img id="laser" src="/cursors/shipCursorLaser.webp">
	</div>
{/key}

<style lang="scss">

	#laserParent {
		position: 	fixed;
		z-index: 	99;
		> * {
			margin-top:	 	50px;
			margin-left: 	-9px;
			position: 		absolute;}}

	#spaceShip {
		position: 	fixed;
		z-index: 	100;

		img {
			position: 	absolute;
			object-fit: cover;}

		#ship {
			top: 	32px;
			left: 	-24px;

			width: 	48px;
			height: 49px;
			object-position:
					-48px*2 0;}

		#booster1 {
			top: 	71px;
			left: 	-7px;
			z-index: 2;
			animation:
				flicker 12s infinite ease-in-out;}
		#booster2 {
			top: 	73px;
			left: 	-7px;
			z-index: 1;
			animation:
				flicker 22s infinite ease-in-out;}
	}


	@keyframes xMovement {
		0% {	margin-left: -10px;}
		50% {	margin-left: 10px;}
		70% {	margin-left: 0;}
		80% {	margin-left: 5px;}
		100% {	margin-left: -10px;}}

	@keyframes yMovement {
		0% {	margin-top: 15px;}
		20% {	margin-top: 10px;}
		70% {	margin-top: 0;}
		100% {	margin-top: 15px;}}

	@keyframes zMovement {
		0% {	transform: scale(1.1);}
		20% {	transform: scale(1)}
		50% {	transform: scale(0.95)}
		100% {	transform: scale(1.1);}}

	@keyframes flicker {
		0% {	opacity:0.1; 	transform: scale(1, 1);}
		2% {	opacity:1; 		transform: scale(1.1, 1);}
		8% {	opacity:0.1; 	transform: scale(0.9, 1);}
		9% {	opacity:1; 		transform: scale(1, 1);}
		12% {	opacity:0.1; 	transform: scale(0.8, 1);}
		20% {	opacity:1; 		transform: scale(1, 1);}
		25% {	opacity:0.3; 	transform: scale(0.8, 1);}
		30% {	opacity:1; 		transform: scale(1, 1);}
		70% {	opacity:0.7; 	transform: scale(0.8, 1);}
		72% {	opacity:0.2; 	transform: scale(0.7, 1);}
		77% {	opacity:.9; 	transform: scale(1.1, 1);}
		100% {	opacity:.9; 	transform: scale(1, 1);}
	}

</style>