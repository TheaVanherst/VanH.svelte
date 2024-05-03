<script>
	import { fly, scale } from "svelte/transition";

    import { splash } from "$lib/localDatabases/splashTextDatabase.js";
    import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";
    import { splashTextData } from "$lib/controllers/layoutControllers/pageSettings.js";

    export let hover = false;
    export let timer;

	let splashText = 	"undefined?",
		numberGen = 	0,
        rainbowEffect = false;

    const
		picker = () => {
			numberGen = Math.floor(Math.random() * splash.length);
			splash[numberGen][0] === true && !$navigationControls.nsfw || !splash?.[numberGen]?.[1] ?
				picker() : generator();},

		generator = () => {
            rainbowEffect = 	false;
			$splashTextData = 	splash[numberGen];
            splashText = 		splash[numberGen][1];}

    picker();

    export let
		x = 170,
		y = 50; //desktop defaults.
</script>

<div class="wrapper"
	 on:mouseover={	() => {hover = true; clearInterval(timer);}}
	 on:mouseleave={() => {timer = setInterval(function () {hover = false;}, 1000)}}
	 on:mouseup={	() => picker()}
	 on:mousedown={	() => rainbowEffect = true}
	 in:fly={{duration: 500, delay: 1050 }}>
	<div id="splash" style="top: {y}px; right: -{x}px">
		<div class="transform">
			{#key splashText}
				<p 	in:scale={{  duration: 300, delay: 450 }}
				   	out:scale={{ duration: 300 }}
					class:animation={rainbowEffect}>
					{splashText}
				</p>
			{/key}
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 		100%;
		height: 	50px;
		position: 	absolute;}

	#splash {
		position: 	relative;
		z-index: 	1;

		margin: 	0 auto;
		max-width: 	220px;

		.transform {
			height: 	100px;
			width: 		100%;

			display: 	flex;
			position: 	absolute;
			transform: 	rotate(10deg);}}

	p {
		font-family: 	"Lucida Console", Monospace;
		font-weight: 	800;
		font-size: 		20px;
		color: 			var(--accent2);
		text-align: 	center;
		user-select: 	none;

		margin: 		auto auto;
		min-width: 		100%;

		text-shadow:
				3px 3px 0 rgba(0,0,0.4),
				-1px -1px 0 rgba(0,0,0.4),
				1px -1px 0 rgba(0,0,0.4),
				-1px 1px 0 rgba(0,0,0.4),
				1px 1px 0 rgba(0,0,0.4);
		transform: scale(1.2);
		animation: float 2.3s ease-in-out infinite;

		&.animation {
			animation:
				colorRotate 1s linear infinite,
				float 2.3s ease-in-out infinite;}
	}

	@keyframes float {
		0% {	transform: scale(1.2);}
		50% {	transform: scale(1);}
		100% {	transform: scale(1.2);}}


</style>