<script>
	export let
		data,
        button = false;

    let hover = false;
</script>

<div class="wideBorder tierCard class{hover && button ? 2 : data.accent}"
	 on:mouseenter={() => {hover = true}}
	 on:mouseleave={() => {hover = false}}>
	<h4 class="titleH4"> {data.class} </h4>
	<ul>
		{#each data.perks as perk}
			<li>{perk}</li>
		{/each}
		{#if data.exclusives}
			{#each data.exclusives as exclusives}
				<li class="tint">{exclusives}</li>
			{/each}
		{/if}
	</ul>
	{#if button || !data.class}
		<div class="button regularBorder">
			<p>Become a {data.class}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../../commonStyles";

	* { transition: ease .3s}

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
		.button {	background: $colour;}
		.tint {	color: $colour;
			&::selection {
				color: $colour;}}}

	.tierCard {
		padding: 			12px 15px 0 15px;
		height: 			100%;

		background: 		var(--backgroundTrans);
		position: 			relative;

		@include cfc(var(--accent9), black);

		&.class1 { @include cfc(var(--accent1), black);}
		&.class2 { @include cfc(var(--accent2), black);}
		&.class3 { @include cfc(var(--accent3), black);}
		&.class4 { @include cfc(var(--accent4), black);}
		&.class5 { @include cfc(var(--accent5), black);}
		&.class6 { @include cfc(var(--accent6), black);}
		&.class7 { @include cfc(var(--accent7), black);}

		ul {		padding:	0 0 5px 7px;
					margin: 	0;
			li {	padding:	0 0 5px 5px;}}

		.button {
			margin: 0 15px -13px 0;
			bottom: 0;
			right: 0;

			p {
				font-weight: 	600;
				color: 			black;
				padding: 		7px 12px 6px 12px;
			}

			position: 	absolute;}}
</style>