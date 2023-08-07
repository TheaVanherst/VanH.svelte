<script>
	export let tierData;
    let active = false;
</script>

<a href={tierData.link} target="_blank"
   class={active === true ? 'active' : ''}
   on:mouseenter={() => {active = true}}
   on:mouseleave={() => {active = false}}>
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
		<div class="button">
			Become a {tierData.donationTier}
		</div>
	</div>
</a>

<style lang="scss">
	* {
		transition: ease .3s;
	}

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
		.button {	background: $colour;}
		.tint {		color:   	$colour;}
		::selection {
			color: 				$invert;
			background-color: 	$colour;}}

	a {
		color: white;
		&.active {
			.tierCard {
				@include cfc(var(--accent2), black);}}
	}

	.tierCard {
		padding: 			12px 15px 0 15px;
		background: 		var(--backgroundTrans);
		border-radius: 		5px;
		height: 			100%;
		position: 			relative;

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

		a {
			width: 		100%;
			display: 	flex;}

		.button {
			width: 		140px;
			padding: 	5px 8px 5px 8px;
			margin: 	0 0 -13px calc(100% - 184px);
			bottom: 	0;

			border: 		2px solid black;
			border-radius: 	5px;

			position: 	absolute;

			font-family: 	"Helvetica", Sans-serif;
			font-size: 		12px;
			font-weight: 	600;
			color: 			black;
		}
	}
</style>