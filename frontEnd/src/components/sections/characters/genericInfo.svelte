<script>
	export let data = {}
</script>

<div class="citation">
	<h4>
		{data.fullName}
	</h4>

	<div class="description">
		<p class="title">Origin</p>
		{#if data.nationality}
			<p id="nationality">
				<span>Nationality</span>: {data.nationality}</p>
		{/if}
		{#if data.timePeriod}
			<p id="timePeriod">
				<span>Time period</span>: {data.timePeriod}</p>
		{/if}
		{#if data.age}
			<p id="age">
				<span>Age</span>: {data.age}</p>
		{/if}
	</div>

	<div class="description">
		<p class="title">About</p>
		{#if data.sexuality}
			<p id="sexuality">
				<span>Sexuality</span>:{data.sex} {data.sexuality}</p>
		{/if}
		{#if data.partner}
			<p id="partner">
				<span>Partner(s)</span>: {data.partner}</p>
		{/if}
	</div>

	<!-- Heights -->
	<div class="description">
		<p class="title">Height</p>
		<p id="cannonHeight">
			<span>Canon</span>: {data.canonHeight}</p>
		{#if data.nonCanHeight}
			<p id="nonCannonHeight">
				<span>Non-canon</span>: {data.nonCanHeight}</p>
		{/if}
		{#if data.beastarCanon}
			<p id="beastarCannonHeight">
				<span>Beastars Canon</span>: {data.beastarCanon}</p>
		{/if}
	</div>

	<!-- Description -->
	<div class="partition"></div>

	<div class="description">
		<p class="title">Occupation</p>
		<p>{data.occupation}</p>
	</div>
	<div class="description">
		<p class="title">Description</p>
		<p>{data.desc}</p>
	</div>

	<div class="partition"></div>

	{#if data.creationDate[0]}
		<div class="description">
			<p id="creationDate">
				<span>Creation Date</span>: {data.creationDate[0]}
			</p>
			{#if data.creationDate[1]}
				<p id="IterationsDate">
					<span>Previous Iterations</span>: {data.creationDate[1]}
				</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.citation {
		h4 {	padding: 	0 0 9px 0;}
		.partition {
				padding: 	10px 0 0 0;
				margin: 	5px 0 0 0;
				border-top: 1px solid var(--accent9);}
		.description {
			padding: 		0 0 7px 2px;
			.title {
				text-decoration: underline;
				padding: 	0 0 4px 0;}}}

	@mixin cfc($colour,$invert){
		> span { color: $colour; }
		::selection {
			color: 				$invert;
			background-color: 	$colour;}}

	#nationality, #beastarCannonHeight {
		@include cfc(var(--accent1),black);}
	#cannonHeight, #timePeriod {
		@include cfc(var(--accent7),black);}
	#IterationsDate, #age {
		@include cfc(var(--accent3),black);}
	#sexuality, #creationDate {
		@include cfc(var(--accent6),black);}
	#nonCannonHeight {
		@include cfc(var(--accent5),black);}
	#partner {
		@include cfc(var(--accent4),black);}

</style>