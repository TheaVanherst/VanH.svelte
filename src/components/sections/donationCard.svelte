<script>
	export let tierData;
</script>

<a href={tierData.link} target="_blank">
	<div class="tierCard class{tierData.accent}">
		<h4> {tierData.donationTier} </h4>
		<ul>
			{#each tierData.bonuses as bonus}
				<li>{bonus}</li>
			{/each}
			{#each tierData.exclusives as exclusives}
				<li class="tint">{exclusives}</li>
			{/each}
		</ul>
		<div class="button regularBorder buttonPadding">
			Become a {tierData.donationTier}
		</div>
	</div>
</a>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* { transition: ease .3s;}

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
		li {		@include customFontColour(white)}
		.button {	background: $colour;}
		.tint {		@include customFontColour($colour)}}

	a:hover {
		.tierCard {
			@include cfc(var(--accent2), black);}}

	.tierCard {
		padding: 			12px 15px 0 15px;
		border-radius: 		5px;
		height: 			100%;

		background: 		var(--backgroundTrans);
		position: 			relative;

		@include cfc(var(--accent9), black);

		&.class1 { @include cfc(var(--accent1), black);}
		&.class7 { @include cfc(var(--accent7), black);}
		&.class3 { @include cfc(var(--accent3), black);}
		&.class6 { @include cfc(var(--accent6), black);}
		&.class5 { @include cfc(var(--accent5), black);}
		&.class4 { @include cfc(var(--accent4), black);}

		h4 {
			padding-bottom: 	7px;
			text-transform: 	uppercase;
			text-decoration: 	underline;}

		ul {
			padding:    0 0 8px 10px;}

		.button {
			border: 	2px solid black;

			margin: 	0 0 -15px calc(100% - 184px);
			bottom: 	0;
			width: 		140px;

			position: 	absolute;}
	}
</style>