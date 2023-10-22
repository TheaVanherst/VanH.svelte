<script>
	export let url;
</script>

<a class="shortBorder" href={url} target="_blank">
	<div class="externalInline">
		<div class="fill">
			<img class="inlineIcon" src="/externalIcons/discord.webp">
			<slot name="referral"/>
		</div>
		<div class="outline">
			<img class="inlineIcon" src="/externalIcons/kofi.webp">
			<slot name="price"/>
		</div>
	</div>
</a>

<style lang="scss">
	.externalInline {
		display: 		inline-flex;
		border-radius: 	10px;
		overflow: 		hidden;
		border: 		1px var(--accent10) solid;

		> div {
			padding: 	1px 8px 1px 3px;
			gap: 		5px;
			display: 	inline-flex;}

		:global(span) {
			margin: 	1px 0 0;}

		&:hover {
			border-color: 	var(--accent2);
			.fill {
				background: var(--accent2);}
			.outline {
				:global(span) {
					color:  var(--accent2);}}}}

	.fill {
		transition: background .2s ease-in-out;
		background: var(--accent10);
		color: 		var(--accent9);

		:global(span) {
			color: white;}}

	.outline {
		:global(span) {
			color:  var(--accent10);}}

</style>