<script>
    import { nsfw } from "$lib/controllers/accessibilityController.js";

    import SanityImage from "$root/serializer/types/sanityImage.svelte";
	import ImageTag from "$root/components/generic/imageContainers/imageTag.svelte";

    export let
		prices = [],
        additional = [];
</script>

<h3>Commission Types</h3>
<div class="colourWrapper">
	{#each prices as commissionType}
		<div class="commType">
			{#if $nsfw}
				<div class="previewBanner regularBorder imageWrapper">
					<SanityImage image={commissionType.previewImage}/>
					<ImageTag position={[0,0]} border="shortBorder">
						<p>{commissionType.styleType}</p>
					</ImageTag>
				</div>
			{/if}
			<div class="commissionDetails">
				<p>
					{commissionType.styleDescription}
				</p>
				<div class="prices">
					{#each commissionType.styleTypes as type}
						<h5>
							<span>{type.renderType}:</span> £{type.renderTypePrice}.00{type.additionalPriceTag ? '+' : ''}
						</h5>
					{/each}
					{#each commissionType.additionalPurchases as type}
						<h5>
							<span>{type.renderType}:</span> (+£{type.renderTypePrice}.00{type.additionalPriceTag ? '+' : ''})
						</h5>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>
<h3>Additional purchases</h3>
<div class="additionalPurchases">
	{#each additional as type}
		<div class="type">
			<h5>
				<span>{type.additionalItem}:</span> £{type.additionalPrice}.00{type.additionalPriceTag ? '+' : ''}
			</h5>
			<p>
				{type.additionalDescription}
			</p>
		</div>
	{/each}
</div>

<style lang="scss">
	* {	transition: ease .3s; }

	p { &:last-child {
		margin: 0;}}
	h3 {
		margin-bottom: 15px;}

	.previewBanner {
		margin: 	0 0 15px 0;
		height: 	150px;}

	.commType {
		padding: 	0 0 8px 15px;
		margin: 	10px 0 10px 0;

		.commissionDetails {
			p {padding: 	0 0 10px 0;}}

		.prices {
			display: 	flex;
			display: 	-webkit-inline-box;

			gap: 		10px 20px;
			flex-flow: 	row wrap;

			width: 		100%;
			max-width: 	100%;

			@mixin cbc ($colour){
				span {
					color: 	$colour;}}

			span {
				color: 		var(--accent3);
				font-style: italic;}
			h5 {
				padding: 	0 0 0 0;
				width: 		max-content;
				height: 	max-content;
				display: 	grid;

				&:nth-of-type(1){ span {color:var(--accent1);}}
				&:nth-of-type(2){ span {color:var(--accent6);}}
				&:nth-of-type(3){ span {color:var(--accent3);}}
				&:nth-of-type(4){ span {color:var(--accent7);}}
				&:nth-of-type(5){ span {color:var(--accent2);}}
				&:nth-of-type(6){ span {color:var(--accent5);}}}}
		&:nth-child(1) { border-left: 1px solid var(--accent2);}
		&:nth-child(2) { border-left: 1px solid var(--accent1);}
		&:nth-child(3) { border-left: 1px solid var(--accent7);}
		&:nth-child(4) { border-left: 1px solid var(--accent3);}
		&:nth-child(5) { border-left: 1px solid var(--accent6);}
		&:nth-child(6) { border-left: 1px solid var(--accent5);}}

	.additionalPurchases {
		.type {		padding: 	3px 5px 3px 15px;
					margin: 	0 0 10px 0;
			h5 {	padding: 	0 0 5px 0;}

			@mixin cbc ($colour){
						border-left: 	1px solid $colour;
				span {	color: 			$colour;}}

			&:nth-child(1) { @include cbc(var(--accent6));}
			&:nth-child(2) { @include cbc(var(--accent3));}
			&:nth-child(3) { @include cbc(var(--accent5));}
			&:nth-child(4) { @include cbc(var(--accent7));}
			&:nth-child(5) { @include cbc(var(--accent1));}
			&:nth-child(6) { @include cbc(var(--accent2));}}}
</style>