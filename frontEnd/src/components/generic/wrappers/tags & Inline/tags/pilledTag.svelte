<script>
	export let hover = false;
</script>

<div class="externalInline" class:hover>
	<div class="fill">
		<slot name="titleIcon"/>
		<slot name="title"/>
	</div>
	<div class="outline">
		<slot name="descIcon"/>
		<slot name="desc"/>
	</div>
</div>

<style lang="scss">
	.externalInline {
		display: 		inline-flex;
		border-radius: 	10px;
		overflow: 		hidden;
		border: 		1px var(--accent9) solid;
		margin: 		2px 0 2px 1px;

		> div {
			padding: 	2px 3px 1px 3px;
			display: 	inline-flex;
			:global(span) {	margin: 0 5px;}}
		:global(span) {		margin: 1px 0 0;}

		&.hover:hover {			border-color: 	var(--accent7);
			.fill {				background: var(--accent7);}
			.outline {
				:global(span) {	color:  var(--accent7);}}}}

	.fill {
		transition: background .2s ease-in-out;
		background: var(--accent9);
		color: 		var(--accent10);

		:global(span) {
			color: 	white;}}

	.outline {
		:global(span) {
			color:  var(--accent9);}}
</style>