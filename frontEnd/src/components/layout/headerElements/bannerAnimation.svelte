<script>
	import { fade } from "svelte/transition";
</script>

<div class="profileGraphic">
	<div class="planetarySystem">
		<div class="plane">
			<div transition:fade>
				<div class="circle ring1 plan">
					<div class="dot"></div>
				</div>
				<div class="circle ring2 plan">
					<div class="dot"></div>
				</div>
				<div class="circle ring3 plan">
					<div class="dot"></div>
				</div>
				<div class="circle ring4 plan">
					<div class="dot"></div>
				</div>
				<div class="circle ring5 plan">
					<div class="dot"></div>
				</div>
				<div class="circle ring6 plan">
					<div class="dot"></div>
				</div>
			</div>

			<div class="plane tilt1">
				<div class="circle decorationRing1"></div>
			</div>
			<div class="plane tilt2">
				<div class="circle decorationRing2"></div>
			</div>
			<div class="circle decorationRing3"></div>
		</div>
	</div>
	<slot/>
</div>

<style lang="scss">
	$bannerHeight: 200px;

	.profileGraphic {
		display:            flex;
		justify-content:    center;
		position: 			relative;

		height: 	$bannerHeight;

		> * {
			position:   absolute;
			height: 	$bannerHeight;}

		> .planetarySystem {
			margin-top: 30px;
			width: 		$bannerHeight;}}

	.planetarySystem {
		filter: 	drop-shadow(0px 0px 2px var(--darkAccent1));
		animation: 	spin 40s ease-in-out infinite;

		.plane {
			transform: 	rotateY(-25deg);
			position: 	absolute;
			width: 		200px;
			height: 	200px;

			&.tilt1 {	animation: tiltSpin 3s ease-in-out infinite;}
			&.tilt2 {	animation: tiltSpin 5s ease-in-out infinite;}
			&.tilt3 {	animation: tiltSpin 6s ease-in-out infinite;}}

		.circle,
		.circle > .dot {
			position: 			absolute;
			border-radius: 		50%;}

		.circle {
			&:nth-child(1) > .dot {background: var(--accent3);}
			&:nth-child(2) > .dot {background: var(--accent4);}
			&:nth-child(3) > .dot {background: var(--accent1);}
			&:nth-child(4) > .dot {background: var(--accent6);}
			&:nth-child(5) > .dot {background: var(--accent7);}
			&:nth-child(6) > .dot {background: var(--accent3);}
			&:nth-child(6) > .dot {background: var(--accent4);}

			@mixin cgm($ringSize, $border, $colour, $planetSize, $rotation){
				border: 				$border solid $colour;
				border-left-color: 		transparent;
				border-right-color: 	transparent;

				width: 	$ringSize;
				height: $ringSize;
				top: 	calc(((100% - $ringSize) / 2) - ($border));
				left: 	calc(((100% - $ringSize) / 2) - ($border));

				animation: 	spin $rotation linear infinite;

				> .dot {
					width: 		$planetSize;
					height: 	$planetSize;
					margin-top: 	calc(50% - ((($ringSize + $planetSize) / 2.85) - 4px));
					margin-left: 	calc(50% - ((($ringSize + $planetSize) / 2.8) + 5px));}}

			&.decorationRing1 {	@include cgm(250px, 15px, var(--accent7), 0px,  3s); }
			&.decorationRing2 {	@include cgm(320px, 10px, var(--accent3), 0px,  3s); }

			&.ring5 {	@include cgm(190px, 2px, #a955cb, 4px,  3s); }
			&.ring2 {	@include cgm(300px, 2px, #5da4a4, 6px,  8s); }
			&.ring3 {	@include cgm(350px, 2px, #bebe63, 7px,  12s);}
			&.ring4 {	@include cgm(390px, 1px, #bb4c92, 10px, 10s);}
			&.ring1 {	@include cgm(500px, 2px, #449b61, 5px,  43s);}
			&.ring6 {	@include cgm(640px, 1px, #5da4a4, 4px, 167s);}}}

	@keyframes rotateAnimation {
		0% {	transform: rotateY(-30deg);}
		50% {	transform: rotateY(30deg);}
		100% {	transform: rotateY(-30deg);}}
	@keyframes spin {
		from {	transform: rotate(0deg);}
		to {	transform: rotate(-360deg);}}
	@keyframes tiltSpin {
		from {	transform: rotateY(0);}
		to {	transform: rotateY(-1turn);}}

</style>