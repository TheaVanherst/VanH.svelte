<script>
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

<div class="citation">
	<h4>
		{data.fullName}
	</h4>

	<div class="description">
		<p class="title">
			Origin
		</p>
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

	<div class="description">
		<p class="title">
			About
		</p>
		{#if data.sexuality}
			<p id="sexuality"><span>Sexuality</span>:{data.sex} {data.sexuality}</p>
		{/if}
		{#if data.partners}
			<p id="partner">
				<span>Partner{data.partners.length > 1 ? 's' : ''}</span>:
				{#each data.partners as partner, i}
					{partner.fullName}{data.partners.length > 1 && data.partners.length - 1 > i ? ', ' : ''}
				{/each}
			</p>
		{/if}
	</div>

	<!-- Heights -->
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

	<!-- Description -->
	<div class="partition"></div>

	<div class="description">
		<p class="title">Occupation</p>
		<p>{data.job}</p>
	</div>
	<div class="description">
		<p class="title">Description</p>
		<p>{data.desc}</p>
	</div>

	<div class="partition"></div>

	{#if data.creation}
		<div class="description">
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
	h4, p { 	color: black;}
	p span { 	color: var(--accent2); }

	.citation {
		h4 {	padding: 	0 0 9px 0;}
		.partition {
			padding: 	10px 0 0 0;
			margin: 	5px 0 0 0;
			border-top: 1px solid black;}
		.description {
			padding: 		0 0 8px 2px;
			.title {
				text-decoration: underline;
				font-weight: 600;
				padding: 	0 0 7px 0;}}}
</style>