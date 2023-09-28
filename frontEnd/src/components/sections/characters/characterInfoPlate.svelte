<script>
	import SanityImage from "$root/serializer/types/sanityImage.svelte";

    import {heightBuilder, shortMonthBuilder} from "$lib/misc/measurementConverters.js";

    export let data = {}

    const iterationBuilder = (c,s) => {
        let returnString = "";
        if (c){			returnString += shortMonthBuilder(c);
            if (s) {	returnString += " - " + shortMonthBuilder(s);}}
        else if (s){	returnString += shortMonthBuilder(s);}
        return returnString;
	};
</script>

<div class="plate regularBorder">
	<div class="table">
		<div class="cell">
			<div class="characterIcon">
				<SanityImage image={data.charIcon}/>
			</div>
		</div>
		<div class="cell">
			<h4>{data.fullName}</h4>
			<p>{data.job}</p>
		</div>
	</div>
</div>

<div class="plate regularBorder">
	<p class="subtitle">Life</p>
	{#if data.sexuality || data.partners}
		<div class="description">
			{#if data.sexuality}
				<p><span>Sexuality</span>:{data.sex} {data.sexuality}</p>
			{/if}
			{#if data.partners}
				<p>
					<span>Partner{data.partners.length > 1 ? 's' : ''}</span>:
					{#each data.partners as partner, i}
						{partner.fullName}{data.partners.length > 1 && data.partners.length - 1 > i ? ', ' : ''}
					{/each}
				</p>
			{/if}
			{#if data.species}
				<p><span>Species</span>: {data.species}</p>
			{/if}
		</div>
	{/if}
	{#if data.nationality || data.timePeriod || data.age}
		<div class="description">
			{#if data.nationality}
				<p><span>Nationality</span>: {data.nationality}</p>
			{/if}
			{#if data.timePeriod}
				<p><span>Time period</span>: {data.timePeriod}</p>
			{/if}
			{#if data.age}
				<p><span>Age</span>: {data.age}</p>
			{/if}
		</div>
	{/if}
</div>

<div class="plate regularBorder">
	<div class="description">
		<p class="subtitle">Height</p>
		{#if data.heights}
			{#each data.heights as heightset}
				<p class="{heightset.loreType.replace(' ','')}Height">
					<span>{heightset.loreType}</span>: {heightBuilder(heightset.height)}
				</p>
			{/each}
		{/if}
	</div>
</div>

<div class="plate regularBorder">
	<div class="description">
		<p class="subtitle">Description</p>
		<p>{data.desc}</p>
	</div>
</div>

<div class="plate regularBorder">
	{#if data.creation}
		<div class="description">
			<p class="subtitle">Design Iterations</p>
			<p id="creationDate"><span>Creation Date</span>: {shortMonthBuilder(data.creation)}</p>
			{#if data.prevcreation}
				{#each data.prevcreation as iteration}
					<p id="IterationsDate">
						<span>Previous Iterations</span>: {iterationBuilder(iteration.creation, iteration.scrapped)}
					</p>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">

	.table {
		display: 	flex;
		gap: 		10px;
		.cell {
			display: flex;

			&:last-of-type {
				display: 	inline-grid;
				margin: 	0 auto 0 0;}
			> * {
				display: 	block;}}}

	.characterIcon {
		border-radius: 	50%;
		overflow: 		hidden;
		height: 		40px;
		width: 			40px;}

	h4, p { 	white-space: normal;
				color: 	black;}
	h4 { 		margin: 0 0 5px 0;}
	p span { 	color: 	var(--accent2); }

	.subtitle {
		text-decoration: underline;
		padding: 		0 0 5px 0;}

	.description {
			padding: 	0 0 8px 2px;
		&:last-of-type {
			padding:	 0 0 0 2px;}}

	.plate {
		background: white;
		padding: 	10px;
		margin: 	5px;}
</style>