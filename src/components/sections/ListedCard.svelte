<script>
    import { screenType } 	from '$lib/accessibilityController.js';

	export let
		data,
		citation,
        divisional = 3,
        redirect = true,
		buttonTog = true;
</script>

<div class="tierTable {!redirect ? 'clickThrough' : 'clickable'}">
	{#each data as set}
		<div class="tierBlock {$screenType < divisional ? 'stack' : ''}" >
			<a href={set.link ?? ''}
			   target="_blank">
				<div class="tierCard class{set.accent}">
					<h4> {set.class} </h4>
					<ul>
						{#each set.perks as perk}
							<li>{perk}</li>
						{/each}
						{#if set.exclusives}
							{#each set.exclusives as exclusives}
								<li class="tint">{exclusives}</li>
							{/each}
						{/if}
					</ul>
					{#if buttonTog || !set.class}
						<div class="button regularBorder buttonPadding">
							Become a {set.class}
						</div>
					{/if}
				</div>
			</a>
		</div>
	{/each}
</div>

{#if citation}
	<p class="tableCite">
		{ citation }
		{#each data as set}
			<div class="class{set.accent}"></div>
		{/each}
	</p>
{/if}

<style lang="scss">
	@import "./src/commonStyles.scss";

	* { transition: background ease .3s, color ease .3s;}

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
		li {		@include customFontColour(white)}
		.button {	background: $colour;}
		.tint {		@include customFontColour($colour)}}

	a:hover {
		.tierCard {
			@include cfc(var(--accent2), black);}}

	.clickThrough {
		pointer-events: none;
		ul {
			padding:    0 0 0 10px!important;}
		&.tierTable {
			margin-bottom: 	25px!important;
		}
	}

	.tierTable {
		display: 		flex;
		flex-wrap: 		wrap;
		gap: 			15px;
		margin-bottom: 	35px;

		.tierBlock {
			width: 			calc((100% - 15px) / 2);

			&.stack {
				width: 100%;}}
	}

	.stack {
		margin-bottom: 20px;
		&:last-of-type {
			margin-bottom: 0;
		}
	}

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
			padding:	0 0 5px 10px;
			li {
				padding:	0 0 5px 5px;}}

		.button {
			border: 	2px solid black;

			margin: 	0 0 -15px calc(100% - 184px);
			bottom: 	0;
			width: 		140px;

			position: 	absolute;}
	}

	.tableCite {
		font-family:	"Helvetica", Sans-serif;

		margin:     0 0 15px auto;
		display:    flex;
		width:      max-content;

		div {
			width:      10px;
			height:     10px;
			margin:     auto 0 auto 3px;

			background-color:	var(--accent9);
			border-radius:	 	50%;

			&.class1 { background-color: var(--accent1);}
			&.class7 { background-color: var(--accent7);}
			&.class3 { background-color: var(--accent3);}
			&.class6 { background-color: var(--accent6);}
			&.class5 { background-color: var(--accent5);}
			&.class4 { background-color: var(--accent4);}}}

</style>