<script>
    import { commissionTypes, additionalPurchases } from "$lib/databases/commissionDetails.js";

    let show = false;
</script>

<div class="nsfw hoverable"
	 on:click={() => {show = true;}}>
	<div class="imageWrapper {!show ? 'blurCont' : ''}"
		 id="commPreivew">
		<img src="/commissions/DemoImage.webp">
		<p class="imageCite shortBorder">
			Previews of Shading / Flats / Lines
		</p>
	</div>
</div>
<div class="chunk">
	<h3>Commission Types</h3>
	<div class="colourWrapper">
		{#each commissionTypes as commissionType}
			<div class="commType">
				<h4>
					{commissionType.title}
				</h4>
				<p>
					{commissionType.description}
				</p>
				<div class="prices">
					{#each commissionType.prices as type, i}
						<h5>
							<span>{type[0]}:</span> £{type[1]}.00
						</h5>
					{/each}
					{#each commissionType.adPrices as type, i}
						<h5>
							<span>{type[0]}:</span> £{type[1]}.00
						</h5>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<h3>Additional purchases</h3>
	<div class="additionalPurchases">
		{#each additionalPurchases as additionalType}
			<div class="type">
				<h5>
					<span>{additionalType.title}:</span> £{additionalType.price}
				</h5>
				<p>
					{additionalType.description}
				</p>
			</div>
		{/each}
	</div>
	<p>
		All commissions will include all latter version of the art after completion. For example,
		if you were to commission a fully shaded rendered sheet, you will recieve the final version
		without the watermark, alongside the flats & lines, Including versions without dialog, if
		dialog is included.
	</p>
	<p>
		Commissions include 1 normal sized character, and includes 1 micro character, additional characters
		will require purchasing the additional options available, which vary on cost depending on the request.
	</p>
	<p>
		Photoshop files will be available for download via. the Discord archive server, and is a free
		resource for members. Photoshop files include all of the clipping masks, alternate sketches and
		references used in the creation of the artwork.
	</p>
</div>

<style lang="scss">
	@import "./src/commonStyles.scss";

	* {	transition: ease .3s; }

	.chunk {
		padding: 10px 3px 1px 3px;
		> * {	margin-bottom: 	10px;}
		p { &:last-child {
			margin: 0;}}}

	#commPreivew {
		height: 300px;}

	.commType {
		padding: 	8px 5px 8px 15px;
		margin: 	0 0 0 -2px;

		&:not(:first-of-type) {
			margin-top: 10px;}

		h4 {	padding-bottom: 10px;}
		p {		padding-bottom: 7px;}

		.prices {
			display: 	flex;
			display: 	-webkit-inline-box;
			column-gap: 5px;
			row-gap: 	5px;
			flex-flow: 	row wrap;

			width: 		100%;
			max-width: 100%;
			span {
				color: 		var(--accent3);
				font-style: italic;}
			h5 {
				padding-right: 15px;
				width: max-content;
				height: max-content;
				display: grid;

				&:nth-of-type(1){ span { @include customFontColour(var(--accent1));}}
				&:nth-of-type(2){ span { color: var(--accent6); }}
				&:nth-of-type(3){ span { color: var(--accent3); }}
				&:nth-of-type(4){ span { color: var(--accent7); }}
				&:nth-of-type(5){ span { color: var(--accent2); }}
				&:nth-of-type(6){ span { color: var(--accent5); }}
			}}

		&:nth-child(1) {	border-left: 1px solid var(--accent2);}
		&:nth-child(2) {	border-left: 1px solid var(--accent1);}
		&:nth-child(3) {	border-left: 1px solid var(--accent7);}
		&:nth-child(4) {	border-left: 1px solid var(--accent3);}
		&:nth-child(5) {	border-left: 1px solid var(--accent6);}
		&:nth-child(6) {	border-left: 1px solid var(--accent5);}
	}

	.additionalPurchases {
		.type {
				padding: 		3px 5px 3px 15px;
				margin-bottom: 	10px;
			h5 {
				padding-bottom: 5px;}

			@mixin cbc ($colour){
				border-left: 	1px solid $colour;
				span {
					color: 		$colour}}

			&:nth-child(1) { @include cbc(var(--accent6));}
			&:nth-child(2) { @include cbc(var(--accent3));}
			&:nth-child(3) { @include cbc(var(--accent5));}
			&:nth-child(4) { @include cbc(var(--accent7));}
			&:nth-child(5) { @include cbc(var(--accent1));}
			&:nth-child(6) { @include cbc(var(--accent2));}}}

</style>