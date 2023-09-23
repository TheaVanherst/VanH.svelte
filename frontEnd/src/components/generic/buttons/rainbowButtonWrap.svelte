<script>
	export let
		padding = [5, 10],
		borderRad = 9,
		bottom = 0;

    let hover = false;
</script>

<div class="social wideBorder"
	 on:mouseenter={() => hover = true}
	 on:mouseleave={() => hover = false}
	style="
		border-radius: {borderRad}px;
		margin-bottom: {bottom}px">
	<div class="flex"
		style="
			padding: {!hover ? padding[0] : padding[0] - 1}px {!hover ? padding[1] : padding[1] - 1}px;
			border-radius: {!hover ? borderRad - 1 : borderRad - 2}px">
		<slot/>
	</div>
</div>

<style lang="scss">
	* { transition: .2s ease }

	.social {
		&:before {
			width:  		120%;
			aspect-ratio: 	1/1;

			left:   	50%;
			top:    	50%;
			transform: 	translate(-50%,-50%);

			position: 	absolute;
			z-index: 	-2;

			background: conic-gradient(var(--accent2), var(--accent2));
			content: 	"";}

		position: relative;
		overflow: hidden;

		.flex {
			background: white;

			margin: 	1px;
			display: 	flex;}

		&:hover {
				transform: 	scale(1.1);
			&:before {
				background: conic-gradient(var(--accent2),
					var(--accent5), var(--accent6), var(--accent3),
					var(--accent7), var(--accent1), var(--accent2));
				animation: spin 2s infinite linear;}
			.flex {
				margin: 	2px;
				padding: 	4px 9px;}}}
</style>