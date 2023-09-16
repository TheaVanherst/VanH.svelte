<script>
	import SanityImage from "$lib/serializer/sanityImage.svelte";

	export let data = {}

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

	const dateBuilder = (d) => {
        const stripped = (d.split('-'));
		return `${monthNames[parseInt(stripped[1]) - 1]} ${stripped[0]}`;
	};

    const iterationBuilder = (c,s) => {
        let returnString = "";
        if (c){			returnString += dateBuilder(c);
            if (s) {	returnString += " - " + dateBuilder(s);}}
        else if (s){	returnString += dateBuilder(s);}
        return returnString;
	};

    const heightBuilder = (h) => {
		if (h < 1000) {
            let feetDiv = 	((h * 0.393700) / 12),
             	feet = 		Math.floor(feetDiv),
             	inches = 	Math.round((feetDiv - feet) * 12);
            return feet + "'" + inches + "''";}

        else if (h < 100000) {
            return (parseInt(h / 100).toLocaleString()) + " metres";}

        else {
            let trueLength = h.toString().split('.');
            return parseInt(trueLength[0].padEnd(trueLength[1], "0")).toLocaleString() + " kilometres";}
	};
</script>

<div class="plate shortBorder">
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

<div class="plate shortBorder">
	<p class="title">Life</p>
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

<div class="plate shortBorder">
	<div class="description">
		<p class="title">Height</p>
		{#if data.heights}
			{#each data.heights as heightset}
				<p class="{heightset.loreType.replace(' ','')}Height">
					<span>{heightset.loreType}</span>: {heightBuilder(heightset.height)}
				</p>
			{/each}
		{/if}
	</div>
</div>

<div class="plate shortBorder">
	<div class="description">
		<p class="title">Description</p>
		<p>{data.desc}</p>
	</div>
</div>

<div class="plate shortBorder">
	{#if data.creation}
		<div class="description">
			<p class="title">Design Iterations</p>
			<p id="creationDate"><span>Creation Date</span>: {dateBuilder(data.creation)}</p>
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

	h4, p { 	color: 	black;}
	h4 { 		margin: 0 0 5px 0;}
	p span { 	color: 	var(--accent2); }

	.title {
		font-family: 	"Playfair Display", serif;
		font-weight: 	600;
		font-size: 		13px;
		padding: 		0 0 5px 0;}

	.description {
			padding: 	0 0 8px 2px;
		&:last-of-type {
			padding:	 0 0 0 2px;}}

	.plate {
		background: white;
		padding: 	10px;
		margin: 	5px;
	}
</style>