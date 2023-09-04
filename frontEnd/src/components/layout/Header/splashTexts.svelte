<script>
	import { fly } from "svelte/transition";

    import { splash } from "$lib/databases/splashTextDatabase.js";
    import { nsfw } from "$lib/controllers/accessibilityController.js";

	let text = "undefined?",
		numberGen = 0;

    const picker = () => {
        numberGen = Math.floor(Math.random() * splash.length);
        splash[numberGen][1] === true && !$nsfw || !splash?.[numberGen]?.[0] ?
			picker() : text = splash[numberGen][0];
	};

    picker();

    export let
		x = 170,
		y = 50; //desktop defaults.
</script>

<div class="wrapper" in:fly={{duration: 500, delay: 1050 }}>
	<div id="splash" style="top: {y}px; right: -{x}px">
		<div class="transform">
			<p>
				{splash[numberGen][0]}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 50px;
		position: absolute;
	}

	#splash {
		position: 	relative;
		max-width: 	220px;
		min-width: 	220px;
		margin: 	0 auto;
		z-index: 	1;

		.transform {
			transform: rotate(10deg);}}

	p {
		font-family: "Lucida Console", Monospace;
		font-weight: 800;
		font-size: 20px;
		color: var(--accent3);
		text-align: center;

		text-shadow:
				3px 3px 0 rgba(0,0,0.4),
				-1px -1px 0 rgba(0,0,0.4),
				1px -1px 0 rgba(0,0,0.4),
				-1px 1px 0 rgba(0,0,0.4),
				1px 1px 0 rgba(0,0,0.4);

		animation: float 2.3s infinite ease-in-out;
	}

	@keyframes float {
		0% {	transform: scale(1);}
		50% {	transform: scale(1.2);}
		100% {	transform: scale(1);}}
</style>