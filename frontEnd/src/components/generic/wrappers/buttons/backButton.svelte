<script>
	export let data;
</script>

<div class="titlecardWrapper wideBorder" on:mousedown={() => history.back()}>
	<div class="titleCard">
		<div id="back" class="mediaIcon">
			<img src="/icons/leftIcon.webp">
		</div>
		<div class="bannerTitle">
			<slot/>
		</div>
	</div>
</div>

<style lang="scss">
	.titlecardWrapper {
		transition: 	background .3s ease, border .3s ease;
		border-bottom: 	1px solid var(--accent7);
		background: 	var(--TransBlack);

		.titleCard {
			display: flex;
			padding: 3px 0;
			#back {
				padding: 	10px;
				margin: 	0 15px 0 5px;
				img {
					transition: filter .3s ease;
					filter: 	invert(1);}}
			.bannerTitle {
				margin: 		auto 0;
				padding-bottom: 3px;
				:global(*) {
					text-transform: capitalize;}}}

		&:hover {
			background: 	var(--accent3);
			border-bottom: 	1px solid var(--accent3);
			#back {
				img {
					filter: invert(0);}}
			.bannerTitle {
				:global(*) {
					color: 	black;}}}}
</style>