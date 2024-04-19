<script>
	import SanityImage from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    import { standardTinyhand, standardShorthand } from "$lib/builders/measurementConverters.js";

    export let data = {}

    const
		iterationBuilder = (c,s) => c ? s ? `${standardTinyhand(c)} - ${standardTinyhand(s)}` : standardTinyhand(c) : s ? standardTinyhand(s) : "",
		ftConverter = (h) => h.measurement === 'ft' ? h.height.toString().replaceAll(".","'") + h.measurement.replaceAll("ft","''") : h.height + h.measurement;
</script>

<div class="plate regularBorder redirect">
<!--	<RedirectBuilder url="/artwork/?query=:{data.slug.replaceAll(' ','-')}">-->
<!--	this is broke, and I have NO clue why.-->
		<div class="table">
			<div class="cell">
				<div class="characterIcon">
					<SanityImage image={data.icon}/>
				</div>
			</div>
			<div class="cell">
				<h4>{data.fullName}</h4>
				<p>{data.job}</p>
			</div>
		</div>
<!--	</RedirectBuilder>-->
</div>

<div class="plate regularBorder">
	<div class="description">
		{#if !!data.sexuality}
			<p><span>Sexuality</span>:{data.sex} {data.sexuality}</p>{/if}
		{#if !!data.species}
			<p><span>Species</span>: {data.species}</p>{/if}
		{#if !!data.nationality}
			<p><span>Nationality</span>: {data.nationality}</p>{/if}
		{#if !!data.timePeriod}
			<p><span>Time period</span>: {data.timePeriod}</p>{/if}
		{#if !!data.birthday}
			<p><span>Birthday</span>: {standardShorthand(data.birthday)}</p>{/if}
		{#if !!data.age}
			<p><span>Age</span>: {data.age.years} {data.age.measurement} years</p>{/if}
	</div>
</div>

<div class="plate regularBorder">
	<div class="description">
		<p class="subtitle">Height</p>
		{#if data.heights.length > 0}
			{#each data.heights as heightset}
				<p class="{heightset.loreType}Height">
					<span>{heightset.loreType}</span>: {ftConverter(heightset.lowestHeight)} {!!heightset?.maxHeight?.height ? " - " + ftConverter(heightset.maxHeight) : ''}
				</p>
			{/each}
		{/if}
	</div>
</div>

<div class="plate regularBorder">
	<div class="description">
		<p class="subtitle">Description</p>
		<p id="bio">{data.description}</p>
	</div>
</div>

<div class="plate regularBorder">
	{#if data.creation}
		<div class="description">
			<p class="subtitle">Design Iterations</p>
			<p id="creationDate"><span>Creation Date</span>: {standardTinyhand(data.creation)}</p>
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
	p span { 	color: 	var(--accent7); }

	.subtitle {
		text-decoration: 	underline;
		padding: 			0 0 5px 0;}

	.description {
			padding: 		0 0 8px 2px;
		#bio {
			white-space: 	pre-wrap;}
		&:last-of-type {
			padding:	 	0 0 0 2px;
			word-break: 	unset;}}

	.plate {
		background: white;
		padding: 	10px;
		margin: 	5px;

		&.redirect {
			transition: color .3s ease, background .3s ease;
			&:hover {
				background: var(--accent7);
				p, h4 {
					color: white;}}}}
</style>