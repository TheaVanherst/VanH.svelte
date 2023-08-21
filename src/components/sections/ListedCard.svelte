<script>
    import { screenType } 	from '$lib/accessibilityController.js';

	export let
		data,
		citation,
        divisional = 3,
        redirect = true,
		buttonTog = true;
</script>

{#if redirect}
	<div class="tierTable">
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
{:else}
	<div class="tierTable">
		{#each data as set}
			<div class="tierBlock {$screenType < divisional ? 'stack' : ''}" >
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
			</div>
		{/each}
	</div>
{/if}


{#if citation}
	<p class="tableCite">
		<span>{ citation }</span>
		{#each data as set}
			<div style="background-color: var(--accent{set.accent})"></div>
		{/each}
	</p>
{/if}

<style lang="scss">
	@import "./src/commonStyles.scss";

	* { transition: color ease .3s, background ease .3s, border ease .3s; }
		// please don't fuck with this, future me.

	@mixin cfc($colour,$invert){
		border: 	1px solid $colour;
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
			margin-bottom: 	25px!important;}}

	.tierTable {
		display: 		flex;
		flex-wrap: 		wrap;
		gap: 			15px;
		margin-bottom: 	35px;

		.tierBlock {
			width: 			calc((100% - 15px) / 2);

			&.stack {
				width: 100%;}}}

	.stack {
		margin-bottom: 20px;
		&:last-of-type {
			margin-bottom: 0;}}

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
			text-transform: uppercase;
			padding-bottom: 3px;}

		ul {		padding:	0 0 5px 7px;
			li {	padding:	0 0 5px 5px;}}

		.button {
			margin: 	0 0 -13px calc(100% - 184px);
			bottom: 	0;
			width: 		140px;

			position: 	absolute;}}

	.tableCite {
		margin:     0 0 15px auto;
		display:    flex;
		width:      max-content;

		span {
			margin-right: 5px;}

		div {
			width:      10px;
			height:     10px;
			margin:     auto 0 auto 3px;
			border-radius:	 	50%;}}

</style>