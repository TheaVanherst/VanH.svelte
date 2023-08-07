
<div class="loading">
	<div class="plane">
		<div class="circle outer"></div>
		<div class="circle in"></div>
		<div class="rotation tilt">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
	<div class="plane tilt">
		<div class="circle out"></div>
	</div>
</div>

<style lang="scss">
	.loading {
		filter: drop-shadow(0px 0px 2px var(--darkAccent1));}

	.plane {
		position: absolute;
		&.tilt {
			animation: tiltSpin 3s ease-in-out infinite;}
	}

	.circle {
		position: 		absolute;
		border-radius: 	50%;

		@mixin cgm($size, $border, $colour){
			border: 			$border solid $colour;
			border-left-color: 	transparent;
			border-right-color: transparent;

			width: 	$size;
			height: $size;
			top: 	calc(((100% - $size) / 2) - ($border));
			left: 	calc(((100% - $size) / 2) - ($border));}

		&.in {
			@include cgm(20px, 5px, var(--accent6));
			animation: spin 3s linear reverse infinite}
		&.out {
			@include cgm(50px, 5px, var(--accent6));
			animation: spin 3s linear infinite}
		&.outer {
			@include cgm(40px, 1px, var(--accent3));
			animation: spin 4s linear infinite}
	}

	@keyframes spin {
		from {	transform: rotate(0deg);}
		to {	transform: rotate(360deg);}}

	@keyframes tiltSpin {
		from {	transform: rotateY(0);}
		to {	transform: rotateY(1turn);}}
</style>